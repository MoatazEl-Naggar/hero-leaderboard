import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { leaderboardRoutes } from "./routes/leaderboard.routes";
import { logger } from "./utils/logger";

export function buildApp() {
  const app = Fastify({ logger: false });

  // CORS
  app.register(cors, { origin: true });

  // GLOBAL RATE LIMIT
  app.register(rateLimit, {
    max: 100,              // 100 requests
    timeWindow: "1 minute", // per minute
    allowList: ["127.0.0.1"], // localhost unlimited (optional)
    ban: 2,                // Ban user temporarily if they abuse
    errorResponseBuilder: (req, context) => {
      return {
        statusCode: 429,
        error: "Too Many Requests",
        message: `Rate limit exceeded: ${context.after}`,
      };
    },
  });

  // API routes under /api/leaderboard
  app.register(async (fastify) => {
    fastify.register(leaderboardRoutes, { prefix: "/api/leaderboard" });
  });

  // SSE endpoint (stream)
  app.get("/api/leaderboard/stream", (req, reply) => {
    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");
    reply.raw.write("retry: 10000\n\n");

    const onScore = (data: any) => {
      reply.raw.write(`event: score\n`);
      reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    app.server.on("score-updated", onScore);

    reply.raw.on("close", () => {
      app.server.off("score-updated", onScore);
    });
  });

  return app;
}
