import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("hrms_access_token")?.value;

  const { pathname } = req.nextUrl;

  // Allow access to login page and static assets
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Redirect to login if no token
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
