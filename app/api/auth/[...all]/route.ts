import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";

const handler = toNextJsHandler(auth);

export const GET = async (req: Request) => {
    return await handler.GET(req);
};

export const POST = async (req: Request) => {
    return await handler.POST(req);
};