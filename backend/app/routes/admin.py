import os

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
import hashlib
import secrets

router = APIRouter()
active_tokens = set()


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def get_admin_credentials() -> tuple[str, str]:
    username = os.getenv("ADMIN_USERNAME")
    password = os.getenv("ADMIN_PASSWORD")
    if not username or not password:
        raise HTTPException(
            status_code=500,
            detail="Admin credentials are not configured on server.",
        )
    return username, hash_password(password)


def verify_token(token: str) -> bool:
    return token in active_tokens


@router.post("/login", response_model=schemas.Token)
def admin_login(credentials: schemas.AdminLogin):
    admin_username, admin_password_hash = get_admin_credentials()
    if (credentials.username == admin_username and
            hash_password(credentials.password) == admin_password_hash):
        token = secrets.token_hex(32)
        active_tokens.add(token)
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/logout")
def admin_logout(token: str):
    active_tokens.discard(token)
    return {"message": "Logged out successfully"}


@router.get("/dashboard")
def get_dashboard(token: str, db: Session = Depends(get_db)):
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    total_orders = db.query(models.Order).count()
    pending = db.query(models.Order).filter(models.Order.status == "pending").count()
    confirmed = db.query(models.Order).filter(models.Order.status == "confirmed").count()
    completed = db.query(models.Order).filter(models.Order.status == "completed").count()
    cancelled = db.query(models.Order).filter(models.Order.status == "cancelled").count()
    all_orders = db.query(models.Order).order_by(models.Order.created_at.desc()).all()
    recent_activities = (
        db.query(models.OrderActivity)
        .order_by(models.OrderActivity.created_at.desc())
        .limit(100)
        .all()
    )
    return {
        "stats": {
            "total_orders": total_orders,
            "pending": pending,
            "confirmed": confirmed,
            "completed": completed,
            "cancelled": cancelled,
        },
        "all_orders": all_orders,
        "recent_activities": recent_activities,
    }
