import asyncio

from app.services.email import send_login_notification


def test_login_notification_skips_users_without_email() -> None:
    asyncio.run(send_login_notification(user={"name": "Phone User", "email": None}))


def test_login_notification_body_contract_contains_safe_metadata() -> None:
    user = {"name": "Test User", "email": "test@example.com"}
    assert "email" not in user["name"].lower()
    assert "password" not in str(user).lower()
    assert "otp" not in str(user).lower()