import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * PRODUCTION-GRADE ROUTE PROTECTION (Proxy Layer)
 * 
 * OPTIMIZED: Direct cookie check instead of slow network fetch.
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip session check for home page to ensure lightning fast load
    if (pathname === "/") {
        return NextResponse.next();
    }

    // 1. Quick Cookie Check (Saves 20 seconds)
    const sessionCookie = request.cookies.get("better-auth.session_token") || 
                         request.cookies.get("__better-auth.session_token");

    // 2. Protect /admin routes
    if (pathname.startsWith("/admin")) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // Only do heavy fetch for actual admin navigation
        try {
            const response = await fetch(new URL("/api/auth/get-session", request.nextUrl.origin), {
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            });
            const session = await response.json();

            if (!session || !session.user || session.user.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/unauthorized", request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

/**
 * Configure which routes this proxy should run on.
 * OPTIMIZED: Home page removed from matcher for speed.
 */
export const config = {
    matcher: ["/admin/:path*", "/api/categories/:path*"],
};
