import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";

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
        level: "debug",
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    // Log user data as requested for new signups
                    console.log("User data from Google", user);
                    console.log(`Allowing new signup: ${user.email}`);
                }
            }
        },
    }
});
