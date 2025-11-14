# 🏆 Hero Leaderboard API + Realtime Dashboard

A high‑performance **Fastify + Redis leaderboard API** with real‑time updates (SSE), PostgreSQL analytics logging, Swagger documentation, rate limiting, request logging (Pino), and a polished Next.js dashboard UI.

This project is built as a **portfolio hero project** showcasing strong backend engineering skills:
- Scalable architecture  
- Realtime communication  
- Redis sorted‑set ranking  
- PostgreSQL analytics  
- Clean code + validation  
- Developer experience (DX) enhancements  
- Production‑ready features (Docker, logging, rate limits)

---

## 🚀 Features

### **Backend (Fastify)**
- Built with **Fastify** (super fast, low‑overhead)
- Realtime score updates using **Server‑Sent Events (SSE)**
- Redis **Sorted Sets** for fast ranking (O(log n) updates)
- PostgreSQL + Prisma for analytics logging
- **Rate limiting** (global + per‑route)
- **Swagger API documentation**
- **Pino logging** with pretty output
- **Zod validation**
- Clean service / route / lib structure
- Health check endpoint

### **Frontend (Next.js Dashboard)**
- Live updating leaderboard UI
- TailwindCSS + shadcn/ui styling
- Smooth table UI with animations
- Real‑time updates every 1.5s
- Centered responsive container

---

## 🗂 Project Structure

```
hero-leaderboard/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   │   └── leaderboard.routes.ts
│   ├── services/
│   │   └── leaderboard.service.ts
│   ├── lib/
│   │   ├── redis.client.ts
│   │   └── prisma.ts
│   ├── utils/
│   │   └── logger.ts
│   └── ...
├── hero-leaderboard-dashboard/ (Next.js UI)
├── .env
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🔧 Tech Stack

### **Backend**
- Node.js
- Fastify
- Redis (ioredis)
- PostgreSQL + Prisma
- Pino logger
- Zod validation
- Fastify CORS
- Fastify Rate Limit
- Swagger (OpenAPI)

### **Frontend**
- Next.js 14+ App Router
- TailwindCSS
- shadcn/ui
- Client‑side polling + animations

---

## ⚙️ Environment Variables

`.env`:

```
# App
PORT=4000
NODE_ENV=development
LOG_LEVEL=info

# Redis
REDIS_URL=redis://localhost:6379

# PostgreSQL (Analytics)
DATABASE_URL="postgresql://postgres:123456@localhost:5432/hero_leaderboard?schema=public"
```

---

## 🛠 Installation & Setup

### **1. Install dependencies**
```
npm install
```

### **2. Start Redis (Docker recommended)**
```
docker run -d --name hero-redis -p 6379:6379 redis
```

### **3. Apply Prisma migrations**
```
npx prisma migrate dev
```

### **4. Start backend**
```
npm run dev
```

Backend will run at:  
👉 http://localhost:4000

### **5. Start dashboard**
```
cd hero-leaderboard-dashboard
npm install
npm run dev
```

Dashboard UI at:  
👉 http://localhost:3000

---

## 🧪 API Endpoints

### **Submit score**
`POST /api/leaderboard/submit`
```json
{
  "userId": "moataz",
  "score": 120
}
```

### **Top N**
`GET /api/leaderboard/top/10`

### **User rank**
`GET /api/leaderboard/rank/:userId`

### **User score history**
`GET /api/leaderboard/history/:userId`

### **Live score stream**
`GET /api/leaderboard/stream`

---

## 📊 Realtime SSE

Connecting to the realtime endpoint:
```js
const es = new EventSource("http://localhost:4000/api/leaderboard/stream");
es.onmessage = (ev) => console.log(JSON.parse(ev.data));
```

---

## 🧰 Development Features

### **Swagger Docs**
Auto‑generated docs at:
👉 http://localhost:4000/docs

---

## 🐳 Docker Support

### Start Redis + API together:
```
docker compose up --build
```

---

## 🧹 Scripts

```
npm run dev      # Start FAST refresh backend
npm run build    # Build TS → JS
npm run start    # Run production build
npm run prisma   # Prisma commands
```

---

## ⭐ Why this project is a strong portfolio piece

- Uses **real production tools**
- Demonstrates **backend performance optimization**
- Full CRUD + real‑time system
- Redis sorted sets (used by real leaderboard systems)
- Clean & documented API
- TypeScript everywhere
- A polished dashboard that adds visual impact

This is the type of project that **grabs client attention**—it proves backend ability instantly.

---

## 📬 Author

Developed by **Moataz Tarek**  
For portfolio, client outreach, and demonstrating backend expertise.

---

## 📄 License
MIT
