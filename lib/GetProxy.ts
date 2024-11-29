import { DEFAULT_HEADERS } from '@/lib/DHead';
import { BaseUrl } from '@/lib/url';

export default async function fetchProxy(url: string): Promise<Response> {
  let lastError: Error | null = null;

  // Fungsi untuk mencoba fetch melalui proxy
  const tryFetchViaProxy = async (): Promise<Response | null> => {
    try {
      const proxyUrl = `https://${BaseUrl}/api/proxy?url=${encodeURIComponent(url)}`;
      const proxyResponse = await fetch(proxyUrl, {
        headers: DEFAULT_HEADERS
      });

      if (proxyResponse.ok) {
        return proxyResponse;
      }
    } catch (error) {
      lastError = error as Error;
      console.error(`Error proxying request to:`, error);
    }
    return null;
  };

  // Fungsi untuk mencoba fetch langsung
  const tryFetchDirect = async (): Promise<Response | null> => {
    try {
      const response = await fetch(url, {
        headers: DEFAULT_HEADERS
      });

      if (response.ok) {
        return response;
      } else {
        return null;
      }
    } catch (error) {
      lastError = error as Error;
      console.error(`Error with direct fetch:`, error);
      return null;
    }
  };

  // Coba fetch langsung terlebih dahulu
  const directFetch = await tryFetchDirect();
  if (directFetch) return directFetch;

  // Jika fetch langsung gagal, coba fetch melalui proxy
  const proxyFetch = await tryFetchViaProxy();
  if (proxyFetch) return proxyFetch;

  // Jika semua gagal, lemparkan error dengan menggunakan lastError.message
  if (lastError) {
    throw new Error(`Failed to fetch from all proxies and fallback.`);
  } else {
    throw new Error('Unknown error occurred.');
  }
}
