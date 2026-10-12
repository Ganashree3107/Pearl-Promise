r"""Import the existing frontend product catalog into MongoDB.

Run this script from the Backend directory:
    .\venv\Scripts\python.exe scripts\seed_products.py

Products are upserted by slug, so running the script repeatedly does not create
duplicates. The frontend source file remains unchanged.
"""

import asyncio
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_ROOT))

from app.config.database import close_mongodb_connection, connect_to_mongodb, get_database


PROJECT_ROOT = Path(__file__).resolve().parents[2]
FRONTEND_PRODUCTS = PROJECT_ROOT / "Frontend" / "src" / "data" / "products.js"


NODE_EXPORT_SCRIPT = """
const products = (await import(process.argv[1])).default;
console.log(JSON.stringify(products));
"""


def load_frontend_products() -> list[dict]:
    if not FRONTEND_PRODUCTS.exists():
        raise FileNotFoundError(f"Frontend product file not found: {FRONTEND_PRODUCTS}")

    result = subprocess.run(
        [
            "node",
            "--input-type=module",
            "-e",
            NODE_EXPORT_SCRIPT,
            FRONTEND_PRODUCTS.resolve().as_uri(),
        ],
        cwd=FRONTEND_PRODUCTS.parents[3],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"Unable to load frontend products with Node:\n{result.stderr}")

    products = json.loads(result.stdout)
    if not isinstance(products, list) or not products:
        raise ValueError("Frontend product export is empty or invalid")
    return products


def to_backend_product(product: dict) -> dict:
    now = datetime.now(timezone.utc)
    return {
        "slug": product["slug"],
        "name": product["name"],
        "category": product["category"],
        "images": product.get("images", []),
        "price": product["price"],
        "original_price": product.get("originalPrice"),
        "badge": product.get("badge"),
        "rating": product.get("rating", 0),
        "reviews": product.get("reviews", 0),
        "size": product.get("size"),
        "description": product.get("description", ""),
        "skin_type": product.get("skinType", []),
        "concern": product.get("concern", []),
        "ingredients": product.get("ingredients", []),
        "benefits": product.get("benefits", []),
        "how_to_use": product.get("howToUse"),
        "show_on_home": product.get("showOnHome", False),
        "bg_color": product.get("bgColor"),
        "active": product.get("active", True),
        "updated_at": now,
    }


async def seed_products() -> None:
    source_products = load_frontend_products()
    products = get_database().products
    inserted = 0
    updated = 0

    for source_product in source_products:
        document = to_backend_product(source_product)
        existing = await products.find_one({"slug": document["slug"]}, {"_id": 1})
        insert_defaults = {
            "created_at": document["updated_at"],
            "stock": source_product.get("stock", 100),
        }
        if "stock" in source_product:
            document["stock"] = source_product["stock"]
        result = await products.update_one(
            {"slug": document["slug"]},
            {
                "$set": document,
                "$setOnInsert": insert_defaults,
            },
            upsert=True,
        )
        if result.upserted_id is not None:
            inserted += 1
        elif existing is not None:
            updated += 1

    source_slugs = {product["slug"] for product in source_products}
    seeded_count = await products.count_documents({"slug": {"$in": list(source_slugs)}})
    total_count = await products.count_documents({})
    if seeded_count != len(source_products):
        raise RuntimeError(
            f"Seed verification failed: expected {len(source_products)} products, found {seeded_count}"
        )

    print(f"source_products={len(source_products)}")
    print(f"inserted={inserted}")
    print(f"updated={updated}")
    print(f"verified_seeded_products={seeded_count}")
    print(f"total_products_in_collection={total_count}")


async def main() -> None:
    await connect_to_mongodb()
    try:
        await seed_products()
    finally:
        await close_mongodb_connection()


if __name__ == "__main__":
    asyncio.run(main())
