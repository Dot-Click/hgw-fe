import { NextResponse } from "next/server";
import { subscriberSchema } from "@/lib/schemas/subscriber.schema";
import { SubscriberService } from "@/lib/services/subscriber.service";
import { verifyAdminApi } from "../../../lib/auth";
import { sendWelcomeEmail } from "@/lib/mail";
import { z } from "zod";

/**
 * GET /api/subscribers
 * List all subscribers. Restricted to Admin.
 */
export async function GET() {
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    const subscribers = await SubscriberService.getAllSubscribers();
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Fetch subscribers error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

/**
 * POST /api/subscribers
 * Create a new subscriber (Publicly accessible for newsletter signup).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = subscriberSchema.parse(body);

    const subscriber = await SubscriberService.createSubscriber(validatedData);

    // 📧 Send Welcome Email (Asynchronous)
    sendWelcomeEmail(subscriber.email).catch(err => {
      console.error("Delayed email error:", err);
    });

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message }, 
        { status: 400 }
      );
    }
    console.error("Create subscriber error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
