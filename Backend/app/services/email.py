# import asyncio
# import logging
# import smtplib
# from email.message import EmailMessage
# from datetime import datetime, timezone

# from fastapi import Request

# from app.config.settings import settings


# logger = logging.getLogger(__name__)


# class EmailDeliveryNotConfigured(RuntimeError):
#     pass


# def email_is_configured() -> bool:
#     return all((settings.email_host, settings.email_username, settings.email_password, settings.email_from))


# async def send_email(*, recipient: str, subject: str, body: str) -> None:
#     if not email_is_configured():
#         raise EmailDeliveryNotConfigured(
#             "Email delivery is not configured. Set EMAIL_HOST, EMAIL_PORT, "
#             "EMAIL_USERNAME, EMAIL_PASSWORD, and EMAIL_FROM in Backend/.env."
#         )

#     await asyncio.to_thread(_send_smtp_email, recipient, subject, body)


# def _send_smtp_email(recipient: str, subject: str, body: str) -> None:
#     message = EmailMessage()
#     message["From"] = settings.email_from
#     message["To"] = recipient
#     message["Subject"] = subject
#     message.set_content(body)

#     if settings.email_use_tls:
#         with smtplib.SMTP(settings.email_host, settings.email_port, timeout=15) as server:
#             server.starttls()
#             server.login(settings.email_username, settings.email_password)
#             server.send_message(message)
#     else:
#         with smtplib.SMTP_SSL(settings.email_host, settings.email_port, timeout=15) as server:
#             server.login(settings.email_username, settings.email_password)
#             server.send_message(message)


# async def send_login_notification(*, user: dict, request: Request | None = None) -> None:
#     """Best-effort notification; authentication must not depend on email delivery."""
#     email = user.get("email")
#     if not email or not email_is_configured():
#         return

#     client_host = request.client.host if request and request.client else "unknown"
#     user_agent = request.headers.get("user-agent", "unknown") if request else "unknown"
#     login_time = datetime.now(timezone.utc).isoformat()
#     body = (
#         f"Hello {user.get('name', 'Pearl Promise user')},\n\n"
#         "A login to your Pearl Promise account was completed.\n\n"
#         f"Time (UTC): {login_time}\n"
#         f"IP address: {client_host}\n"
#         f"Browser/device: {user_agent}\n\n"
#         "If this was not you, reset your password and contact support.\n"
#     )
#     try:
#         await send_email(
#             recipient=email,
#             subject="New Pearl Promise login",
#             body=body,
#         )
#     except Exception:
#         logger.exception("Unable to send login notification email")


# async def send_order_placed_notification(*, user: dict, order: dict) -> None:
#     """Send an order confirmation without making order creation depend on email."""
#     await _send_order_notification(
#         user=user,
#         order=order,
#         subject=f"Pearl Promise order {order['order_id']} placed",
#         heading="Your Pearl Promise order has been placed.",
#     )


# async def send_order_delivered_notification(*, user: dict, order: dict) -> None:
#     """Send a delivery confirmation without requiring an OTP."""
#     await _send_order_notification(
#         user=user,
#         order=order,
#         subject=f"Pearl Promise order {order['order_id']} delivered",
#         heading="Your Pearl Promise order has been delivered.",
#     )


# async def _send_order_notification(*, user: dict, order: dict, subject: str, heading: str) -> None:
#     email = user.get("email")
#     if not email or not email_is_configured():
#         return

#     items = "\n".join(
#         f"- {item['name']} x {item['quantity']}"
#         for item in order.get("items", [])
#     )
#     body = (
#         f"Hello {user.get('name', 'Pearl Promise user')},\n\n"
#         f"{heading}\n\n"
#         f"Order ID: {order['order_id']}\n"
#         f"Items:\n{items}\n\n"
#         f"Total: INR {order['total_amount']:.2f}\n\n"
#         "Thank you for choosing Pearl Promise.\n"
#     )
#     try:
#         await send_email(recipient=email, subject=subject, body=body)
#     except Exception:
#         logger.exception("Unable to send order notification email")

import asyncio
import logging
import smtplib
from email.message import EmailMessage
from datetime import datetime, timezone

