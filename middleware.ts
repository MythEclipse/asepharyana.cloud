import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const authPage = ['/login', '/register'];
const protectedRoutes = ['/profile', '/settings', '/sosmed'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.SECRET });

  // Redirect to login if trying to access a protected route without a token
  if (protectedRoutes.includes(pathname) && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', encodeURI(req.url));
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages (e.g., /login, /register)
  if (token && authPage.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Specify the routes that should trigger this middleware
export const config = {
  matcher: ['/profile', '/settings', '/sosmed', '/login', '/register'],
};
