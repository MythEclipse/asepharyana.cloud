import { getComments, postComment } from '../../../lib/firebase/service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await postComment(req);
  return NextResponse.json({ status: res.status });
}

export async function GET() {
  const res = await getComments();
  return NextResponse.json(res);
}
