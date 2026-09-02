"""Burn English subtitles over the Chinese ones in the YOUMI printer demo, and
drop the audio track.

The source has no subtitle track -- the Chinese is baked into the pixels -- so
each caption is covered with a pill sized to hide the Chinese underneath it, and
the English is drawn on top. Timings were measured from the video by detecting
the caption's yellow fill.

    python video/make_english_subs.py            # writes ~/Desktop/<name>-EN.mp4
"""
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

SRC = Path("/Users/zijieliang/Desktop/1422919c8d844355c5d3b2aeae7ddcc7.mp4")
OUT = SRC.with_name(SRC.stem + "-EN.mp4")

W, H = 544, 960
FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
GOLD = (255, 216, 77)          # matches the original caption fill
BAND_TOP, BAND_BOT = 246, 332  # vertical extent of the Chinese, measured

# start, end, English  -- Chinese kept alongside for review
CAPTIONS = [
    # The machine's opening screen says 请扫码开始制作; there is no burned-in
    # subtitle here, so an empty zh means "size the pill to the text only".
    (0.3,  2.3,  "Scan the QR code to start the process",       ""),
    (2.4,  5.6,  "Step 3: stick the test nail onto the tray",   "第三步把测试打印甲贴到托盘上"),
    (10.2, 14.2, "Step 4: apply the No.1 printing gel",         "第四步，涂上一号打印胶"),
    (16.9, 17.9, "Slide it back into the printing slot",        "再放进去打印口"),
    (19.2, 21.4, "Choose a design, then start printing",        "选择好款式之后开始打印"),
    (31.7, 33.0, "When printing finishes, take it out",         "打印完成后取出"),
    (33.0, 34.4, "Put it under the lamp to cure",               "放到旁边去照灯"),
    (34.4, 35.4, "About 1 minute",                              "大约1分钟"),
    (36.3, 38.4, "Once cured, take out the No.2 top coat",      "照灯完成后拿出2号封层胶"),
    (38.4, 39.4, "Apply another coat",                          "再涂一次"),
    (39.4, 41.0, "Cure under the lamp a second time",           "再进行二次照灯"),
    (51.4, 52.9, "And the print is finished!",                  "最后我们就打印完成啦"),
]


def measure_chinese_bbox(t: float, tmp: Path) -> tuple[int, int, int, int]:
    """Bounding box of the Chinese caption at time t, so the pill covers it.

    Measured per caption rather than assumed: one caption wraps to two lines and
    is far taller than the rest.
    """
    frame = tmp / "probe.png"
    subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", str(t), "-i", str(SRC),
         "-frames:v", "1", str(frame), "-y"], check=True)
    a = np.asarray(Image.open(frame).convert("RGB")).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = (r > 190) & (g > 160) & (b < 130) & ((r + g) / 2 - b > 90)
    m[:BAND_TOP] = False
    m[BAND_BOT:] = False
    cols, rows = np.where(m.any(0))[0], np.where(m.any(1))[0]
    if not len(cols):
        return (W // 2, W // 2, BAND_TOP, BAND_BOT)
    return (int(cols.min()), int(cols.max()), int(rows.min()), int(rows.max()))


def fit_font(text: str, max_w: int) -> ImageFont.FreeTypeFont:
    """Largest size that keeps the line inside max_w."""
    for size in range(34, 17, -1):
        f = ImageFont.truetype(FONT, size)
        if f.getbbox(text)[2] - f.getbbox(text)[0] <= max_w:
            return f
    return ImageFont.truetype(FONT, 18)


def render(text: str, cover: tuple[int, int, int, int], path: Path) -> None:
    """Transparent PNG: a dark pill hiding the Chinese, with English over it."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    font = fit_font(text, W - 56)
    tb = font.getbbox(text)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]

    cx0, cx1, cy0, cy1 = cover
    pad_x, pad_y = 20, 10
    # the pill must cover the Chinese *and* fit the English
    x0 = min(cx0 - pad_x, (W - tw) // 2 - pad_x)
    x1 = max(cx1 + pad_x, (W + tw) // 2 + pad_x)
    x0, x1 = max(4, x0), min(W - 4, x1)
    y0 = min(cy0 - pad_y, 262)
    y1 = max(cy1 + pad_y, 318)

    # fully opaque: at 90% the bright yellow Chinese still ghosted through
    d.rounded_rectangle([x0, y0, x1, y1], radius=min(26, (y1 - y0) // 2),
                        fill=(8, 7, 12, 255))

    tx = (x0 + x1) // 2 - tw // 2 - tb[0]
    ty = (y0 + y1) // 2 - th // 2 - tb[1]
    d.text((tx, ty), text, font=font, fill=GOLD + (255,),
           stroke_width=3, stroke_fill=(0, 0, 0, 255))
    img.save(path)


def main() -> None:
    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        inputs, filters, last = [], [], "[0:v]"

        for i, (start, end, en, _zh) in enumerate(CAPTIONS):
            png = tmp / f"cap{i:02d}.png"
            cover = (measure_chinese_bbox((start + end) / 2, tmp) if _zh
                     else (W // 2, W // 2, 262, 318))
            render(en, cover, png)
            inputs += ["-i", str(png)]
            label = f"[v{i}]"
            filters.append(
                f"{last}[{i + 1}:v]overlay=0:0:enable='between(t,{start},{end})'{label}"
            )
            last = label

        cmd = (["ffmpeg", "-v", "error", "-stats", "-i", str(SRC)] + inputs +
               ["-filter_complex", ";".join(filters), "-map", last,
                "-an",                                  # drop the audio track
                "-c:v", "libx264", "-preset", "slow", "-crf", "20",
                "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                str(OUT), "-y"])
        subprocess.run(cmd, check=True)

    print(f"\nwrote {OUT}  ({OUT.stat().st_size / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
