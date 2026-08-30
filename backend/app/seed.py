"""products.csv + asset/ -> Postgres. Upserts by SKU, so it is safe to re-run
after editing names.

    ./.venv/bin/python -m app.seed
"""
import argparse
import csv
from pathlib import Path

from sqlalchemy import select

from .assets import scan
from .config import settings
from .db import Base, SessionLocal, engine
from .models import Product


def media_paths(sku: str, has_detail: bool) -> dict[str, str | None]:
    """Relative paths served by StaticFiles -- never image bytes."""
    return {
        "thumb_url": f"/media/{sku}/thumb.webp",
        "image_url": f"/media/{sku}/full.webp",
        "detail_url": f"/media/{sku}/detail.webp" if has_detail else None,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", type=Path, default=Path(__file__).resolve().parents[1] / "products.csv")
    args = ap.parse_args()

    Base.metadata.create_all(bind=engine)

    meta: dict[str, dict] = {}
    if args.csv.exists():
        with args.csv.open(newline="", encoding="utf-8") as fh:
            meta = {r["sku"]: r for r in csv.DictReader(fh)}
    else:
        print(f"no {args.csv}; falling back to SKU as name")

    created = updated = 0
    with SessionLocal() as db:
        for pa in scan():
            row = meta.get(pa.sku, {})
            values = {
                "name": row.get("name") or pa.sku,
                "description": row.get("description", "") or "",
                "price_cents": int(row.get("price_cents") or 0),
                **media_paths(pa.sku, pa.detail_source is not None),
            }

            product = db.scalar(select(Product).where(Product.sku == pa.sku))
            if product is None:
                db.add(Product(sku=pa.sku, **values))
                created += 1
            else:
                for k, v in values.items():
                    setattr(product, k, v)
                updated += 1
        db.commit()

    print(f"created {created}, updated {updated}")


if __name__ == "__main__":
    main()
