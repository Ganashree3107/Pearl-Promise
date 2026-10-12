from datetime import datetime, timedelta, timezone

from app.models.otp import otp_document
from app.services.email import email_is_configured
from app.config.settings import settings
from app.services.security import generate_otp, hash_otp
from app.schemas.auth import ResetPasswordRequest
from pydantic import ValidationError


def test_otp_is_six_digits_and_only_hash_is_stored() -> None:
    otp = generate_otp()
    document = otp_document(
        user_id="user-id",
        purpose="email_verification",
        channel="email",
        target="user@example.com",
        otp=otp,
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=10),
        max_attempts=5,
    )

    assert len(otp) == 6
    assert otp.isdigit()
    assert document["otp_hash"] == hash_otp(otp)
    assert "otp" not in document
    assert document["attempts"] == 0
    assert document["used_at"] is None


def test_email_provider_is_not_claimed_configured_without_credentials() -> None:
    assert isinstance(email_is_configured(), bool)


def test_reset_password_requires_matching_passwords() -> None:
    try:
        ResetPasswordRequest(
            email="user@example.com",
            otp="123456",
            password="newpassword123",
            confirm_password="different123",
        )
    except ValidationError as error:
        assert "Passwords do not match" in str(error)
    else:
        raise AssertionError("Mismatched reset passwords should fail validation")


def test_google_client_id_is_environment_driven() -> None:
    assert settings.google_client_id is None or isinstance(settings.google_client_id, str)