import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Fetch untuk ongoing anime
    const ongoingResponse = await fetch('https://alqanime.net/advanced-search/page/1/?status=ongoing&order=update', {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 } // Caching selama 360 detik
    });

    if (!ongoingResponse.ok) {
      throw new Error(`Failed to fetch ongoing anime data: ${ongoingResponse.statusText}`);
    }

    const ongoingHtml = await ongoingResponse.text();
    const $ongoing = cheerio.load(ongoingHtml);

    const ongoingAnime: {
      title: string;
      slug: string;
      poster: string;
      current_episode: string;
      release_day: string;
      newest_release_date: string;
      anime_url: string;
    }[] = [];

    $ongoing('.listupd > article.bs').each((index, element) => {
      const title = $ongoing(element).find('.tt > h2').text().trim();
      const slug = $ongoing(element).find('a').attr('href')?.split('/')[3] || '';
      const poster = $ongoing(element).find('img').attr('data-src') || '';
      const current_episode = $ongoing(element).find('.epx').text().trim() || 'N/A';
      const release_day = $ongoing(element).find('.date').text().trim() || 'None';
      const newest_release_date = $ongoing(element).find('.date').text().trim() || 'Unknown';
      const anime_url = $ongoing(element).find('a').attr('href') || '';

      ongoingAnime.push({
        title,
        slug,
        poster,
        current_episode,
        release_day,
        newest_release_date,
        anime_url
      });
    });

    // Fetch untuk completed anime
    const completedResponse = await fetch(
      'https://alqanime.net/advanced-search/page/1/?status=completed&order=update',
      {
        headers: DEFAULT_HEADERS,
        next: { revalidate: 360 }
      }
    );

    if (!completedResponse.ok) {
      throw new Error(`Failed to fetch completed anime data: ${completedResponse.statusText}`);
    }

    const completedHtml = await completedResponse.text();
    const $completed = cheerio.load(completedHtml);

    const completeAnime: {
      title: string;
      slug: string;
      poster: string;
      episode_count: string;
      rating: string;
      last_release_date: string;
      anime_url: string;
    }[] = [];

    $completed('.listupd > article.bs').each((index, element) => {
      const title = $completed(element).find('.tt > h2').text().trim();
      const slug = $completed(element).find('a').attr('href')?.split('/')[3] || '';
      const poster = $completed(element).find('img').attr('data-src') || '';
      const episode_count = $completed(element).find('.epx').text().trim() || 'N/A';
      const rating = $completed(element).find('.numscore').text().trim() || '0';
      const last_release_date = $completed(element).find('.date').text().trim() || 'Unknown';
      const anime_url = $completed(element).find('a').attr('href') || '';

      completeAnime.push({
        title,
        slug,
        poster,
        episode_count,
        rating,
        last_release_date,
        anime_url
      });
    });

    // Mengembalikan hasil scraping dalam format JSON
    return NextResponse.json({
      status: 'Ok',
      data: {
        ongoing_anime: ongoingAnime,
        complete_anime: completeAnime
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to scrape data' }, { status: 500 });
  }
}
