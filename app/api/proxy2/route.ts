import { axiosWithProxy } from '@/lib/GetProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    // Melakukan permintaan dengan proxy dan header default
    const data = await axiosWithProxy(targetUrl);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error during proxy request:', error);
    return NextResponse.json({ error: 'An error occurred while proxying the request' }, { status: 500 });
  }
}
