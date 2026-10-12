from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class ShippingAddressRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=5, max_length=30)
    email: str | None = None
    address: str = Field(min_length=2, max_length=300)
    city: str = Field(min_length=2, max_length=100)
    state: str = Field(min_length=2, max_length=100)
    pincode: str = Field(min_length=3, max_length=20)


class OrderCreateRequest(BaseModel):
    shipping_address: ShippingAddressRequest
    delivery_method: Literal["standard", "express"] = "standard"
    payment_method: Literal["cod", "upi", "card"] = "cod"
    idempotency_key: str | None = Field(default=None, min_length=1, max_length=64)


class OrderItemResponse(BaseModel):
    product_id: str
    name: str
    slug: str
    image: str | None = None
    price: float
    quantity: int
    line_total: float


class OrderResponse(BaseModel):
    id: str
    order_id: str
    items: list[OrderItemResponse]
    shipping_address: ShippingAddressRequest
    delivery_method: str
    subtotal: float
    shipping_fee: float
    total_amount: float
    status: str
    payment_status: str
    payment_method: str
    return_status: str | None = None
    return_reason: str | None = None
    return_comments: str | None = None
    return_requested_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class ReturnRequest(BaseModel):
    reason: str = Field(min_length=2, max_length=100)
    comments: str | None = Field(default=None, max_length=1000)
