import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const response = await fetch(`https://otakudesu.cloud/anime/${slug}/`, {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch anime detail data: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('.infozingle span:contains("Judul")').text().replace('Judul: ', '').trim();
    const japanese_title = $('.infozingle span:contains("Japanese")').text().replace('Japanese: ', '').trim();
    const poster = $('.fotoanime img').attr('src') || '';
    const rating = $('.infozingle span:contains("Skor")').text().replace('Skor: ', '').trim();
    const status = $('.infozingle span:contains("Status")').text().replace('Status: ', '').trim() || '';
    const studio = $('.infozingle span:contains("Studio")').text().replace('Studio: ', '').trim() || '';
    const release_date =
      $('.infozingle span:contains("Tanggal Rilis")').text().replace('Tanggal Rilis: ', '').trim() || '';
    const duration = $('.infozingle span:contains("Durasi")').text().replace('Durasi: ', '').trim() || '';
    const episode_count =
      $('.infozingle span:contains("Total Episode")').text().replace('Total Episode: ', '').trim() || '';
    const type = $('.infozingle span:contains("Tipe")').text().replace('Tipe: ', '').trim() || '';
    const credit = $('.infozingle span:contains("Produser")').text().replace('Produser: ', '').trim() || '';

    const genres: { name: string; slug: string; anime_url: string }[] = [];
    $('.infozingle span:contains("Genre")')
      .find('a')
      .each((index, element) => {
        const name = $(element).text().trim();
        const genreSlug = $(element).attr('href')?.split('/')[4] || '';
        const anime_url = $(element).attr('href') || '';
        genres.push({ name, slug: genreSlug, anime_url });
      });

    const synopsis = $('.sinopc').text().trim();

    const episode_lists: { episode: string; slug: string }[] = [];

    // Get the episode list elements
    const episodeElements = $('.episodelist .smokelister:contains("Episode List")').next('ul').find('li');

    // Iterate from the end to the start
    episodeElements.each((index, element) => {
      const episodeNumber = episodeElements.length - index; // Reverse counting from the total number of episodes
      episode_lists.push({
        episode: `Episode ${episodeNumber}`, // Set episode title as "Episode X"
        slug: $(element).find('a').attr('href')?.split('/')[4] || '' // Keep original slug extraction
      });
    });

    const recommendations: {
      title: string;
      slug: string;
      poster: string;
      anime_url: string;
    }[] = [];

    $('#recommend-anime-series .isi-anime').each((index, element) => {
      const title = $(element).find('.judul-anime a').text().trim();
      const recommendationSlug = $(element).find('a').attr('href')?.split('/')[4] || '';
      const poster = $(element).find('img').attr('src') || '';
      const anime_url = $(element).find('a').attr('href') || '';

      recommendations.push({ title, slug: recommendationSlug, poster, anime_url });
    });

    return NextResponse.json({
      status: 'Ok',
      data: {
        title,
        japanese_title,
        poster,
        rating,
        credit,
        type,
        status,
        episode_count,
        duration,
        release_date,
        studio,
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
