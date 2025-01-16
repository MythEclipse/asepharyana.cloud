import puppeteer from 'puppeteer';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextResponse } from 'next/server';

const fetchWithoutProxy = async (
  url: string
): Promise<{ data: string; contentType: string | undefined }> => {
  try {
    const browser = await puppeteer.launch({
      headless: true, // Menggunakan mode headless untuk Puppeteer
      args: [
        '--no-sandbox', // Mencegah sandboxing, diperlukan di beberapa lingkungan server
        '--disable-setuid-sandbox', // Mencegah isu dengan setuid sandbox
        '--disable-dev-shm-usage', // Gunakan `/tmp` alih-alih shared memory
        '--disable-accelerated-2d-canvas', // Menonaktifkan akselerasi canvas 2D
        '--disable-gpu', // Nonaktifkan GPU rendering (headless tidak membutuhkan ini)
        '--no-zygote', // Meningkatkan performa startup
        '--no-first-run', // Tidak menjalankan wizard startup
        '--single-process', // Jalankan dalam mode single process untuk server
        '--disable-background-networking', // Mengurangi aktivitas jaringan tambahan
        '--disable-default-apps', // Menonaktifkan aplikasi bawaan
        '--disable-renderer-backgrounding', // Tetap aktifkan proses renderer
        '--disable-features=site-per-process', // Menonaktifkan fitur `site-per-process`
        '--mute-audio', // Nonaktifkan audio
        '--enable-automation', // Mengaktifkan mode otomatisasi
      ],
    });

    const page = await browser.newPage();
    await page.setExtraHTTPHeaders(DEFAULT_HEADERS);
    await page.goto('https://www.croxyproxy.com/');
    await page.waitForNetworkIdle();

    await page.type('#url', url);
    await Promise.all([
      page.click('#requestSubmit'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    await page.waitForSelector('img', { visible: true, timeout: 60000 });
    await page.evaluate(() => {
      const images = Array.from(document.images);
      return Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = img.onerror = resolve;
          });
        })
      );
    });

    const html = await page.content();
    await browser.close();
    return { data: html, contentType: 'text/html' };
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${(error as Error).message}`);
  }
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('url');
  if (!slug)
    return NextResponse.json(
      { error: 'Missing slug parameter' },
      { status: 400 }
    );

  try {
    const { data, contentType } = await fetchWithoutProxy(slug);
    if (contentType?.includes('application/json')) {
      return NextResponse.json(data);
    }
    return new Response(data, {
      headers: { 'Content-Type': contentType || 'text/plain' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch URL', details: (error as Error).message },
      { status: 500 }
    );
  }
}