from fastapi import Request

from app.config.settings import settings


logger = logging.getLogger(__name__)


class EmailDeliveryNotConfigured(RuntimeError):
    pass


def email_is_configured() -> bool:
    return all((settings.email_host, settings.email_username, settings.email_password, settings.email_from))


async def send_email(*, recipient: str, subject: str, body: str) -> None:
    if not email_is_configured():
        raise EmailDeliveryNotConfigured(
            "Email delivery is not configured. Set EMAIL_HOST, EMAIL_PORT, "
            "EMAIL_USERNAME, EMAIL_PASSWORD, and EMAIL_FROM in Backend/.env."
        )

    await asyncio.to_thread(_send_smtp_email, recipient, subject, body)


def _send_smtp_email(recipient: str, subject: str, body: str) -> None:
    message = EmailMessage()
    message["From"] = settings.email_from
    message["To"] = recipient
    message["Subject"] = subject
    message.set_content(body)

    if settings.email_use_tls:
        with smtplib.SMTP(settings.email_host, settings.email_port, timeout=15) as server:
            server.starttls()
            server.login(settings.email_username, settings.email_password)
            server.send_message(message)
    else:
        with smtplib.SMTP_SSL(settings.email_host, settings.email_port, timeout=15) as server:
            server.login(settings.email_username, settings.email_password)
            server.send_message(message)


async def send_welcome_email(*, user: dict) -> None:
    """Best-effort welcome email for brand-new signups; signup must not depend on email delivery."""
    email = user.get("email")
    if not email or not email_is_configured():
        return

    body = (
        f"Hello {user.get('name', 'Pearl Promise user')},\n\n"
        "Welcome to Pearl Promise! We're delighted to have you with us.\n\n"
        "Start exploring our collection and enjoy your shopping experience.\n\n"
        "Thank you for joining us.\n"
    )
    try:
        await send_email(
            recipient=email,
            subject="Welcome to Pearl Promise!",
            body=body,
        )
    except Exception:
        logger.exception("Unable to send welcome email")


async def send_login_notification(*, user: dict, request: Request | None = None) -> None:
    """Best-effort 'welcome back' notification; authentication must not depend on email delivery."""
    email = user.get("email")
    if not email or not email_is_configured():
        return

    body = (
        f"Hello {user.get('name', 'Pearl Promise user')},\n\n"
        "Welcome back to Pearl Promise! We're glad to see you again.\n\n"
        "If this wasn't you, please reset your password and contact support.\n"
    )
    try:
        await send_email(
            recipient=email,
            subject="Welcome back to Pearl Promise",
            body=body,
        )
    except Exception:
        logger.exception("Unable to send login notification email")


async def send_order_placed_notification(*, user: dict, order: dict) -> None:
    """Send an order confirmation without making order creation depend on email."""
    await _send_order_notification(
        user=user,
        order=order,
        subject=f"Pearl Promise order {order['order_id']} placed",
        heading="Your Pearl Promise order has been placed.",
    )


async def send_order_delivered_notification(*, user: dict, order: dict) -> None:
    """Send a delivery confirmation without requiring an OTP."""
    await _send_order_notification(
        user=user,
        order=order,
        subject=f"Pearl Promise order {order['order_id']} delivered",
        heading="Your Pearl Promise order has been delivered.",
    )


async def _send_order_notification(*, user: dict, order: dict, subject: str, heading: str) -> None:
    email = user.get("email")
    if not email or not email_is_configured():
        return

    items = "\n".join(
        f"- {item['name']} x {item['quantity']}"
        for item in order.get("items", [])
    )
    body = (
        f"Hello {user.get('name', 'Pearl Promise user')},\n\n"
        f"{heading}\n\n"
        f"Order ID: {order['order_id']}\n"
        f"Items:\n{items}\n\n"
        f"Total: INR {order['total_amount']:.2f}\n\n"
        "Thank you for choosing Pearl Promise.\n"
    )
    try:
        await send_email(recipient=email, subject=subject, body=body)
    except Exception:
        logger.exception("Unable to send order notification email")