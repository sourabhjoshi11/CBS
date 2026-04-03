from app.database import SessionLocal
from app import models


IMG_CHOCOLATE_ROSE_BOUQUET = "/products/valentinegift.jpg"
IMG_MEHNDI_NAME_PLATTER = "/products/mehndiplatter.jpg"
IMG_SKINCARE_HAMPER = "/products/surpisebirthday.jpg"
IMG_ROSE_TEDDY_COMBO = "/products/teddygift.jpg"
IMG_FLORAL_RING_TRAY = "/products/ring-ceremonyplatter.jpg"
IMG_CUSTOM_TSHIRT = "/products/shirt-art.jpg"
IMG_BIRTHDAY_LUXURY_HAMPER = "/products/birthdayhamper.jpg"
IMG_MEMORY_PHOTO_FRAME = "/products/memories-frame.jpg"
IMG_CUSTOM_NAME_PLATE = "/products/nameplate.jpg"
IMG_FLOWER_HAMPER = "/products/flowerhamper.jpg"
IMG_HALDI_PLATTER = "/products/haldiplatter.jpg"


PRODUCTS = [
    {
        "name": "Chocolate Rose Bouquet",
        "price": 899,
        "category": "Bouquets",
        "image_url": IMG_CHOCOLATE_ROSE_BOUQUET,
        "description": "Red rose and chocolate bouquet with premium wrapping.",
        "is_featured": 1,
    },
    {
        "name": "Mehndi Name Platter",
        "price": 2299,
        "category": "Custom Arts",
        "image_url": IMG_MEHNDI_NAME_PLATTER,
        "description": "Customized mehndi platter with name cutout and floral decor.",
        "is_featured": 1,
    },
    {
        "name": "Customized Accessories Hamper",
        "price": 1499,
        "category": "Gift Hampers",
        "image_url": IMG_SKINCARE_HAMPER,
        "description": "Curated hamper with skincare, clips, jewelry and self-care picks.",
        "is_featured": 1,
    },
    {
        "name": "Rose & Teddy Gift Combo",
        "price": 1299,
        "category": "Bouquets",
        "image_url": IMG_ROSE_TEDDY_COMBO,
        "description": "Bouquet plus teddy combo made for romantic gifting.",
        "is_featured": 1,
    },
    {
        "name": "Floral Ring Ceremony Tray",
        "price": 2599,
        "category": "Custom Arts",
        "image_url": IMG_FLORAL_RING_TRAY,
        "description": "Pearl-edged engagement tray with floral and name customization.",
        "is_featured": 1,
    },
    {
        "name": "Krishna Theme Custom T-Shirt",
        "price": 699,
        "category": "Custom Arts",
        "image_url": IMG_CUSTOM_TSHIRT,
        "description": "Personalized devotional and festive print T-shirt designs.",
        "is_featured": 0,
    },
    {
        "name": "Birthday Luxury Hamper",
        "price": 1999,
        "category": "Gift Hampers",
        "image_url": IMG_BIRTHDAY_LUXURY_HAMPER,
        "description": "Premium birthday hamper with perfume, jewelry and chocolates.",
        "is_featured": 1,
    },
    {
        "name": "Memories Photo Frame",
        "price": 999,
        "category": "Surprise Boxes",
        "image_url": IMG_MEMORY_PHOTO_FRAME,
        "description": "Photo collage memory frame for birthdays and friendship gifts.",
        "is_featured": 1,
    },
    {
        "name": "Personalized Name Plate",
        "price": 899,
        "category": "Custom Arts",
        "image_url": IMG_CUSTOM_NAME_PLATE,
        "description": "Customized name plate for room decor and event styling.",
        "is_featured": 0,
    },
    {
        "name": "Floral Gift Hamper",
        "price": 1599,
        "category": "Gift Hampers",
        "image_url": IMG_FLOWER_HAMPER,
        "description": "Elegant floral hamper curated for festive and special occasions.",
        "is_featured": 0,
    },
    {
        "name": "Classic Haldi Platter",
        "price": 2199,
        "category": "Custom Arts",
        "image_url": IMG_HALDI_PLATTER,
        "description": "Traditional haldi platter with handcrafted decorative detailing.",
        "is_featured": 0,
    },
]


def seed_products():
    db = SessionLocal()
    try:
        db.query(models.Product).delete()
        for p in PRODUCTS:
            db.add(models.Product(**p))
        db.commit()
        print(f"Seeded and refreshed {len(PRODUCTS)} products.")
    finally:
        db.close()
