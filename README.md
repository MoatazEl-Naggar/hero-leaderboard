# 🏆 Hero Leaderboard API — Production-Ready Backend with Realtime Updates

A fast, scalable, real-time leaderboard system built for high-traffic apps.

This backend is designed to impress **Upwork clients**, **SaaS founders**, and **technical recruiters** by showcasing:

- ⚡ High-performance API architecture (**Fastify + Redis**)  
- 🔥 Real-time scoreboard updates (**SSE**)  
- 📊 Analytics logging (**PostgreSQL + Prisma**)  
- 🏢 Enterprise-level features (rate limiting, validation, logging, Swagger docs)  
- 🧼 Clean, modern codebase following industry standards  
- 🎨 A polished Next.js dashboard UI  

If you're looking for a developer who builds **production-quality**, **scalable backend systems** — this project shows exactly that.

---

# 🚀 What This Project Delivers

## ✔ Blazing-fast leaderboard API
- Built with **Fastify** (up to 4× faster than Express)
- Uses **Redis Sorted Sets** for O(log n) ranking
- Realtime updates using **Server-Sent Events (SSE)**

## ✔ Built-in analytics engine
Every score submission is logged to PostgreSQL:

- Track user score history
- Analyze performance
- Build admin dashboards & insights

## ✔ Frontend dashboard included
A beautiful, modern leaderboard:

- Next.js App Router  
- TailwindCSS  
- shadcn/ui components  
- Smooth ranking animations  
- Fully responsive  

---

# ✔ Production-grade backend features

| Feature | Status |
|--------|--------|
| Redis caching | ✅ |
| PostgreSQL (Prisma ORM) | ✅ |
| Swagger API docs | ✅ |
| Zod validation | ✅ |
| Rate limiting | ✅ |
| Pino request logging | ✅ |
| Docker support | ✅ |
| Clean service architecture | ✅ |

---

# 🗂 Project Structure

```
hero-leaderboard/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.ts               # Fastify setup + plugins
│   ├── server.ts            # Server bootstrap
│   ├── routes/
│   │   └── leaderboard.routes.ts
│   ├── services/
│   │   └── leaderboard.service.ts
│   ├── lib/
│   │   ├── redis.client.ts
│   │   └── prisma.ts
│   ├── validations/
│   │   └── leaderboard.validation.ts
│   └── utils/
│       ├── logger.ts
│       └── validate.ts
├── hero-leaderboard-dashboard/ (Next.js UI)
└── README.md
```

---

# 🧪 API Endpoints

## **Submit score**
```
POST /api/leaderboard/submit
```
Body:
```json
{
  "userId": "Moataz",
  "score": 150
}
```

## **Top N leaderboard**
```
GET /api/leaderboard/top/10
```

## **Get rank for a user**
```
GET /api/leaderboard/rank/Moataz
```

## **Score history**
```
GET /api/leaderboard/history/Moataz
```

## **Realtime stream**
```
GET /api/leaderboard/stream
```

---

# ⚙️ Backend Setup

### 1. Install dependencies
```
npm install
```

### 2. Start Redis (Docker recommended)
```
docker run -d --name hero-redis -p 6379:6379 redis
```

### 3. Apply Prisma migrations
```
npx prisma migrate dev
```

### 4. Start the backend
```
npm run dev
```

Backend runs at:  
👉 http://localhost:4000

---

# 🖥 Dashboard Setup

```
cd hero-leaderboard-dashboard
npm install
npm run dev
```

Dashboard UI:  
👉 http://localhost:3000

---

# 📈 Why This Project Impresses Clients

This project demonstrates:

## 🧠 Technical Ability
- Real-time systems  
- High-performance backend engineering  
- Redis mastery  
- TypeScript + Prisma  
- API architecture  

## 🧰 Professional Practices
- Error handling  
- Logging & monitoring  
- Validation  
- Rate limiting  
- Swagger documentation  
- Clean folder structure  

## 💼 Business Value
This architecture can power:

- ✔ Gaming leaderboards  
- ✔ Quiz/competition apps  
- ✔ Fitness & challenge apps  
- ✔ Trading competitions  
- ✔ Learning platforms  
- ✔ Any scoring or ranking system  

---

# 👤 Author

**Moataz Tarek**  
Backend Engineer — Realtime Systems, API Design, Scalable Architectures  

If you're reviewing this for hiring or collaboration, feel free to reach out.

