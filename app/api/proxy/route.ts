import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    // Proxy the request to the widipe.com proxy API
    const apiResponse = await fetch(`https://aemt.uk.to/proxy?url=${encodeURIComponent(targetUrl)}`, {
      headers: DEFAULT_HEADERS
    });

    // Handle non-2xx responses from the API
    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from proxy. Status code: ${apiResponse.status}` },
        { status: apiResponse.status }
      );
    }

    const contentType = apiResponse.headers.get('content-type');

    // Check if the response is JSON
    if (contentType && contentType.includes('application/json')) {
      const data = await apiResponse.json();
      return NextResponse.json(data);
    }

    // If the content type is not JSON, return as text
    const textData = await apiResponse.text();
    return new NextResponse(textData, { status: apiResponse.status });
  } catch (error) {
    console.error('Error proxying request:', error);
    return NextResponse.json({ error: 'An error occurred while proxying the request' }, { status: 500 });
  }
}
