from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import config
from app.database import engine, Base
from app.routes import orders, products, admin
from app import seed
import os

app = FastAPI(title="Creation by Saloni API", version="1.0.0")

raw_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
allow_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]
allow_origin_regex = os.getenv(
    "CORS_ALLOW_ORIGIN_REGEX",
    r"https://.*\.vercel\.app|http://localhost:\d+|http://127\.0\.0\.1:\d+",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_origin_regex=allow_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
seed.seed_products()

app.include_router(orders.router, prefix="/orders", tags=["Orders"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

@app.get("/")
def root():
    return {"message": "Welcome to Creation by Saloni API 🌸"}
