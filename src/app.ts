import Fastify from "fastify";
import cors from "fastify-cors";
import { leaderboardRoutes } from "./routes/leaderboard.routes";
import { logger } from "./utils/logger";

export function buildApp() {
  const app = Fastify({ logger: false });

  app.register(cors, { origin: true });

  // register routes under /api
  app.register(async (fastify) => {
    fastify.register(leaderboardRoutes, { prefix: "/api/leaderboard" });
  });

  // optional: SSE endpoint at /api/leaderboard/stream
  app.get("/api/leaderboard/stream", (req, reply) => {
    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");
    reply.raw.write("retry: 10000\n\n");

    const onScore = (data: any) => {
      // send SSE
      reply.raw.write(`event: score\n`);
      reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // listen for internal event emitted in route
    app.server.on("score-updated", onScore);

    // cleanup on close
    reply.raw.on("close", () => {
      app.server.off("score-updated", onScore);
    });
  });

  return app;
}
