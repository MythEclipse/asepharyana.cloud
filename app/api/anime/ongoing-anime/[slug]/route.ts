import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const response = await fetch(`https://samehadaku.li/anime/?page=${slug}&status=ongoing&sub=&order=update`, {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const animeList: {
      title: string;
      slug: string;
      poster: string;
      episode: string;
      anime_url: string;
    }[] = [];

    $('.listupd .bs').each((index, element) => {
      const title = $(element).find('.tt h2').text().trim() || '';
      const slug = $(element).find('a').attr('href')?.split('/')[4] || '';
      const poster = $(element).find('img').attr('src') || '';
      const episode = $(element).find('.bt .epx').text().trim() || 'Ongoing';
      const anime_url = $(element).find('a').attr('href') || '';

      animeList.push({
        title,
        slug,
        poster,
        episode,
        anime_url
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
