import { z } from "zod";

export const submitScoreSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  score: z.number().int().nonnegative("Score must be 0 or above"),
});

export const topNSchema = z.object({
  n: z.string().regex(/^\d+$/, "n must be a number"),
});

export const rankSchema = z.object({
  userId: z.string().min(1),
});
