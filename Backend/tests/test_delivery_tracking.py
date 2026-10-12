from datetime import datetime, timedelta, timezone

import pytest

from app.services.delivery_tracking import delivery_status_at


@pytest.mark.parametrize(
    ("elapsed_seconds", "expected_status"),
    [
        (0, "Order Placed"),
        (2.999, "Order Placed"),
        (3, "Confirmed"),
        (6, "Packed"),
        (9, "Shipped"),
        (12, "Out for Delivery"),
        (15, "Delivered"),
        (60, "Delivered"),
    ],
)
def test_delivery_status_advances_every_three_seconds(
    elapsed_seconds: float,
    expected_status: str,
) -> None:
    started_at = datetime(2026, 10, 12, tzinfo=timezone.utc)

    status, _ = delivery_status_at(
        started_at,
        now=started_at + timedelta(seconds=elapsed_seconds),
    )

    assert status == expected_status


def test_delivery_status_handles_naive_mongodb_datetimes() -> None:
    started_at = datetime(2026, 10, 12)

    status, _ = delivery_status_at(
        started_at,
        now=started_at + timedelta(seconds=3),
    )

    assert status == "Confirmed"
