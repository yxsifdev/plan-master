import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/auth";

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(
      new URL(`/auth?from=${encodeURIComponent(path)}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/app/:path*"],
};
