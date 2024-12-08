import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const isPublicPath = path === "/auth";

  // Get the token from the session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect logic
  if (isPublicPath && token) {
    // If user is authenticated but tries to access login page
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (!isPublicPath && !token) {
    // If user is not authenticated and tries to access protected pages
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/auth", "/app/:path*"],
};
