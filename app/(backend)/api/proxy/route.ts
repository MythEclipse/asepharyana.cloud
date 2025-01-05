import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('url');

  if (!slug) {
    return NextResponse.json(
      { error: 'Missing slug parameter' },
      { status: 400 }
    );
  }

  try {
    const { data, contentType } = await fetchFromProxies(slug);

    if (contentType && contentType.includes('application/json')) {
      return NextResponse.json(data);
    }

    return new Response(data, {
      headers: { 'Content-Type': contentType || 'text/plain' },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch from all proxies',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
async function fetchFromProxies(slug: string) {
  const baseUrls = [
    'meitang.xyz',
    'btch.us.kg',
    'api.tioo.eu.org',
    'api.tioprm.eu.org',
  ];
  let lastError: Error | null = null;

  for (const apiUrl of baseUrls) {
    try {
      const proxyUrl = `https://${apiUrl}/proxy?url=${encodeURIComponent(slug)}`;
      const apiResponse = await fetch(proxyUrl, {
        headers: DEFAULT_HEADERS,
      });

      if (apiResponse.ok) {
        const contentType = apiResponse.headers.get('content-type');

        // Respons berupa JSON
        if (contentType && contentType.includes('application/json')) {
          const data = await apiResponse.json();
          return { data, contentType };
        }

        // Respons berupa HTML atau teks lainnya
        const textData = await apiResponse.text();
        return { data: textData, contentType };
      }
    } catch (error) {
      lastError = error as Error;
      console.error(`Error proxying request to ${apiUrl}:`, error);
    }
  }

  throw new Error(lastError?.message || 'Failed to fetch from all proxies');
}
