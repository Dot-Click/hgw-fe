import { NextRequest, NextResponse } from 'next/server';
import { KatyService } from '@/lib/services/katy-service';

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const response = await KatyService.processMessage(message);

        return NextResponse.json(response);
    } catch (error: any) {
        console.error('Katy AI Error:', error);
        return NextResponse.json(
            { text: "I'm having a bit of trouble accessing the vault right now. Can we try again in a moment?" },
            { status: 500 }
        );
    }
}
