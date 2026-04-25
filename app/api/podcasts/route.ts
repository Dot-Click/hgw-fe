import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminApi } from "@/lib/services/auth-service";
import { PodcastService } from "@/lib/services/podcast.service";

const podcastSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().url("Image URL is required"),
    categoryId: z.string().min(1, "Category is required"),
    playerIds: z.array(z.string()).min(1, "At least one player is required"),
    guestIds: z.array(z.string()).optional(),
    platforms: z.array(z.object({
        platform: z.string(),
        url: z.string().url()
    })).min(1, "At least one platform is required"),
    featured: z.boolean().optional(),
    isPick: z.boolean().optional(),
    duration: z.number().optional(),
    status: z.enum(["draft", "published"]).default("draft"),
});

export async function GET() {
    try {
        const podcasts = await PodcastService.getAllPodcasts();
        return NextResponse.json(podcasts);
    } catch (error) {
        console.error("Fetch podcasts error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { authorized, response, session } = await verifyAdminApi();
    if (!authorized || !session) return response;

    try {
        const body = await req.json();
        const validatedData = podcastSchema.parse(body);

        const podcast = await PodcastService.createPodcast({
            ...validatedData,
            createdById: session.user.id
        });

        return NextResponse.json(podcast, { status: 201 });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
        }
        console.error("Create podcast error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
