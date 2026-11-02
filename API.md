# SAVRIVO — REST API Reference

Base URL: `http://localhost:4000/api` (Local) or `https://<render-url>/api` (Production)

---

## 1. General Principles

### Response Format
All responses adhere to a consistent JSON structure:

```json
{
  "success": true,
  "data": {},
  "message": "Optional human-readable confirmation",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error description",
    "details": [
      { "field": "title", "message": "Required" }
    ]
  }
}
```

---

## 2. Public Endpoints

### Health Check
- **`GET /api/health`**
- Returns server runtime status, timestamp, version, and MongoDB connection state (`connected` / `disconnected`).

### Products
- **`GET /api/products`**
  - Query params: `page`, `limit`, `category`, `brand`, `featured`, `sort` (`newest` | `oldest` | `title`), `q`
  - Returns paginated list of published products with category population.
- **`GET /api/products/:slug`**
  - Returns complete published product by slug with category.

### Categories
- **`GET /api/categories`**
  - Returns active categories ordered by `displayOrder`.
- **`GET /api/categories/:slug`**
  - Returns category details by slug.

### Merchants
- **`GET /api/merchants`**
  - Returns active, enabled merchants (Amazon India, Flipkart, etc.).
  - Note: Merchant API secrets or internal tracking configurations are never exposed.

### Buying Guides
- **`GET /api/guides`**
  - Query params: `page`, `limit`
  - Returns published editorial buying guides.
- **`GET /api/guides/:slug`**
  - Returns guide details and related products by slug.

### Search
- **`GET /api/search?q=:query`**
  - Multi-entity text search returning matching products, categories, and buying guides.
  - Rate-limited to 30 requests/minute.

### Offers (Coming Soon)
- **`GET /api/offers`**
  - Returns `{ "status": "coming_soon", "available": false }`.
  - Architecture ready for verified authorized feeds.

---

## 3. Admin Endpoints (Require Bearer Token)

Headers: `Authorization: Bearer <jwt-token>`

### Authentication
- **`POST /api/admin/auth/login`**
  - Rate limited (5 attempts per 15 min).
  - Body: `{ "email": "...", "password": "..." }`
  - Returns `{ "token": "...", "user": { "email": "...", "role": "..." } }`
- **`POST /api/admin/auth/logout`**
  - Confirms token dismissal.

### Admin Dashboard
- **`GET /api/admin/dashboard`**
  - Returns aggregate statistics: total products, published, drafts, categories, active merchants, expired offers, and 5 most recent records.

### Product CRUD
- **`GET /api/admin/products`** — Full product listing including drafts and archived.
- **`GET /api/admin/products/:id`** — Get product by ObjectId.
- **`POST /api/admin/products`** — Create product with Zod validation.
- **`PATCH /api/admin/products/:id`** — Partial update.
- **`DELETE /api/admin/products/:id`** — Soft delete (sets status to `archived`).

### Category CRUD
- **`GET /api/admin/categories`** — All categories including inactive.
- **`POST /api/admin/categories`** — Create category.
- **`PATCH /api/admin/categories/:id`** — Update category.

### Merchant CRUD
- **`GET /api/admin/merchants`** — All merchants.
- **`POST /api/admin/merchants`** — Create merchant.
- **`PATCH /api/admin/merchants/:id`** — Update merchant info.
- **`POST /api/admin/merchants/:id/toggle`** — Toggle enabled/disabled status.

### Offer CRUD
- **`GET /api/admin/offers`** — List all product offers.
- **`POST /api/admin/offers`** — Create manual or verified offer linking a product to a merchant destination with affiliate tracking URL.
- **`PATCH /api/admin/offers/:id`** — Update offer.
- **`POST /api/admin/offers/:id/expire`** — Immediately expire an offer.

### Guide CRUD
- **`GET /api/admin/guides`** — List all guides.
- **`POST /api/admin/guides`** — Create new buying guide.
- **`PATCH /api/admin/guides/:id`** — Update guide.

### Settings
- **`GET /api/admin/settings`** — Get site-wide configuration.
- **`PATCH /api/admin/settings`** — Update site settings (tagline, contact email, etc.).
