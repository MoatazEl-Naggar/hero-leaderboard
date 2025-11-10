import { FastifyInstance } from "fastify";
import { LeaderboardService } from "../services/leaderboard.service";
import { prisma } from "../lib/prisma";

export async function leaderboardRoutes(fastify: FastifyInstance) {
  // submit score
  fastify.post("/submit", async (request, reply) => {
    const body = request.body as any;
    const { userId, score } = body;
    if (!userId || typeof score !== "number") {
      return reply.status(400).send({ error: "userId and numeric score required" });
    }
    const result = await LeaderboardService.submitScore(String(userId), score);
    // optionally notify subscribers via SSE or WS — we'll set that in server.ts
    fastify.server.emit("score-updated", result);
    return reply.send(result);
  });

  // top N
  fastify.get("/top/:n", async (request, reply) => {
    const params = request.params as any;
    const n = parseInt(params.n) || 10;
    const top = await LeaderboardService.topN(n);
    return reply.send(top);
  });

  // get rank
  fastify.get("/rank/:userId", async (request, reply) => {
    const params = request.params as any;
    const data = await LeaderboardService.getRank(String(params.userId));
    return reply.send(data);
  });

  // Score history for a user
  fastify.get("/history/:userId", async (request, reply) => {
    const params = request.params as any;
    const logs = await prisma.scoreLog.findMany({
      where: { userId: String(params.userId) },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return reply.send(logs);
  });
}
