import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/services/auth-service";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const podcastSchema = z.object({
    title: z.string().min(1, "Title is required"),
    imageUrl: z.string().url("Image is required"),
    description: z.string().optional(),
    playerIds: z.array(z.string()).min(1, "At least one player is required"),
    platformLinks: z.object({
        spotify: z.string().url().optional().or(z.literal("")),
        youtube: z.string().url().optional().or(z.literal("")),
    }).refine((data) => data.spotify || data.youtube, {
        message: "At least one platform link (Spotify or YouTube) is required",
        path: ["spotify"],
    }),
    status: z.enum(["draft", "published"]).default("draft"),
});

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const podcast = await prisma.podcast.findUnique({
            where: { id },
            include: {
                players: {
                    select: { id: true, name: true, image: true }
                }
            }
        });
        if (!podcast) {
            return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
        }
        return NextResponse.json(podcast);
    } catch (error) {
        console.error("Fetch podcast error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getServerSession();

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validatedData = podcastSchema.partial().parse(body);

        const updateData: any = {
            title: validatedData.title,
            imageUrl: validatedData.imageUrl,
            description: validatedData.description,
            status: validatedData.status,
            platformLinks: validatedData.platformLinks,
        };

        if (validatedData.playerIds) {
            updateData.players = {
                set: [], // Disconnect all first
                connect: validatedData.playerIds.map(id => ({ id }))
            };
        }

        const podcast = await prisma.podcast.update({
            where: { id },
            data: updateData,
            include: {
                players: {
                    select: { id: true, name: true, image: true }
                }
            }
        });

        return NextResponse.json(podcast);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
        }
        console.error("Update podcast error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await getServerSession();

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.podcast.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Podcast deleted successfully" });
    } catch (error) {
        console.error("Delete podcast error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
