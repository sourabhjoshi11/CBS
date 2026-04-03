from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    occasion = Column(String(50), nullable=False)
    product = Column(String(200), nullable=False)
    message = Column(Text, nullable=True)
    delivery_date = Column(String(20), nullable=False)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class OrderActivity(Base):
    __tablename__ = "order_activities"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, nullable=False, index=True)
    action = Column(String(50), nullable=False)
    note = Column(Text, nullable=True)
    old_status = Column(String(20), nullable=True)
    new_status = Column(String(20), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String(50), nullable=False)
    image_url = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    is_featured = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(200), nullable=False)
