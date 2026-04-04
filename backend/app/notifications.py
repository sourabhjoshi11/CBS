import os
import smtplib
from email.message import EmailMessage
from typing import Dict

import requests
from app import config


def _build_order_message(order) -> str:
    lines = [
        "New order received",
        f"Order ID: {order.id}",
        f"Customer: {order.name}",
        f"Phone: {order.phone}",
        f"Occasion: {order.occasion}",
        f"Product: {order.product}",
        f"Delivery Date: {order.delivery_date}",
        f"Message: {order.message or '-'}",
        f"Status: {order.status}",
    ]
    return "\n".join(lines)


def _send_email(subject: str, body: str) -> None:
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_from = os.getenv("SMTP_FROM")
    smtp_to = os.getenv("NOTIFY_EMAIL_TO")
    use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

    if not all([smtp_host, smtp_user, smtp_password, smtp_from, smtp_to]):
        raise RuntimeError("Email notification env vars are incomplete.")

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = smtp_from
    msg["To"] = smtp_to
    msg.set_content(body)

    smtp_client = smtplib.SMTP_SSL if smtp_port == 465 else smtplib.SMTP
    with smtp_client(smtp_host, smtp_port, timeout=20) as server:
        if use_tls and smtp_port != 465:
            server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)


def _send_whatsapp(body: str) -> None:
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_whatsapp = os.getenv("TWILIO_WHATSAPP_FROM")
    to_whatsapp = os.getenv("NOTIFY_WHATSAPP_TO")

    if not all([account_sid, auth_token, from_whatsapp, to_whatsapp]):
        raise RuntimeError("WhatsApp notification env vars are incomplete.")

    url = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json"
    payload = {
        "From": from_whatsapp,  # e.g. whatsapp:+14155238886
        "To": to_whatsapp,      # e.g. whatsapp:+91XXXXXXXXXX
        "Body": body,
    }

    resp = requests.post(url, data=payload, auth=(account_sid, auth_token), timeout=20)
    resp.raise_for_status()


def notify_new_order(order) -> Dict[str, str]:
    """
    Sends owner notifications for a newly placed order.
    Non-blocking design: each channel reports its own result.
    """
    subject = f"New Order #{order.id} - {order.product}"
    body = _build_order_message(order)
    result: Dict[str, str] = {"email": "skipped", "whatsapp": "skipped"}

    if os.getenv("ENABLE_EMAIL_NOTIFICATIONS", "false").lower() == "true":
        try:
            _send_email(subject, body)
            result["email"] = "sent"
        except Exception as exc:
            result["email"] = f"error: {exc}"

    if os.getenv("ENABLE_WHATSAPP_NOTIFICATIONS", "false").lower() == "true":
        try:
            _send_whatsapp(body)
            result["whatsapp"] = "sent"
        except Exception as exc:
            result["whatsapp"] = f"error: {exc}"

    return result
