import { z } from "zod";

export const createPodcastSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export const createEpisodeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  audioUrl: z.string().url("Invalid audio URL"),
  duration: z.number().int().positive().optional(),
  podcastId: z.string().cuid(),
});
