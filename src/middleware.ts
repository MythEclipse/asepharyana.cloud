/* eslint-disable no-unused-vars */
import withAuth from "./middlewares/withAuth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Middleware untuk enforce locale ID
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect semua route ke /id/... 
  if (!pathname.startsWith("/id/")) {
    return NextResponse.redirect(
      new URL(`/id${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // matcher untuk middleware
    "/id/dashboard", // Rute yang membutuhkan auth
    "/id/profile",
    "/id/settings",
    "/id/login", 
    "/id/register",
  ],
};

export default withAuth(middleware); // Terapkan withAuth pada middleware