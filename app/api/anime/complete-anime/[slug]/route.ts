import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params; // Menangkap parameter slug dari params

  try {
    // Fetch dengan custom headers dan next revalidate
    const response = await fetch(`https://alqanime.net/advanced-search/page/${slug}/?status=completed&order=update`, {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 } // Caching selama 360 detik
    });

    // Jika respons gagal
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const animeList: {
      title: string;
      slug: string;
      poster: string;
      episode_count: string;
      rating: string;
      last_release_date: string;
      anime_url: string;
    }[] = [];

    // Mengiterasi setiap elemen artikel yang mengandung anime
    $('.listupd > article.bs').each((index, element) => {
      const title = $(element).find('.tt > h2').text().trim();
      const slug = $(element).find('a').attr('href')?.split('/')[3] || ''; // Mengambil slug dari URL
      const poster = $(element).find('img').attr('data-src') || ''; // Mengambil poster dari atribut data-src (lazy-loaded)
      const episode_count = $(element).find('.epx').text().trim() || 'N/A';
      const rating = $(element).find('.numscore').text().trim() || '0';
      const last_release_date = $(element).find('.date').text().trim() || 'Unknown';
      const anime_url = $(element).find('a').attr('href') || '';

      // Menyimpan data anime ke dalam array
      animeList.push({
        title,
        slug,
        poster,
        episode_count,
        rating,
        last_release_date,
        anime_url
      });
    });

    // Struktur pagination
    const pagination = {
      current_page: parseInt(slug as string, 10) || 1,
      last_visible_page: 55, // Gantilah dengan logika dinamis jika tersedia
      has_next_page: parseInt(slug as string, 10) < 55,
      next_page: parseInt(slug as string, 10) < 55 ? parseInt(slug as string, 10) + 1 : null,
      has_previous_page: parseInt(slug as string, 10) > 1,
      previous_page: parseInt(slug as string, 10) > 1 ? parseInt(slug as string, 10) - 1 : null
    };

    // Mengembalikan hasil scraping dalam format JSON
    return NextResponse.json({
      status: 'Ok',
      data: animeList,
      pagination
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to scrape data' }, { status: 500 });
  }
}
