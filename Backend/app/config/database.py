from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.config.settings import settings

class MongoDatabase:
    client: AsyncIOMotorClient | None = None
    database: AsyncIOMotorDatabase | None = None

database = MongoDatabase()

async def connect_to_mongodb() -> None:
    database.client = AsyncIOMotorClient(settings.mongodb_uri)
    database.database = database.client[settings.mongodb_database]
    await database.client.admin.command("ping")
    await database.database.users.create_index("email", unique=True)
    await database.database.users.create_index("phone", unique=True, sparse=True)
    await database.database.products.create_index("slug", unique=True)
    await database.database.carts.create_index("user_id", unique=True)
    await database.database.wishlists.create_index("user_id", unique=True)
    await database.database.reviews.create_index([("product_id", 1), ("user_id", 1)], unique=True)
    await database.database.orders.create_index([("user_id", 1), ("created_at", -1)])
    await database.database.orders.create_index(
        [("user_id", 1), ("idempotency_key", 1)],
        unique=True,
        partialFilterExpression={"idempotency_key": {"$type": "string"}},
    )
    await database.database.otps.create_index("expires_at", expireAfterSeconds=0)
    await database.database.otps.create_index([("user_id", 1), ("purpose", 1), ("used_at", 1)])


async def close_mongodb_connection() -> None:
    if database.client is not None:
        database.client.close()
        database.client = None
        database.database = None


def get_database() -> AsyncIOMotorDatabase:
    if database.database is None:
        raise RuntimeError("MongoDB is not connected")
    return database.database
