from datetime import datetime

from pydantic import BaseModel, Field


class ReviewCreateRequest(BaseModel):
    rating: int = Field(ge=1, le=5)
    text: str = Field(min_length=3, max_length=2000)


class ReviewResponse(BaseModel):
    id: str
    product_id: str
    user_id: str
    user_name: str
    rating: int
    text: str
    verified_purchase: bool
    created_at: datetime
    updated_at: datetime


class ReviewSummaryResponse(BaseModel):
    items: list[ReviewResponse]
    average_rating: float
    review_count: int
