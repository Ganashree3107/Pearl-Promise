from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status
from pymongo import ReturnDocument

from app.config.database import get_database
from app.dependencies.admin import require_admin
from app.models.product import product_document, serialize_product
from app.schemas.admin import AdminOrderSummary, AdminUserSummary, OrderStatusUpdateRequest
from app.schemas.product import ProductCreateRequest, ProductResponse
from app.services.delivery_tracking import sync_order_tracking
from app.services.email import send_order_delivered_notification


router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductCreateRequest, _: dict = Depends(require_admin)) -> ProductResponse:
    products = get_database().products
    if await products.find_one({"slug": payload.slug}, {"_id": 1}):
        raise HTTPException(status_code=409, detail="Product slug already exists")
    document = product_document(**payload.model_dump())
    result = await products.insert_one(document)
    document["_id"] = result.inserted_id
    return ProductResponse(**serialize_product(document))


@router.patch("/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: str, payload: ProductCreateRequest, _: dict = Depends(require_admin)) -> ProductResponse:
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    products = get_database().products
    if await products.find_one({"slug": payload.slug, "_id": {"$ne": ObjectId(product_id)}}, {"_id": 1}):
        raise HTTPException(status_code=409, detail="Product slug already exists")
    changes = payload.model_dump()
    changes["updated_at"] = datetime.now(timezone.utc)
    result = await products.find_one_and_update(
        {"_id": ObjectId(product_id)},
        {"$set": changes},
        return_document=ReturnDocument.AFTER,
    )
    if result is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductResponse(**serialize_product(result))


@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deactivate_product(product_id: str, _: dict = Depends(require_admin)) -> None:
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    result = await get_database().products.update_one({"_id": ObjectId(product_id)}, {"$set": {"active": False, "updated_at": datetime.now(timezone.utc)}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")


@router.get("/users", response_model=list[AdminUserSummary])
async def list_users(_: dict = Depends(require_admin)) -> list[AdminUserSummary]:
    return [
        AdminUserSummary(id=str(item["_id"]), name=item["name"], email=item["email"], is_admin=item.get("is_admin", False), created_at=item["created_at"])
        async for item in get_database().users.find({}, {"password_hash": 0, "refresh_token_hash": 0, "refresh_token_expires_at": 0})
    ]


@router.get("/orders", response_model=list[AdminOrderSummary])
async def list_orders(_: dict = Depends(require_admin)) -> list[AdminOrderSummary]:
    summaries = []
    async for order in get_database().orders.find({}).sort("created_at", -1):
        item = await sync_order_tracking(order)
        summaries.append(
            AdminOrderSummary(
                id=str(item["_id"]),
                order_id=item["order_id"],
                user_id=str(item["user_id"]),
                total_amount=item["total_amount"],
                status=item["status"],
                payment_status=item["payment_status"],
                created_at=item["created_at"],
            )
        )
    return summaries


@router.patch("/orders/{order_id}/status", response_model=AdminOrderSummary)
async def update_order_status(order_id: str, payload: OrderStatusUpdateRequest, _: dict = Depends(require_admin)) -> AdminOrderSummary:
    if not ObjectId.is_valid(order_id):
        raise HTTPException(status_code=404, detail="Order not found")
    previous = await get_database().orders.find_one(
        {"_id": ObjectId(order_id)}, {"status": 1, "payment_method": 1}
    )
    if previous is None:
        raise HTTPException(status_code=404, detail="Order not found")
    changes = {
        "status": payload.status,
        "tracking_started_at": None,
        "updated_at": datetime.now(timezone.utc),
    }
    if payload.status == "Delivered" and previous.get("payment_method") == "cod":
        changes["payment_status"] = "paid"
    item = await get_database().orders.find_one_and_update(
        {"_id": ObjectId(order_id)},
        {"$set": changes},
        return_document=ReturnDocument.AFTER,
    )
    if item is None:
        raise HTTPException(status_code=404, detail="Order not found")
    if payload.status == "Delivered" and previous.get("status") != "Delivered":
        user = await get_database().users.find_one({"_id": item["user_id"]}, {"name": 1, "email": 1})
        if user:
            await send_order_delivered_notification(user=user, order=item)
    return AdminOrderSummary(id=str(item["_id"]), order_id=item["order_id"], user_id=str(item["user_id"]), total_amount=item["total_amount"], status=item["status"], payment_status=item["payment_status"], created_at=item["created_at"])
