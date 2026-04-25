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

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const podcast = await PodcastService.getPodcastById(id);
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
    const { authorized, response } = await verifyAdminApi();
    if (!authorized) return response;

    try {
        const body = await req.json();
        const validatedData = podcastSchema.partial().parse(body);

        const podcast = await PodcastService.updatePodcast(id, validatedData);

        return NextResponse.json(podcast);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
        }
        console.error("Update podcast error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { authorized, response } = await verifyAdminApi();
    if (!authorized) return response;

    try {
        await PodcastService.deletePodcast(id);
        return NextResponse.json({ message: "Podcast deleted successfully" });
    } catch (error) {
        console.error("Delete podcast error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
