import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { leaderboardRoutes } from "./routes/leaderboard.routes";
import pino from "pino";

export function buildApp() {
  // -------------------------------
  // Create app instance with pino
  // -------------------------------
  const app = Fastify({
    logger: pino({
      level: process.env.LOG_LEVEL || "info",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    }),
  });

  // -------------------------------
  // Logging middleware
  // -------------------------------
  app.addHook("onRequest", async (req, reply) => {
    app.log.info(
      { method: req.method, url: req.url },
      "📥 Incoming request"
    );
  });

  // -------------------------------
  // CORS
  // -------------------------------
  app.register(cors, { origin: true });

  // -------------------------------
  // Global Rate Limit
  // -------------------------------
  app.register(rateLimit, {
    max: 100, 
    timeWindow: "1 minute",
    allowList: ["127.0.0.1"],
    ban: 2,
    errorResponseBuilder: (req, context) => ({
      statusCode: 429,
      error: "Too Many Requests",
      message: `Rate limit exceeded. Retry after: ${context.after}`,
    }),
  });

  // -------------------------------
  // API Routes
  // -------------------------------
  app.register(async (instance) => {
    instance.register(leaderboardRoutes, { prefix: "/api/leaderboard" });
  });

  // -------------------------------
  // SSE STREAM (real-time scores)
  // -------------------------------
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
