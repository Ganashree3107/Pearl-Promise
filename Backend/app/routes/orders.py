from datetime import datetime, timezone
import secrets

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pymongo.errors import DuplicateKeyError

from app.config.database import get_database
from app.dependencies.auth import get_current_user
from app.schemas.order import OrderCreateRequest, OrderResponse, ReturnRequest
from app.services.delivery_tracking import sync_order_tracking
from app.services.email import send_order_placed_notification


router = APIRouter(prefix="/orders", tags=["orders"])
DELIVERY_FEES = {"standard": 0.0, "express": 99.0}


async def find_product(product_ref: str) -> dict | None:
    query = {"_id": ObjectId(product_ref), "active": True} if ObjectId.is_valid(product_ref) else {"slug": product_ref.lower(), "active": True}
    return await get_database().products.find_one(query)


def serialize_order(document: dict) -> OrderResponse:
    return OrderResponse(
        id=str(document["_id"]),
        order_id=document["order_id"],
        items=document["items"],
        shipping_address=document["shipping_address"],
        delivery_method=document["delivery_method"],
        subtotal=document["subtotal"],
        shipping_fee=document["shipping_fee"],
        total_amount=document["total_amount"],
        status=document["status"],
        payment_status=document["payment_status"],
        payment_method=document["payment_method"],
        return_status=document.get("return_status"),
        return_reason=document.get("return_reason"),
        return_comments=document.get("return_comments"),
        return_requested_at=document.get("return_requested_at"),
        created_at=document["created_at"],
        updated_at=document["updated_at"],
    )


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(payload: OrderCreateRequest, current_user: dict = Depends(get_current_user)) -> OrderResponse:
    user_id = ObjectId(current_user["id"])
    orders = get_database().orders
    if payload.idempotency_key:
        existing = await orders.find_one(
            {"user_id": user_id, "idempotency_key": payload.idempotency_key}
        )
        if existing is not None:
            return serialize_order(await sync_order_tracking(existing))

    cart = await get_database().carts.find_one({"user_id": user_id})
    if not cart or not cart.get("items"):
        raise HTTPException(status_code=400, detail="Cart is empty")

    items = []
    resolved_items = []
    subtotal = 0.0
    for cart_item in cart["items"]:
        product = await find_product(cart_item["product_id"])
        if product is None:
            raise HTTPException(status_code=409, detail="Cart contains an unavailable product")
        if cart_item["quantity"] > product.get("stock", 0):
            raise HTTPException(status_code=409, detail=f"Insufficient stock for {product['name']}")
        resolved_items.append((cart_item, product))
        line_total = float(product["price"]) * cart_item["quantity"]
        subtotal += line_total
        items.append({
            "product_id": str(product["_id"]),
            "name": product["name"],
            "slug": product["slug"],
            "image": (product.get("images") or [None])[0],
            "price": product["price"],
            "quantity": cart_item["quantity"],
            "line_total": line_total,
        })

    now = datetime.now(timezone.utc)
    shipping_fee = DELIVERY_FEES[payload.delivery_method]
    document = {
        "user_id": user_id,
        "order_id": "GLR" + secrets.token_hex(5).upper(),
        "items": items,
        "shipping_address": payload.shipping_address.model_dump(),
        "delivery_method": payload.delivery_method,
        "subtotal": subtotal,
        "shipping_fee": shipping_fee,
        "total_amount": subtotal + shipping_fee,
        "status": "Order Placed",
        "tracking_started_at": now,
        "idempotency_key": payload.idempotency_key,
        "payment_status": "pending",
        "payment_method": payload.payment_method,
        "created_at": now,
        "updated_at": now,
    }
    for cart_item, product in resolved_items:
        result = await get_database().products.update_one(
            {"_id": product["_id"], "stock": {"$gte": cart_item["quantity"]}},
            {"$inc": {"stock": -cart_item["quantity"]}},
        )
        if result.modified_count != 1:
            raise HTTPException(status_code=409, detail="Stock changed; please review your cart")
    try:
        result = await orders.insert_one(document)
    except DuplicateKeyError:
        if not payload.idempotency_key:
            raise
        existing = await orders.find_one(
            {"user_id": user_id, "idempotency_key": payload.idempotency_key}
        )
        if existing is None:
            raise
        return serialize_order(await sync_order_tracking(existing))
    document["_id"] = result.inserted_id
    await get_database().carts.update_one({"user_id": user_id}, {"$set": {"items": []}})
    await send_order_placed_notification(user=current_user, order=document)
    return serialize_order(document)


