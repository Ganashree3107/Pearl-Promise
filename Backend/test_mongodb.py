import asyncio
import os

from motor.motor_asyncio import AsyncIOMotorClient

async def check_connection():
    uri = os.getenv("MONGODB_URI")

    print("MongoDB URI loaded:", bool(uri))

    client = AsyncIOMotorClient(uri)

    try:
        result = await client.admin.command("ping")
        print("MongoDB connection successful:", result)
    except Exception as e:
        print("MongoDB connection failed:")
        print(type(e).__name__)
        print(e)
    finally:
        client.close()


if __name__ == "__main__":
    from dotenv import load_dotenv

    load_dotenv()
    asyncio.run(check_connection())