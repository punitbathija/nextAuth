import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Logic of injecting the middleware
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// To match the paths where the middleware should be injected
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
