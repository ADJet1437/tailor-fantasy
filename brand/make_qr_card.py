"""Compose the QR code with a caption for print.

Outputs a PDF (for the printer) and a PNG (for screens) at the same layout.
Kept dark-on-white deliberately: inverted QR codes are unreliable on some
scanners, so the site's dark theme is not used here.

    python brand/make_qr_card.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

QR_SRC = Path("/Users/zijieliang/Downloads/qrcode_tailorfantasy.com.png")
OUT_DIR = Path(__file__).resolve().parent

DPI = 600
CARD_MM = (80, 100)          # a comfortable postcard/table-tent size
HEADING = "Check out our website"
URL = "tailorfantasy.com"

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
INK = (17, 17, 17)
MUTED = (110, 110, 110)


def mm(v: float) -> int:
    return round(v / 25.4 * DPI)


def main() -> None:
    W, H = mm(CARD_MM[0]), mm(CARD_MM[1])
    card = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(card)

    # The source is pure black/white, so NEAREST keeps the module edges razor
    # sharp at any size -- resampling would grey them and hurt scanning.
    qr_px = mm(58)
    qr = Image.open(QR_SRC).convert("RGB").resize((qr_px, qr_px), Image.NEAREST)

    f_head = ImageFont.truetype(BOLD, mm(6.2))
    f_url = ImageFont.truetype(REG, mm(4.0))

    hb = f_head.getbbox(HEADING)
    ub = f_url.getbbox(URL)

    # vertical rhythm: heading, QR, url -- centred as a group
    gap1, gap2 = mm(7), mm(6)
    block_h = (hb[3] - hb[1]) + gap1 + qr_px + gap2 + (ub[3] - ub[1])
    y = (H - block_h) // 2

    d.text(((W - (hb[2] - hb[0])) // 2 - hb[0], y - hb[1]),
           HEADING, font=f_head, fill=INK)
    y += (hb[3] - hb[1]) + gap1

    card.paste(qr, ((W - qr_px) // 2, y))
    y += qr_px + gap2

    d.text(((W - (ub[2] - ub[0])) // 2 - ub[0], y - ub[1]),
           URL, font=f_url, fill=MUTED)

    png = OUT_DIR / "qr-card.png"
    pdf = OUT_DIR / "qr-card.pdf"
    card.save(png, dpi=(DPI, DPI))
    card.save(pdf, "PDF", resolution=DPI)
    print(f"  {png.name}  {png.stat().st_size/1024:.0f} KB   {W}x{H}px @ {DPI}dpi")
    print(f"  {pdf.name}  {pdf.stat().st_size/1024:.0f} KB   {CARD_MM[0]}x{CARD_MM[1]} mm")


if __name__ == "__main__":
    main()
