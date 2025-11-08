import { redis } from "../lib/redis.client";

const KEY = "leaderboard:global";

export const LeaderboardService = {
  // score submitted (higher is better)
  async submitScore(userId: string, score: number) {
    // ZADD uses score (float). Use NX/XX as needed.
    await redis.zadd(KEY, score.toString(), userId);
    // Return rank and score
    const rank = await redis.zrevrank(KEY, userId); // 0-based
    const currentScore = await redis.zscore(KEY, userId);
    return { userId, score: Number(currentScore), rank: rank === null ? null : rank + 1 };
  },

  // top N
  async topN(n = 10) {
    // ZREVRANGE with scores
    const raw = await redis.zrevrange(KEY, 0, n - 1, "WITHSCORES");
    // raw = [member1, score1, member2, score2, ...]
    const res = [];
    for (let i = 0; i < raw.length; i += 2) {
      res.push({ userId: raw[i], score: Number(raw[i + 1]) });
    }
    return res;
  },

  // get rank of user
  async getRank(userId: string) {
    const rank = await redis.zrevrank(KEY, userId);
    const score = await redis.zscore(KEY, userId);
    return { userId, rank: rank === null ? null : rank + 1, score: score ? Number(score) : null };
  },

  // remove user
  async remove(userId: string) {
    return redis.zrem(KEY, userId);
  },

  // clear (for testing)
  async clear() {
    return redis.del(KEY);
  }
};
