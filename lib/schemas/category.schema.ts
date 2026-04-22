import { z } from "zod";

/**
 * CATEGORY VALIDATION SCHEMA
 * Centralized schema for creating and updating categories.
 */
export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid HEX color format"),
});

/**
 * Type inference for Category input
 */
export type CategoryInput = z.infer<typeof categorySchema>;
