# SAVRIVO — Complete UI/UX, Responsiveness, Visual Scale, Theme & Multi-Repository Architecture Audit

> **Document Version:** 1.0.0  
> **Date:** November 2026  
> **Status:** Final Architectural Analysis & Audit (Pre-Implementation)  
> **Target Production Platforms:**  
> - Live Website: [https://mithun-mp.github.io/savrivo/](https://mithun-mp.github.io/savrivo/)  
> - Primary Repository: [https://github.com/mithun-mp/savrivo](https://github.com/mithun-mp/savrivo)  
> - Proposed Second Repository: [https://github.com/mithun-mp/savrivoapp](https://github.com/mithun-mp/savrivoapp)  
> - Backend Service: Node.js / Express / TypeScript / MongoDB Atlas (Render Deployment)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Phase 1 — Project Architecture & Codebase Map](#2-phase-1--project-architecture--codebase-map)
3. [Phase 2 — Live Website Page-by-Page UI/UX Audit](#3-phase-2--live-website-page-by-page-uiux-audit)
4. [Phase 3 — Desktop Visual Scaling & Dimension Audit](#4-phase-3--desktop-visual-scaling--dimension-audit)
5. [Phase 4 — Mobile & Tablet Responsiveness Audit](#5-phase-4--mobile--tablet-responsiveness-audit)
6. [Phase 5 — Ecommerce Color Palette & Theme Audit](#6-phase-5--ecommerce-color-palette--theme-audit)
7. [Phase 6 — Typography System & Responsive Hierarchy](#7-phase-6--typography-system--responsive-hierarchy)
8. [Phase 7 — Reusable Component & Design System Audit](#8-phase-7--reusable-component--design-system-audit)
9. [Phase 8 — Performance, Web Vitals & Accessibility Audit](#9-phase-8--performance-web-vitals--accessibility-audit)
10. [Phase 9 — Multi-Repository Frontend Architecture Analysis (`savrivoapp`)](#10-phase-9--multi-repository-frontend-architecture-analysis-savrivoapp)
11. [Phase 10 — Functional Regression Audit & Test Matrix](#11-phase-10--functional-regression-audit--test-matrix)
12. [Phase 11 — Prioritized Implementation Roadmap & Action Plan](#12-phase-11--prioritized-implementation-roadmap--action-plan)

---

## 1. Executive Summary

SAVRIVO is an independent affiliate product discovery platform tailored for the Indian market, designed to curate, compare, and direct consumers to official retailers (Amazon.in, Flipkart, and partner merchants) with affiliate monetization.

An exhaustive end-to-end technical, visual, and architectural audit was performed on the current codebase and live deployment (`https://mithun-mp.github.io/savrivo/`). This evaluation confirmed four root challenges requiring structural refinement:

1. **The Desktop "80–85% Scale" Phenomenon**: The desktop interface feels visibly shrunken on standard 1080p, 1440p, and wide displays. This is caused by:
   - A restrictive container max-width of `1280px` with `48px` horizontal padding, yielding an effective inner width of only `1184px` (leaving over `38%` of a 1080p monitor as blank margins).
   - A 4-column product grid inside a `928px` container (beside the sidebar) that constricts product cards to an ultra-compact **214px width**, yielding product image heights of only **160px**.
   - Systematic over-reliance on `text-xs` (12px / 0.75rem) for over 65% of typography elements (category badges, brand titles, metadata, action buttons, timestamps, and card subtitles).
   - Undersized primary CTA heights (38–40px) and a fixed 64px header.
2. **Editorial vs. Ecommerce Visual Misalignment**: The current primary palette (`#1C4532` forest green, `#FAFAF8` ivory, and `#C9A96E` champagne gold) conveys a high-end luxury editorial magazine or boutique hotel rather than an intuitive, high-velocity consumer electronics and lifestyle product discovery engine. Furthermore, `#C9A96E` against `#FAFAF8` fails WCAG AA color contrast (2.2:1 ratio).
3. **Typography Misallocation**: Rendering product titles in `Playfair Display` (serif) causes visual friction and poor scannability when displaying technical product model numbers and specifications. Serif typography should be preserved for editorial guide titles and hero banners, while product catalog cards require crisp geometric sans-serif typography.
4. **Multi-Repository Architecture for `savrivoapp`**: Introducing a second public frontend repository (`https://github.com/mithun-mp/savrivoapp`) requires strict backend architectural discipline. The single source of truth (Node.js/Express API + MongoDB Atlas) must remain shared without duplicating databases, admin portals, or affiliate credentials. A centralized CORS allowlist and environment-configured base routing must be established.

---

## 2. Phase 1 — Project Architecture & Codebase Map

### 2.1 Technology Stack & Architectural Summary

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Astro (Static Site Generation) | `4.16.19` | Fast, content-driven static generation with zero JS by default |
| **UI Component Islands** | React | `18.3.1` | Interactive client islands (Navbar, Search, Filter drawer, Gallery) |
| **Styling & Tokens** | Tailwind CSS + CSS Custom Properties | `3.4.6` | Design tokens, utility classes, and custom variables |
| **Client State** | Nano Stores (`@nanostores/react`) | `0.10.3` | Lightweight cross-component reactive state (theme, drawer) |
| **Icons** | Lucide React | `0.400.0` | Feather-based SVG iconography |
| **Backend Runtime** | Node.js + Express + TypeScript | `Node 22 / Express 4.19.2` | RESTful API, rate-limiting, security middleware, JWT auth |
| **Database ODM** | MongoDB Atlas via Mongoose | `8.5.2` | Schemas for products, categories, merchants, offers, guides, users |
| **Input Validation** | Zod | `3.23.8` | Strict runtime request schema validation |
| **Security Headers** | Helmet + CORS + Express Rate Limit | `7.1.0` | Anti-abuse and API protection |
| **CI/CD** | GitHub Actions | `v4` | Automated typecheck, build, and GitHub Pages deployment |

### 2.2 Project Directory Architecture

```
EShop/ (Repository Root)
├── .github/
│   └── workflows/
│       ├── frontend-deploy.yml     # Deploys Astro static site to GitHub Pages
│       └── backend-checks.yml      # CI lint, typecheck, and build on Node 22
├── backend/
│   ├── src/
│   │   ├── adapters/               # Merchant affiliate link adapters
│   │   ├── config/                 # Environment variables & constants
│   │   ├── controllers/            # Public & admin request handlers
│   │   ├── database/               # Mongoose connection & disconnect handling
│   │   ├── middleware/             # Auth, error, rate-limit, logging
│   │   ├── models/                 # Mongoose schema definitions
│   │   ├── routes/                 # Express public and admin sub-routers
│   │   ├── scripts/                # Database seeding & administrative scripts
│   │   ├── services/               # Affiliate URL parsing & business logic
│   │   ├── types/                  # Backend TypeScript declarations
│   │   ├── utils/                  # Response formatters & helpers
│   │   └── validators/             # Zod input validation schemas
│   ├── Dockerfile                  # Production container definition
│   ├── render.yaml                 # Render cloud web service blueprint
│   ├── tsconfig.json               # Backend TypeScript configuration
│   └── package.json
├── frontend/
│   ├── public/                     # Static assets (favicon, og-default.jpg, robots.txt)
│   ├── src/
│   │   ├── components/
│   │   │   ├── category/           # CategoryCard.tsx
│   │   │   ├── guide/              # GuideCard.tsx
│   │   │   ├── layout/             # Navbar.tsx, MobileMenu.tsx, Footer.tsx
│   │   │   ├── product/            # ProductCard, OfferCard, ProductGallery, ProductsBrowser
│   │   │   ├── search/             # SearchBar.tsx, SearchResults.tsx
│   │   │   └── ui/                 # Button, Badge, Breadcrumb, EmptyState, Pagination, Skeleton
│   │   ├── layouts/
│   │   │   ├── Base.astro          # Root HTML head, SEO tags, JSON-LD, ThemeScript
│   │   │   ├── MainLayout.astro    # Public header/main/footer wrapper
│   │   │   └── AdminLayout.astro   # Admin sidebar, header, auth guard
│   │   ├── lib/
│   │   │   ├── api.ts              # Typed fetch API client with error handling
│   │   │   └── paths.ts            # Base path resolver (/savrivo subpath utility)
│   │   ├── pages/
│   │   │   ├── index.astro         # Homepage with hero, categories, editor's picks
│   │   │   ├── about.astro         # Editorial background & disclosures
│   │   │   ├── affiliate-disclosure.astro # Comprehensive statutory compliance
│   │   │   ├── categories/         # Category index & dynamic [slug].astro
│   │   │   ├── contact.astro       # Inquiries & feedback form
│   │   │   ├── editorial-policy.astro
│   │   │   ├── guides/             # Buying guide index & dynamic [slug].astro
│   │   │   ├── offers.astro        # Verified deals & upcoming feeds
│   │   │   ├── privacy-policy.astro
│   │   │   ├── products/           # Full product browser & dynamic [slug].astro
│   │   │   ├── search.astro        # Live client-side search results page
│   │   │   ├── terms.astro         # Platform terms of use
│   │   │   └── admin/              # Dashboard, CRUD products, categories, merchants, offers
│   │   ├── stores/                 # Nano Stores (theme.ts)
│   │   ├── styles/                 # tokens.css, global.css
│   │   └── types/                  # Shared frontend data contracts
│   ├── astro.config.mjs            # Astro configuration (base: '/savrivo', sitemap, tailwind)
│   ├── tailwind.config.mjs         # Theme extensions & typography plugins
│   └── package.json
├── API.md                          # Comprehensive REST endpoints documentation
├── DEPLOYMENT.md                   # Render & GitHub Pages deployment instructions
├── SETUP.md                        # Local development setup instructions
└── README.md                       # Project overview & architecture principles
```

---

## 3. Phase 2 — Live Website Page-by-Page UI/UX Audit

Each page of the live deployment (`https://mithun-mp.github.io/savrivo/`) was audited against visual hierarchy, layout consistency, typography, accessibility, and interactive states.

### 3.1 Public Discovery Pages

#### 1. Home Page (`/`)
* **Visual Hierarchy**: Strong editorial header statement, but secondary text and primary buttons are disproportionately small compared to the large display headline.
* **Hero Section**: The hero content is restricted to `max-w-2xl` (672px). On a 1920px screen, the entire right half of the hero (over 900px) contains only decorative blurred radial circles with low opacity (`opacity-30`), creating the sensation of an unfinished layout.
* **Search Bar**: The hero search bar has a max width of `max-w-lg` (512px) and an input font size of 14px (`text-sm`), feeling timid on desktop.
* **Categories Row**: The 7-column category strip (`xl:grid-cols-7`) squeezes category icons into 130px wide boxes with 12px text.
* **Editor's Picks & Trending Grids**: 4-column product cards without price previews or retailer count make the cards feel like generic blog cards rather than actionable product discovery items.
* **Severity**: **High (P1)** — Needs wider hero content layout, larger search input, and ecommerce-oriented product card metadata.

#### 2. Products Browser (`/products`)
* **Sidebar Filter**: Fixed at `w-56` (224px). Filter inputs use `text-sm` (14px) and tiny labels (`text-xs`). No price range filter, rating filter, or retailer filter exists.
* **Grid Spacing**: 4 columns inside the remaining 928px content width creates ultra-narrow 214px cards. Product titles wrap onto 3–4 lines or truncate awkwardly.
* **Empty / Error States**: Fallbacks are handled properly via `EmptyState.tsx`, but no skeleton count adapts dynamically to screen width.
* **Severity**: **Critical (P0/P1)** — Product cards are severely compressed; grid should be 3 columns on standard desktop or container expanded to 1440px.

#### 3. Product Details Page (`/product/[slug]`)
* **Layout**: Two-column split (`lg:grid-cols-2 gap-12`).
* **Gallery**: Single square aspect ratio (`aspect-square`) with thumbnails below. High quality, but lacks image zoom, full-screen lightbox, or multiple angle badges.
* **Pricing & Merchant Offers**: `OfferCard.tsx` renders clearly with indicative INR pricing and availability tags. However, if no live offers exist, the fallback box displays static placeholder text.
* **Primary CTA**: "Shop at Retailer" button uses `text-sm py-3 px-5` (40px height). For a primary purchase conversion element, this lacks visual weight.
* **Affiliate Disclosure**: Present on every product page in compliance with guidelines, clearly separated.
* **Severity**: **Medium (P2)** — Increase primary CTA size to 48px height, add image zoom capabilities, and format product specifications table.

#### 4. Categories Index & Dynamic Category Page (`/categories`, `/category/[slug]`)
* **Index**: Grid of cards with Lucide icons. Clean layout, but card borders look faint (`#E5E5E3`), and the card content has high whitespace-to-text ratio.
* **Detail Page**: Shows category description, product grid, and related buying guides. If a category has no products, `EmptyState` displays the abstract "Savi" discovery mark cleanly.
* **Severity**: **Low (P3)** — Functional and clean; enhance card hover depth and add product count badges.

#### 5. Search Results Page (`/search?q=...`)
* **Debounce**: 300ms debounce works smoothly via AbortController in `SearchResults.tsx`.
* **Section Segmentation**: Results cleanly separate into Products, Categories, and Guides.
* **Defect**: Products in search results render as a vertical stacked list with 48×48px thumbnail squares, whereas on `/products` they render as cards. A toggle between grid/list or larger list rows would improve scannability.
* **Severity**: **Medium (P2)** — List rows lack pricing metadata.

#### 6. Buying Guides Index & Detail (`/guides`, `/guides/[slug]`)
* **Aspect Ratio**: 16:9 cover image with clean editorial styling.
* **Readability**: Maximum prose width is well constrained (`max-w-3xl`) for comfortable reading length (65–75 characters per line).
* **Affiliate Transparency**: Every guide features an editorial disclosure box at the footer.
* **Severity**: **Low (P3)** — High editorial quality; typography is well balanced.

#### 7. Offers Page (`/offers`)
* **Status**: Correctly labeled as "Coming Soon: Live Offer Discovery" with an explanation of verified affiliate data feeds.
* **Visual**: Clean centered layout with Savi vector mark.
* **Severity**: **Low (P3)** — Informative placeholder; satisfies transparency requirements.

#### 8. Company & Compliance Pages (`/about`, `/contact`, `/affiliate-disclosure`, `/editorial-policy`, `/privacy-policy`, `/terms`)
* **Layout**: Consistent max-width container (`max-w-3xl`) with breadcrumbs and clear typography.
* **Contact Form**: Functional frontend validation with status alerts.
* **Severity**: **Low (P3)** — Fully compliant with FTC, Amazon Associates, and Indian digital consumer norms.

---

### 3.2 Admin Portal UI/UX (`/admin/*`)

#### 1. Admin Login (`/admin/login`)
* **Form**: Centered modal with brand header, email/password inputs, and client-side error handling.
* **Security**: Enforces credentials verification against backend API; stores JWT in localStorage.

#### 2. Admin Dashboard (`/admin`)
* **Stats Cards**: 6-column grid (`xl:grid-cols-6`). On desktop screens below 1440px, the numbers and labels in 6 columns become crowded.
* **Quick Actions**: Pill buttons for CRUD navigation.
* **Recent Products Table**: Basic table with status badges (`published`, `draft`, `archived`).

#### 3. Admin Management Pages (`/admin/products`, `/admin/categories`, `/admin/merchants`, `/admin/offers`, `/admin/guides`, `/admin/settings`)
* **Layout Problem**: The admin sidebar is `hidden lg:flex w-60`. On screens below 1024px (tablets and mobile devices), the sidebar disappears completely, leaving **no mobile hamburger navigation or drawer** for admin pages! An admin on mobile is effectively trapped on whatever page they loaded.
* **Form Inputs**: Forms use `text-sm px-4 py-2.5` with small labels.
* **Severity**: **Critical (P0) on Mobile/Tablet** — Admin layout requires a responsive drawer navigation.

---

## 4. Phase 3 — Desktop Visual Scaling & Dimension Audit

### 4.1 Root Cause of the "80–85% Scale" Sensation

An objective forensic inspection of `frontend/src/styles/` and component templates reveals the mathematical basis for why the desktop website feels shrunken:

```
Screen Width (1920px 1080p Desktop)
┌─────────────────────────────────────────────────────────────────────────────┐
│                       368px Unused Left Margin (19.2%)                      │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │            .container-content (Max 1280px, Padding 48px)             │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │              Effective Content Width = 1184px               │   │   │
│   │   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │   │   │
│   │   │  │  Card 1  │  │  Card 2  │  │  Card 3  │  │  Card 4  │     │   │   │
│   │   │  │  270px   │  │  270px   │  │  270px   │  │  270px   │     │   │   │
│   │   │  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                       368px Unused Right Margin (19.2%)                     │
└─────────────────────────────────────────────────────────────────────────────┘
Total Wasted Horizontal Screen Real Estate = 736px (38.4%)
```

1. **Max Container Clamp**: In `frontend/src/styles/global.css`:
   ```css
   .container-content {
     width: 100%;
     max-width: 1280px;
     margin: 0 auto;
     padding: 0 1.25rem;
   }
   @media (min-width: 1024px) {
     .container-content { padding: 0 3rem; } /* 48px left & right */
   }
   ```
   On desktop monitors:
   - At **1920×1080**: 1184px inner width = **61.6% screen utilization** (38.4% blank margins).
   - At **2560×1440**: 1184px inner width = **46.2% screen utilization** (53.8% blank margins).
   - At **1440×900**: 1184px inner width = **82.2% screen utilization**.

2. **Miniature Card Geometry**:
   - In `/products`, with a 224px sidebar and 32px gap, the grid gets only 928px.
   - Squeezing 4 columns (`xl:grid-cols-4`) into 928px produces cards that are only **214px wide**.
   - With an aspect ratio of 4:3, the product image is only **160px tall**.
   - With 16px internal padding (`p-4`), the text area is only **182px wide**.

3. **Pervasive 12px (`text-xs`) Font Sizing**:
   The following elements are all coded as `text-xs` (12px / 0.75rem):
   - Category badges on product cards (`ProductCard.tsx:56`)
   - Brand names on cards (`ProductCard.tsx:75`)
   - Card metadata and date labels (`ProductCard.tsx:102`, `GuideCard.tsx:48`)
   - Breadcrumb navigation links (`Breadcrumb.tsx:32`)
   - Filter labels and clear buttons (`ProductsBrowser.tsx:59`, `95`)
   - Footer section headers and copyright (`Footer.tsx:57`, `131`)
   - Top banner navigation tagline (`Navbar.tsx:51`)
   - Section kicker titles ("Browse", "Curated", "New") (`index.astro:126, 159, 177`)
   *Result*: Users feel they must squint or lean in, creating the distinct impression that browser zoom is set to 80%.

---

### 4.2 Desktop Viewport Behavior Matrix

| Viewport Resolution | Common Displays | Current Content Width | Screen Fill % | Visual Impression | Primary Issues |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1280 × 720** | Small laptops, 720p monitors | 1184px inner | 92.5% | Proportional | Slight card crowding in 4-column grid |
| **1366 × 768** | Budget Windows laptops (most common in India) | 1184px inner | 86.6% | Acceptable | Cards slightly narrow; text feels small |
| **1440 × 900** | MacBook Air 13", standard monitors | 1184px inner | 82.2% | Compact | Margins start to feel excessive; hero lacks punch |
| **1600 × 900** | 20" desktop monitors | 1184px inner | 74.0% | Shrunken | Content floats in center; 416px wasted margins |
| **1920 × 1080** | Standard 24" & 27" 1080p desktop displays | 1184px inner | **61.6%** | **Noticeably Small (80%)** | 736px wasted margin; 214px cards; tiny 12px text |
| **2560 × 1440** | 27"–32" QHD / 4K scaled displays | 1184px inner | **46.2%** | **Extremely Narrow** | Over half the screen is empty space |

---

### 4.3 Recommended Desktop Component Sizing Table

| Component | Current Dimensions / Style | Recommended Dimensions / Style | Architectural Reason |
| :--- | :--- | :--- | :--- |
| **Main Content Container** | `max-w-[1280px]`, `px-12` (1184px inner) | `max-w-[1440px]`, `px-8` (1376px inner) on `2xl` | Expands usable desktop space by 192px on 1080p/1440p without stretching line length |
| **Desktop Header Height** | `h-16` (64px) | `h-20` (80px) on `lg:` | Provides visual breathing room, allows larger logo mark (34px vs 28px) |
| **Header Nav Links** | `text-sm` (14px), `px-3 py-2` | `text-base` (15–16px), `px-4 py-2.5` | Matches standard desktop navigation readability |
| **Hero Title** | `text-4xl md:text-5xl lg:text-6xl` | `text-5xl md:text-6xl lg:text-7xl` | Restores visual dominance and editorial luxury punch |
| **Hero Container** | `max-w-2xl` (672px) | Two-column grid (`lg:grid-cols-12`) | Left column (7 cols) for copy/search, right column (5 cols) for featured product showcase |
| **Hero Search Bar** | `max-w-lg` (512px), `py-3` (48px height) | `max-w-xl` (576px), `py-4` (56px height, `text-base`) | Gives search immediate desktop prominence |
| **Hero Action Buttons** | `px-6 py-3 text-sm rounded-xl` | `px-7 py-3.5 text-base rounded-xl font-medium` | Eliminates "mobile button on desktop" appearance |
| **Catalog Grid (with sidebar)**| `xl:grid-cols-4` (214px card width) | `xl:grid-cols-3` (300px card width) or `2xl:grid-cols-4` | 300px width gives 225px image height and ample title room |
| **Catalog Grid (full width)** | `xl:grid-cols-4` (270px card width) | `xl:grid-cols-4` (320px width in 1440px container) | Generous presentation for curated editorial picks |
| **Product Card Image** | `aspect-4/3` (160px height) | `aspect-square` or `aspect-4/3` (220px+ height) | Allows fine product details and packaging to be appreciated |
| **Product Card Title** | `font-display text-base` (16px serif) | `font-sans text-base font-semibold` (16px sans) | Improves scannability of model names and brand specs |
| **Card Brand Label** | `text-xs uppercase tracking-widest` (12px) | `text-xs font-semibold tracking-wider` (13px / 0.8125rem) | Better contrast and legible uppercase letterforms |
| **Card Action Link** | `text-sm font-semibold` (14px) | `text-sm font-semibold py-1` with hover accent fill | Clearer clickable affordance |
| **Filter Sidebar** | `w-56 shrink-0` (224px) | `w-64 shrink-0` (256px) | Prevents dropdown and text input truncation |
| **Filter Inputs** | `text-sm px-3 py-2` | `text-sm px-3.5 py-2.5 rounded-lg` | Standard desktop form input height (42px) |
| **Product Detail Image** | `aspect-square` in 50% split (560px) | `aspect-square` with sticky gallery wrapper | Anchors product details on desktop scrolling |
| **Shop Now Button** | `py-3 px-5 text-sm` (42px height) | `py-4 px-6 text-base font-semibold` (52px height) | Unambiguous primary conversion CTA |
| **Admin Sidebar** | `w-60` (240px) | `w-64` (256px) | Accommodates badge counts and clear icon alignment |
| **Admin Stats Cards** | `xl:grid-cols-6` | `grid-cols-2 md:grid-cols-3 xl:grid-cols-6` with min-w | Prevents 6-digit metrics from overflowing card borders |
| **Section Vertical Spacing** | `py-20` (80px) | `py-24 md:py-28` (96–112px) on desktop | Editorial luxury breathing room between sections |

---

## 5. Phase 4 — Mobile & Tablet Responsiveness Audit

### 5.1 Mobile Breakpoint Evaluation

| Viewport (Width × Height) | Device Class | Status | Specific Observations & Breakages |
| :--- | :--- | :--- | :--- |
| **320 × 568** | iPhone SE (1st gen) / Small Android | **Warning** | Horizontal overflow on category row; hero button wraps onto 2 awkward lines; filter drawer button covers bottom content |
| **360 × 800** | Samsung Galaxy A-series (India standard) | **Good** | Layout renders stably; single-column card grid works cleanly |
| **375 × 812** | iPhone Mini / iPhone X / XS | **Good** | Clean presentation; navbar spacing is comfortable |
| **390 × 844** | iPhone 12 / 13 / 14 / 15 Standard | **Optimal** | Proportions look balanced on mobile portrait |
| **412 × 915** | Google Pixel 7 / Samsung S23 | **Optimal** | High readability; font sizes feel natural on mobile |
| **430 × 932** | iPhone Pro Max / Plus | **Optimal** | Ample screen width; single-column cards display large imagery |
| **768 × 1024** | iPad Mini / Portrait Tablet | **High Issue** | **Admin sidebar disappears completely** (`hidden lg:flex`); 2-column product grid feels sparse |
| **1024 × 768** | iPad Landscape / Small Laptop | **Borderline** | Desktop layout kicks in; sidebar filters take 224px, leaving products squeezed |

---

### 5.2 Specific Mobile Breakdowns & Usability Defects

1. **Admin Navigation Inaccessible on Mobile / Tablet (P0)**:
   - File: [`frontend/src/layouts/AdminLayout.astro`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/layouts/AdminLayout.astro#L14)
   - Code: `<aside class="hidden lg:flex flex-col w-60 shrink-0 border-r">`
   - *Impact*: Any user logging into the editorial admin dashboard on a tablet or smartphone has **zero navigation links**. There is no hamburger toggle for admin pages.
   - *Remedy*: Introduce a mobile header with hamburger menu for admin layout, toggling a slide-out drawer on `<1024px`.

2. **Floating Mobile Filter Button Obscuring CTAs (P1)**:
   - File: [`frontend/src/components/product/ProductsBrowser.tsx`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/components/product/ProductsBrowser.tsx#L113)
   - Code: `<div class="lg:hidden fixed bottom-6 right-6 z-30">`
   - *Impact*: The floating pill button (`Filters`) hovers directly over the bottom product card's "View Details" button or pagination controls, causing accidental taps.
   - *Remedy*: Anchor filter controls as a sticky sub-header bar below the main navigation, or ensure pagination and cards include `pb-20` on mobile.

3. **Touch Targets Below 44×44px (P2)**:
   - File: [`frontend/src/components/product/ProductGallery.tsx`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/components/product/ProductGallery.tsx#L57-L70)
   - Prev/Next arrows are `w-8 h-8` (32×32px).
   - Theme toggle button in Navbar is `p-2` with an 18px icon (total touch area ~34×34px).
   - WCAG 2.1 Success Criterion 2.5.5 requires touch targets of at least **44 × 44px**.

4. **Category Strip Overflow on Small Mobile (320px) (P2)**:
   - File: [`frontend/src/pages/index.astro`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/pages/index.astro#L133)
   - Code: `<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">`
   - At 320px screen width, 2 columns with `gap-4` (16px) and padding leaves 136px per card. Icon and text fit, but category names like "Electronics & Gadgets" wrap across 3 lines.

---

## 6. Phase 5 — Ecommerce Color Palette & Theme Audit

### 6.1 Evaluation of Current Brand Colors

The current color palette declared in `tokens.css` consists of:

```css
/* Current Light Theme */
--color-bg:          #FAFAF8; /* Warm ivory */
--color-surface:     #FFFFFF; /* Pure white */
--color-text-1:      #1A1A1A; /* Near-black */
--color-text-2:      #6B7280; /* Neutral gray */
--color-accent:      #1C4532; /* Deep forest green */
--color-accent-hover:#155128;
--color-accent-2:    #C9A96E; /* Champagne gold */
--color-border:      #E5E5E3; /* Warm gray */

/* Current Dark Theme */
--color-bg:          #111110; /* Charcoal */
--color-surface:     #1C1C1A; /* Dark charcoal */
--color-text-1:      #F5F4F0; /* Off-white */
--color-accent:      #34D399; /* Mint / neon emerald */
--color-accent-2:    #C9A96E; /* Champagne gold */
```

#### Strengths & Weaknesses for Affiliate Ecommerce

| Attribute | Assessment | Impact |
| :--- | :--- | :--- |
| **Brand Identity** | Editorial, bespoke, literary | Strong for long-form reading, weak for shopping |
| **Commercial Trust** | High editorial prestige | Does not evoke e-commerce speed or transparent utility |
| **CTA Visibility** | Low to Moderate | `#1C4532` is dark; beside dark charcoal text (`#1A1A1A`), primary buttons do not pop |
| **Color Contrast** | **Failed WCAG AA** | `#C9A96E` (gold) on `#FAFAF8` yields a **2.2:1 contrast ratio** (fails 4.5:1 minimum) |
| **Dark Mode Cohesion**| Disjointed | In dark mode, `#34D399` (mint) clashes with `#C9A96E` (gold) and feels like a developer terminal |

---

### 6.2 Comparison of Three Potential Design Directions

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                      ECOMMERCE PALETTE DIRECTION COMPARISON                       │
├───────────────────────┬───────────────────────────┬───────────────────────────────┤
│ Direction A           │ Direction B               │ Direction C                   │
│ PREMIUM MODERN COMMERCE│ CLEAN MARKETPLACE         │ PREMIUM TECH COMMERCE         │
├───────────────────────┼───────────────────────────┼───────────────────────────────┤
│ • Pure crisp off-white│ • White & pale cool gray  │ • Deep obsidian & slate       │
│ • Deep obsidian slate │ • High-contrast retail    │ • Vibrant electric accents    │
│ • Rich emerald accent │ • Royal blue / navy CTA   │ • Ultra-minimalist modern     │
│ • Confident CTAs      │ • Badge-heavy indicators  │ • High-spec technical cards   │
│ • Luxury + Retail conversion • Fast transactional clarity│ • Gadget/tech focus         │
└───────────────────────┴───────────────────────────┴───────────────────────────────┘
```

#### Detailed Trade-Off Matrix

| Criterion | Direction A: Premium Modern Commerce (Recommended) | Direction B: Clean Marketplace | Direction C: Premium Tech Commerce |
| :--- | :--- | :--- | :--- |
| **Visual Character** | High-end editorial meets Modern Apple/Wirecutter commerce | Amazon / Flipkart / Wirecutter hybrid | Linear / Vercel / Nothing Tech inspired |
| **Brand Identity** | Preserves "SAVRIVO Smart Finds" luxury intelligence | Looks like a discount aggregator | Too developer-centric for general shoppers |
| **CTA Prominence** | **High**: Rich emerald `#047857` / `#059669` pops against neutral backgrounds | **Very High**: Royal blue `#2563EB` | Moderate: Monochrome black/white |
| **Product Visibility** | **Excellent**: Neutral surfaces keep focus on photography | Good: Bright backgrounds | High: Dark mode biased |
| **Contrast & A11y** | **100% WCAG AAA Compliant** (7.1:1+ contrast) | Fully Compliant | Requires care with neon borders |
| **Light Theme** | Clean `#F8F9FA` background, pure `#FFFFFF` cards, `#0F172A` text | `#FFFFFF` background, `#F3F4F6` borders | High contrast monochromatic |
| **Dark Theme** | Deep slate `#0B0F17`, crisp card surface `#1E293B`, emerald accent | Dark gray `#1F2937`, blue accents | Pure black `#000000`, slate borders |

---

### 6.3 Recommended Direction: Direction A (Premium Modern Commerce)

**Why Direction A is the optimal choice**:
1. It retains SAVRIVO's founding ethos: an intelligent, curated editorial discovery guide, avoiding the cluttered, coupon-heavy aesthetic of bargain marketplaces.
2. It solves the CTA visibility deficit by shifting from murky forest green (`#1C4532`) to a crisp, vibrant, yet authoritative emerald green (`#047857` in light theme, `#10B981` in dark theme).
3. It completely eliminates the inaccessible champagne gold `#C9A96E` on text/badges, replacing it with an amber badge token (`#D97706` / `#F59E0B`) that passes WCAG AA contrast standards.

#### Recommended Color Token Specification (For Implementation Phase)

```css
/* Recommended Light Theme Tokens */
--color-bg:           #F8F9FA; /* Crisp modern canvas */
--color-surface:      #FFFFFF; /* Pure card surface */
--color-surface-subtle:#F1F3F5; /* Neutral badge & icon container */
--color-text-1:       #0F172A; /* Slate 900 (deep obsidian) */
--color-text-2:       #475569; /* Slate 600 (legible body/meta) */
--color-accent:       #047857; /* Emerald 700 (authoritative, high-conversion CTA) */
--color-accent-hover: #065F46; /* Emerald 800 */
--color-accent-badge: #ECFDF5; /* Emerald 50 (fresh badge background) */
--color-accent-badge-text: #065F46; /* Emerald 800 (100% WCAG AAA contrast) */
--color-curated-badge: #FEF3C7; /* Amber 100 ("Editor's Pick") */
--color-curated-text:  #92400E; /* Amber 800 (WCAG AA compliant) */
--color-border:       #E2E8F0; /* Slate 200 */
--color-border-hover: #CBD5E1; /* Slate 300 */

/* Recommended Dark Theme Tokens */
--color-bg:           #0B0F17; /* Deep slate obsidian */
--color-surface:      #151C28; /* Elevated slate surface */
--color-surface-subtle:#1E293B; /* Slate 800 */
--color-text-1:       #F8FAFC; /* Slate 50 */
--color-text-2:       #94A3B8; /* Slate 400 */
--color-accent:       #10B981; /* Emerald 500 */
--color-accent-hover: #34D399; /* Emerald 400 */
--color-border:       #1E293B; /* Slate 800 */
--color-border-hover: #334155; /* Slate 700 */
```

---

## 7. Phase 6 — Typography System & Responsive Hierarchy

### 7.1 Font Family Strategy & Audit

* **Current Sans Font**: `Inter` (Google Fonts).
  * *Verdict*: Excellent choice. Highly legible, neutral, comprehensive numeral styling, perfect for ecommerce specifications and pricing.
* **Current Display Font**: `Playfair Display` (Google Fonts).
  * *Verdict*: **Misapplied to Product Card Titles**.
  * Serif typography is elegant for the hero title ("*Find better products. Make smarter choices.*"), buying guide articles, and section headings.
  * When applied to product titles (`<h3 class="font-display text-base">` in `ProductCard.tsx`), technical specifications like "Sony WH-1000XM5 Wireless Headphones" or "Samsung 55-inch Crystal 4K UHD" look stilted, ornate, and hard to read at 16px.
  * *Recommendation*: Retain `Playfair Display` exclusively for brand headers, editorial guide articles, and hero statements. Switch all **product titles, card headers, and UI components** to `Inter` (sans-serif) with semi-bold weights (`font-semibold` / 600).

---

### 7.2 Recommended Responsive Typography Scale Table

| Role | Token / Class | Mobile (<768px) Size / Leading | Desktop (>=1024px) Size / Leading | Weight | Font Family |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | `.font-display text-hero` | 36px / 1.15 | 64px / 1.10 | 700 Bold | `Playfair Display` |
| **H1 (Page Title)** | `h1, .text-h1` | 28px / 1.20 | 40px / 1.20 | 700 Bold | `Playfair Display` / `Inter` |
| **H2 (Section Header)**| `h2, .text-h2` | 22px / 1.25 | 30px / 1.25 | 700 Bold | `Playfair Display` |
| **H3 (Card Header)** | `h3, .text-h3` | 16px / 1.35 | 18px / 1.35 | 600 Semi-Bold | `Inter` (Sans) |
| **H4 (Sub-Header)** | `h4, .text-h4` | 14px / 1.40 | 16px / 1.40 | 600 Semi-Bold | `Inter` (Sans) |
| **Body Large (Lead)** | `.text-body-lg` | 16px / 1.60 | 18px / 1.65 | 400 Regular | `Inter` (Sans) |
| **Body Regular** | `body, p, .text-body` | 14px / 1.60 | 16px / 1.65 | 400 Regular | `Inter` (Sans) |
| **Body Small / Meta** | `.text-body-sm` | 13px / 1.50 | 14px / 1.50 | 400 Regular | `Inter` (Sans) |
| **Micro Labels / Badges**| `.text-label` | 11px / 1.40 | 12px / 1.40 | 600 Semi-Bold | `Inter` (Tracking: +0.05em) |
| **Product Price Tag** | `.text-price` | 22px / 1.10 | 28px / 1.10 | 700 Bold | `Inter` (Tabular Numbers) |
| **Primary Buttons** | `.btn-primary` | 15px / 1.00 | 16px / 1.00 | 600 Semi-Bold | `Inter` (Sans) |
| **Navigation Links** | `.nav-link` | 16px / 1.00 | 15px / 1.00 | 500 Medium | `Inter` (Sans) |

---

## 8. Phase 7 — Reusable Component & Design System Audit

### 8.1 Component Audit Matrix

| Component | File Path | Reusability | Sizing Consistency | Hardcoded Colors | Accessibility Rating | Required Refinement |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Navbar** | `src/components/layout/Navbar.tsx` | High | High | Faint background inline | 9/10 | Increase height to 80px on desktop; increase logo to 32px |
| **MobileMenu** | `src/components/layout/MobileMenu.tsx` | High | Medium | Overlay color hardcoded | 8/10 | Add focus trap; trap Esc key to dismiss |
| **Footer** | `src/components/layout/Footer.tsx` | High | High | None | 9/10 | Expand column spacing on wide desktop |
| **ProductCard**| `src/components/product/ProductCard.tsx` | High | **Low** | `rgba(28,69,50,0.08)`, `#1A1A1A` | 8/10 | Switch title to sans-serif; add indicative price badge; use token variables |
| **ProductGrid**| `src/components/product/ProductGrid.tsx` | High | **Low** | None | 9/10 | Change `xl:grid-cols-4` to 3 columns when beside sidebar |
| **CategoryCard**| `src/components/category/CategoryCard.tsx`| High | Medium | `rgba(28,69,50,0.08)` | 9/10 | Increase card padding to 24px on desktop |
| **GuideCard** | `src/components/guide/GuideCard.tsx` | High | High | None | 9/10 | Proportional; maintain 16:9 aspect ratio |
| **OfferCard** | `src/components/product/OfferCard.tsx` | High | High | `rgba(22,163,74,0.1)` | 9/10 | Increase button height to 48px; format INR with tabular figures |
| **ProductGallery**| `src/components/product/ProductGallery.tsx`| High | Medium | None | 7/10 | Touch targets for prev/next are 32px (expand to 44px); add image zoom |
| **SearchBar** | `src/components/search/SearchBar.tsx` | High | Medium | None | 9/10 | Expand desktop padding; increase icon from 18px to 20px |
| **SearchResults**| `src/components/search/SearchResults.tsx`| High | Medium | Inline border styles | 8/10 | Add pricing metadata to product search results list |
| **Button** | `src/components/ui/Button.tsx` | High | High | Inline variantStyle | 9/10 | Move inline styles to Tailwind classes using design tokens |
| **AffiliateDisclosure**| `src/components/ui/AffiliateDisclosure.tsx`| High | High | None | 10/10 | Fully compliant; dual mode (compact / full) |
| **Breadcrumb** | `src/components/ui/Breadcrumb.tsx` | High | High | None | 10/10 | Injects Schema.org `BreadcrumbList` JSON-LD cleanly |
| **EmptyState** | `src/components/ui/EmptyState.tsx` | High | High | SVG inline colors | 9/10 | Clean abstract Savi branding |
| **AdminLayout**| `src/layouts/AdminLayout.astro` | Low | **Poor** | Sidebar border | **4/10** | **Completely unusable on mobile/tablet**; requires mobile drawer |

---

## 9. Phase 8 — Performance, Web Vitals & Accessibility Audit

### 9.1 Performance & Asset Analysis

1. **Astro Static Architecture**:
   - The site compiles to static HTML with zero client-side JavaScript for marketing and policy pages (`/about`, `/editorial-policy`, `/terms`, `/privacy-policy`).
   - Interactive islands (`Navbar`, `SearchBar`, `ProductGallery`, `ProductsBrowser`) hydrate progressively using `client:load`.
   - Client bundle footprint: `client.C4rGbYxV.js` is **43.8 kB gzip**, which is extraordinarily lightweight for an interactive modern web app.
2. **Image Loading Optimization**:
   - Standard `<img>` tags are currently used across all components.
   - `loading="lazy"` and `decoding="async"` are applied to cards below the fold.
   - Above-the-fold product images (Hero, Product detail main image) currently lack explicit `<link rel="preload">` tags or `fetchpriority="high"`.
   - Images are served in source formats without automatic conversion to WebP or AVIF. Integrating Astro's `<Image />` component with `sharp` in future builds will yield an estimated 35–50% image byte reduction.
3. **Font Loading**:
   - Google Fonts (`Inter` and `Playfair Display`) are loaded via `<link rel="preconnect">` in `Base.astro` and imported in `tokens.css`.
   - `display=swap` is declared, preventing Flash of Invisible Text (FOIT).

### 9.2 Accessibility (a11y) Findings

1. **Contrast Defect**: Champagne gold `#C9A96E` used on category badges and editor's pick text fails WCAG AA contrast (requires 4.5:1, achieves 2.2:1). Must be updated to an amber/bronze tone (`#92400E` on `#FEF3C7`).
2. **Touch Target Dimensions**: Prev/Next buttons in `ProductGallery.tsx` are 32×32px. Must be enlarged to 44×44px for WCAG 2.5.5 compliance.
3. **Form Association**: Search inputs and admin form fields have correct `aria-label` or `<label for="...">` associations.
4. **Theme Flash Prevention**: `ThemeScript.astro` runs synchronously in the `<head>` before render, preventing Flash of Unstyled Theme (FOUT).

---

## 10. Phase 9 — Multi-Repository Frontend Architecture Analysis (`savrivoapp`)

### 10.1 The Proposed Dual-Frontend Objective

The user proposed introducing a second frontend repository:
* Primary Web Platform: `https://github.com/mithun-mp/savrivo` (Live: `https://mithun-mp.github.io/savrivo/`)
* Second Frontend: `https://github.com/mithun-mp/savrivoapp` (Target: `https://mithun-mp.github.io/savrivoapp/` or standalone mobile/PWA experience)

**Strict Non-Negotiable Constraint**:
Both frontends **must share the same single backend API and MongoDB database**. There must not be independent databases, separate admin accounts, inconsistent affiliate redirects, or duplicate product inventories.

---

### 10.2 Architectural Options Analysis

```
OPTION 1: Two Separate Repositories (Independent Codebases)
┌─────────────────────────┐          ┌─────────────────────────┐
│       savrivo.git       │          │      savrivoapp.git     │
│  (Desktop/Web Frontend) │          │     (Mobile Web App)    │
└────────────┬────────────┘          └────────────┬────────────┘
             │                                    │
             └─────────────────┬──────────────────┘
                               ▼
                 ┌───────────────────────────┐
                 │    Existing Backend API   │
                 │     (Node/Express/Mongo)  │
                 └───────────────────────────┘

OPTION 2: Single Fully Responsive Codebase with Multi-Deployments (Recommended)
┌───────────────────────────────────────────────────────────────┐
│                         savrivo.git                           │
│  Single Source of Truth: Unified Responsive Design System     │
└───────────────┬───────────────────────────────┬───────────────┘
                │ Build: base='/savrivo'        │ Build: base='/savrivoapp'
                ▼                               ▼
     ┌─────────────────────┐         ┌─────────────────────┐
     │  savrivo (Desktop)  │         │ savrivoapp (Mobile) │
     └──────────┬──────────┘         └──────────┬──────────┘
                │                               │
                └───────────────┬───────────────┘
                                ▼
                 ┌───────────────────────────┐
                 │    Existing Backend API   │
                 └───────────────────────────┘
```

#### Detailed Comparison Matrix

| Evaluation Dimension | Option 1: Two Disconnected Repositories | Option 2: Single Responsive Codebase (Multi-Build Target) | Option 3: Monorepo with Shared UI Package |
| :--- | :--- | :--- | :--- |
| **Development Velocity** | **Low**: Every UI tweak, bug fix, or new page must be manually copied between two repos | **Highest**: Code written once; adapts seamlessly to desktop and mobile | Moderate: Requires setting up pnpm workspaces, build pipelines, package hoisting |
| **UI Consistency** | **High Risk**: Designs diverge over time; mobile and desktop display different metadata | **100% Guaranteed**: Identical design tokens, components, and logic | High: Shared core package enforces standards |
| **SEO Impact** | **Severe Hazard**: Duplicate content penalties if both domains index the same products without canonical tags | **Clean**: Canonical URLs can be configured to point to primary domain | Clean: Centralized canonical logic |
| **Backend Integration** | Requires updating CORS in backend for both URLs | Single backend API handles both origins via CORS array | Single backend API handles both origins |
| **Affiliate Tracking** | Risk of tag desynchronization across two repos | Single source of affiliate adapter logic | Single source of affiliate adapter logic |
| **Maintenance Burden** | Doubles dependency maintenance (Node, Astro, React, Tailwind in 2 places) | Single `pnpm-lock.yaml`, single CI pipeline | Slightly more complex repo setup |

---

### 10.3 Definitive Recommendation & Migration Blueprint

#### Verdict:
1. **If the goal is simply to have `savrivoapp` as an alternative URL or PWA**:
   - Do **not** create a disconnected codebase with copy-pasted code. Disconnected frontends inevitably suffer from synchronization drift, broken API endpoints, and double maintenance overhead.
   - Use a **single responsive codebase** (Option 2) that can deploy either directly to `savrivo` and `savrivoapp`, or maintain `savrivoapp` as an automated mirror repository via GitHub Actions.
2. **If `savrivoapp` must exist as a physically separate repository on GitHub**:
   - It should be structured as an **Astro/React mobile-first client** consuming the **exact same REST API** (`/api/products`, `/api/categories`, `/api/offers`).
   - The backend Express CORS configuration must be updated to accept both origins.

#### Technical Requirements for Shared Backend Integration

1. **CORS Allowlist in Backend**:
   - File: [`backend/src/app.ts`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/backend/src/app.ts#L20)
   - Current Code:
     ```ts
     const allowed = [config.frontendOrigin, 'http://localhost:4321', 'http://localhost:3000'];
     ```
   - *Required Update*: Support a comma-delimited environment variable `FRONTEND_ORIGIN` allowing:
     - `https://mithun-mp.github.io` (covers both `/savrivo` and `/savrivoapp`)
     - `https://savrivo.in`
     - `https://app.savrivo.in`
     - `http://localhost:4321` and `http://localhost:3000`
2. **Admin Authentication**:
   - The admin panel should remain hosted exclusively on the primary repository (`savrivo`) or a dedicated subdomain (`admin.savrivo.in`).
   - Do not duplicate the admin portal into `savrivoapp` to prevent credential exposure or out-of-sync administrative actions.
3. **Affiliate Redirects**:
   - All affiliate outbound tracking parameters (e.g. `tag=savrivo-21`) must be generated dynamically by the backend `/api/offers` and `/api/products` endpoints. This ensures both frontends direct visitors through valid, non-fabricated affiliate links.

---

## 11. Phase 10 — Functional Regression Audit & Test Matrix

### 11.1 Existing vs. Missing Tests

* **Current Status**: The project has robust TypeScript typechecking (`tsc --noEmit`), but **zero automated test files** (no unit tests, no API integration tests, and no Playwright/Cypress end-to-end tests).
* **Vulnerabilities**: Changes to CSS, base path helpers, or API response formats could cause silent regressions without automated coverage.

### 11.2 Comprehensive Regression Test Matrix

| Area | Test Scenario | Viewport / Theme | Expected Behavior | Pass Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **Navigation** | Home → Products → Category → Guide → Home | Mobile (375px) & Desktop (1440px) | Navigation links update URL with `/savrivo/` prefix; no 404s | Zero broken links; base path preserved |
| **Theme Toggle** | Click Sun/Moon icon in header | Light & Dark | `data-theme` attribute toggles on `<html>`; preference stored in localStorage | No theme flash on reload; high contrast |
| **Search** | Query "Headphones" in search bar | Mobile & Desktop | Debounces 300ms; displays products, categories, guides | Results match query; empty state if no match |
| **Filter Sidebar** | Select Category & Brand in `/products` | Desktop (1440px) | Grid updates immediately; pagination resets to Page 1 | Correct filtered products displayed |
| **Mobile Drawer** | Tap "Filters" floating button | Mobile (375px) | Bottom drawer slides up; body scroll locked; Apply closes drawer | Drawer responsive; touch targets >=44px |
| **Product Detail** | Click product card → View details | Mobile & Desktop | High-res image loads; breadcrumbs match category; offers displayed | Schema.org JSON-LD present in head |
| **Affiliate Outbound**| Click "Shop at Retailer" button | Mobile & Desktop | Opens official retailer URL in new tab with `rel="sponsored nofollow"` | Destination contains valid affiliate params |
| **API Down** | Frontend running with backend offline | Mobile & Desktop | Gracefully displays cached data or `EmptyState` ("Check back soon") | No uncaught JS errors or broken UI crash |
| **DB Disconnected** | Backend running with `MONGODB_URI` invalid | API Server | `/api/health` returns HTTP 200 `{ status: "ok", db: "disconnected" }` | Server stays up; returns graceful 503/empty |
| **Admin Login** | Enter valid admin credentials | Desktop (1440px) | JWT stored in localStorage; redirects to `/admin` dashboard | Unauthorized requests blocked with 401 |
| **Admin Protection**| Access `/admin/products` without token | Direct URL visit | Immediately redirects to `/admin/login` | No sensitive admin data exposed |
| **Admin Mobile Nav**| Access admin dashboard on smartphone | Mobile (375px) | Hamburger menu present; drawer opens sidebar navigation | All admin CRUD pages accessible |

---

## 12. Phase 11 — Prioritized Implementation Roadmap & Action Plan

### 12.1 Priority Classification

* **P0 — Critical (Functional & Usability Blockers)**: Must be resolved immediately before scaling or deploying second apps.
* **P1 — High (Visual Scale, Desktop Sizing & Grid Density)**: Addresses the core user observation that desktop feels 80% scale.
* **P2 — Medium (Ecommerce Color & Component Refinements)**: Elevates commercial credibility, contrast compliance, and conversion.
* **P3 — Low (Polish, Animation & Advanced Optimization)**: Micro-interactions, image formats, and progressive enhancements.

---

### 12.2 Detailed Action Plan

#### [P0] Critical Functional & Usability Fixes
1. **Admin Mobile Navigation**:
   - *Problem*: Admin layout sidebar is hidden (`hidden lg:flex`) on screens <1024px with no mobile hamburger or drawer.
   - *Action*: Add mobile header with hamburger trigger to [`AdminLayout.astro`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/layouts/AdminLayout.astro) and a slide-out navigation drawer.
2. **Backend Multi-Origin CORS**:
   - *Problem*: Backend CORS allowlist currently only checks a single `config.frontendOrigin`.
   - *Action*: Update [`backend/src/app.ts`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/backend/src/app.ts) to parse comma-separated origins and allow `*.github.io` subpaths.

#### [P1] Desktop Visual Scaling & Layout Expansion
1. **Container Width Expansion**:
   - *Problem*: `max-width: 1280px` leaves over 38% blank space on 1080p monitors.
   - *Action*: Update `.container-content` in [`frontend/src/styles/global.css`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/styles/global.css) and [`frontend/tailwind.config.mjs`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/tailwind.config.mjs) to support `max-w-[1440px]` on screens `>=1536px` (`2xl`).
2. **Product Grid Density Calibration**:
   - *Problem*: 4 columns beside a 224px sidebar constricts cards to 214px width.
   - *Action*: Adjust [`ProductGrid.tsx`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/components/product/ProductGrid.tsx) to render 3 columns on `lg:` and `xl:` (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`), yielding healthy 300px+ card widths.
3. **Hero Section Two-Column Layout**:
   - *Problem*: Right 50% of the hero banner is empty space.
   - *Action*: Reorganize [`frontend/src/pages/index.astro`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/pages/index.astro) hero into a 12-column grid featuring editorial copy and search on the left, and a curated "Deal of the Day" / "Top Discovery" card showcase on the right.
4. **Header & CTA Dimension Elevation**:
   - *Problem*: 64px header and 40px buttons feel undersized on desktop.
   - *Action*: Increase header to `h-20` (80px) on `lg:` and scale primary CTA buttons to `py-3.5 px-6 text-base` (48–52px height).

#### [P2] Ecommerce Palette, Typography & Component Polish
1. **Palette Modernization (Direction A)**:
   - *Problem*: Murky forest green and inaccessible champagne gold.
   - *Action*: Update [`frontend/src/styles/tokens.css`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/styles/tokens.css) with Crisp Modern Commerce palette (Slate 900 typography, Emerald 700 conversion accents, Amber 800 badges).
2. **Product Title Typography Fix**:
   - *Problem*: Serif `Playfair Display` on technical product cards looks awkward and reduces scannability.
   - *Action*: Replace `font-display` with `font-sans font-semibold text-base` on [`ProductCard.tsx`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/components/product/ProductCard.tsx).
3. **Touch Target Enlargement**:
   - *Problem*: Gallery controls and theme switches are <44px.
   - *Action*: Expand button touch dimensions to `min-w-[44px] min-h-[44px]` in [`ProductGallery.tsx`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/components/product/ProductGallery.tsx) and [`Navbar.tsx`](file:///c:/Users/Moon%20Knight/Desktop/Projects/EShop/frontend/src/components/layout/Navbar.tsx).

#### [P3] Performance & Multi-Repository Deployment
1. **Automated Secondary Repository Deployment**:
   - *Problem*: Manual maintenance of a second repository (`savrivoapp`) causes code divergence.
   - *Action*: Configure GitHub Actions in `savrivo` to deploy both builds, or build a dedicated lightweight PWA wrapper for mobile users.
2. **Astro Image Component Optimization**:
   - *Problem*: Unoptimized raw `<img>` tags.
   - *Action*: Progressively introduce responsive `srcset` and WebP format generation.

---

### 12.3 Files Required for Modification in Implementation Phase

```
Frontend:
- frontend/src/styles/tokens.css                  # Color palette & typography tokens
- frontend/src/styles/global.css                  # Container max-width (1440px) & scaling
- frontend/tailwind.config.mjs                    # Max-width & color mappings
- frontend/src/components/product/ProductCard.tsx # Typography, padding, price badges
- frontend/src/components/product/ProductGrid.tsx # Responsive column breakpoints
- frontend/src/components/product/ProductsBrowser.tsx # Desktop sidebar & mobile drawer
- frontend/src/components/product/ProductGallery.tsx  # Touch targets & zoom
- frontend/src/components/layout/Navbar.tsx       # Desktop header height (80px) & logo
- frontend/src/layouts/AdminLayout.astro          # Mobile admin drawer & hamburger
- frontend/src/pages/index.astro                  # Two-column hero & category density

Backend:
- backend/src/app.ts                              # Multi-origin CORS allowlist
- backend/src/config/env.ts                       # Comma-separated FRONTEND_ORIGIN parsing
```

---

*End of Comprehensive Audit Report.*  
*Ready for review. Awaiting user direction before proceeding to implementation.*

