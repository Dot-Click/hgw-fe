/**
 * HGW SCORING ENGINE
 * 
 * This utility handles the calculation of the HGW Player Rating.
 * The rating is based on 10 core metrics, each scored from 0 to 10.
 * The final score is a scale of 0-100.
 */

export interface HgwMetrics {
  dominance: number;
  longevity: number;
  peakPerformance: number;
  championships: number;
  records: number;
  culturalImpact: number;
  clutchFactor: number;
  versatility: number;
  rivalry: number;
  legacy: number;
}

/**
 * Calculates the final HGW score based on the 10-metric matrix.
 * 
 * Step 1: Sum all metrics (Max 100)
 * Step 2: Calculate average (Sum / 10)
 * Step 3: Scale to 100 (Average * 10)
 * 
 * @param metrics The 10 HGW metrics
 * @returns number (0-100)
 */
export const calculateHgwScore = (metrics: HgwMetrics): number => {
  const {
    dominance,
    longevity,
    peakPerformance,
    championships,
    records,
    culturalImpact,
    clutchFactor,
    versatility,
    rivalry,
    legacy,
  } = metrics;

  // Step 1: Sum all metrics (Raw Total: 0-1000 if each is 0-100)
  const rawTotal = 
    dominance + 
    longevity + 
    peakPerformance + 
    championships + 
    records + 
    culturalImpact + 
    clutchFactor + 
    versatility + 
    rivalry + 
    legacy;

  // Step 2: Final HGW Score (0-100 scale)
  const finalScore = rawTotal;

  // Ensure precision
  return Math.round(finalScore * 100) / 100;
};
