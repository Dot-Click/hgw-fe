import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";
import { headers } from "next/headers";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        facebook: {
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
        },
    },
    emailAndPassword: {
        enabled: true,
        // Ensure email verification is not enforced by the framework
        requireEmailVerification: false,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
            },
            emailAlerts: {
                type: "boolean",
                required: false,
                defaultValue: true,
            },
            agreedTerms: {
                type: "boolean",
                required: false,
                defaultValue: true, // Default to true as requested
            }
        }
    },
    account: {
        accountLinking: {
            enabled: true,
        },
    },
    logger: {
        level: "warn",
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    // Set emailVerified and agreedTerms to true for all signups (Credentials & OAuth)
                    return {
                        data: {
                            ...user,
                            emailVerified: true,
                            agreedTerms: true,
                        }
                    };
                },
                after: async (user) => {
                    console.log(`🚀 New signup: ${user.email} (Role: ${user.role})`);
                }
            }
        }
    }
});

/**
 * Server-side session and auth logic is located in:
 * @/lib/services/auth-service.ts
 * 
 * Do not re-export from here to avoid circular dependencies.
 */

