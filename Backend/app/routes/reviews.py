from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status
from pymongo import ReturnDocument

from app.config.database import get_database
from app.dependencies.auth import get_current_user
from app.schemas.review import ReviewCreateRequest, ReviewResponse, ReviewSummaryResponse


router = APIRouter(prefix="/reviews", tags=["reviews"])


def serialize_review(document: dict) -> ReviewResponse:
    return ReviewResponse(
        id=str(document["_id"]),
        product_id=str(document["product_id"]),
        user_id=str(document["user_id"]),
        user_name=document["user_name"],
        rating=document["rating"],
        text=document["text"],
        verified_purchase=document["verified_purchase"],
        created_at=document["created_at"],
        updated_at=document["updated_at"],
    )


async def product_exists(product_id: str) -> ObjectId:
    query = {"_id": ObjectId(product_id), "active": True} if ObjectId.is_valid(product_id) else {"slug": product_id.lower(), "active": True}
    product = await get_database().products.find_one(query, {"_id": 1})
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product["_id"]


async def has_purchased(user_id: ObjectId, product_id: str) -> bool:
    return await get_database().orders.find_one(
        {"user_id": user_id, "items.product_id": product_id, "payment_status": "paid"},
        {"_id": 1},
    ) is not None


@router.get("/product/{product_id}", response_model=ReviewSummaryResponse)
async def get_product_reviews(product_id: str) -> ReviewSummaryResponse:
    object_id = await product_exists(product_id)
    documents = [document async for document in get_database().reviews.find({"product_id": object_id}).sort("created_at", -1)]
    items = [serialize_review(document) for document in documents]
    average = sum(item.rating for item in items) / len(items) if items else 0
    return ReviewSummaryResponse(items=items, average_rating=round(average, 2), review_count=len(items))


@router.get("/me/count")
async def get_my_review_count(current_user: dict = Depends(get_current_user)) -> dict[str, int]:
    count = await get_database().reviews.count_documents({"user_id": ObjectId(current_user["id"])})
    return {"count": count}


@router.post("/product/{product_id}", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def add_review(product_id: str, payload: ReviewCreateRequest, current_user: dict = Depends(get_current_user)) -> ReviewResponse:
    product_object_id = await product_exists(product_id)
    user_object_id = ObjectId(current_user["id"])
    if not await has_purchased(user_object_id, product_id):
        raise HTTPException(status_code=403, detail="You can review products you have purchased")
    if await get_database().reviews.find_one({"product_id": product_object_id, "user_id": user_object_id}, {"_id": 1}):
        raise HTTPException(status_code=409, detail="You have already reviewed this product")
    now = datetime.now(timezone.utc)
    document = {
        "product_id": product_object_id,
        "user_id": user_object_id,
        "user_name": current_user["name"],
        "rating": payload.rating,
        "text": payload.text.strip(),
        "verified_purchase": True,
        "created_at": now,
        "updated_at": now,
    }
    result = await get_database().reviews.insert_one(document)
    document["_id"] = result.inserted_id
    return serialize_review(document)


@router.patch("/{review_id}", response_model=ReviewResponse)
async def update_review(review_id: str, payload: ReviewCreateRequest, current_user: dict = Depends(get_current_user)) -> ReviewResponse:
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=404, detail="Review not found")
    now = datetime.now(timezone.utc)
    result = await get_database().reviews.find_one_and_update(
        {"_id": ObjectId(review_id), "user_id": ObjectId(current_user["id"])},
        {"$set": {"rating": payload.rating, "text": payload.text.strip(), "updated_at": now}},
        return_document=ReturnDocument.AFTER,
    )
    if result is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return serialize_review(result)


@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_review(review_id: str, current_user: dict = Depends(get_current_user)) -> None:
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=404, detail="Review not found")
    result = await get_database().reviews.delete_one({"_id": ObjectId(review_id), "user_id": ObjectId(current_user["id"])})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
