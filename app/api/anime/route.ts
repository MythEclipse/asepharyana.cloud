import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Fetch for ongoing anime
    const ongoingResponse = await fetch('https://samehadaku.li/anime/?page=1&status=ongoing&sub=&order=update', {
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
      anime_url: string;
    }[] = [];

    $ongoing('.listupd .bs').each((index, element) => {
      const title = $ongoing(element).find('.tt h2').text().trim() || '';
      const slug = $ongoing(element).find('a').attr('href')?.split('/')[4] || '';
      const poster = $ongoing(element).find('img').attr('src') || '';
      const current_episode = $ongoing(element).find('.epx').text().trim() || 'N/A';
      const anime_url = $ongoing(element).find('a').attr('href') || '';

      ongoingAnime.push({
        title,
        slug,
        poster,
        current_episode,
        anime_url
      });
    });

    // Fetch for new season anime
    const newSeasonResponse = await fetch('https://samehadaku.li/anime/?page=1&status=completed&sub=&order=update', {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 } // Caching for 360 seconds
    });

    if (!newSeasonResponse.ok) {
      throw new Error(`Failed to fetch new season anime data: ${newSeasonResponse.statusText}`);
    }

    const newSeasonHtml = await newSeasonResponse.text();
    const $newSeason = cheerio.load(newSeasonHtml);

    const completeAnime: {
      title: string;
      slug: string;
      poster: string;
      episode_count: string;
      anime_url: string;
    }[] = [];

    $newSeason('.listupd .bs').each((index, element) => {
      const title = $newSeason(element).find('.tt h2').text().trim() || '';
      const slug = $newSeason(element).find('a').attr('href')?.split('/')[4] || '';
      const poster = $newSeason(element).find('img').attr('src') || '';
      const episode_count = $newSeason(element).find('.epx').text().trim() || 'N/A';
      const anime_url = $newSeason(element).find('a').attr('href') || '';

      completeAnime.push({
        title,
        slug,
        poster,
        episode_count,
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
