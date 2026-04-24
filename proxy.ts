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

    // 1. Fetch current session
    let session: any = null;
    try {
        const response = await fetch(new URL("/api/auth/get-session", request.nextUrl.origin), {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        });
        session = await response.json();
    } catch (error) {
        console.error("Auth Proxy Error:", error);
    }

    // 2. Protect /admin routes
    if (pathname.startsWith("/admin")) {
        if (!session || !session.user) {
            // Not logged in -> Redirect to login
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (session.user.role !== "ADMIN") {
            // Logged in but not admin -> Redirect to unauthorized
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }

    // 3. Role-Based Redirect after login (if accessing landing page while logged in)
    // Note: This helps ensure admins are sent to their dashboard
    if (pathname === "/" && session?.user) {
        if (session.user.role === "ADMIN") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

/**
 * Configure which routes this proxy should run on.
 */
export const config = {
    matcher: ["/", "/admin/:path*", "/api/categories/:path*"],
};
