from datetime import datetime, timedelta, timezone
import hmac
import secrets
import hashlib

from jose import JWTError, jwt
from pwdlib import PasswordHash

from app.config.settings import settings


password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)


def generate_otp() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def hash_otp(otp: str) -> str:
    message = b"pearl-promise:otp:" + otp.encode("utf-8")
    return hmac.new(settings.jwt_secret_key.encode("utf-8"), message, hashlib.sha256).hexdigest()


def create_access_token(subject: str, token_version: int = 0) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {"sub": subject, "ver": token_version, "exp": expires_at}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def create_refresh_token() -> str:
    return secrets.token_urlsafe(48)


def refresh_token_expiry() -> datetime:
    return datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days)


def decode_access_token_claims(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )
    except JWTError as exc:
        raise ValueError("Invalid or expired token") from exc

    subject = payload.get("sub")
    if not isinstance(subject, str) or not subject:
        raise ValueError("Token subject is missing")
    token_version = payload.get("ver", 0)
    if not isinstance(token_version, int) or token_version < 0:
        raise ValueError("Token version is invalid")
    return payload


def decode_access_token(token: str) -> str:
    return decode_access_token_claims(token)["sub"]
