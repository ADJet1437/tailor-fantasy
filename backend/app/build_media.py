"""asset/ -> backend/media/  Resize + convert to WebP. Originals are never modified.

Run on the host (macOS): HEIC decoding uses `sips`, which the Linux container lacks.
    ./.venv/bin/python -m app.build_media
"""
import argparse
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageFile

from .assets import ProductAssets, scan
from .config import settings

# A few source PNGs in asset/ are truncated (e.g. DX3257/WPS拼图5.png);
# salvage whatever decoded rather than dropping the product's image entirely.
ImageFile.LOAD_TRUNCATED_IMAGES = True

THUMB_PX = 400        # square, for the aspect-square grid cards
FULL_WIDTH = 1200     # product view
DETAIL_WIDTH = 1080   # long scroll strip
QUALITY = 80

# WebP refuses dimensions above this.
WEBP_MAX = 16383


def _load(path: Path) -> Image.Image:
    """Open any source image, routing HEIC through sips (Pillow cannot decode it)."""
    if path.suffix.lower() != ".heic":
        return Image.open(path).convert("RGB")

    tmp = Path(tempfile.mkdtemp()) / "conv.jpg"
    subprocess.run(
        ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "95",
         str(path), "--out", str(tmp)],
        check=True, capture_output=True,
    )
    try:
        return Image.open(tmp).convert("RGB")
    finally:
        shutil.rmtree(tmp.parent, ignore_errors=True)


def _save_width(img: Image.Image, out: Path, width: int) -> None:
    w, h = img.size
    if w > width:
        h = max(1, round(h * width / w))
        w = width
    if h > WEBP_MAX:  # extremely tall strips
        w = max(1, round(w * WEBP_MAX / h))
        h = WEBP_MAX
    img.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=4)


def _save_square(img: Image.Image, out: Path, px: int) -> None:
    w, h = img.size
    side = min(w, h)
    # Tall product strips put the product at the top; square images crop centred.
    top = 0 if h > w * 2 else (h - side) // 2
    left = (w - side) // 2
    crop = img.crop((left, top, left + side, top + side))
    crop.resize((px, px), Image.LANCZOS).save(out, "WEBP", quality=QUALITY, method=4)


def _stale(src: Path, out: Path) -> bool:
    return not out.exists() or out.stat().st_mtime < src.stat().st_mtime


def build_one(pa: ProductAssets, media_dir: Path, force: bool = False) -> None:
    dest = media_dir / pa.sku
    dest.mkdir(parents=True, exist_ok=True)

    primary = pa.primary
    thumb, full = dest / "thumb.webp", dest / "full.webp"
    if force or _stale(primary, thumb) or _stale(primary, full):
        img = _load(primary)
        _save_square(img, thumb, THUMB_PX)
        _save_width(img, full, FULL_WIDTH)

    src_detail = pa.detail_source
    if src_detail is not None:
        detail = dest / "detail.webp"
        if force or _stale(src_detail, detail):
            _save_width(_load(src_detail), detail, DETAIL_WIDTH)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true", help="rebuild even if up to date")
    args = ap.parse_args()

    products = scan()
    media_dir = settings.media_dir
    media_dir.mkdir(parents=True, exist_ok=True)

    for i, pa in enumerate(products, 1):
        try:
            build_one(pa, media_dir, force=args.force)
            print(f"[{i:3}/{len(products)}] {pa.sku}")
        except Exception as exc:  # keep going; report at the end
            print(f"[{i:3}/{len(products)}] {pa.sku}  FAILED: {exc}")

    total = sum(f.stat().st_size for f in media_dir.rglob("*.webp"))
    print(f"\n{len(list(media_dir.rglob('*.webp')))} files, {total / 1048576:.1f} MB")


if __name__ == "__main__":
    main()
