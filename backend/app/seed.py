"""products.csv -> Postgres. Upserts by SKU, so it is safe to re-run.

Deliberately does NOT read asset/: that directory is 811 MB, stays out of git,
and never exists on the server. Everything needed lives in products.csv, so this
runs anywhere the image runs:

    docker compose -f docker-compose-prod.yaml run --rm tailorfantasy python -m app.seed
"""
import argparse
import csv
from pathlib import Path

from sqlalchemy import select

from .db import Base, SessionLocal, engine
from .models import Product

DEFAULT_CSV = Path(__file__).resolve().parent.parent / "products.csv"


def media_paths(sku: str, has_detail: bool) -> dict[str, str | None]:
    """Relative paths served by StaticFiles -- never image bytes."""
    return {
        "thumb_url": f"/media/{sku}/thumb.webp",
        "image_url": f"/media/{sku}/full.webp",
        "detail_url": f"/media/{sku}/detail.webp" if has_detail else None,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", type=Path, default=DEFAULT_CSV)
    args = ap.parse_args()

    if not args.csv.exists():
        raise SystemExit(f"missing {args.csv} -- generate it with app.scan or app.import_sheet")

    with args.csv.open(newline="", encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))
    if not rows:
        raise SystemExit(f"{args.csv} has no rows")

    Base.metadata.create_all(bind=engine)

    created = updated = 0
    with SessionLocal() as db:
        for row in rows:
            sku = row["sku"].strip()
            values = {
                "name": row.get("name") or sku,
                "description": row.get("description") or "",
                "price_cents": int(row.get("price_cents") or 0),
                # "detail" records whether this SKU has a detail image, so seeding
                # needs no access to asset/.
                **media_paths(sku, str(row.get("detail", "")).strip().lower() == "true"),
            }

            product = db.scalar(select(Product).where(Product.sku == sku))
            if product is None:
                db.add(Product(sku=sku, **values))
                created += 1
            else:
                for k, v in values.items():
                    setattr(product, k, v)
                updated += 1
        db.commit()

    print(f"created {created}, updated {updated} (from {args.csv})")


if __name__ == "__main__":
    main()
