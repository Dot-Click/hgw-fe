import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  // Auth is disabled at middleware level for now.
  // All route protection will be re-added once OAuth flow is stable.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
