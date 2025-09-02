# LifeLine

**Your AI‑powered mental health companion**

> Check in. Get support. Feel better.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Monorepo Structure](#monorepo-structure)
4. [Prerequisites](#prerequisites)
5. [Quick Start](#quick-start)
6. [Environment Variables](#environment-variables)
7. [Run Locally](#run-locally)
8. [Build & Deploy](#build--deploy)
9. [API Endpoints (Summary)](#api-endpoints-summary)
10. [Security & Privacy](#security--privacy)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)
13. [License](#license)

---

## Features

* **Daily Mood Check‑in** with optional journaling
* **Personalized Wellness Plan** (mindfulness, movement, affirmations)
* **24/7 Crisis Support** (hotlines, text lines, grounding & breathing exercises)
* **Community Hub** with anonymous posting and themed groups
* **Curated Resources** (articles, podcasts, videos with summaries)
* **Privacy by Design**: encryption, anonymous mode, data export/delete

---

## Tech Stack

**Frontend**

* React + Vite (or CRA) and Tailwind CSS
* React Router

**Backend**

* Node.js + Express
* JSON Web Tokens (JWT) for auth
* MongoDB (Mongoose) for data

**AI/Personalization**

* Lightweight rules + optional LLM prompts for activity suggestions

**Infra**

* Vercel (frontend)
* Render/Heroku/Fly.io (backend)
* MongoDB Atlas (database)
* GitHub (CI/CD)

---

## Monorepo Structure

```
lifeline/
├─ client/                 # React + Tailwind UI
│  ├─ src/
│  ├─ index.html
│  ├─ vite.config.ts
│  └─ package.json
├─ server/                 # Node/Express API
│  ├─ src/
│  │  ├─ index.ts         # app bootstrap
│  │  ├─ routes/
│  │  ├─ controllers/
│  │  ├─ models/
│  │  └─ middleware/
│  └─ package.json
├─ .env.example            # root env template (optional)
└─ README.md
```

---

## Prerequisites

* **Node.js** 18+ and **npm** 9+ (or **pnpm**/**yarn**)
* **MongoDB Atlas** account (or local MongoDB)
* (Optional) **Vercel** account for hosting the client
* (Optional) **Render/Heroku/Fly.io** for hosting the server

> Verify versions: `node -v` and `npm -v`

---

## Quick Start

```bash
# 1) Clone
git clone https://github.com/<your-username>/lifeline.git
cd lifeline

# 2) Install deps
cd client && npm i && cd ..
cd server && npm i && cd ..

# 3) Copy envs from templates
cp client/.env.example client/.env
cp server/.env.example server/.env

# 4) Run dev (two terminals)
npm run dev -w client
npm run dev -w server
```

---

## Environment Variables

Create `.env` files in **client/** and **server/**.

**client/.env** (Vite)

```
VITE_API_BASE_URL=https://localhost:5001
VITE_APP_NAME=LifeLine
VITE_ENABLE_ANON_MODE=true
```

**server/.env**

```
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/lifeline
JWT_SECRET=change_me_to_a_long_random_string
CORS_ORIGIN=http://localhost:5173
# Optional provider keys (if you enable LLM prompts)
OPENAI_API_KEY=
COHERE_API_KEY=
```

> **Tip:** Never commit real `.env` files. Keep `.env.example` with placeholders.

---

## Run Locally

### 1) Frontend (client)

```bash
cd client
npm run dev            # starts Vite dev server (default http://localhost:5173)
npm run build          # production build
npm run preview        # preview production build locally
```

### 2) Backend (server)

```bash
cd server
npm run dev            # starts nodemon on http://localhost:5001
npm run start          # start without nodemon
npm run lint           # lint server code
```

### 3) Example API smoke check

```bash
curl http://localhost:5001/health
# => { "ok": true }
```

---

## Build & Deploy

### Frontend → Vercel

1. Push the repo to GitHub.
2. Import the **client/** folder in Vercel → *Project Settings → Root Directory = client*.
3. Environment → add `VITE_API_BASE_URL` pointing to your deployed server.
4. Deploy. Vercel will auto-detect Vite/React and build.

### Backend → Render/Heroku (example: Render)

1. Create a new **Web Service** from your GitHub repo.
2. Root directory: `server`
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`
5. Add env vars from `server/.env` (especially `MONGODB_URI`, `JWT_SECRET`).
6. After deploy, copy the public URL and set `VITE_API_BASE_URL` in Vercel to this URL.

### Database → MongoDB Atlas

1. Create a Cluster → Database Access → add database user
2. Network Access → allow your server’s IP or `0.0.0.0/0` (dev only)
3. Get connection string and place in `MONGODB_URI`.

---

## API Endpoints (Summary)

```
GET   /health                            # service health
POST  /auth/register
POST  /auth/login

# Mood & Journal
GET   /mood                              # list entries (auth)
POST  /mood                              # create entry {rating, note}

# Wellness Plan
GET   /plan/today                        # personalized activities
POST  /plan/complete/:activityId         # mark done

# Community (anonymous supported)
GET   /community/groups
GET   /community/posts?groupId=...
POST  /community/posts                   # {groupId, text}

# Resources
GET   /resources                         # curated list w/ types & ratings
```

> Routes are illustrative; adjust to your implementation.

---

## Security & Privacy

* All user data encrypted at rest (database) and in transit (HTTPS)
* JWTs scoped & short‑lived; refresh flow recommended
* **Anonymous Mode**: strip identifiers from community posts
* **Data Portability**: export & delete my data endpoints
* Role‑based access for future therapist/coach features

> **Important:** Include crisis disclaimers and provide 24/7 hotlines. This app does **not** replace professional care.

---

## Troubleshooting

* **CORS errors**: ensure `CORS_ORIGIN` matches your client URL
* **Mongo connection fails**: check IP allow‑list and credentials
* **401/403**: missing/expired JWT; log in again
* **Vercel 404 on refresh**: enable SPA fallback or set `vercel.json` rewrites
* **Render cold starts**: consider Pro plan or keep‑alive pings

---

## Contributing

1. Fork the repo & create a feature branch
2. Write clear commit messages
3. Add/update tests where feasible
4. Open a PR with screenshots and a short demo

---

## License

MIT © <Dharshana Uvaraj and Prerana Banda>
