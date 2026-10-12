from datetime import datetime, timezone
from datetime import timedelta
import hmac

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pymongo.errors import DuplicateKeyError
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token

from app.config.database import get_database
from app.dependencies.auth import get_current_user
from app.models.user import hash_refresh_token, serialize_user, user_document
from app.models.otp import otp_document
from app.schemas.auth import (
    GoogleTokenRequest,
    ForgotPasswordRequest,
    LoginRequest,
    RefreshTokenRequest,
    ResetPasswordRequest,
    SignupRequest,
    TokenResponse,
)
from app.config.settings import settings
from app.services.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    generate_otp,
    hash_otp,
    refresh_token_expiry,
    verify_password,
)
from app.services.email import (
    EmailDeliveryNotConfigured,
    email_is_configured,
    send_email,
    send_login_notification,
    send_welcome_email,
)


router = APIRouter(prefix="/auth", tags=["authentication"])


def _duplicate_key_detail(exc: DuplicateKeyError) -> str:
    key_pattern = (exc.details or {}).get("keyPattern") or {}
    if "phone" in key_pattern:
        return "Phone number is already registered"
    return "Email is already registered"


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(payload: SignupRequest) -> TokenResponse:
    users = get_database().users
    email = str(payload.email).lower()

    if await users.find_one({"email": email}, {"_id": 1}):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email is already registered")

    document = user_document(
        name=payload.name,
        email=email,
        password_hash=hash_password(payload.password),
    )
    try:
        result = await users.insert_one(document)
    except DuplicateKeyError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=_duplicate_key_detail(exc),
        ) from exc

    document["_id"] = result.inserted_id
    await users.update_one({"_id": result.inserted_id}, {"$set": {"email_verified": True}})
    document["email_verified"] = True
    user = serialize_user(document)
    tokens = await issue_tokens(user)
    await send_welcome_email(user=user)
    return tokens


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, request: Request) -> TokenResponse:
    user = await get_database().users.find_one({"email": str(payload.email).lower()})
    if user is None or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    public_user = serialize_user(user)
    tokens = await issue_tokens(public_user)
    await send_login_notification(user=public_user, request=request)
    return tokens


@router.post("/google", response_model=TokenResponse)
async def google_login(payload: GoogleTokenRequest, request: Request) -> TokenResponse:
    if not settings.google_client_id:
        raise HTTPException(status_code=503, detail="Google OAuth is not configured")
    try:
        claims = google_id_token.verify_oauth2_token(
            payload.id_token,
            google_requests.Request(),
            settings.google_client_id,
        )
    except ValueError as exc:
        raise HTTPException(status_code=401, detail="Invalid Google authentication") from exc

    email = claims.get("email")
    name = claims.get("name") or email
    if not email or not claims.get("email_verified"):
        raise HTTPException(status_code=401, detail="Google account email is not verified")
    users = get_database().users
    user = await users.find_one({"email": email.lower()})
    if user is None:
        document = user_document(name=name, email=email, password_hash=hash_password(create_refresh_token()))
        document["profile_picture"] = claims.get("picture")
        document["email_verified"] = True
        result = await users.insert_one(document)
        document["_id"] = result.inserted_id
        user = document
    elif not user.get("email_verified", False):
        await users.update_one(
            {"_id": user["_id"]},
            {"$set": {"email_verified": True, "updated_at": datetime.now(timezone.utc)}},
        )
        user["email_verified"] = True
    public_user = serialize_user(user)
    tokens = await issue_tokens(public_user)
    await send_login_notification(user=public_user, request=request)
    return tokens


