import * as cheerio from 'cheerio';
import { DEFAULT_HEADERS } from '@/lib/DHead';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const response = await fetch(`https://alqanime.net/${slug}/`, {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 360 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch anime detail data: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('.infox h1.entry-title').text().trim();
    const japanese_title = $('.ninfo > .alter').text().trim();
    const poster = $('.bigcontent.spctrail .thumbook .thumb img').data('src') || ''; // Ubah data('src') menjadi attr('src')
    const rating = $('.rating strong').text().trim(); // Pastikan ada elemen dengan class .rating jika ada

    const status = $('.info-content .spe span:contains("Status:")').text().replace('Status:', '').trim() || '';
    const studio = $('.info-content .spe span:contains("Studio:")').text().replace('Studio:', '').trim() || '';
    const release_date = $('.info-content .spe span:contains("Dirilis:")').text().replace('Dirilis:', '').trim() || '';
    const duration = $('.info-content .spe span:contains("Durasi:")').text().replace('Durasi:', '').trim() || '';
    const episode_count = $('.info-content .spe span:contains("Episode:")').text().replace('Episode:', '').trim() || ''; // Ubah label menjadi 'Episode'
    const type = $('.info-content .spe span:contains("Tipe:")').text().replace('Tipe:', '').trim() || '';
    const credit = $('.info-content .spe span:contains("Credit:")').text().replace('Credit:', '').trim() || '';
    const genres: { name: string; slug: string; otakudesu_url: string }[] = [];
    $('.genxed a').each((index, element) => {
      const name = $(element).text().trim();
      const genreSlug = $(element).attr('href')?.split('/')[4] || '';
      const otakudesu_url = $(element).attr('href') || '';
      genres.push({ name, slug: genreSlug, otakudesu_url });
    });

    const synopsis = $('.synp > div.entry-content').text().trim();

    const episode_lists: {
      episode: string;
      slug: string;
      otakudesu_url: string;
      quality: { res: string; buttons: { name: string; url: string }[] }[];
    }[] = [];

    const batchLinks: { res: string; urls: any[] }[] = [];
    const batchElement = $('.mctnx .soraddl.dlone').first();

    if (batchElement.length) {
      $(batchElement)
        .find('.soraurl')
        .each((index, element) => {
          const res = $(element).find('.res').text().trim();
          const urls = $(element)
            .find('.slink a')
            .map((i, el) => ({
              name: $(el).text().trim(),
              url: $(el).attr('href') || ''
            }))
            .get();
          batchLinks.push({ res, urls });
        });
    }

    $('.mctnx .soraddl.dlone').each((index, element) => {
      const episodeTitle = $(element).find('.sorattl h3').text().trim();
      const episodeSlug = episodeTitle.toLowerCase().replace(/\s+/g, '-');

      const qualityLinks: { res: string; buttons: { name: string; url: string }[] }[] = [];
      $(element)
        .find('.content .soraurl')
        .each((i, el) => {
          const res = $(el).find('.res').text().trim();
          const buttons = $(el)
            .find('.slink a')
            .map((j, linkEl) => ({
              name: $(linkEl).text().trim(),
              url: $(linkEl).attr('href') || ''
            }))
            .get();
          qualityLinks.push({ res, buttons });
        });

      episode_lists.push({
        episode: episodeTitle,
        slug: episodeSlug,
        otakudesu_url: '',
        quality: qualityLinks
      });
    });

    if (batchLinks.length > 0 && !episode_lists.some((ep) => ep.episode === 'Batch')) {
      episode_lists.unshift({
        episode: 'Batch',
        slug: 'batch',
        otakudesu_url: '',
        quality: batchLinks.map((batch) => ({
          res: batch.res,
          buttons: batch.urls
        }))
      });
    }

    const recommendations: {
      title: string;
      slug: string;
      poster: string;
      otakudesu_url: string;
    }[] = [];

    $('.listupd article.bs').each((index, element) => {
      const title = $(element).find('.tt .ntitle').text().trim();
      const recommendationSlug = $(element).find('a').attr('href')?.split('/')[3] || '';
      const poster = $(element).find('img').data('src') || '';
      const otakudesu_url = $(element).find('a').attr('href') || '';

      recommendations.push({ title, slug: recommendationSlug, poster, otakudesu_url });
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
