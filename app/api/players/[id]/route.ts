import { NextResponse } from "next/server";
import { playerSchema } from "@/lib/schemas/player.schema";
import { PlayerService } from "@/lib/services/player.service";
import { verifyAdminApi } from "../../../../lib/auth";
import { z } from "zod";

/**
 * GET /api/players/[id]
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const player = await PlayerService.getPlayerById(id);
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * PUT /api/players/[id]
 * Restricted to Admin.
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    const body = await req.json();
    // Use partial for updates
    const validatedData = playerSchema.partial().parse(body);

    const player = await PlayerService.updatePlayer(id, validatedData);
    return NextResponse.json(player);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

/**
 * DELETE /api/players/[id]
 * Restricted to Admin.
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    await PlayerService.deletePlayer(id);
    return NextResponse.json({ message: "Player deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
