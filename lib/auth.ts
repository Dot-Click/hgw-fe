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
            emailAlerts: {
                type: "boolean",
                required: false,
                defaultValue: true,
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

/**
 * SERVER SIDE: Verify if the current user is an admin
 */
export const isAdmin = async () => {
    const session = await getServerSession();
    return session?.user?.role === "ADMIN";
};

/**
 * SERVER SIDE: Force admin check or redirect/error
 */
export const requireAdmin = async () => {
    const session = await getServerSession();
    
    if (!session || session.user.role !== "ADMIN") {
        return false;
    }
    
    return true;
};

/**
 * API SIDE: Verify admin role and return session or unauthorized response
 */
export const verifyAdminApi = async () => {
    const session = await getServerSession();
    if (!session || session.user.role !== "ADMIN") {
        return { authorized: false, response: adminErrorResponse() };
    }
    return { authorized: true, session };
};

/**
 * API RESPONSE: Standard 403 error for unauthorized admin actions
 */
export const adminErrorResponse = () => {
    return new Response(JSON.stringify({ 
        error: "Unauthorized: Admin access required" 
    }), { 
        status: 403,
        headers: { "Content-Type": "application/json" }
    });
};
