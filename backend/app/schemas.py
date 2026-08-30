import uuid
from datetime import datetime
from typing import Generic, TypeVar

from typing import Any

from pydantic import BaseModel, ConfigDict, computed_field

T = TypeVar("T")


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    sku: str
    name: str
    description: str
    image_url: str
    thumb_url: str
    detail_url: str | None
    created_at: datetime
    updated_at: datetime

    # Exposed as `price` (integer cents) to match the Product interface the
    # frontend already uses in src/services/api.ts.
    price_cents: int

    @computed_field
    @property
    def price(self) -> int:
        return self.price_cents


class TemplateIn(BaseModel):
    name: str
    image_url: str
    description: str = ""


class TemplateOut(TemplateIn):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class GeneratedImageIn(BaseModel):
    user_id: int = 1
    image_data: dict[str, Any] = {}


class GeneratedImageOut(GeneratedImageIn):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime


class PagedResponse(BaseModel, Generic[T]):
    data: list[T]
    total: int
    limit: int
    offset: int
