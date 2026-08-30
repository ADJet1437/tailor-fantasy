"""Seeds the templates table. Run once (idempotent -- skips if rows exist).

    ./.venv/bin/python -m app.seed_templates
"""
from sqlalchemy import func, select

from .db import Base, SessionLocal, engine
from .models import Template

U = "https://images.unsplash.com/photo-{}?w=400&h=400&fit=crop"

TEMPLATES = [
    ("Kawaii Kitty Nails", "1604654894610-df63bc536371",
     "Adorable cartoon cat faces with pink bows and hearts on pastel pink base"),
    ("Rainbow Unicorn Magic", "1610992015732-2449b76344bc",
     "Magical unicorns with rainbow manes and sparkly stars on lavender nails"),
    # Original photo-1583241800698 is dead upstream (404); replaced with a live image.
    ("Bubble Tea Delight", "1522337360788-8b13dee7a37e",
     "Cute bubble tea cups with smiling faces and colorful pearls"),
    ("Cherry Blossom Dreams", "1632345031435-8727f6897d53",
     "Delicate cartoon cherry blossoms with kawaii faces on soft pink gradient"),
    ("Sweet Cupcake Party", "1614252235316-8c857d38b5f4",
     "Adorable cupcakes with happy faces, sprinkles, and hearts"),
    ("Starry Night Sky", "1519014816548-bf5fe059798b",
     "Cartoon stars and moons with cute faces on deep purple galaxy background"),
    ("Fruity Fun Mix", "1528821128474-27f963b062bf",
     "Happy cartoon fruits - strawberries, watermelons, and oranges with smiles"),
    ("Ocean Mermaid Vibes", "1599206676335-193c82b13c9e",
     "Cute mermaid tails, shells, and starfish on turquoise ombre"),
    ("Butterfly Garden", "1571875257727-256c39da42af",
     "Whimsical cartoon butterflies with sparkles on floral pastel background"),
    ("Ice Cream Sundae", "1563805042-7684c019e1cb",
     "Kawaii ice cream cones with happy faces, sprinkles, and cherries on top"),
]


def main() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        existing = db.scalar(select(func.count()).select_from(Template)) or 0
        if existing:
            print(f"templates already seeded ({existing} rows); nothing to do")
            return
        db.add_all(
            Template(name=n, image_url=U.format(pid), description=d)
            for n, pid, d in TEMPLATES
        )
        db.commit()
        print(f"seeded {len(TEMPLATES)} templates")


if __name__ == "__main__":
    main()
