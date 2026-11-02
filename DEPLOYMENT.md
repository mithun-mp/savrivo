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

1. Create a free M0 cluster or production M10 cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database named `savrivo`.
3. In **Database Access**, create a user with `readWrite` access to `savrivo`.
4. In **Network Access**, add `0.0.0.0/0` (Allow Access from Anywhere) to permit connections from Render's dynamic IP addresses.
5. Copy your connection string:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/savrivo?retryWrites=true&w=majority
   ```

---

## 3. Backend: Deploying to Render

1. Sign in to [Render](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository containing the SAVRIVO project.
4. Configure the service settings:
   - **Name:** `savrivo-backend`
   - **Region:** Singapore or Frankfurt (closest to Indian users)
   - **Branch:** `main` (or `master`)
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `pnpm install && pnpm run build`
   - **Start Command:** `node dist/server.js`
   - **Plan:** Free or Starter

5. Add Environment Variables on Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render defaults to 10000)
   - `MONGODB_URI`: *Your MongoDB Atlas connection URI*
   - `JWT_SECRET`: *A secure random string (64+ characters)*
   - `JWT_EXPIRES_IN`: `7d`
   - `FRONTEND_ORIGIN`: `https://<your-username>.github.io` (or your custom domain `https://savrivo.in`)
   - `ADMIN_EMAIL`: *Your primary editorial admin email*

6. Click **Create Web Service**.
7. Note down your Render service URL (e.g., `https://savrivo-backend.onrender.com`).
8. Run the database seed from Render's Shell tab or locally pointing to Atlas:
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

