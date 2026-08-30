"""Shared scanning of asset/ -- one folder per product, filenames carry the role."""
import re
from dataclasses import dataclass, field
from pathlib import Path

from .config import settings

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".heic"}

_MAIN = "主图"        # main image
_DETAIL = "详情图"  # detail image
_COLLAGE = "WPS拼图"    # WPS collage


def classify(filename: str) -> str:
    if _MAIN in filename:
        return "main"
    if _DETAIL in filename or filename.startswith(_COLLAGE):
        return "detail"
    return "gallery"


@dataclass
class ProductAssets:
    sku: str
    folder: Path
    main: list[Path] = field(default_factory=list)
    detail: list[Path] = field(default_factory=list)
    gallery: list[Path] = field(default_factory=list)

    @property
    def primary(self) -> Path:
        """Fallback chain -- verified to resolve for all 108 folders."""
        for group in (self.main, self.gallery, self.detail):
            if group:
                return group[0]
        raise ValueError(f"{self.sku}: no usable image")

    @property
    def detail_source(self) -> Path | None:
        return self.detail[0] if self.detail else None

    @property
    def sku_mismatches(self) -> list[str]:
        """Files whose embedded code disagrees with their folder (e.g. YMDY-013)."""
        out = []
        for p in self.main + self.detail + self.gallery:
            m = re.match(r"^(YMDY-\d+)", p.name)
            if m and m.group(1) != self.sku:
                out.append(p.name)
        return out


def scan(asset_dir: Path | None = None) -> list[ProductAssets]:
    asset_dir = asset_dir or settings.asset_dir
    if not asset_dir.is_dir():
        raise FileNotFoundError(f"asset dir not found: {asset_dir}")

    products: list[ProductAssets] = []
    for folder in sorted(p for p in asset_dir.iterdir() if p.is_dir()):
        pa = ProductAssets(sku=folder.name, folder=folder)
        for f in sorted(folder.iterdir()):
            if not f.is_file() or f.suffix.lower() not in IMAGE_SUFFIXES:
                continue
            getattr(pa, classify(f.name)).append(f)
        if pa.main or pa.detail or pa.gallery:
            products.append(pa)
    return products
