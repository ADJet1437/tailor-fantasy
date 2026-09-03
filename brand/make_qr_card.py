"""Compose the QR code with a caption for print.

Outputs a PDF (for the printer) and a PNG (for screens) at the same layout.

The card uses the site's hero palette: the ink background and the iridescent
heading gradient. The QR itself stays black on a white tile -- inverted codes
are unreliable on some scanners, so the theme stops at the tile edge.

    python brand/make_qr_card.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

QR_SRC = Path("/Users/zijieliang/Downloads/qrcode_tailorfantasy.com.png")
OUT_DIR = Path(__file__).resolve().parent

DPI = 600
CARD_MM = (80, 100)
HEADING = "Check out our website"
URL = "tailorfantasy.com"

BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

# straight from frontend/src/index.css
INK = (10, 9, 14)
MUTED = (148, 141, 163)
IRIDESCENT = [                      # stop position -> colour
    (0.00, (244, 114, 182)),        # rose
    (0.35, (167, 139, 250)),        # violet
    (0.65, (103, 232, 249)),        # cyan
    (1.00, (228, 198, 148)),        # champagne
]


def mm(v: float) -> int:
    return round(v / 25.4 * DPI)


def gradient(size: tuple[int, int]) -> Image.Image:
    """Horizontal iridescent ramp, matching the .text-iridescent utility."""
    w, h = size
    row = Image.new("RGB", (w, 1))
    px = row.load()
    for x in range(w):
        t = x / max(1, w - 1)
        for i in range(len(IRIDESCENT) - 1):
            p0, c0 = IRIDESCENT[i]
            p1, c1 = IRIDESCENT[i + 1]
            if p0 <= t <= p1:
                f = (t - p0) / (p1 - p0)
                px[x, 0] = tuple(round(a + (b - a) * f) for a, b in zip(c0, c1))
                break
    return row.resize((w, h), Image.NEAREST)


def draw_gradient_text(card, xy, text, font):
    """Text filled with the gradient, via a glyph mask."""
    bbox = font.getbbox(text)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).text((-bbox[0], -bbox[1]), text, font=font, fill=255)
    card.paste(gradient((w, h)), xy, mask)
    return w, h


def main() -> None:
    W, H = mm(CARD_MM[0]), mm(CARD_MM[1])
    card = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(card)

    # NEAREST keeps the module edges razor sharp; the source is pure 2-level
    # black and white, so resampling would only grey them and hurt scanning.
    qr_px = mm(58)
    qr = Image.open(QR_SRC).convert("RGB").resize((qr_px, qr_px), Image.NEAREST)

    f_head = ImageFont.truetype(BOLD, mm(6.2))
    f_url = ImageFont.truetype(REG, mm(4.0))

    hb, ub = f_head.getbbox(HEADING), f_url.getbbox(URL)
    head_h = hb[3] - hb[1]
    url_h = ub[3] - ub[1]

    # the white tile gives the QR its quiet zone against the dark card
    pad = mm(5)
    tile = qr_px + pad * 2

    gap1, gap2 = mm(7), mm(6)
    block_h = head_h + gap1 + tile + gap2 + url_h
    y = (H - block_h) // 2

    draw_gradient_text(card, ((W - (hb[2] - hb[0])) // 2, y), HEADING, f_head)
    y += head_h + gap1

    tx = (W - tile) // 2
    d.rounded_rectangle([tx, y, tx + tile, y + tile], radius=mm(3), fill="white")
    card.paste(qr, (tx + pad, y + pad))
    y += tile + gap2

    d.text(((W - (ub[2] - ub[0])) // 2 - ub[0], y - ub[1]),
           URL, font=f_url, fill=MUTED)

    png, pdf = OUT_DIR / "qr-card.png", OUT_DIR / "qr-card.pdf"
    card.save(png, dpi=(DPI, DPI))
    card.save(pdf, "PDF", resolution=DPI)
    print(f"  {png.name}  {png.stat().st_size/1024:.0f} KB   {W}x{H}px @ {DPI}dpi")
    print(f"  {pdf.name}  {pdf.stat().st_size/1024:.0f} KB   {CARD_MM[0]}x{CARD_MM[1]} mm")


if __name__ == "__main__":
    main()
