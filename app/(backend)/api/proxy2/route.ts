import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('url');
  const baseUrls = ['meitang.xyz', 'btch.us.kg', 'api.tioo.eu.org', 'api.tioprm.eu.org'];

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }

  let lastError: Error | null = null;

  for (const apiUrl of baseUrls) {
    try {
      const proxyUrl = `https://${apiUrl}/proxy?url=${encodeURIComponent(slug)}`;
      const apiResponse = await fetch(proxyUrl, {
        headers: DEFAULT_HEADERS
      });

      if (apiResponse.ok) {
        const contentType = apiResponse.headers.get('content-type');

        // Respons berupa JSON
        if (contentType && contentType.includes('application/json')) {
          const data = await apiResponse.json();
          return NextResponse.json(data);
        }

        // Respons berupa HTML atau teks lainnya
        const textData = await apiResponse.text();
        return new Response(textData, {
          status: apiResponse.status,
          headers: {
            'Content-Type': contentType || 'text/plain'
          }
        });
      }
    } catch (error) {
      lastError = error as Error;
      console.error(`Error proxying request to ${apiUrl}:`, error);
    }
  }

  // Jika semua proxy gagal
  return NextResponse.json(
    {
      error: 'Failed to fetch from all proxies',
      details: lastError?.message || null
    },
    { status: 500 }
  );
}
