import { NextRequest, NextResponse } from "next/server";
import { PodcastService } from "@/lib/services/podcast.service";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const podcast = await PodcastService.incrementListens(id);
        return NextResponse.json({ success: true, listens: podcast.listens });
    } catch (error) {
        console.error("Increment listens error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
