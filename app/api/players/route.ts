import { NextResponse } from "next/server";
import { playerSchema } from "@/lib/schemas/player.schema";
import { PlayerService } from "@/lib/services/player.service";
import { verifyAdminApi } from "../../../lib/auth";
import { z } from "zod";

/**
 * GET /api/players
 * List all players, ranked by HGW score.
 */
export async function GET() {
  try {
    const players = await PlayerService.getAllPlayers();
    return NextResponse.json(players);
  } catch (error) {
    console.error("Fetch players error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

/**
 * POST /api/players
 * Create a new player. Restricted to Admin.
 */
export async function POST(req: Request) {
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    const body = await req.json();
    console.log("Creating player with data:", JSON.stringify(body, null, 2));
    const validatedData = playerSchema.parse(body);

    const player = await PlayerService.createPlayer(validatedData);

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message }, 
        { status: 400 }
      );
    }
    console.error("Create player error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
