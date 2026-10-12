from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from app.config.database import get_database
from app.dependencies.auth import get_current_user
from app.schemas.cart import CartItemRequest, CartResponse


router = APIRouter(prefix="/cart", tags=["cart"])


def object_id(value: str) -> ObjectId:
    try:
        return ObjectId(value)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid product id") from exc


async def find_product(value: str) -> dict | None:
    if ObjectId.is_valid(value):
        return await get_database().products.find_one({"_id": ObjectId(value), "active": True})
    return await get_database().products.find_one({"slug": value.lower(), "active": True})


async def build_cart(user_id: str) -> CartResponse:
    cart = await get_database().carts.find_one({"user_id": ObjectId(user_id)}) or {"items": []}
    response_items = []
    subtotal = 0.0
    for item in cart["items"]:
        product = await find_product(item["product_id"])
        if product is None:
            continue
        line_total = float(product["price"]) * item["quantity"]
        subtotal += line_total
        response_items.append({
            "product_id": item["product_id"],
            "quantity": item["quantity"],
            "name": product["name"],
            "slug": product["slug"],
            "price": product["price"],
            "original_price": product.get("original_price"),
            "image": (product.get("images") or [None])[0],
            "stock": product.get("stock", 0),
            "line_total": line_total,
        })
    return CartResponse(items=response_items, subtotal=subtotal, total=subtotal)


@router.get("", response_model=CartResponse)
async def get_cart(current_user: dict = Depends(get_current_user)) -> CartResponse:
    return await build_cart(current_user["id"])


@router.post("/items", response_model=CartResponse)
async def add_cart_item(payload: CartItemRequest, current_user: dict = Depends(get_current_user)) -> CartResponse:
    product = await find_product(payload.product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    if payload.quantity > product.get("stock", 0):
        raise HTTPException(status_code=409, detail="Requested quantity is not in stock")

    user_id = ObjectId(current_user["id"])
    cart = await get_database().carts.find_one({"user_id": user_id}) or {"user_id": user_id, "items": []}
    existing = next((item for item in cart["items"] if item["product_id"] == payload.product_id), None)
    if existing:
        new_quantity = existing["quantity"] + payload.quantity
        if new_quantity > product.get("stock", 0):
            raise HTTPException(status_code=409, detail="Requested quantity is not in stock")
        existing["quantity"] = new_quantity
    else:
        cart["items"].append(payload.model_dump())
    await get_database().carts.replace_one({"user_id": user_id}, cart, upsert=True)
    return await build_cart(current_user["id"])


@router.patch("/items/{product_id}", response_model=CartResponse)
async def update_cart_item(product_id: str, payload: CartItemRequest, current_user: dict = Depends(get_current_user)) -> CartResponse:
    if payload.product_id != product_id:
        raise HTTPException(status_code=400, detail="Product id mismatch")
    product = await find_product(product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    if payload.quantity > product.get("stock", 0):
        raise HTTPException(status_code=409, detail="Requested quantity is not in stock")
    result = await get_database().carts.update_one(
        {"user_id": ObjectId(current_user["id"]), "items.product_id": product_id},
        {"$set": {"items.$.quantity": payload.quantity}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return await build_cart(current_user["id"])


@router.delete("/items/{product_id}", response_model=CartResponse)
async def remove_cart_item(product_id: str, current_user: dict = Depends(get_current_user)) -> CartResponse:
    await get_database().carts.update_one(
        {"user_id": ObjectId(current_user["id"])},
        {"$pull": {"items": {"product_id": product_id}}},
    )
    return await build_cart(current_user["id"])


@router.delete("", response_model=CartResponse)
async def clear_cart(current_user: dict = Depends(get_current_user)) -> CartResponse:
    await get_database().carts.update_one(
        {"user_id": ObjectId(current_user["id"])},
        {"$set": {"items": []}},
        upsert=True,
    )
    return await build_cart(current_user["id"])
