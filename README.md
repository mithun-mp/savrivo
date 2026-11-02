# SAVRIVO — Smart Finds. Better Choices.

> **Independent Multi-Retailer Affiliate Product Discovery Platform**  
> Primary Market: India (₹ INR) | Brand: SAVRIVO | Tagline: *Smart Finds. Better Choices.*

---

## 💎 What is SAVRIVO?

**SAVRIVO IS NOT AN E-COMMERCE STORE.**

SAVRIVO is a premium editorial shopping-discovery platform tailored for discerning Indian shoppers. It bridges the gap between fragmented online marketplaces and quality-conscious consumers by providing:

- **Independent Product Discovery:** Curated selections across Electronics, Home & Kitchen, Beauty & Personal Care, Books, Fitness, and more.
- **Transparent Retailer Attribution:** Every product links directly to official Indian retailer destinations (Amazon.in, Flipkart, etc.) with verified affiliate tracking parameters.
- **Honest Editorial Policy:** No fabricated reviews, invented ratings, artificial discounts, or deceptive redirect cloaking.
- **Architected for Multi-Retailer Verification:** Modular adapter architecture designed to scale with authorized APIs and verified merchant feeds.

---

## 🏛 Architecture Overview

```
SAVRIVO Platform
├── frontend/             # Astro 4 + React 18 + TypeScript + Tailwind CSS
│   ├── Static Site       # Pure static generation for blazing performance & SEO
│   ├── Client Fallback   # Dynamic React components with resilient API fetching
│   ├── Editorial Design  # Luxury minimalism, Inter & Playfair Display typography
│   └── Admin Portal      # Secure editorial dashboard for product, offer & guide management
│
└── backend/              # Node.js + Express + TypeScript + Mongoose (Atlas)
    ├── Modular Structure # Config, Models, Services, Controllers, Routes, Validators
    ├── Security          # Helmet, Rate limiting, CORS allowlist, Bcrypt password hashing
    ├── Merchant Adapters # Amazon Associates, Flipkart, and Generic manual link adapters
    └── Validation        # Comprehensive Zod schema validation on all inputs
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20.x
- pnpm >= 9.x
- MongoDB Atlas cluster URI (optional for initial frontend browsing)

### Running the Backend
```bash
cd backend
pnpm install
cp .env.example .env
# Fill in MONGODB_URI and JWT_SECRET in .env
pnpm run seed    # Seeds default categories, merchants, and sample demo records
pnpm run dev     # Runs on http://localhost:4000
```

### Running the Frontend
```bash
cd frontend
pnpm install
cp .env.example .env
pnpm run dev     # Runs on http://localhost:4321
```

---

## 📑 Core Documentation

- [SETUP.md](./SETUP.md) — Step-by-step local development & environment configuration
- [DEPLOYMENT.md](./DEPLOYMENT.md) — GitHub Actions to GitHub Pages (frontend) & Render (backend)
- [API.md](./API.md) — Comprehensive REST API documentation with sample payloads

---

## ⚖️ Legal & Editorial Standards

- **Affiliate Disclosure:** SAVRIVO earns standard affiliate commissions from qualifying purchases via Amazon Associates and authorized partner programmes.
- **No Cloaking:** Outgoing URLs are directly visible, labeled with `rel="sponsored nofollow noopener noreferrer"`.
- **Price Integrity:** No artificial or unverified countdown timers or fake discounts. Indicative prices are clearly labeled with verification timestamps.

---

© 2024–2025 SAVRIVO. All rights reserved.

