from datetime import datetime, timezone
from typing import Any
import hashlib

from bson import ObjectId


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def user_document(
    *,
    name: str,
    email: str | None,
    password_hash: str,
    phone: str | None = None,
) -> dict[str, Any]:
    now = utc_now()
    document: dict[str, Any] = {
        "name": name,
        "email": email.lower().strip() if email else None,
        "email_verified": False,
        "password_hash": password_hash,
        "profile_picture": None,
        "gender": None,
        "dob": None,
        "address": None,
        "is_admin": False,
        "token_version": 0,
        "refresh_token_hash": None,
        "refresh_token_expires_at": None,
        "created_at": now,
        "updated_at": now,
    }
    # Omit phone unless a real value is provided. MongoDB unique sparse indexes
    # still index explicit null, so storing phone: None blocks every later signup.
    if phone:
        document["phone"] = phone
    return document


def serialize_user(document: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": str(document["_id"] if isinstance(document.get("_id"), ObjectId) else document["_id"]),
        "name": document["name"],
        "email": document["email"],
        "email_verified": document.get("email_verified", False),
        "profile_picture": document.get("profile_picture"),
        "phone": document.get("phone"),
        "gender": document.get("gender"),
        "dob": document.get("dob"),
        "address": document.get("address"),
        "is_admin": document.get("is_admin", False),
        "created_at": document["created_at"],
        "updated_at": document["updated_at"],
    }


def hash_refresh_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()
