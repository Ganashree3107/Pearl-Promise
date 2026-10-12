from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ProductResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    slug: str
    name: str
    category: str
    images: list[str] = []
    price: float = Field(ge=0)
    original_price: float | None = Field(default=None, ge=0)
    badge: str | None = None
    rating: float = Field(default=0, ge=0, le=5)
    reviews: int = Field(default=0, ge=0)
    size: str | None = None
    description: str = ""
    skin_type: list[str] = []
    concern: list[str] = []
    ingredients: list[str] = []
    benefits: list[str] = []
    how_to_use: str | None = None
    show_on_home: bool = False
    bg_color: str | None = None
    stock: int = Field(default=0, ge=0)
    active: bool = True
    created_at: datetime | None = None
    updated_at: datetime | None = None


class ProductCreateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    slug: str = Field(min_length=2, max_length=160)
    name: str = Field(min_length=2, max_length=200)
    category: str = Field(min_length=2, max_length=80)
    images: list[str] = []
    price: float = Field(ge=0)
    original_price: float | None = Field(default=None, ge=0)
    badge: str | None = Field(default=None, max_length=50)
    size: str | None = Field(default=None, max_length=50)
    description: str = Field(default="", max_length=5000)
    skin_type: list[str] = []
    concern: list[str] = []
    ingredients: list[str] = []
    benefits: list[str] = []
    how_to_use: str | None = Field(default=None, max_length=2000)
    show_on_home: bool = False
    bg_color: str | None = Field(default=None, max_length=30)
    stock: int = Field(default=0, ge=0)
    active: bool = True

    @field_validator("slug")
    @classmethod
    def normalize_slug(cls, value: str) -> str:
        return value.strip().lower()


class ProductListResponse(BaseModel):
    items: list[ProductResponse]
    page: int
    page_size: int
    total: int
    pages: int


class CategoryResponse(BaseModel):
    slug: str
    name: str
    product_count: int
    active: bool = True
