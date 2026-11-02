# SAVRIVO — Local Setup & Development Guide

Follow this guide to get the full SAVRIVO platform running locally on your machine.

---

## 1. Prerequisites

- **Node.js**: `v20.x` or `v22.x` (verified on Node `v24.x`)
- **pnpm**: `v9.x` or `v11.x` (`npm install -g pnpm`)
- **Git**
- **MongoDB Atlas** (or local MongoDB on `mongodb://localhost:27017/savrivo`)

---

## 2. Repository Structure

```
EShop/
├── frontend/             # Astro 4 + React 18 static application & admin UI
├── backend/              # Node.js + Express + TypeScript API
├── .github/workflows/    # CI/CD workflows for GitHub Pages & Backend checks
├── README.md
├── SETUP.md
├── DEPLOYMENT.md
└── API.md
```

---

## 3. Backend Setup

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```

4. Configure `.env` variables:
   ```env
   NODE_ENV=development
   PORT=4000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/savrivo?retryWrites=true&w=majority
   JWT_SECRET=your-secure-random-secret-at-least-64-characters-long
   JWT_EXPIRES_IN=7d
   ADMIN_EMAIL=admin@savrivo.in
   ADMIN_PASSWORD_HASH=
   FRONTEND_ORIGIN=http://localhost:4321
   ```

5. Seed initial data (categories, sample merchants, demo products, and editorial guide):
   ```bash
   pnpm run seed
   ```

6. Start the API server in dev mode (hot reload):
   ```bash
   pnpm run dev
   ```

7. Verify backend health check:
   ```
   http://localhost:4000/api/health
   ```

---

## 4. Frontend Setup

1. Open a second terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment:
   ```bash
   cp .env.example .env
   # Ensure PUBLIC_API_URL points to your backend:
   # PUBLIC_API_URL=http://localhost:4000/api
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```

5. Open your browser:
   - **Public Discovery Platform**: `http://localhost:4321`
   - **All Products**: `http://localhost:4321/products`
   - **Categories**: `http://localhost:4321/categories`
   - **Buying Guides**: `http://localhost:4321/guides`
   - **Live Offers**: `http://localhost:4321/offers`
   - **Editorial Admin**: `http://localhost:4321/admin/login`

---

## 5. Production Build Verification

To verify that both frontend and backend build without any errors:

```bash
# Verify backend
cd backend
pnpm run typecheck
pnpm run build

# Verify frontend
cd ../frontend
pnpm run build
```

The frontend outputs a static build to `frontend/dist/` ready to be served by GitHub Pages or any static CDN.
