import { NextResponse } from "next/server";
import { GuestService } from "@/lib/services/guest.service";
import { verifyAdminApi } from "@/lib/services/auth-service";

export async function GET() {
    try {
        const guests = await GuestService.getAllGuests();
        return NextResponse.json(guests);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { authorized, response } = await verifyAdminApi();
    if (!authorized) return response;

    try {
        const body = await req.json();
        const guest = await GuestService.createGuest(body);
        return NextResponse.json(guest, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create guest" }, { status: 500 });
    }
}
