import pytest
from pydantic import ValidationError

from app.config.settings import Settings


def test_production_rejects_development_defaults() -> None:
    with pytest.raises(ValidationError, match="JWT_SECRET_KEY"):
        Settings(_env_file=None, environment="production")


def test_production_accepts_explicit_secure_configuration() -> None:
    settings = Settings(
        _env_file=None,
        environment="production",
        jwt_secret_key="a" * 40,
        mongodb_uri="mongodb+srv://cluster.example.com/",
        frontend_origin="https://shop.example.com",
    )

    assert settings.environment == "production"


def test_development_keeps_local_defaults(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("MONGODB_URI", raising=False)
    settings = Settings(_env_file=None, environment="development")

    assert settings.mongodb_uri == "mongodb://localhost:27017"