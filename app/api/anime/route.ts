import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Fetch for ongoing anime
    const ongoingResponse = await fetch('https://otakudesu.cloud/ongoing-anime/', {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 } // Caching for 360 seconds
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

    $ongoing('.venz > ul > li').each((index, element) => {
      const title = $ongoing(element).find('.jdlflm').text().trim();
      const slug = $ongoing(element).find('a').attr('href')?.split('/')[4] || '';
      const poster = $ongoing(element).find('.thumbz img').attr('src') || '';
      const current_episode = $ongoing(element).find('.epz').text().trim() || 'N/A';
      const release_day = $ongoing(element).find('.epztipe').text().trim() || 'None';
      const newest_release_date = $ongoing(element).find('.newnime').text().trim() || 'Unknown';
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

    // Fetch for completed anime
    const completedResponse = await fetch('https://otakudesu.cloud/complete-anime/', {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 }
    });

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

    $completed('.venz > ul > li').each((index, element) => {
      const title = $completed(element).find('.jdlflm').text().trim();
      const slug = $completed(element).find('a').attr('href')?.split('/')[4] || '';
      const poster = $completed(element).find('.thumbz img').attr('src') || '';
      const episode_count = $completed(element).find('.epz').text().trim() || 'N/A';
      const rating = $completed(element).find('.epztipe').text().trim() || '0';
      const last_release_date = $completed(element).find('.newnime').text().trim() || 'Unknown';
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

    // Return the scraping results in JSON format
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
