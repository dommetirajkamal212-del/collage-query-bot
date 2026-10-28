# 🏛️ St Mary's Institutions — AI Query Bot & Campus Information Desk

An AI-powered, modern virtual information desk and interactive query portal for **St Mary's Engineering College (SMEC)**, **St Mary's Group of Institutions (SMGI)**, and **St Mary's Rehabilitation University (SMRU)** at Deshmukhi Campus, Hyderabad.

---

## 🌟 Key Features

1. **💬 Conversational AI Query Assistant:**
   - Instant answers on admissions, courses, fee structures, eligibility criteria, and hostel facilities.
   - Quick inquiry suggestion chips.
   - **Voice Input (STT):** Microphone button powered by the Web Speech API.
   - **Audio Playback (TTS):** Bot voice responses with one-click toggle.
   - One-click copy answer to clipboard.

2. **🏛️ Interactive Campus Directory:**
   - Switch between **SMEC** (Est. 1996, Autonomous, JNTUH affiliated), **SMGI** (Pharmacy, Engineering, Diploma), and **SMRU** (Telangana Act 10 of 2026, 120-acre campus).
   - Structured categories: About, Courses Offered, Fee Structure, Admissions, Facilities, and Contact Directory.

3. **⚖️ Institution Comparison Matrix:**
   - Side-by-side comparison table of approvals, affiliations, founding years, degrees, and fee ranges.

4. **📊 Course & Fee Finder:**
   - Searchable, filterable catalogue across all degree programs with entrance exam requirements and fee pills.

5. **🌓 Dark & Parchment Modes:**
   - High-end glassmorphic academic aesthetic with one-click theme switcher.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start
```

Visit `http://localhost:3000` in your browser.

For hot-reload during development:
```bash
npm run dev
```

---

## ☁️ Deploying to Render

This repository is pre-configured with `render.yaml` for zero-configuration, 1-click deployment on Render's free tier.

### Option A: Deploy via GitHub (Recommended)

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: College Query Bot ready for Render"
   git branch -M main
   # Create a repository on github.com, then run:
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [dashboard.render.com](https://dashboard.render.com/) and click **New +** -> **Web Service**.
   - Connect your GitHub repository.
   - Render will auto-detect the configuration, or set:
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** `Free`
     - **Health Check Path:** `/healthz`
   - Click **Deploy Web Service**! Render will provide your live URL (e.g., `https://college-query-bot.onrender.com`).

### Option B: Deploy via Render Blueprints

- In Render Dashboard, click **Blueprints** -> **New Blueprint Instance**.
- Connect your GitHub repository.
- Render automatically reads `render.yaml` and deploys the web service with all settings configured.

---

## 📡 API Endpoints

- `GET /healthz` — Service health check for Render uptime monitoring.
- `GET /api/colleges` — Retrieves full structured JSON knowledge base.
- `POST /api/query` — Accepts `{ "query": "string", "instituteId": "smec" | "smgi" | "smru" }` and returns structured query response with recommendations.
