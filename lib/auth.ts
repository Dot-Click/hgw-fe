import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";
import { headers } from "next/headers";
import sgMail from "@sendgrid/mail";



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
        sendResetPassword: async ({ user, url }) => {
            const msg = {
                to: user.email,
                from: process.env.SENDGRID_FROM_EMAIL || "noreply@hgw.com",
                subject: "Reset Your Password - HGW Legend Vault",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px; background-color: #f9f9f9;">
                        <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
                        <p>Hello ${user.name || 'User'},</p>
                        <p>We received a request to reset your password for your HGW account. Click the button below to proceed:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${url}" style="background-color: #00CCFF; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
                        </div>
                        <p>If you didn't request this, you can safely ignore this email. The link will expire shortly.</p>
                        <p>Best regards,<br/>The HGW Team</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;"/>
                        <p style="font-size: 12px; color: #999; text-align: center;">If the button doesn't work, copy and paste this link: <br/> <a href="${url}" style="color: #00CCFF;">${url}</a></p>
                    </div>
                `,
            };
            try {
                await sgMail.send(msg);
                console.log(`✅ Reset password email sent to ${user.email}`);
            } catch (error) {
                console.error("❌ Failed to send reset password email:", error);
            }
        },
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

