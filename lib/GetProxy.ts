import { DEFAULT_HEADERS } from '@/lib/DHead';

export default async function fetchProxy(url: string): Promise<Response> {
  let lastError: Error | null = null;

  // Coba fetch biasa terlebih dahulu
  try {
    const fallbackResponse = await fetch(url, {
      headers: DEFAULT_HEADERS
    });

    if (fallbackResponse.ok) {
      return fallbackResponse;
    } else {
      throw new Error(`Fallback fetch failed with status: ${fallbackResponse.status}`);
    }
  } catch (error) {
    lastError = error as Error;
    console.error(`Error with fallback fetch:`, error);
  }

  // Jika fetch biasa gagal, coba fetch melalui proxy
  const baseUrls = ['meitang.xyz', 'btch.us.kg', 'api.tioo.eu.org', 'api.tioprm.eu.org'];

  for (const apiUrl of baseUrls) {
    try {
      const proxyUrl = `https://${apiUrl}/proxy?url=${encodeURIComponent(url)}`;
      const apiResponse = await fetch(proxyUrl, {
        headers: DEFAULT_HEADERS
      });

      if (apiResponse.ok) {
        return apiResponse;
      }
    } catch (error) {
      lastError = error as Error;
      console.error(`Error proxying request to ${apiUrl}:`, error);
    }
  }

  throw new Error(`Failed to fetch from all proxies and fallback. Last error: ${lastError?.message}`);
}
