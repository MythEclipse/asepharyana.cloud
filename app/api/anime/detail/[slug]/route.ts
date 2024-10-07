import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const response = await fetch(`https://samehadaku.li/anime/${slug}`, {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch anime detail data: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('.entry-title').text().trim();
    const alternative_title = $('.info-content .spe span:contains("Other")').next().text().trim();
    const poster = $('.thumbook .thumb img').attr('src') || '';
    const type = $('.info-content .spe span:contains("Type")').next().text().trim();
    const release_date = $('.info-content .spe span:contains("Released")').next().text().trim();
    const status = $('.info-content .spe span:contains("Status")').next().text().trim();
    const synopsis = $('.entry-content').text().trim();
    const genres: { name: string; slug: string; anime_url: string }[] = [];

    $('.genxed a').each((index, element) => {
      const name = $(element).text().trim();
      const genreSlug = $(element).attr('href')?.split('/')[4] || '';
      const anime_url = $(element).attr('href') || '';
      genres.push({ name, slug: genreSlug, anime_url });
    });

    const episode_lists: { episode: string; slug: string }[] = [];
    $('.eplister ul li a').each((_, element) => {
      const episode = $(element).find('.epl-title').text().trim();
      const episodeNumber = $(element).find('.epl-num').text().trim();
      const episodeSlug = `${slug}-episode-${episodeNumber}`;
      episode_lists.push({ episode, slug: episodeSlug });
    });

    const studio = $('.info-content .spe span:contains("Studio")').next().text().trim();
    const season = $('.info-content .spe span:contains("Season")').next().text().trim();
    const censor = $('.info-content .spe span:contains("Censor")').next().text().trim();
    const director = $('.info-content .spe span:contains("Director")').next().text().trim();
    const producers: string[] = [];
    $('.info-content .spe span:contains("Producers")')
      .nextAll('a')
      .each((_, element) => {
        producers.push($(element).text().trim());
      });
    const posted_by = $('.info-content .spe span:contains("Posted by")').next().text().trim();
    const released_on = $('.info-content .spe span:contains("Released on") time').attr('datetime') || '';
    const updated_on = $('.info-content .spe span:contains("Updated on") time').attr('datetime') || '';

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(date);
    };

    const recommendations: { title: string; slug: string; poster: string; status: string; type: string }[] = [];
    $('.listupd .bs').each((_, element) => {
      const title = $(element).find('.tt h2').text().trim();
      const url = $(element).find('a').attr('href') || '';
      const poster = $(element).find('img').attr('src') || '';
      const status = $(element).find('.status').text().trim();
      const type = $(element).find('.typez').text().trim();
      const slug = url.split('/')[4] || '';
      recommendations.push({ title, slug, poster, status, type });
    });

    return NextResponse.json({
      status: 'Ok',
      data: {
        title,
        poster,
        type,
        status,
        release_date,
        studio,
        season,
        censor,
        director,
        posted_by,
        released_on: formatDate(released_on),
        updated_on: formatDate(updated_on),
        genres,
        synopsis,
        episode_lists,
        recommendations
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to scrape data' }, { status: 500 });
  }
}
