import { PodcastService } from "@/services/podcast.service";
import { ApiResponse } from "@/lib/utils/api-response";
import { createPodcastSchema } from "@/validators/podcast.validator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * @route   GET /api/podcasts
 * @desc    Get all podcasts
 * @access  Public
 */
export async function GET() {
  try {
    const podcasts = await PodcastService.getAll();
    return ApiResponse.success(podcasts);
  } catch (error) {
    console.error("[PODCASTS_GET]", error);
    return ApiResponse.error();
  }
}

/**
 * @route   POST /api/podcasts
 * @desc    Create a new podcast
 * @access  Private (Admin only)
 */
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Simple role check
    if (!session || session.user.role !== "admin") {
      return ApiResponse.forbidden("Only admins can create podcasts");
    }

    const body = await req.json();
    
    // Validation
    const validation = createPodcastSchema.safeParse(body);
    if (!validation.success) {
      return ApiResponse.badRequest("Validation failed", validation.error.format());
    }

    const podcast = await PodcastService.create(validation.data);
    return ApiResponse.success(podcast, "Podcast created successfully", 201);
  } catch (error) {
    console.error("[PODCASTS_POST]", error);
    return ApiResponse.error();
  }
}
