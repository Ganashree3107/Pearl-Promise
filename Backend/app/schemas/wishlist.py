from pydantic import BaseModel


class WishlistItemResponse(BaseModel):
    product_id: str
    name: str
    slug: str
    price: float
    image: str | None = None


class WishlistResponse(BaseModel):
    items: list[WishlistItemResponse]
