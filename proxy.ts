import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  // Define protected routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard") || 
                          request.nextUrl.pathname.startsWith("/admin") ||
                          request.nextUrl.pathname.startsWith("/api/protected");

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/protected/:path*"],
};
