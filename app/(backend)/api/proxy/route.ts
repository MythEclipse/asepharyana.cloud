import axios from 'axios';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextResponse } from 'next/server';
import { HttpsProxyAgent } from 'https-proxy-agent';

const fetchWithProxy = async (
  url: string,
  proxy?: { host: string; port: number }
): Promise<{ data: string; contentType: string | undefined }> => {
  try {
    const agent = proxy
      ? new HttpsProxyAgent(`http://${proxy.host}:${proxy.port}`)
      : undefined;

    const response = await axios.get(url, {
      headers: DEFAULT_HEADERS,
      httpsAgent: agent,
    });

    return {
      data: response.data,
      contentType: response.headers['content-type'],
    };
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${(error as Error).message}`);
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('url');
  if (!slug)
    return NextResponse.json(
      { error: 'Missing slug parameter' },
      { status: 400 }
    );

  try {
    const proxyListResponse = await fetch(
      'https://raw.githubusercontent.com/MythEclipse/proxy-auto-ts/refs/heads/main/proxies.txt'
    );
    const proxyListText = await proxyListResponse.text();
    const proxies = proxyListText.split('\n').filter(Boolean);

    if (proxies.length === 0) {
      throw new Error('No proxies available');
    }

    const maxAttempts = proxies.length;

    for (let attempts = 0; attempts < maxAttempts; attempts++) {
      const proxy = proxies[attempts];
      const [proxyHost, proxyPort] = proxy.split(':');

      try {
        const { data, contentType } = await fetchWithProxy(slug, {
          host: proxyHost,
          port: parseInt(proxyPort, 10),
        });

        if (contentType?.includes('application/json')) {
          return NextResponse.json(data);
        }
        return new Response(data, {
          headers: { 'Content-Type': contentType || 'text/plain' },
        });
      } catch (error) {
        if (attempts < maxAttempts - 1) {
          await delay(50); // Wait for 5 seconds before retrying
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch URL', details: (error as Error).message },
      { status: 500 }
    );
  }
}
