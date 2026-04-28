import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * PRODUCTION-GRADE ROUTE PROTECTION (Proxy Layer)
 * 
 * OPTIMIZED: Direct cookie check instead of slow network fetch.
 */
export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip session check for home page to ensure lightning fast load
    if (pathname === "/") {
        return NextResponse.next();
    }

    // 1. Quick Cookie Check (Saves 20 seconds)
    const allCookies = request.cookies.getAll();
    console.log(`🔍 [Proxy] Request Path: ${pathname}`);
    console.log(`🍪 [Proxy] Available Cookies:`, allCookies.map(c => c.name));

    const sessionCookie = request.cookies.get("better-auth.session_token") || 
                         request.cookies.get("__better-auth.session_token") ||
                         request.cookies.get("__Host-better-auth.session_token") ||
                         request.cookies.get("__Secure-better-auth.session_token");

    console.log(`🔑 [Proxy] Session Cookie Found: ${!!sessionCookie}`);

    // 2. Protect /admin routes
    if (pathname.startsWith("/admin")) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // Only basic cookie check in middleware to stay lightning fast.
        // The actual role validation (user.role === 'ADMIN') and heavy DB lookup
        // is safely handled by the Server Component in app/admin/layout.tsx.


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
