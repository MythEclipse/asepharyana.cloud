/* eslint-disable no-unused-vars */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = true;
  if (!isLogin) {
    return NextResponse.redirect("/login");
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
