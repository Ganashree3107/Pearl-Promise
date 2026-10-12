from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class Address(BaseModel):
    model_config = ConfigDict(extra="ignore")

    full_name: str | None = Field(default=None, max_length=120)
    phone: str | None = Field(default=None, max_length=30)
    house: str | None = Field(default=None, max_length=120)
    street: str | None = Field(default=None, max_length=200)
    landmark: str | None = Field(default=None, max_length=200)
    city: str | None = Field(default=None, max_length=100)
    state: str | None = Field(default=None, max_length=100)
    pincode: str | None = Field(default=None, max_length=20)
    type: str | None = Field(default=None, max_length=30)
    is_default: bool = False


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr | None = None
    email_verified: bool = False
    profile_picture: str | None = None
    phone: str | None = None
    gender: str | None = None
    dob: str | None = None
    address: Address | None = None
    is_admin: bool = False
    created_at: datetime
    updated_at: datetime


class UserUpdateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str | None = Field(default=None, min_length=2, max_length=120)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=30)
    gender: str | None = Field(default=None, max_length=30)
    dob: str | None = Field(default=None, max_length=20)
    address: Address | None = None

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, value: str | None) -> str | None:
        if value is None:
            return value
        value = value.strip()
        if not value:
            raise ValueError("Name is required")
        return value
