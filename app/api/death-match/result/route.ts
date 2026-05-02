import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { player1Id, player2Id } = await request.json();

    if (!player1Id || !player2Id) {
      return NextResponse.json({ error: "Missing player IDs" }, { status: 400 });
    }

    const [player1, player2] = await Promise.all([
      prisma.player.findUnique({ where: { id: player1Id } }),
      prisma.player.findUnique({ where: { id: player2Id } }),
    ]);

    if (!player1 || !player2) {
      return NextResponse.json({ error: "One or both players not found" }, { status: 404 });
    }

    // 1. CALCULATION LOGIC
    const calculateRawTotal = (p: any) => {
      return (
        p.dominance +
        p.longevity +
        p.peakPerformance +
        p.championships +
        p.records +
        p.culturalImpact +
        p.clutchFactor +
        p.versatility +
        p.rivalry +
        p.legacy
      );
    };

    const rawTotal1 = calculateRawTotal(player1);
    const rawTotal2 = calculateRawTotal(player2);

    const finalScore1 = rawTotal1;
    const finalScore2 = rawTotal2;

    // 2. COMPARISON LOGIC
    let winnerId: string | null = null;
    if (finalScore1 > finalScore2) {
      winnerId = player1.id;
    } else if (finalScore2 > finalScore1) {
      winnerId = player2.id;
    }

    // 3. DATA FLOW - Update Player Stats & Leaderboard Logic
    const updatePlayerStats = async (p: any, score: number, result: "win" | "loss" | "draw") => {
      const newTotalMatches = p.totalMatches + 1;
      const newAverageHGWScore = (p.averageHGWScore * p.totalMatches + score) / newTotalMatches;

      return prisma.player.update({
        where: { id: p.id },
        data: {
          totalMatches: newTotalMatches,
          wins: p.wins + (result === "win" ? 1 : 0),
          losses: p.losses + (result === "loss" ? 1 : 0),
          draws: p.draws + (result === "draw" ? 1 : 0),
          averageHGWScore: newAverageHGWScore,
          finalScore: newAverageHGWScore, // Mapping average to finalScore for general display
        },
      });
    };

    const result1 = winnerId === player1.id ? "win" : winnerId === player2.id ? "loss" : "draw";
    const result2 = winnerId === player2.id ? "win" : winnerId === player1.id ? "loss" : "draw";

    await Promise.all([
      updatePlayerStats(player1, finalScore1, result1),
      updatePlayerStats(player2, finalScore2, result2),
      prisma.match.create({
        data: {
          player1Id: player1.id,
          player2Id: player2.id,
          score1: finalScore1,
          score2: finalScore2,
          winnerId: winnerId,
        },
      }),
    ]);

    return NextResponse.json({
      score1: finalScore1,
      score2: finalScore2,
      winnerId,
      player1: {
        name: player1.name,
        scores: {
          dominance: player1.dominance,
          longevity: player1.longevity,
          peakPerformance: player1.peakPerformance,
          championships: player1.championships,
          records: player1.records,
          culturalImpact: player1.culturalImpact,
          clutchFactor: player1.clutchFactor,
          versatility: player1.versatility,
          rivalry: player1.rivalry,
          legacy: player1.legacy,
        }
      },
      player2: {
        name: player2.name,
        scores: {
          dominance: player2.dominance,
          longevity: player2.longevity,
          peakPerformance: player2.peakPerformance,
          championships: player2.championships,
          records: player2.records,
          culturalImpact: player2.culturalImpact,
          clutchFactor: player2.clutchFactor,
          versatility: player2.versatility,
          rivalry: player2.rivalry,
          legacy: player2.legacy,
        }
      }
    });
  } catch (error: any) {
    console.error("Death Match Result Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
