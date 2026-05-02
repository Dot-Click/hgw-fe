import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      include: {
        category: true,
      },
    });

    // 5. LEADERBOARD LOGIC
    // Ranking is based on:
    // 1. Total Wins (highest first)
    // 2. Average HGW Score (tie-breaker)
    // 3. Win Ratio (Wins / Total Matches)
    const rankedPlayers = players.sort((a, b) => {
      // 1. Total Wins
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }
      
      // 2. Average HGW Score
      if (b.averageHGWScore !== a.averageHGWScore) {
        return b.averageHGWScore - a.averageHGWScore;
      }
      
      // 3. Win Ratio
      const ratioA = a.totalMatches > 0 ? a.wins / a.totalMatches : 0;
      const ratioB = b.totalMatches > 0 ? b.wins / b.totalMatches : 0;
      return ratioB - ratioA;
    });

    return NextResponse.json(rankedPlayers);
  } catch (error: any) {
    console.error("Leaderboard Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
