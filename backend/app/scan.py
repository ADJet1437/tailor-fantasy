"""asset/ -> products.csv, the editable metadata sheet.

    ./.venv/bin/python -m app.scan

`name` is pre-filled with the SKU because asset/ contains no product names at all
(no csv/xlsx/json/txt -- only images). Type real names in, then re-run app.seed,
which upserts by SKU. Existing rows in the CSV are preserved on re-scan.
"""
import argparse
import csv
from pathlib import Path

from .assets import scan
from .config import settings

FIELDS = ["sku", "name", "price_cents", "description", "detail"]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", type=Path, default=settings.asset_dir.parent / "backend" / "products.csv")
    args = ap.parse_args()

    # Preserve anything already typed in.
    existing: dict[str, dict] = {}
    if args.out.exists():
        with args.out.open(newline="", encoding="utf-8") as fh:
            existing = {r["sku"]: r for r in csv.DictReader(fh)}

    products = scan()
    rows = []
    for pa in products:
        prev = existing.get(pa.sku, {})
        rows.append({
            "sku": pa.sku,
            "name": prev.get("name") or pa.sku,
            "price_cents": prev.get("price_cents") or "0",
            "description": prev.get("description", ""),
            # whether a detail image exists, so app.seed never needs asset/
            "detail": str(pa.detail_source is not None).lower(),
        })
        if pa.sku_mismatches:
            print(f"  WARNING {pa.sku}: filenames carry a different code: {pa.sku_mismatches}")

    with args.out.open("w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(rows)

    kept = sum(1 for r in rows if r["sku"] in existing)
    print(f"wrote {len(rows)} rows to {args.out} ({kept} preserved from previous edits)")


if __name__ == "__main__":
    main()
