// lib/fetchWithFallback.ts
import { DEFAULT_HEADERS } from '@/lib/DHead';

export async function fetchWithProxy(
  slug: string
): Promise<{ data: string | object; contentType: string | null }> {
  try {
    // Coba fetch langsung terlebih dahulu
    const response = await fetch(slug, {
      headers: DEFAULT_HEADERS,
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const jsonData = await response.json();
        // console.log('Fetched directly json');
        return { data: jsonData, contentType };
      }

      const textData = await response.text();
      // console.log('Fetched directly text');
      return { data: textData, contentType };
    }

    throw new Error(`Direct fetch failed`);
  } catch {
    console.error('Direct fetch failed, trying proxies');
    return await fetchFromProxies(slug);
  }
}

async function fetchFromProxies(
  slug: string
): Promise<{ data: string | object; contentType: string | null }> {
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
      const response = await fetch(proxyUrl, {
        headers: DEFAULT_HEADERS,
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const jsonData = await response.json();
          // console.log('Fetched from proxy json:', proxyUrl);
          return { data: JSON.stringify(jsonData), contentType };
        }

        const textData = await response.text();
        // console.log('Fetched from proxy text:', proxyUrl);
        const cleanedTextData = textData.replace(/\/proxy/g, ''); // Menghapus semua "/proxy" dari teks
        return { data: cleanedTextData, contentType };
      }
    } catch (error) {
      lastError = error as Error;
      console.error(`Error proxying request to ${apiUrl}:`, error);
    }
  }

  throw new Error(lastError?.message || 'Failed to fetch from all proxies');
}
