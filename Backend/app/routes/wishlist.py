from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.config.database import get_database
from app.dependencies.auth import get_current_user
from app.schemas.wishlist import WishlistResponse


router = APIRouter(prefix="/wishlist", tags=["wishlist"])


async def build_wishlist(user_id: str) -> WishlistResponse:
    wishlist = await get_database().wishlists.find_one({"user_id": ObjectId(user_id)}) or {"items": []}
    items = []
    for product_id in wishlist["items"]:
        query = {"_id": ObjectId(product_id), "active": True} if ObjectId.is_valid(product_id) else {"slug": product_id.lower(), "active": True}
        product = await get_database().products.find_one(query)
        if product:
            items.append({
                "product_id": product_id,
                "name": product["name"],
                "slug": product["slug"],
                "price": product["price"],
                "image": (product.get("images") or [None])[0],
            })
    return WishlistResponse(items=items)


@router.get("", response_model=WishlistResponse)
async def get_wishlist(current_user: dict = Depends(get_current_user)) -> WishlistResponse:
    return await build_wishlist(current_user["id"])


@router.post("/{product_id}", response_model=WishlistResponse)
async def add_wishlist_item(product_id: str, current_user: dict = Depends(get_current_user)) -> WishlistResponse:
    query = {"_id": ObjectId(product_id), "active": True} if ObjectId.is_valid(product_id) else {"slug": product_id.lower(), "active": True}
    product = await get_database().products.find_one(query)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    await get_database().wishlists.update_one(
        {"user_id": ObjectId(current_user["id"])},
        {"$addToSet": {"items": product_id}},
        upsert=True,
    )
    return await build_wishlist(current_user["id"])


@router.delete("/{product_id}", response_model=WishlistResponse)
async def remove_wishlist_item(product_id: str, current_user: dict = Depends(get_current_user)) -> WishlistResponse:
    await get_database().wishlists.update_one(
        {"user_id": ObjectId(current_user["id"])},
        {"$pull": {"items": product_id}},
    )
    return await build_wishlist(current_user["id"])


@router.delete("", response_model=WishlistResponse)
async def clear_wishlist(current_user: dict = Depends(get_current_user)) -> WishlistResponse:
    await get_database().wishlists.update_one(
        {"user_id": ObjectId(current_user["id"])},
        {"$set": {"items": []}},
        upsert=True,
    )
    return WishlistResponse(items=[])
