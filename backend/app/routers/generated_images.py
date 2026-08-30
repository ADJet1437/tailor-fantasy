import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import GeneratedImage
from ..schemas import GeneratedImageIn, GeneratedImageOut, PagedResponse

router = APIRouter(prefix="/generated-images", tags=["generated-images"])


@router.get("", response_model=PagedResponse[GeneratedImageOut])
def list_generated_images(
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    total = db.scalar(select(func.count()).select_from(GeneratedImage)) or 0
    rows = db.scalars(
        select(GeneratedImage)
        .order_by(GeneratedImage.created_at.desc())
        .limit(limit)
        .offset(offset)
    ).all()
    return {"data": rows, "total": total, "limit": limit, "offset": offset}


@router.get("/{image_id}", response_model=GeneratedImageOut)
def get_generated_image(image_id: uuid.UUID, db: Session = Depends(get_db)):
    image = db.get(GeneratedImage, image_id)
    if image is None:
        raise HTTPException(status_code=404, detail="Generated image not found")
    return image


@router.post("", response_model=GeneratedImageOut, status_code=201)
def create_generated_image(payload: GeneratedImageIn, db: Session = Depends(get_db)):
    image = GeneratedImage(**payload.model_dump())
    db.add(image)
    db.commit()
    return image
