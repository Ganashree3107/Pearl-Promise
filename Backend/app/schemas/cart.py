from pydantic import BaseModel, Field


class CartItemRequest(BaseModel):
    product_id: str = Field(min_length=1, max_length=100)
    quantity: int = Field(ge=1, le=100)


class CartItemResponse(BaseModel):
    product_id: str
    quantity: int
    name: str
    slug: str
    price: float
    original_price: float | None = None
    image: str | None = None
    stock: int
    line_total: float


class CartResponse(BaseModel):
    items: list[CartItemResponse]
    subtotal: float
    total: float
