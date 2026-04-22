import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * PRODUCTION-GRADE ROUTE PROTECTION (Proxy Layer)
 * 
 * In Next.js 16, 'middleware.ts' is deprecated in favor of 'proxy.ts'.
 * This layer provides the first line of defense for /admin routes.
 */
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        // Better Auth default session cookie name
        const sessionToken = request.cookies.get("better-auth.session_token") || 
                           request.cookies.get("__Secure-better-auth.session_token");

        if (!sessionToken) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // NOTE: Deep RBAC (role-based access control) is performed in the 
        // Admin Layout and API Routes to ensure database-level accuracy.
    }

    return NextResponse.next();
}

/**
 * Configure which routes this proxy should run on.
 */
export const config = {
    matcher: ["/admin/:path*", "/api/categories/:path*"],
};
