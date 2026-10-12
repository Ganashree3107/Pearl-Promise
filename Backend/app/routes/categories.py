import re

from fastapi import APIRouter, HTTPException, status

from app.config.database import get_database
from app.schemas.product import CategoryResponse, ProductListResponse
from app.routes.products import list_products


router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryResponse])
async def list_categories() -> list[CategoryResponse]:
    pipeline = [
        {"$match": {"active": True}},
        {"$group": {"_id": "$category", "product_count": {"$sum": 1}}},
        {"$sort": {"_id": 1}},
    ]
    return [
        CategoryResponse(slug=re.sub(r"[^a-z0-9]+", "-", item["_id"].lower()).strip("-"), name=item["_id"], product_count=item["product_count"])
        async for item in get_database().products.aggregate(pipeline)
    ]


@router.get("/{category_slug}/products", response_model=ProductListResponse)
async def products_by_category(category_slug: str) -> ProductListResponse:
    categories = await list_categories()
    category = next((item for item in categories if item.slug == category_slug.lower()), None)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return await list_products(category=category.name)
