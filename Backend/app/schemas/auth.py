# from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator


# class SignupRequest(BaseModel):
#     name: str = Field(min_length=2, max_length=120)
#     email: EmailStr
#     password: str = Field(min_length=8, max_length=128)
#     confirm_password: str = Field(min_length=8, max_length=128)

#     @field_validator("name")
#     @classmethod
#     def name_must_not_be_blank(cls, value: str) -> str:
#         value = value.strip()
#         if not value:
#             raise ValueError("Name is required")
#         return value

#     @model_validator(mode="after")
#     def passwords_must_match(self) -> "SignupRequest":
#         if self.password != self.confirm_password:
#             raise ValueError("Passwords do not match")
#         return self


# class LoginRequest(BaseModel):
#     email: EmailStr
#     password: str = Field(min_length=1, max_length=128)


# class TokenResponse(BaseModel):
#     access_token: str
#     refresh_token: str
#     token_type: str = "bearer"
#     user: "UserResponse"


# class RefreshTokenRequest(BaseModel):
#     refresh_token: str = Field(min_length=20, max_length=512)


# class GoogleTokenRequest(BaseModel):
#     id_token: str = Field(min_length=20, max_length=10000)


# class VerifyEmailRequest(BaseModel):
#     email: EmailStr
#     otp: str = Field(pattern=r"^\d{6}$")


# class ResendEmailVerificationRequest(BaseModel):
#     email: EmailStr


# class ForgotPasswordRequest(BaseModel):
#     email: EmailStr


# class ResetPasswordRequest(BaseModel):
#     email: EmailStr
#     otp: str = Field(pattern=r"^\d{6}$")
#     password: str = Field(min_length=8, max_length=128)
#     confirm_password: str = Field(min_length=8, max_length=128)

#     @model_validator(mode="after")
#     def passwords_must_match(self) -> "ResetPasswordRequest":
#         if self.password != self.confirm_password:
#             raise ValueError("Passwords do not match")
#         return self




# from app.schemas.user import UserResponse
# TokenResponse.model_rebuild()

from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator


class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    confirm_password: str = Field(min_length=8, max_length=128)

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Name is required")
        return value

    @model_validator(mode="after")
    def passwords_must_match(self) -> "SignupRequest":
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: "UserResponse"


class RefreshTokenRequest(BaseModel):
    refresh_token: str = Field(min_length=20, max_length=512)


class GoogleTokenRequest(BaseModel):
    id_token: str = Field(min_length=20, max_length=10000)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str = Field(pattern=r"^\d{6}$")
    password: str = Field(min_length=8, max_length=128)
    confirm_password: str = Field(min_length=8, max_length=128)

    @model_validator(mode="after")
    def passwords_must_match(self) -> "ResetPasswordRequest":
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self




from app.schemas.user import UserResponse
TokenResponse.model_rebuild()