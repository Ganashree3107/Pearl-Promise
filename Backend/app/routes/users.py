from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends

from app.config.database import get_database
from app.dependencies.auth import get_current_user
from app.models.user import serialize_user
from app.schemas.user import UserResponse, UserUpdateRequest


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)) -> UserResponse:
    return UserResponse(**current_user)


@router.patch("/me", response_model=UserResponse)
async def update_me(
    updates: UserUpdateRequest,
    current_user: dict = Depends(get_current_user),
) -> UserResponse:
    changes = updates.model_dump(exclude_unset=True)
    if "email" in changes:
        changes["email"] = str(changes["email"]).lower()
        if await get_database().users.find_one(
            {"email": changes["email"], "_id": {"$ne": ObjectId(current_user["id"])}},
            {"_id": 1},
        ):
            from fastapi import HTTPException, status

            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email is already registered")
    if "address" in changes and changes["address"] is not None:
        changes["address"] = changes["address"].model_dump()
    unset: dict[str, str] = {}
    if "phone" in changes and not changes["phone"]:
        unset["phone"] = ""
        changes.pop("phone")
    if changes or unset:
        changes["updated_at"] = datetime.now(timezone.utc)
        update: dict = {"$set": changes}
        if unset:
            update["$unset"] = unset
        await get_database().users.update_one(
            {"_id": ObjectId(current_user["id"])},
            update,
        )

    updated = await get_database().users.find_one({"_id": ObjectId(current_user["id"])})
    return UserResponse(**serialize_user(updated))
