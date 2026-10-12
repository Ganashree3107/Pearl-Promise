from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import close_mongodb_connection, connect_to_mongodb
from app.config.settings import settings
from app.routes.auth import router as auth_router
from app.routes.admin import router as admin_router
from app.routes.categories import router as categories_router
from app.routes.cart import router as cart_router
from app.routes.products import router as products_router
from app.routes.orders import router as orders_router
from app.routes.reviews import router as reviews_router
from app.routes.users import router as users_router
from app.routes.wishlist import router as wishlist_router
@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongodb()
    yield
    await close_mongodb_connection()
app = FastAPI(title=settings.app_name, version="1.0.0", lifespan=lifespan)
allowed_origins = {settings.frontend_origin}
if settings.environment.strip().lower() not in {"prod", "production"}:
    allowed_origins.update({"http://localhost:5174", "http://127.0.0.1:5174"})

app.add_middleware(
    CORSMiddleware,
    allow_origins=sorted(allowed_origins),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(products_router)
app.include_router(orders_router)
app.include_router(reviews_router)
app.include_router(categories_router)
app.include_router(cart_router)
app.include_router(wishlist_router)
app.include_router(users_router)
@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
