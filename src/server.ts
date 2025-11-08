import { buildApp } from "./app";
import { redis } from "./lib/redis.client";
import { logger } from "./utils/logger";
import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT || 4000);

async function start() {
  const app = buildApp();
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    logger.info(`🚀 Fastify server listening on ${PORT}`);
  } catch (err) {
    logger.error("Failed to start", err);
    process.exit(1);
  }
}

start();
