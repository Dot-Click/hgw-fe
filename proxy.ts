import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface Session {
    user: {
        role: string;
    };
}

/**
 * PRODUCTION-GRADE ROUTE PROTECTION (Proxy Layer)
 * 
 * In this version of Next.js, 'proxy.ts' is used for edge-level security.
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        try {
            const response = await fetch(new URL("/api/auth/get-session", request.nextUrl.origin), {
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            });

            const session = await response.json();

            if (!session || session.user.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/", request.url));
            }
        } catch (error) {
            // If check fails, default to redirecting for security
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

/**
 * Configure which routes this proxy should run on.
 */
export const config = {
    matcher: ["/admin/:path*", "/api/categories/:path*"],
};
