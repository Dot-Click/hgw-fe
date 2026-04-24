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

export async function GET() {
    try {
        const podcasts = await prisma.podcast.findMany({
            include: {
                createdBy: {
                    select: { name: true, email: true }
                },
                players: {
                    select: { id: true, name: true, image: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(podcasts);
    } catch (error) {
        console.error("Fetch podcasts error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession();

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validatedData = podcastSchema.parse(body);

        const podcast = await prisma.podcast.create({
            data: {
                title: validatedData.title,
                imageUrl: validatedData.imageUrl,
                description: validatedData.description,
                status: validatedData.status,
                platformLinks: validatedData.platformLinks,
                createdById: session.user.id,
                players: {
                    connect: validatedData.playerIds.map(id => ({ id }))
                }
            },
            include: {
                createdBy: {
                    select: { name: true, email: true }
                },
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
        console.error("Create podcast error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
