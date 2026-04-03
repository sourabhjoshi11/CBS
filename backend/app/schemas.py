from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class OrderCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    occasion: str
    product: str
    message: Optional[str] = None
    delivery_date: str


class OrderResponse(BaseModel):
    id: int
    name: str
    phone: str
    occasion: str
    product: str
    message: Optional[str]
    delivery_date: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    status: str


class ProductCreate(BaseModel):
    name: str
    price: float
    category: str
    image_url: Optional[str] = None
    description: Optional[str] = None
    is_featured: Optional[int] = 0


class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    category: str
    image_url: Optional[str]
    description: Optional[str]
    is_featured: int
    created_at: datetime

    class Config:
        from_attributes = True


class AdminLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