@router.get("", response_model=list[OrderResponse])
async def list_orders(
    current_user: dict = Depends(get_current_user),
    limit: int = Query(default=50, ge=1, le=100),
) -> list[OrderResponse]:
    cursor = get_database().orders.find({"user_id": ObjectId(current_user["id"])}).sort("created_at", -1).limit(limit)
    return [
        serialize_order(await sync_order_tracking(document))
        async for document in cursor
    ]


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)) -> OrderResponse:
    document = await get_database().orders.find_one({"_id": ObjectId(order_id), "user_id": ObjectId(current_user["id"])}) if ObjectId.is_valid(order_id) else None
    if document is None:
        raise HTTPException(status_code=404, detail="Order not found")
    document = await sync_order_tracking(document)
    return serialize_order(document)


@router.post("/{order_id}/cancel", response_model=OrderResponse)
async def cancel_order(order_id: str, current_user: dict = Depends(get_current_user)) -> OrderResponse:
    if not ObjectId.is_valid(order_id):
        raise HTTPException(status_code=404, detail="Order not found")
    document = await get_database().orders.find_one({"_id": ObjectId(order_id), "user_id": ObjectId(current_user["id"])})
    if document is None:
        raise HTTPException(status_code=404, detail="Order not found")
    document = await sync_order_tracking(document)
    if document["status"] in {"Shipped", "Out for Delivery", "Delivered", "Cancelled"}:
        raise HTTPException(status_code=409, detail="Order cannot be cancelled at this stage")
    now = datetime.now(timezone.utc)
    await get_database().orders.update_one(
        {"_id": document["_id"]},
        {
            "$set": {
                "status": "Cancelled",
                "tracking_started_at": None,
                "updated_at": now,
            }
        },
    )
    document["status"] = "Cancelled"
    document["tracking_started_at"] = None
    document["updated_at"] = now
    return serialize_order(document)


@router.post("/{order_id}/return", response_model=OrderResponse)
async def request_return(
    order_id: str,
    payload: ReturnRequest,
    current_user: dict = Depends(get_current_user),
) -> OrderResponse:
    if not ObjectId.is_valid(order_id):
        raise HTTPException(status_code=404, detail="Order not found")
    document = await get_database().orders.find_one({"_id": ObjectId(order_id), "user_id": ObjectId(current_user["id"])})
    if document is None:
        raise HTTPException(status_code=404, detail="Order not found")
    document = await sync_order_tracking(document)
    if document["status"] != "Delivered":
        raise HTTPException(status_code=409, detail="Only delivered orders can be returned")
    if document.get("return_status") in {"Return Requested", "Returned"}:
        raise HTTPException(status_code=409, detail="A return has already been requested")

    now = datetime.now(timezone.utc)
    await get_database().orders.update_one(
        {"_id": document["_id"]},
        {"$set": {
            "return_status": "Return Requested",
            "return_reason": payload.reason,
            "return_comments": payload.comments,
            "return_requested_at": now,
            "updated_at": now,
        }},
    )
    document.update({
        "return_status": "Return Requested",
        "return_reason": payload.reason,
        "return_comments": payload.comments,
        "return_requested_at": now,
        "updated_at": now,
    })
    return serialize_order(document)
