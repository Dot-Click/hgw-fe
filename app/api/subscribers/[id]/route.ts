import { NextResponse } from "next/server";
import { subscriberSchema } from "@/lib/schemas/subscriber.schema";
import { SubscriberService } from "@/lib/services/subscriber.service";
import { verifyAdminApi } from "@/lib/services/auth-service";
import { z } from "zod";

/**
 * PATCH /api/subscribers/[id]
 * Update a subscriber. Restricted to Admin.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    const body = await req.json();
    const validatedData = subscriberSchema.partial().parse(body);

    const updated = await SubscriberService.updateSubscriber(id, validatedData);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * DELETE /api/subscribers/[id]
 * Delete a subscriber. Restricted to Admin.
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    await SubscriberService.deleteSubscriber(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
