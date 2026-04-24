import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/services/auth-service";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export async function GET() {
    const session = await getServerSession();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            accounts: true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isOAuth = user.accounts.length > 0 && user.accounts.some(acc => acc.providerId !== "credential");

    return NextResponse.json({ 
        user: {
            ...user,
            isOAuth,
        }
    });
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name } = profileSchema.parse(body);

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
            },
        });

        return NextResponse.json({ 
            message: "Profile updated successfully", 
            user: updatedUser 
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
        }
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
