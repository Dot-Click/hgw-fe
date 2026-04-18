import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { env } from "@/config/env";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  // Advanced security settings
  advanced: {
    database: {
      generateId: false, // Use Prisma auto-generated IDs (cuid)
    },
  },
  // User model expansion
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
      emailVerified: {
        type: "boolean",
        defaultValue: false,
      },
      agreeTerms: {
        type: "boolean",
        defaultValue: false,
      }
    }
  },
  plugins: [
    nextCookies()
  ]
});
