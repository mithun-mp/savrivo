# SAVRIVO — Production Deployment Guide

This guide details how to deploy the SAVRIVO platform to production using **GitHub Pages** for the frontend and **Render** for the backend API, backed by **MongoDB Atlas**.

---

## 1. Architecture Split

| Component | Platform | Type | Custom Domain Ready |
|---|---|---|---|
| **Frontend** | GitHub Pages | Static HTML/CSS/JS (Astro) | Yes (e.g. `savrivo.in`) |
| **Backend** | Render | Node.js Web Service | Yes (e.g. `api.savrivo.in`) |
| **Database** | MongoDB Atlas | Managed Cloud M0/M10 | Yes |

---

## 2. Database: MongoDB Atlas Setup

The SAVRIVO MongoDB Atlas cluster is provisioned under:
- **Atlas Project:** `Project 0`
- **Cluster Name:** `SAVRIVO`
- **Cluster Hostname:** `savrivo.qlvie1u.mongodb.net`
- **Database Name:** `savrivo`
- **Database Username:** `mithunmpmail_db_user`

### Connection String Template:
```
mongodb+srv://mithunmpmail_db_user:<DB_PASSWORD>@savrivo.qlvie1u.mongodb.net/savrivo?retryWrites=true&w=majority&appName=SAVRIVO
```

### Remaining Manual Atlas Steps:
1. In [MongoDB Atlas Console](https://cloud.mongodb.com) → **Security** → **Network Access**:
   - Ensure an IP access entry `0.0.0.0/0` ("Allow Access from Anywhere") is active so Render's dynamic web service instances can establish connections.
2. In **Security** → **Database Access**:
   - Confirm user `mithunmpmail_db_user` has `readWrite@savrivo` (or `readWriteAnyDatabase`) privileges.
   - Note the user password to supply in Render's environment variables (never commit this password to Git).

---

## 3. Backend: Deploying to Render

1. Sign in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Web Service**.
3. Connect the repository `mithun-mp/savrivo` (or link your GitHub account).
4. Configure the service settings:
   - **Name:** `savrivo-backend`
   - **Region:** Singapore or Frankfurt (lowest latency to India)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `pnpm install && pnpm run build`
   - **Start Command:** `node dist/server.js`
   - **Plan:** Free or Starter

5. Configure Environment Variables on Render:
   | Variable | Value | Notes |
   |---|---|---|
   | `NODE_VERSION` | `20.18.0` | Pin Node.js 20 LTS (matches `.node-version`) |
   | `NODE_ENV` | `production` | Enables production optimizations and strict error masks |
   | `PORT` | `10000` | Standard Render web service port |
   | `MONGODB_URI` | `mongodb+srv://mithunmpmail_db_user:<DB_PASSWORD>@savrivo.qlvie1u.mongodb.net/savrivo?retryWrites=true&w=majority&appName=SAVRIVO` | Insert actual password for user |
   | `JWT_SECRET` | *Strong 64+ char random string* | Used for editorial admin JWT tokens |
   | `JWT_EXPIRES_IN` | `7d` | Token validity |
   | `ADMIN_EMAIL` | `admin@savrivo.in` | Primary administrator account email |
   | `ADMIN_PASSWORD_HASH` | *bcrypt hash* | Generated bcrypt hash (cost >= 12) |
   | `FRONTEND_ORIGIN` | `https://mithun-mp.github.io` | Origin for both `savrivo` and `savrivoapp` |

6. Click **Create Web Service**.
7. Once deployed, verify health:
   ```bash
   curl -i https://savrivo-backend.onrender.com/api/health
   # Expected response: 200 OK {"success":true,"data":{"status":"ok","db":"connected"}}
   ```
8. (Optional) Run database seed from Render's **Shell** tab:
   ```bash
   pnpm run seed
   ```

---

## 4. Frontend: Deploying to GitHub Pages

The repository contains an automated GitHub Actions workflow at [`.github/workflows/frontend-deploy.yml`](../.github/workflows/frontend-deploy.yml).

1. In your GitHub repository, navigate to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Navigate to **Settings** → **Secrets and variables** → **Actions**.
4. Add a Repository Secret:
   - **Name:** `PUBLIC_API_URL`
   - **Value:** `https://savrivo-backend.onrender.com/api` (your deployed Render URL)
5. Push to `main` (or trigger the workflow manually from the **Actions** tab).
6. The workflow will:
   - Checkout code
   - Install dependencies via pnpm
   - Run `astro build` injecting `PUBLIC_API_URL`
   - Deploy `dist/` directly to GitHub Pages
7. When you acquire a custom domain (e.g. `savrivo.in`), add it under **Settings** → **Pages** → **Custom domain** and configure your DNS `CNAME` or `A` records.

---

## 5. Security & Verification Checklist

- [ ] `MONGODB_URI` contains secure credentials and does not use root cluster user.
- [ ] `JWT_SECRET` is strong (min 64 chars).
- [ ] CORS is restricted to your production frontend domain (`FRONTEND_ORIGIN`).
- [ ] Backend health endpoint returns `{"success": true, "data": {"status": "ok", "db": "connected"}}`.
- [ ] Admin portal is accessible only via `/admin/login` and rejects unauthenticated requests.
- [ ] Affiliate links have `rel="sponsored nofollow noopener noreferrer"`.
- [ ] All sensitive credentials remain exclusively in server environment variables.

