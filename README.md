# 💅 Glossy Nail Art Studio

A modern, stylish nail art image generator and shopping platform designed for young women who love creative nail designs.

## ✨ Features

### 1. **Template Gallery**
- Browse 10 adorable cartoon-style nail art templates
- Beautiful, modern card-based layout
- Hover effects and smooth animations
- Auto-populated with sample templates on first load

### 2. **Image Generator**
- Create custom nail art designs with an intuitive interface
- Customize:
  - **Base Colors**: 6 beautiful color options (Pink Blush, Lavender Dream, Mint Fresh, etc.)
  - **Patterns**: Hearts, Stars, Flowers, Butterflies, Dots, Stripes
  - **Styles**: Kawaii, Elegant, Playful, Minimalist
  - **Accents**: Glitter, Rhinestones, Pearls, Metallic
- Real-time preview of your design
- Save designs to the backend
- Visual feedback for all selections

### 3. **Shopping Center**
- Browse premium nail art products
- 12 curated products including:
  - Gel polish sets
  - LED nail lamps
  - Nail art brushes
  - Rhinestones and decorations
  - Professional tools
- Category filtering (All, Polish, Tools, Decoration)
- Beautiful product cards with hover effects
- Price display in USD

## 🎨 Design

- **Style**: Modern, clean, and premium
- **Color Scheme**: Pink, purple, and indigo gradients
- **Target Audience**: Young women, fancy girls who love nail art
- **UI/UX**: Intuitive navigation, smooth transitions, responsive design

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Backend API**: RESTful API with full CRUD operations

## 📁 Project Structure

```
tailor-fantasy/
├── frontend/                   # React 19 + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx              # Navigation header
│   │   │   ├── TemplateGallery.tsx     # Template browsing page
│   │   │   ├── ImageGenerator.tsx      # Design creation tool
│   │   │   └── ShoppingCenter.tsx      # Product catalog (local backend)
│   │   ├── services/api.ts             # API clients + TypeScript interfaces
│   │   ├── App.tsx                     # Main app with routing
│   │   └── main.tsx                    # App entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                    # FastAPI + PostgreSQL (products)
│   ├── app/
│   │   ├── main.py                     # App, CORS, /media static mount
│   │   ├── models.py                   # Product model (paths, never bytes)
│   │   ├── schemas.py                  # Pydantic response models
│   │   ├── routers/products.py         # GET /products, /products/{id}
│   │   ├── assets.py                   # asset/ folder scanning + role rules
│   │   ├── build_media.py              # asset/ -> media/ (resize, WebP)
│   │   ├── scan.py                     # asset/ -> products.csv
│   │   └── seed.py                     # products.csv -> PostgreSQL
│   ├── media/                          # generated WebP, git-ignored, served
│   ├── products.csv                    # editable product metadata
│   └── docker-compose.yml              # tailorfantasy (API) + db
│
└── asset/                      # Source images, 811 MB, git-ignored
    └── <SKU>/                          # one folder per product
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
npm run build
```

### Backend

```bash
cd backend
docker compose up -d          # API on :8001, PostgreSQL on :5433
```

To regenerate product images and reseed the database (run on macOS — HEIC
decoding uses `sips`):

```bash
cd backend
python3 -m venv .venv && ./.venv/bin/pip install -r requirements.txt
./.venv/bin/python -m app.build_media    # asset/ -> media/  (811 MB -> 43 MB)
./.venv/bin/python -m app.scan           # asset/ -> products.csv
./.venv/bin/python -m app.seed           # products.csv -> PostgreSQL
```

## 🔌 API Integration

The app connects to a backend API with the following endpoints:

### Templates
- `GET /templates` - List all templates
- `POST /templates` - Create new template
- `GET /templates/:id` - Get template by ID
- `PUT /templates/:id` - Update template
- `DELETE /templates/:id` - Delete template

### Generated Images
- `GET /generated-images` - List all generated images
- `POST /generated-images` - Save new generated image
- `GET /generated-images/:id` - Get image by ID
- `PUT /generated-images/:id` - Update image
- `DELETE /generated-images/:id` - Delete image

### Products
- `GET /products` - List all products
- `POST /products` - Create new product
- `GET /products/:id` - Get product by ID
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

**API Base URL**: `http://localhost:8001` — set via `frontend/.env` (`VITE_API_BASE_URL`).
Backend settings live in `backend/.env`; see the `.env.example` in each directory.

Product images are served as static files from `/media/<SKU>/{thumb,full,detail}.webp`.
The database stores only those paths — never image bytes.

## 🎯 Key Features Implementation

### Auto-Population
- Templates and products are automatically created on first load if the database is empty
- Ensures users always have content to browse

### State Management
- React hooks for local component state
- Proper loading and error states
- Optimistic UI updates

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface

### User Experience
- Smooth animations and transitions
- Visual feedback for all interactions
- Clear error messages
- Loading indicators

## 🎨 Customization

### Adding New Templates
Templates are auto-created, but you can add more by modifying the `createSampleTemplates` function in `TemplateGallery.tsx`.

### Adding New Products
Products are auto-created, but you can add more by modifying the `createSampleProducts` function in `ShoppingCenter.tsx`.

### Styling
All styles use Tailwind CSS. Modify `tailwind.config.ts` for theme customization.

## 📱 Pages

1. **Home (/)** - Template Gallery
2. **/generator** - Image Generator
3. **/shop** - Shopping Center

## 🔒 Authentication

This app does not require authentication. All features are publicly accessible.

## 🌟 Future Enhancements

- User accounts and saved designs
- Shopping cart functionality
- Payment integration
- Social sharing features
- Advanced image editing tools
- Community gallery

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contact the owner for contribution guidelines.

---

Built with 💖 for nail art enthusiasts
