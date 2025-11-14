import { FastifyInstance } from "fastify";
import { LeaderboardService } from "../services/leaderboard.service";
import { prisma } from "../lib/prisma";

export async function leaderboardRoutes(app: FastifyInstance) {

  // -------------------------------------
  // Submit Score (heavy endpoint)
  // LIMIT TO 10 req / 10 seconds per user
  // -------------------------------------
  app.post("/submit", {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "10 seconds",
        },
      },
      schema: {
        tags: ["Leaderboard"],
        description: "Submit or update a user's score.",
        body: {
          type: "object",
          required: ["userId", "score"],
          properties: {
            userId: { type: "string" },
            score: { type: "number" },
          },
        },
      },
    },
    async (request, reply) => {
      const { userId, score } = request.body as any;
      const data = await LeaderboardService.submitScore(userId, score);
      app.server.emit("score-updated", data);
      reply.send(data);
    }
  );

  // -------------------------------------
  // Top N Leaderboard
  // RELATIVELY LIGHT — allow more hits
  // -------------------------------------
  app.get("/top/:n", {
      config: {
        rateLimit: {
          max: 50,
          timeWindow: "10 seconds",
        },
      },
      schema: {
        tags: ["Leaderboard"],
        description: "Get top N leaderboard users.",
        params: {
          type: "object",
          properties: { n: { type: "number" } },
        },
      },
    },
    async (req, reply) => {
      const n = Number((req.params as any).n) || 10;
      const top = await LeaderboardService.topN(n);
      reply.send(top);
    }
  );

  // -------------------------------------
  // Get Rank (very light)
  // -------------------------------------
  app.get("/rank/:userId", {
      config: {
        rateLimit: {
          max: 100,
          timeWindow: "10 seconds",
        },
      },
      schema: {
        tags: ["Leaderboard"],
        description: "Get the rank and score of a user.",
        params: {
          type: "object",
          properties: { userId: { type: "string" } },
        },
      },
    },
    async (req, reply) => {
      const { userId } = req.params as any;
      reply.send(await LeaderboardService.getRank(userId));
    }
  );

  // -------------------------------------
  // Score History (medium)
  // -------------------------------------
  app.get("/history/:userId", {
      config: {
        rateLimit: {
          max: 30,
          timeWindow: "10 seconds",
        },
      },
      schema: {
        tags: ["Analytics"],
        description: "Get score history for a user.",
        params: {
          type: "object",
          properties: { userId: { type: "string" } },
        },
      },
    },
    async (req, reply) => {
      const { userId } = req.params as any;
      const logs = await prisma.scoreLog.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      reply.send(logs);
    }
  );
}
