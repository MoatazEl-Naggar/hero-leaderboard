import { redis } from "../lib/redis.client";
import { prisma } from "../lib/prisma";

const KEY = "leaderboard:global";

export const LeaderboardService = {
  async submitScore(userId: string, score: number) {
    try {
      // Redis update
      await redis.zadd(KEY, score.toString(), userId);

      // Analytics logging
      await prisma.scoreLog.create({
        data: { userId, score },
      });

      // Rank + score
      const rank = await redis.zrevrank(KEY, userId);
      const currentScore = await redis.zscore(KEY, userId);

      return {
        userId,
        score: Number(currentScore),
        rank: rank === null ? null : rank + 1,
      };
    } catch (err: any) {
      console.error("❌ Error in submitScore:", err);
      throw new Error("Failed to submit score");
    }
  },

  async topN(n = 10) {
    try {
      const raw = await redis.zrevrange(KEY, 0, n - 1, "WITHSCORES");
      const res = [];
      for (let i = 0; i < raw.length; i += 2) {
        res.push({ userId: raw[i], score: Number(raw[i + 1]) });
      }
      return res;
    } catch (err: any) {
      console.error("❌ Error fetching top N:", err);
      throw new Error("Failed to fetch leaderboard");
    }
  },

  async getRank(userId: string) {
    try {
      const rank = await redis.zrevrank(KEY, userId);
      const score = await redis.zscore(KEY, userId);
      return {
        userId,
        rank: rank === null ? null : rank + 1,
        score: score ? Number(score) : null,
      };
    } catch (err: any) {
      console.error("❌ Error fetching rank:", err);
      throw new Error("Failed to fetch rank");
    }
  },
};
