import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/services/auth-service";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const alertsSchema = z.object({
    emailAlerts: z.boolean(),
});

export async function PATCH(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { emailAlerts } = alertsSchema.parse(body);

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { emailAlerts },
        });

        return NextResponse.json({ 
            message: "Alerts updated successfully", 
            user: updatedUser 
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
        }
        console.error("Alerts update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
