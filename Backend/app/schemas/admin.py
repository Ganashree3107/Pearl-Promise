from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class OrderStatusUpdateRequest(BaseModel):
    status: Literal["Order Placed", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]


class AdminOrderSummary(BaseModel):
    id: str
    order_id: str
    user_id: str
    total_amount: float
    status: str
    payment_status: str
    created_at: datetime


class AdminUserSummary(BaseModel):
    id: str
    name: str
    email: str
    is_admin: bool
    created_at: datetime
