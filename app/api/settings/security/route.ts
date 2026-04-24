import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/services/auth-service";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const securitySchema = z.object({
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
});

export async function PATCH(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { currentPassword, newPassword } = securitySchema.parse(body);

        // Find user and their accounts to check provider
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { accounts: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Use Better Auth's internal API to handle password change/set
        // This automatically handles Account table updates and session security
        const isOAuthOnly = user.accounts.length > 0 && user.accounts.every(acc => acc.providerId !== "credential");
        const hasCredentialAccount = user.accounts.some(acc => acc.providerId === "credential");

        if (hasCredentialAccount) {
            // Change existing password
            if (!currentPassword) {
                return NextResponse.json({ error: "Current password is required" }, { status: 400 });
            }

            const result = await auth.api.changePassword({
                body: {
                    currentPassword,
                    newPassword,
                    revokeOtherSessions: true,
                },
                headers: req.headers,
            });

            if (!result) {
                return NextResponse.json({ error: "Failed to change password. Verify your current password." }, { status: 400 });
            }
        } else {
            // Set first-time password for OAuth users
            await auth.api.setPassword({
                body: {
                    newPassword,
                },
                headers: req.headers,
            });
        }

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
        }

        // Handle Better Auth API errors (like INVALID_PASSWORD)
        if (error.body?.message) {
            return NextResponse.json({ 
                error: error.body.message === "Invalid password" 
                    ? "The current password you provided is incorrect." 
                    : error.body.message 
            }, { status: error.statusCode || 400 });
        }

        console.error("Security update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
