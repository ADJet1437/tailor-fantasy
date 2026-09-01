import logging
import smtplib
from email.message import EmailMessage

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..config import settings
from ..db import get_db
from ..models import ContactMessage
from ..schemas import ContactIn, ContactOut

log = logging.getLogger(__name__)
router = APIRouter(tags=["contact"])


def _forward(email: str, message: str) -> bool:
    """Email the enquiry on. Returns False if SMTP is unconfigured or fails."""
    if not settings.smtp_host:
        return False

    msg = EmailMessage()
    msg["Subject"] = f"Tailor Fantasy enquiry from {email}"
    msg["From"] = settings.smtp_from or settings.smtp_user or settings.contact_recipient
    msg["To"] = settings.contact_recipient
    # so a reply in the mail client goes back to the customer, not to us
    msg["Reply-To"] = email
    msg.set_content(f"From: {email}\n\n{message}")

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as smtp:
            if settings.smtp_starttls:
                smtp.starttls()
            if settings.smtp_user:
                smtp.login(settings.smtp_user, settings.smtp_password)
            smtp.send_message(msg)
        return True
    except Exception:
        # never fail the request on a mail problem -- the row is already stored
        log.exception("contact: SMTP forward failed")
        return False


@router.post("/contact", response_model=ContactOut, status_code=201)
def submit_contact(payload: ContactIn, db: Session = Depends(get_db)):
    forwarded = _forward(payload.email, payload.message)

    row = ContactMessage(
        email=payload.email,
        message=payload.message,
        forwarded=forwarded,
    )
    db.add(row)
    db.commit()
    return row
