from datetime import datetime, timezone
from typing import Any

from bson import ObjectId


def product_document(**fields: Any) -> dict[str, Any]:
    now = datetime.now(timezone.utc)
    return {
        **fields,
        "active": fields.get("active", True),
        "stock": fields.get("stock", 0),
        "created_at": fields.get("created_at", now),
        "updated_at": fields.get("updated_at", now),
    }


def serialize_product(document: dict[str, Any]) -> dict[str, Any]:
    product = dict(document)
    product["id"] = str(product.pop("_id"))
    product.setdefault("active", True)
    product.setdefault("stock", 0)
    return product
