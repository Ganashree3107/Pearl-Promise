from datetime import datetime, timedelta, timezone

from app.config.database import get_database


DELIVERY_STATUSES = (
    "Order Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
)
DELIVERY_STATUS_INTERVAL_SECONDS = 3


def delivery_status_at(
    tracking_started_at: datetime,
    now: datetime | None = None,
) -> tuple[str, datetime]:
    current_time = now or datetime.now(timezone.utc)
    if tracking_started_at.tzinfo is None:
        tracking_started_at = tracking_started_at.replace(tzinfo=timezone.utc)
    if current_time.tzinfo is None:
        current_time = current_time.replace(tzinfo=timezone.utc)

    elapsed_seconds = max(
        0,
        (current_time - tracking_started_at).total_seconds(),
    )
    status_index = min(
        int(elapsed_seconds // DELIVERY_STATUS_INTERVAL_SECONDS),
        len(DELIVERY_STATUSES) - 1,
    )
    status_time = tracking_started_at + timedelta(
        seconds=status_index * DELIVERY_STATUS_INTERVAL_SECONDS
    )
    return DELIVERY_STATUSES[status_index], status_time


async def sync_order_tracking(document: dict) -> dict:
    tracking_started_at = document.get("tracking_started_at")
    if tracking_started_at is None:
        return document

    status, status_time = delivery_status_at(tracking_started_at)
    if status == document["status"]:
        return document

    result = await get_database().orders.update_one(
        {
            "_id": document["_id"],
            "tracking_started_at": tracking_started_at,
            "status": document["status"],
        },
        {"$set": {"status": status, "updated_at": status_time}},
    )
    if result.modified_count == 1:
        document["status"] = status
        document["updated_at"] = status_time
        return document

    latest = await get_database().orders.find_one({"_id": document["_id"]})
    return latest or document
