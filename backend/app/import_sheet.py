"""Map the 选款清单 spreadsheet onto products.csv.

Naming rule -- the 分类 column decides the suffix appended to the SKU:

    纯手工欧美成品甲 -> "<SKU> Handcrafted Press-On"
    纯手工日常款     -> "<SKU> Handcrafted"
    anything else    -> "<SKU>"   (DIY打印甲 and others, unchanged)

    ./.venv/bin/python -m app.import_sheet <path-to-xlsx>
"""
import argparse
import csv
from collections import Counter
from pathlib import Path

import openpyxl

from .assets import scan

SHEET = "选款清单"

# 分类 -> suffix appended to the SKU. Categories absent here keep the bare SKU.
CATEGORY_SUFFIX = {
    "纯手工欧美成品甲": "Handcrafted Press-On",
    "纯手工日常款": "Handcrafted",
}

# asset/ folder name -> code as written in the sheet
SKU_ALIASES = {"DH3406": "DX3406"}


def read_sheet(path: Path) -> dict[str, dict]:
    ws = openpyxl.load_workbook(path, data_only=True)[SHEET]
    items: dict[str, dict] = {}
    for row in ws.iter_rows(min_row=3, values_only=True):
        if row[0]:
            code = str(row[0]).strip()
            items[code] = {"name": row[2], "category": row[3], "price": row[4]}
    return items


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("xlsx", type=Path)
    ap.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[1] / "products.csv")
    args = ap.parse_args()

    sheet = read_sheet(args.xlsx)
    rows, counts, unmatched = [], Counter(), []

    for pa in scan():
        code = SKU_ALIASES.get(pa.sku, pa.sku)
        entry = sheet.get(code)

        if entry is None:
            unmatched.append(pa.sku)
            category = None
        else:
            category = str(entry["category"]).strip()

        suffix = CATEGORY_SUFFIX.get(category, "")
        name = f"{pa.sku} {suffix}".strip()
        counts[suffix or "(bare SKU)"] += 1

        rows.append({
            "sku": pa.sku,
            "name": name,
            "price_cents": "0",
            "description": "",
            # whether a detail image exists, so app.seed never needs asset/
            "detail": str(pa.detail_source is not None).lower(),
        })

    with args.out.open("w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=["sku", "name", "price_cents", "description", "detail"])
        w.writeheader()
        w.writerows(rows)

    print(f"{len(rows)} products -> {args.out}")
    for label, n in counts.most_common():
        print(f"  {label:<22} {n:>3}")
    if unmatched:
        print(f"  not in sheet: {unmatched}")


if __name__ == "__main__":
    main()
