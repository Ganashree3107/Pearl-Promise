from datetime import datetime, timezone
from typing import Any

from app.services.security import hash_otp


def otp_document(*, user_id: Any, purpose: str, channel: str, target: str, otp: str, expires_at: datetime, max_attempts: int) -> dict[str, Any]:
    now = datetime.now(timezone.utc)
    return {
        "user_id": user_id,
        "purpose": purpose,
        "channel": channel,
        "target": target.lower().strip(),
        "otp_hash": hash_otp(otp),
        "expires_at": expires_at,
        "attempts": 0,
        "max_attempts": max_attempts,
        "used_at": None,
        "created_at": now,
    }