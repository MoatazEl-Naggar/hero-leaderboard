import { redis } from "../lib/redis.client";
import { prisma } from "../lib/prisma";

const KEY = "leaderboard:global";

export const LeaderboardService = {
  // submit score: Redis + Postgres logging
  async submitScore(userId: string, score: number) {
    // Update score in Redis
    await redis.zadd(KEY, score.toString(), userId);

    // Log score event in database (analytics)
    await prisma.scoreLog.create({
      data: { userId, score },
    });

    // Get current rank + score
    const rank = await redis.zrevrank(KEY, userId);
    const currentScore = await redis.zscore(KEY, userId);

    return {
      userId,
      score: Number(currentScore),
      rank: rank === null ? null : rank + 1,
    };
  },

  async topN(n = 10) {
    const raw = await redis.zrevrange(KEY, 0, n - 1, "WITHSCORES");
    const res = [];
    for (let i = 0; i < raw.length; i += 2) {
      res.push({ userId: raw[i], score: Number(raw[i + 1]) });
    }
    return res;
  },

  async getRank(userId: string) {
    const rank = await redis.zrevrank(KEY, userId);
    const score = await redis.zscore(KEY, userId);
    return {
      userId,
      rank: rank === null ? null : rank + 1,
      score: score ? Number(score) : null,
    };
  },
};
