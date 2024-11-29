import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';
import GetProxy from '@/lib/GetProxy';

async function fetchAnimeData(slug: string) {
  const response = await GetProxy(`https://otakudesu.cloud/?s=${slug}&post_type=anime`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.text();
}

function parseAnimeData(html: string, slug: string) {
  const $ = cheerio.load(html);

  const animeList: {
    title: string;
    slug: string;
    poster: string;
    episode: string;
    anime_url: string;
    genres: string[];
    status: string;
    rating: string;
  }[] = [];

  $('#venkonten .chivsrc li').each((_, element) => {
    const title = $(element).find('h2 a').text().trim() || '';
    const slug = $(element).find('a').attr('href')?.split('/')[4] || '';
    const poster = $(element).find('img').attr('src') || '';
    const episode =
      $(element)
        .find('h2 a')
        .text()
        .match(/\(([^)]+)\)/)?.[1] || 'Ongoing';
    const anime_url = $(element).find('a').attr('href') || '';
    const genres = $(element)
      .find('.set b:contains("Genres")')
      .nextAll('a')
      .map((_, el) => $(el).text())
      .get();
    const status = $(element).find('.set b:contains("Status")').parent().text().replace('Status :', '').trim() || '';
    const rating = $(element).find('.set b:contains("Rating")').parent().text().replace('Rating :', '').trim() || '';

    animeList.push({
      title,
      slug,
      poster,
      episode,
      anime_url,
      genres,
      status,
      rating
    });
  });

  const pagination = {
    current_page: parseInt(slug as string, 10) || 1,
    last_visible_page: 57,
    has_next_page: $('.hpage .r').length > 0,
    next_page: $('.hpage .r').length > 0 ? parseInt(slug as string, 10) + 1 : null,
    has_previous_page: parseInt(slug as string, 10) > 1,
    previous_page: parseInt(slug as string, 10) > 1 ? parseInt(slug as string, 10) - 1 : null
  };

  return { animeList, pagination };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('q') || 'one';

  try {
    const html = await fetchAnimeData(slug);
    const { animeList, pagination } = parseAnimeData(html, slug);

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
