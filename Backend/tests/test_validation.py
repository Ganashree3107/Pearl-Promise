import pytest
from pydantic import ValidationError

from app.schemas.auth import SignupRequest
from app.schemas.order import OrderCreateRequest


def test_signup_requires_matching_passwords() -> None:
    with pytest.raises(ValidationError, match="Passwords do not match"):
        SignupRequest(
            name="Test User",
            email="test@example.com",
            password="password123",
            confirm_password="different123",
        )


def test_signup_rejects_short_password() -> None:
    with pytest.raises(ValidationError):
        SignupRequest(
            name="Test User",
            email="test@example.com",
            password="short",
            confirm_password="short",
        )


def test_order_rejects_unknown_delivery_method() -> None:
    with pytest.raises(ValidationError):
        OrderCreateRequest(
            shipping_address={
                "full_name": "Test Customer",
                "phone": "1234567890",
                "address": "1 Test Street",
                "city": "Test City",
                "state": "Test State",
                "pincode": "12345",
            },
            delivery_method="free-shipping",
            payment_method="cod",
        )


def test_order_accepts_supported_delivery_method_without_client_fee() -> None:
    order = OrderCreateRequest(
        shipping_address={
            "full_name": "Test Customer",
            "phone": "1234567890",
            "address": "1 Test Street",
            "city": "Test City",
            "state": "Test State",
            "pincode": "12345",
        },
        delivery_method="express",
        payment_method="cod",
    )

    assert order.delivery_method == "express"
