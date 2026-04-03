# 🌸 Creations by Saloni — Full-Stack Web Application

> *Handmade with love* ✨ | @creationsby_saloni

A complete, production-ready web application for **Creations by Saloni** — a handmade bouquet, gift hamper, and decoration business.

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS (custom pink/rose theme) |
| Backend | FastAPI (Python) |
| Database | SQLite (via SQLAlchemy) |
| HTTP Client | Axios |
| Fonts | Playfair Display, Dancing Script, Lato |

---

## 📁 Project Structure

```
creation-by-saloni/
├── backend/
│   ├── app/
│   │   ├── main.py          ← FastAPI app
│   │   ├── database.py      ← SQLite + SQLAlchemy
│   │   ├── models.py        ← DB models (Orders, Products, Admin)
│   │   ├── schemas.py       ← Pydantic schemas
│   │   ├── seed.py          ← 13 sample products
│   │   └── routes/
│   │       ├── orders.py    ← POST/GET/PATCH /orders
│   │       ├── products.py  ← GET /products (with filter/search)
│   │       └── admin.py     ← Auth + dashboard
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── ProductCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx        ← Hero, featured, testimonials
    │   │   ├── Products.jsx    ← Search + filter grid
    │   │   ├── Order.jsx       ← Order form with validation
    │   │   ├── About.jsx       ← Story, mission, timeline
    │   │   ├── Contact.jsx     ← Contact form, WhatsApp, FAQs
    │   │   └── Admin.jsx       ← Login + dashboard
    │   ├── services/
    │   │   └── api.js          ← Axios API calls
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## 🚀 Setup & Run

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
→ Runs on **http://localhost:8000**  
→ Auto-seeds 13 products on first run  
→ API docs: **http://localhost:8000/docs**

### Frontend

```bash
cd frontend
npm install
npm run dev
```
→ Runs on **http://localhost:5173**

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | All products |
| `GET` | `/products?category=Bouquets` | Filter by category |
| `GET` | `/products?search=rose` | Search products |
| `GET` | `/products?featured=true` | Featured only |
| `POST` | `/orders` | Place new order |
| `GET` | `/orders` | All orders |
| `PATCH` | `/orders/{id}/status` | Update status |
| `POST` | `/admin/login` | Get auth token |
| `GET` | `/admin/dashboard?token=` | Stats + orders |

---

## 🔐 Admin Access

- **URL:** http://localhost:5173/admin
- **Username:** `saloni`
- **Password:** `saloni@admin123`

---

## 🎨 Design System

- **Primary:** Rose (#f43f5e) + Pink (#ec4899)
- **Background:** Cream (#FFF8F0) + Petal (#FFE8EF)
- **Display Font:** Playfair Display (serif)
- **Script Font:** Dancing Script (cursive)
- **Body Font:** Lato (sans-serif)

---

## 📦 Products Seeded

| Category | Items |
|----------|-------|
| Bouquets | Rosy Romance, Pastel Dream, Sunflower Bliss, White Elegance |
| Gift Hampers | Sweet Celebrations, Spa & Bliss, Festival Joy |
| Surprise Boxes | Pink Explosion, Memory Lane, Midnight Surprise |
| Custom Decorations | Birthday Room, Anniversary Setup, Baby Shower |

---

## 💬 WhatsApp Integration

Update the phone number in:
- `frontend/src/components/Footer.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Contact.jsx`
- `frontend/src/pages/Order.jsx`

Replace `919999999999` with the actual WhatsApp number (with country code, no +).

---

## ✨ Features

- [x] Fully responsive (mobile + desktop)
- [x] Elegant pink/rose/cream floral theme
- [x] Smooth animations & hover effects
- [x] Product search & category filter
- [x] Order form with validation
- [x] WhatsApp order button
- [x] Admin dashboard with order management
- [x] Status updates (pending → confirmed → completed)
- [x] Auto-seeded product catalogue
- [x] Success confirmation with order ID

---

Made with 💖 for **Creations by Saloni**

## Deployment Notes

### Frontend env
Create `frontend/.env` from `frontend/.env.example`:

```bash
VITE_API_URL=https://your-backend-domain
```

### Backend env
Create `backend/.env` from `backend/.env.example`:

```bash
CORS_ORIGINS=https://your-frontend-domain,http://localhost:5173
```

### Deploy checklist
1. Deploy backend first and copy its public URL.
2. Set `VITE_API_URL` to backend URL and deploy frontend.
3. Set `CORS_ORIGINS` to frontend URL and restart backend.
4. Open `/admin` and verify all orders + recent activity are visible.

### Owner notifications (email + WhatsApp)
Configure backend environment variables to get instant alerts on each new order:

```bash
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_WHATSAPP_NOTIFICATIONS=true

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=your_email@gmail.com
NOTIFY_EMAIL_TO=your_email@gmail.com

TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
NOTIFY_WHATSAPP_TO=whatsapp:+91xxxxxxxxxx
```

Notes:
- For Gmail, use an app password (not your normal account password).
- Twilio WhatsApp uses a `whatsapp:+` format for both sender and receiver.
