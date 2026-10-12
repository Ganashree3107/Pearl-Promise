from app.services.security import (
    create_access_token,
    decode_access_token,
    decode_access_token_claims,
    hash_otp,
    hash_password,
    verify_password,
)
from app.config.settings import settings


def test_passwords_are_hashed_and_verified() -> None:
    password = "correct horse battery staple"
    hashed = hash_password(password)

    assert hashed != password
    assert verify_password(password, hashed)
    assert not verify_password("wrong password", hashed)


def test_jwt_round_trip_contains_user_subject() -> None:
    token = create_access_token("507f1f77bcf86cd799439011")

    assert decode_access_token(token) == "507f1f77bcf86cd799439011"


def test_otp_hash_depends_on_server_secret_and_otp(monkeypatch) -> None:
    monkeypatch.setattr(settings, "jwt_secret_key", "first-test-secret")
    first_hash = hash_otp("000001")

    monkeypatch.setattr(settings, "jwt_secret_key", "second-test-secret")
    assert hash_otp("000001") != first_hash
    assert hash_otp("000002") != hash_otp("000001")


def test_access_token_carries_revocation_version() -> None:
    token = create_access_token("507f1f77bcf86cd799439011", token_version=4)

    assert decode_access_token_claims(token)["ver"] == 4
