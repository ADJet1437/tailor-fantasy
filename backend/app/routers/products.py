import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Product
from ..schemas import PagedResponse, ProductOut

router = APIRouter(tags=["products"])


@router.get("/products", response_model=PagedResponse[ProductOut])
def list_products(
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    category: str | None = Query(None, description="press-on | handcraft | diy"),
    db: Session = Depends(get_db),
):
    where = [] if category is None else [Product.category == category]
    total = db.scalar(select(func.count()).select_from(Product).where(*where)) or 0
    rows = db.scalars(
        select(Product).where(*where).order_by(Product.sku).limit(limit).offset(offset)
    ).all()
    return {"data": rows, "total": total, "limit": limit, "offset": offset}


@router.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: uuid.UUID, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
