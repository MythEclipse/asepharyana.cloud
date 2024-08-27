/* eslint-disable no-unused-vars */
import withAuth from './withAuth';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, ['/dashboard', '/profile', '/settings', '/login', '/register','/sosmed']);
