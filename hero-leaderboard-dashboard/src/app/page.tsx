"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { API_BASE } from "@/lib/api";

export default function Home() {
  const [leaders, setLeaders] = useState<{ userId: string; score: number }[]>([]);
  const [previous, setPrevious] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    async function fetchLeaders() {
      const res = await fetch(`${API_BASE}/top/10`);
      const data = await res.json();

      // Build new rank map
      const newRankMap = new Map<string, number>();
      data.forEach((entry: any, index: number) => {
        newRankMap.set(entry.userId, index);
      });

      // Save new leaders and record previous ranks
      setPrevious(prev => {
        setLeaders(data);
        return newRankMap;
      });
    }

    fetchLeaders();
    const interval = setInterval(fetchLeaders, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black flex justify-center py-10 px-4">
      <Card className="w-full max-w-2xl bg-zinc-900 border border-zinc-700 shadow-neon hover-glow">
        <h1 className="text-3xl font-bold text-neon-cyan mb-6 text-center tracking-wide drop-shadow">
          Live Leaderboard
        </h1>

        <table className="w-full text-left text-zinc-200">
          <thead>
            <tr className="border-b border-zinc-700 text-zinc-400">
              <th className="py-3">Rank</th>
              <th>Player</th>
              <th className="text-right">Score</th>
            </tr>
          </thead>

          <tbody>
            {leaders.map((entry, i) => {
              const previousRank = previous.get(entry.userId);
              const changed = previousRank !== undefined && previousRank !== i;

              return (
                <tr
                  key={entry.userId}
                  className={`border-b border-zinc-800 transition-colors ${
                    changed ? "rank-change" : ""
                  } hover:bg-zinc-800/40`}
                >
                  <td className="py-3 text-zinc-500">{i + 1}</td>
                  <td className="font-medium">{entry.userId}</td>
                  <td className="text-right text-neon-cyan font-semibold">{entry.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </main>
  );
}
