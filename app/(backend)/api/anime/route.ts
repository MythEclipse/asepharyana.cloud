import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';
import GetProxy from '@/lib/GetProxy';

async function fetchHtml(url: string): Promise<string> {
  const response = await GetProxy(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }

  return response.text();
}

function parseOngoingAnime(html: string) {
  const $ = cheerio.load(html);
  const ongoingAnime: {
    title: string;
    slug: string;
    poster: string;
    current_episode: string;
    anime_url: string;
  }[] = [];

  $('.venz ul li').each((index, element) => {
    const title = $(element).find('.thumbz h2.jdlflm').text().trim() || '';
    const slug = $(element).find('a').attr('href')?.split('/')[4] || '';
    const poster = $(element).find('img').attr('src') || '';
    const current_episode = $(element).find('.epz').text().trim() || 'N/A';
    const anime_url = $(element).find('a').attr('href') || '';

    ongoingAnime.push({
      title,
      slug,
      poster,
      current_episode,
      anime_url
    });
  });

  return ongoingAnime;
}

function parseCompleteAnime(html: string) {
  const $ = cheerio.load(html);
  const completeAnime: {
    title: string;
    slug: string;
    poster: string;
    episode_count: string;
    anime_url: string;
  }[] = [];

  $('.venz ul li').each((index, element) => {
    const title = $(element).find('.thumbz h2.jdlflm').text().trim() || '';
    const slug = $(element).find('a').attr('href')?.split('/')[4] || '';
    const poster = $(element).find('img').attr('src') || '';
    const episode_count = $(element).find('.epz').text().trim() || 'N/A';
    const anime_url = $(element).find('a').attr('href') || '';

    completeAnime.push({
      title,
      slug,
      poster,
      episode_count,
      anime_url
    });
  });

  return completeAnime;
}

export async function GET(req: NextRequest) {
  try {
    const ongoingHtml = await fetchHtml('https://otakudesu.cloud/ongoing-anime/');
    const completeHtml = await fetchHtml('https://otakudesu.cloud/complete-anime/');

    const ongoingAnime = parseOngoingAnime(ongoingHtml);
    const completeAnime = parseCompleteAnime(completeHtml);

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
