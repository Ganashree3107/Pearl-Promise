import math
import re

from bson import ObjectId
from fastapi import APIRouter, HTTPException, Query, status

from app.config.database import get_database
from app.models.product import serialize_product
from app.schemas.product import ProductListResponse, ProductResponse


router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=ProductListResponse)
async def list_products(
    search: str | None = None,
    category: str | None = None,
    min_price: float | None = Query(default=None, ge=0),
    max_price: float | None = Query(default=None, ge=0),
    sort: str = Query(default="featured", pattern="^(featured|price_asc|price_desc|newest)$"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> ProductListResponse:
    filters: dict = {"active": True}
    if search:
        filters["$or"] = [
            {"name": {"$regex": re.escape(search.strip()), "$options": "i"}},
            {"description": {"$regex": re.escape(search.strip()), "$options": "i"}},
        ]
    if category and category.lower() != "all":
        filters["category"] = {"$regex": f"^{re.escape(category.strip())}$", "$options": "i"}
    if min_price is not None or max_price is not None:
        filters["price"] = {}
        if min_price is not None:
            filters["price"]["$gte"] = min_price
        if max_price is not None:
            filters["price"]["$lte"] = max_price

    sort_field = {"price_asc": "price", "price_desc": "price", "newest": "created_at"}.get(sort, "show_on_home")
    sort_direction = -1 if sort in {"price_desc", "newest", "featured"} else 1
    products = get_database().products
    total = await products.count_documents(filters)
    cursor = products.find(filters).sort(sort_field, sort_direction).skip((page - 1) * page_size).limit(page_size)
    items = [ProductResponse(**serialize_product(document)) async for document in cursor]
    return ProductListResponse(
        items=items,
        page=page,
        page_size=page_size,
        total=total,
        pages=math.ceil(total / page_size) if total else 0,
    )


@router.get("/slug/{slug}", response_model=ProductResponse)
async def get_product_by_slug(slug: str) -> ProductResponse:
    product = await get_database().products.find_one({"slug": slug.lower(), "active": True})
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return ProductResponse(**serialize_product(product))


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str) -> ProductResponse:
    try:
        object_id = ObjectId(product_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found") from exc
    product = await get_database().products.find_one({"_id": object_id, "active": True})
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return ProductResponse(**serialize_product(product))
