// app/api/auth/register/route.ts
import { register } from '@/app/lib/prisma/service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const res = await register(req);

    return NextResponse.json({ status: res.status, message: res.message }, { status: res.statusCode });
  } catch (error) {
    console.error('Error handling registration request:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}
