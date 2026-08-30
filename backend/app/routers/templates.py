import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Template
from ..schemas import PagedResponse, TemplateIn, TemplateOut

router = APIRouter(prefix="/templates", tags=["templates"])


@router.get("", response_model=PagedResponse[TemplateOut])
def list_templates(
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    total = db.scalar(select(func.count()).select_from(Template)) or 0
    rows = db.scalars(
        select(Template).order_by(Template.created_at).limit(limit).offset(offset)
    ).all()
    return {"data": rows, "total": total, "limit": limit, "offset": offset}


@router.get("/{template_id}", response_model=TemplateOut)
def get_template(template_id: uuid.UUID, db: Session = Depends(get_db)):
    template = db.get(Template, template_id)
    if template is None:
        raise HTTPException(status_code=404, detail="Template not found")
    return template


@router.post("", response_model=TemplateOut, status_code=201)
def create_template(payload: TemplateIn, db: Session = Depends(get_db)):
    template = Template(**payload.model_dump())
    db.add(template)
    db.commit()
    return template