async def issue_tokens(user: dict) -> TokenResponse:
    refresh_token = create_refresh_token()
    stored_user = await get_database().users.find_one(
        {"_id": ObjectId(user["id"])}, {"token_version": 1}
    )
    token_version = stored_user.get("token_version", 0) if stored_user else 0
    await get_database().users.update_one(
        {"_id": ObjectId(user["id"])},
        {
            "$set": {
                "refresh_token_hash": hash_refresh_token(refresh_token),
                "refresh_token_expires_at": refresh_token_expiry(),
            }
        },
    )
    return TokenResponse(
        access_token=create_access_token(user["id"], token_version),
        refresh_token=refresh_token,
        user=user,
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh(payload: RefreshTokenRequest) -> TokenResponse:
    now = datetime.now(timezone.utc)
    user = await get_database().users.find_one(
        {
            "refresh_token_hash": hash_refresh_token(payload.refresh_token),
            "refresh_token_expires_at": {"$gt": now},
        }
    )
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")

    return await issue_tokens(serialize_user(user))


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(current_user: dict = Depends(get_current_user)) -> None:
    await get_database().users.update_one(
        {"_id": ObjectId(current_user["id"])},
        {
            "$set": {"refresh_token_hash": None, "refresh_token_expires_at": None},
            "$inc": {"token_version": 1},
        },
    )


@router.post("/forgot-password", status_code=status.HTTP_202_ACCEPTED)
async def forgot_password(payload: ForgotPasswordRequest) -> dict[str, str]:
    generic_message = "If an account exists with this email, a reset code has been sent"
    if not email_is_configured():
        raise HTTPException(
            status_code=503,
            detail="Email delivery is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD, and EMAIL_FROM in Backend/.env.",
        )
    user = await get_database().users.find_one({"email": str(payload.email).lower()})
    if user is None:
        return {"message": generic_message}

    otp = generate_otp()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.otp_expire_minutes)
    otps = get_database().otps
    await otps.update_many(
        {"user_id": user["_id"], "purpose": "password_reset", "used_at": None},
        {"$set": {"used_at": datetime.now(timezone.utc)}},
    )
    await otps.insert_one(
        otp_document(
            user_id=user["_id"],
            purpose="password_reset",
            channel="email",
            target=user["email"],
            otp=otp,
            expires_at=expires_at,
            max_attempts=settings.otp_max_attempts,
        )
    )
    try:
        await send_email(
            recipient=user["email"],
            subject="Reset your Pearl Promise password",
            body=f"Hello {user['name']},\n\nYour Pearl Promise password reset code is {otp}. It expires in {settings.otp_expire_minutes} minutes.\n\nIf you did not request this, you can ignore this email.",
        )
    except EmailDeliveryNotConfigured as exc:
        await otps.delete_many({"user_id": user["_id"], "purpose": "password_reset", "used_at": None})
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        await otps.delete_many({"user_id": user["_id"], "purpose": "password_reset", "used_at": None})
        raise HTTPException(status_code=502, detail="Unable to send password reset email") from exc
    return {"message": generic_message}


@router.post("/reset-password")
async def reset_password(payload: ResetPasswordRequest) -> dict[str, str]:
    email = str(payload.email).lower()
    user = await get_database().users.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid or expired reset code")

    now = datetime.now(timezone.utc)
    otp_record = await get_database().otps.find_one(
        {
            "user_id": user["_id"],
            "purpose": "password_reset",
            "used_at": None,
            "expires_at": {"$gt": now},
        }
    )
    if otp_record is None or otp_record["attempts"] >= otp_record["max_attempts"]:
        raise HTTPException(status_code=400, detail="Invalid or expired reset code")
    if not hmac.compare_digest(otp_record["otp_hash"], hash_otp(payload.otp)):
        next_attempts = otp_record["attempts"] + 1
        update = {"$inc": {"attempts": 1}}
        if next_attempts >= otp_record["max_attempts"]:
            update["$set"] = {"used_at": now}
        await get_database().otps.update_one({"_id": otp_record["_id"], "used_at": None}, update)
        raise HTTPException(status_code=400, detail="Invalid or expired reset code")

    await get_database().users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "password_hash": hash_password(payload.password),
                "refresh_token_hash": None,
                "refresh_token_expires_at": None,
                "updated_at": now,
            },
            "$inc": {"token_version": 1},
        },
    )
    await get_database().otps.update_one(
        {"_id": otp_record["_id"], "used_at": None},
        {"$set": {"used_at": now}},
    )
    return {"message": "Password reset successfully"}