import { z } from "zod";

export const subscriberSchema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().optional().nullable(),
});

export type SubscriberInput = z.infer<typeof subscriberSchema>;
