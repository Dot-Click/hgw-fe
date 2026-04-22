import { prisma } from "@/lib/prisma";
import { calculateHgwScore } from "@/lib/utils/scoring";
import { PlayerInput } from "@/lib/schemas/player.schema";

/**
 * PLAYER SERVICE
 * 
 * Handles all database operations for the Player model,
 * ensuring that the HGW score is automatically calculated
 * on every create and update operation.
 */

export class PlayerService {
  /**
   * Create a new player with automatic HGW score calculation.
   */
  static async createPlayer(data: PlayerInput) {
    const finalScore = calculateHgwScore(data);

    return await prisma.player.create({
      data: {
        ...data,
        finalScore,
      },
    });
  }

  /**
   * Update an existing player and recalculate the HGW score.
   */
  static async updatePlayer(id: string, data: Partial<PlayerInput>) {
    // If any metrics are being updated, we need to fetch the full record
    // to ensure the score calculation is accurate, or require all metrics
    // in the update payload. For SaaS-grade robustness, we fetch current metrics.
    
    const existingPlayer = await prisma.player.findUnique({
      where: { id },
    });

    if (!existingPlayer) {
      throw new Error("Player not found");
    }

    // Merge existing metrics with updates
    const mergedData = {
      dominance: data.dominance ?? existingPlayer.dominance,
      longevity: data.longevity ?? existingPlayer.longevity,
      peakPerformance: data.peakPerformance ?? existingPlayer.peakPerformance,
      championships: data.championships ?? existingPlayer.championships,
      records: data.records ?? existingPlayer.records,
      culturalImpact: data.culturalImpact ?? existingPlayer.culturalImpact,
      clutchFactor: data.clutchFactor ?? existingPlayer.clutchFactor,
      versatility: data.versatility ?? existingPlayer.versatility,
      rivalry: data.rivalry ?? existingPlayer.rivalry,
      legacy: data.legacy ?? existingPlayer.legacy,
    };

    const finalScore = calculateHgwScore(mergedData);

    return await prisma.player.update({
      where: { id },
      data: {
        ...data,
        finalScore,
      },
    });
  }

  /**
   * Fetch all players.
   */
  static async getAllPlayers() {
    return await prisma.player.findMany({
      orderBy: { finalScore: "desc" },
      include: {
        category: true,
      },
    });
  }

  /**
   * Fetch a single player by ID.
   */
  static async getPlayerById(id: string) {
    return await prisma.player.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  /**
   * Delete a player.
   */
  static async deletePlayer(id: string) {
    return await prisma.player.delete({
      where: { id },
    });
  }
}
