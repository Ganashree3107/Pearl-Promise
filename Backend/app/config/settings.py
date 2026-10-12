from functools import lru_cache
from urllib.parse import urlparse

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Put your real MongoDB connection string in Backend/.env.
    mongodb_uri: str = Field(default="mongodb://localhost:27017")
    mongodb_database: str = "pearl_promise"

    # Replace this development value with a long random secret in Backend/.env.
    jwt_secret_key: str = "change-this-development-secret"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    refresh_token_expire_days: int = 30

    frontend_origin: str = "http://localhost:5173"
    app_name: str = "Pearl Promise API"
    environment: str = "development"
    google_client_id: str | None = None
    email_host: str | None = None
    email_port: int = 587
    email_username: str | None = None
    email_password: str | None = None
    email_from: str | None = None
    email_use_tls: bool = True
    otp_expire_minutes: int = 10
    otp_max_attempts: int = 5

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @model_validator(mode="after")
    def validate_production_settings(self):
        if self.environment.strip().lower() not in {"prod", "production"}:
            return self

        secret = self.jwt_secret_key.strip().lower()
        if len(self.jwt_secret_key) < 32 or any(
            marker in secret for marker in ("change-this", "replace-with", "your-")
        ):
            raise ValueError(
                "Production requires a non-placeholder JWT_SECRET_KEY of at least 32 characters"
            )

        mongodb_host = urlparse(self.mongodb_uri).hostname
        if mongodb_host in {None, "localhost", "127.0.0.1", "::1"}:
            raise ValueError("Production requires a remote MONGODB_URI")

        frontend = urlparse(self.frontend_origin)
        if frontend.scheme != "https" or not frontend.hostname or frontend.hostname in {
            "localhost",
            "127.0.0.1",
            "::1",
        }:
            raise ValueError("Production FRONTEND_ORIGIN must be an HTTPS origin")

        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
