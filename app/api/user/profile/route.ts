import { auth } from "@/lib/auth";
import { UserService } from "@/services/user.service";
import { ApiResponse } from "@/lib/utils/api-response";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

/**
 * @route   GET /api/user/profile
 * @desc    Get the current user's profile
 * @access  Private
 */
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return ApiResponse.unauthorized("You must be logged in to access this resource");
    }

    const user = await UserService.findById(session.user.id);

    if (!user) {
      return ApiResponse.notFound("User not found in our database");
    }

    return ApiResponse.success(user, "User profile retrieved successfully");
  } catch (error: any) {
    console.error("[PROFILE_GET_ERROR]", error);
    return ApiResponse.error("Failed to retrieve user profile");
  }
}

/**
 * @route   PATCH /api/user/profile
 * @desc    Update the current user's profile
 * @access  Private
 */
export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
      return ApiResponse.unauthorized();
    }

    const body = await req.json();
    
    // In a real scenario, we would use a Zod validator here
    const { name, image } = body;

    const updatedUser = await UserService.updateProfile(session.user.id, {
      name,
      image,
    });

    return ApiResponse.success(updatedUser, "Profile updated successfully");
  } catch (error: any) {
    console.error("[PROFILE_PATCH_ERROR]", error);
    return ApiResponse.error("Failed to update profile");
  }
}
