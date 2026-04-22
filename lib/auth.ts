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
    },
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
            },
            agreedTerms: {
                type: "boolean",
                required: false,
                defaultValue: false,
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
                before: async () => {
                    console.time("⏱️ [DB.createUser]");
                },
                after: async (user) => {
                    console.timeEnd("⏱️ [DB.createUser]");
                    console.log(`New signup: ${user.email}`);
                }
            }
        },
        session: {
            create: {
                before: async () => {
                    console.time("⏱️ [DB.createSession]");
                },
                after: async () => {
                    console.timeEnd("⏱️ [DB.createSession]");
                }
            }
        }
    }
});

/**
 * PRODUCTION-GRADE AUTH HELPERS
 */
export const getServerSession = async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
};
