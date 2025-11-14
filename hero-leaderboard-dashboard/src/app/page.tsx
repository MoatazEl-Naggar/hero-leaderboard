"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { API_BASE } from "@/lib/api";

export default function Home() {
  const [leaders, setLeaders] = useState<
    { userId: string; score: number }[]
  >([]);
  const [previous, setPrevious] = useState<Map<string, number>>(new Map());

  async function fetchLeaders() {
    const res = await fetch(`${API_BASE}/top/20`);
    const data = await res.json();
    setLeaders(data);
  }

  useEffect(() => {
    fetchLeaders();
    const interval = setInterval(fetchLeaders, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-start justify-center pt-10">
    <div className="w-[55%] max-w-2xl mx-auto border border-cyan-500/30 rounded-xl p-6 bg-black/40 backdrop-blur">

    
    <h1 className="text-center text-2xl font-bold mb-6 text-cyan-200">
      Live Leaderboard
    </h1>

        <Card className="bg-[#111] border border-gray-700 p-4 rounded-xl shadow-lg">
  <table className="w-full text-center">
    <thead>
      <tr className="border-b border-gray-700 text-gray-300 text-sm">
        <th className="py-2 w-16 text-center">Rank</th>
        <th className="py-2 text-center">Player</th>
        <th className="py-2 w-20 text-center">Score</th>
      </tr>
    </thead>

    <tbody>
      {leaders.map((leader, index) => (
        <tr
          key={leader.userId}
          className="border-b border-gray-800 text-lg hover:bg-gray-900 transition"
        >
          <td className="py-3 text-center">{index + 1}</td>
          <td className="py-3 font-semibold text-center">{leader.userId}</td>
          <td className="py-3 text-center">{leader.score}</td>
        </tr>
      ))}
    </tbody>
  </table>
</Card>

      </div>
    </div>
  );
}
