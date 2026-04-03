from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.notifications import notify_new_order
from typing import List

router = APIRouter()


@router.post("/", response_model=schemas.OrderResponse, status_code=201)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    db.add(
        models.OrderActivity(
            order_id=db_order.id,
            action="created",
            note=f"Order created for {db_order.product}",
            old_status=None,
            new_status=db_order.status,
        )
    )
    db.commit()

    notification_result = notify_new_order(db_order)
    db.add(
        models.OrderActivity(
            order_id=db_order.id,
            action="notification",
            note=f"Email: {notification_result.get('email')} | WhatsApp: {notification_result.get('whatsapp')}",
            old_status=None,
            new_status=db_order.status,
        )
    )
    db.commit()
    return db_order


@router.get("/", response_model=List[schemas.OrderResponse])
def get_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    orders = db.query(models.Order).offset(skip).limit(limit).all()
    return orders


@router.get("/{order_id}", response_model=schemas.OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.patch("/{order_id}/status", response_model=schemas.OrderResponse)
def update_order_status(order_id: int, update: schemas.OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    old_status = order.status
    order.status = update.status
    db.commit()
    db.refresh(order)
    db.add(
        models.OrderActivity(
            order_id=order.id,
            action="status_updated",
            note=f"Status changed from {old_status} to {order.status}",
            old_status=old_status,
            new_status=order.status,
        )
    )
    db.commit()
    return order
