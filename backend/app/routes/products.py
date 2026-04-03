from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from typing import List, Optional

router = APIRouter()


@router.get("/", response_model=List[schemas.ProductResponse])
def get_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Product)
    if category:
        query = query.filter(models.Product.category == category)
    if search:
        query = query.filter(models.Product.name.ilike(f"%{search}%"))
    if featured is not None:
        query = query.filter(models.Product.is_featured == (1 if featured else 0))
    return query.all()


@router.get("/{product_id}", response_model=schemas.ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/", response_model=schemas.ProductResponse, status_code=201)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
