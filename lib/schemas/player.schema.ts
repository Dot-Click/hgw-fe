import { z } from "zod";

/**
 * PRODUCTION-GRADE PLAYER SCHEMA
 * 
 * Validates basic info, career stats, and the HGW scoring matrix.
 */

const metricSchema = z.number().min(0).max(10);

export const playerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  categoryId: z.string().min(1, "Category is required"),
  positionRole: z.string().min(1, "Position/Role is required"),
  era: z.string().min(1, "Era is required"),
  country: z.string().min(1, "Country is required"),
  
  // Career Statistics
  appearancesGames: z.number().int().min(0),
  goalsPoints: z.number().int().min(0),
  majorAchievements: z.number().int().min(0),

  // HGW Scoring Matrix (0–10 each)
  dominance: metricSchema,
  longevity: metricSchema,
  peakPerformance: metricSchema,
  championships: metricSchema,
  records: metricSchema,
  culturalImpact: metricSchema,
  clutchFactor: metricSchema,
  versatility: metricSchema,
  rivalry: metricSchema,
  legacy: metricSchema,

  // Status & Image
  image: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export type PlayerInput = z.infer<typeof playerSchema>;
