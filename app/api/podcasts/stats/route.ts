import { NextResponse } from "next/server";
import { PodcastService } from "@/lib/services/podcast.service";

export async function GET() {
    try {
        const stats = await PodcastService.getPodcastStats();
        return NextResponse.json(stats);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
