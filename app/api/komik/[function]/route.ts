// app/api/komik/[function]/route.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

const baseUrl = {
  anime: 'https://kuramanime.boo',
  komik: 'https://komikcast.cz'
};
const baseURL = baseUrl.komik;

const DEFAULT_HEADERS = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9',
  'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
  'sec-ch-ua-mobile': '?0',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
  referer: `${baseURL}`,
  origin: `${baseURL}`
};

const axiosInstance = axios.create({
  headers: DEFAULT_HEADERS
});

// Logging Function
const logError = (error: any) => {
  console.error('Error Status:', error.response?.status);
  console.error('Error Headers:', error.response?.headers);
  console.error('Error Data:', error.response?.data);
};

// Type Definitions
interface MangaData {
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
  komik_id: string;
}

interface MangaDetail {
  title: string;
  image: string;
  description: string;
  status: string;
  type: string;
  releaseDate: string;
  author: string;
  totalChapter: string;
  updatedOn: string;
  genres: string[];
  chapters: { chapter: string; link: string }[];
}

interface MangaChapter {
  title: string;
  images: string[];
}

// Utility function to parse manga data
const parseMangaData = ($: cheerio.CheerioAPI): MangaData[] => {
  const data: MangaData[] = [];

  $('.list-update_items-wrapper .list-update_item').each((i: number, e: cheerio.Element) => {
    const title = $(e).find('.title').text() || '';
    let image = $(e).find('img').attr('src') || '';
    image = image.split('?')[0]; // Remove query parameters from image URL
    const chapter = $(e).find('.chapter').text().trim().replace('Ch.', ''); // Keep only the numeric part
    const score = $(e).find('.numscore').text() || '';
    const type = $(e).find('.type').text() || '';
    const komik_id = $(e).find('a').attr('href')?.split('/')[4] || '';

    data.push({
      title,
      image,
      chapter,
      score,
      type,
      komik_id
    });
  });

  return data;
};

// Function to get manga detail
const getDetail = async (komik_id: string): Promise<MangaDetail> => {
  try {
    const { data: body } = await axiosInstance.get(`${baseURL}/komik/${komik_id}`);
    const $ = cheerio.load(body);

    const title = $('.komik_info-content-body-title').text() || '';
    let image =
      $(
        '#content > div > div > div:nth-child(2) > div.komik_info-content > div.komik_info-content-thumbnail > img'
      ).attr('src') || '';
    image = image.split('?')[0]; // Remove query parameters from image URL
    const description =
      $('#content > div > div > div:nth-child(2) > div.komik_info-description > div > p').text().trim() || '';
    const status = $(".komik_info-content-info:contains('Status')").text().replace('Status:', '').trim() || '';
    const genres: string[] = [];
    $('.komik_info-content-genre a').each((i, el) => {
      genres.push($(el).text());
    });
    const releaseDate = $('.komik_info-content-info-release').text().replace('Released:', '').trim();
    const author = $(".komik_info-content-info:contains('Author')").text().replace('Author:', '').trim();
    const type = $('.komik_info-content-info-type a').text().trim();
    const totalChapter = $(".komik_info-content-info:contains('Total Chapter')")
      .text()
      .replace('Total Chapter:', '')
      .trim();
    const updatedOn = $('.komik_info-content-update time').text().trim();
    const chapters: { chapter: string; link: string }[] = [];
    $('.komik_info-chapters-wrapper li').each((i, el) => {
      const chapter = $(el).find('a').text().trim();
      const link = $(el).find('a').attr('href')?.split('/')[4] || '';
      chapters.push({ chapter, link });
    });

    return {
      title,
      image,
      description,
      status,
      type,
      releaseDate,
      author,
      totalChapter,
      updatedOn,
      genres,
      chapters
    };
  } catch (error) {
    logError(error);
    throw new Error('Failed to fetch manga detail');
  }
};

// Function to get manga chapter
const getChapter = async (chapter_url: string): Promise<MangaChapter> => {
  try {
    const { data: body } = await axiosInstance.get(`${baseURL}/chapter/${chapter_url}`);
    const $ = cheerio.load(body);

    const title = $('#content > div > div > div.chapter_headpost > h1').text() || '';
    const images: string[] = [];
    $('.main-reading-area img').each((i, el) => {
      const image = $(el).attr('src') || '';
      images.push(image);
    });

    return { title, images };
  } catch (error) {
    logError(error);
    throw new Error('Failed to fetch manga chapter');
  }
};

// Main function to handle GET requests
export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const order = url.searchParams.get('order') || 'update';
  const type = url.pathname.split('/')[3] as 'manga' | 'manhwa' | 'manhua' | 'search' | 'detail' | 'chapter';

  try {
    if (type === 'detail') {
      const komik_id = url.searchParams.get('komik_id') || 'one-piece';
      const detailData = await getDetail(komik_id);
      return NextResponse.json(detailData, { status: 200 });
    } else if (type === 'chapter') {
      const chapter_url = url.searchParams.get('chapter_url') || '';
      const chapterData = await getChapter(chapter_url);
      return NextResponse.json(chapterData, { status: 200 });
    } else {
      let apiUrl = `${baseURL}/daftar-komik/page/${page}/?type=${type}&sortby=${order}`;
      if (type === 'search') {
        const query = url.searchParams.get('query') || '';
        apiUrl = `${baseURL}/page/${page}/?s=${query}`;
      }
      const { data: body } = await axiosInstance.get(apiUrl);

      const $ = cheerio.load(body);
      const data = parseMangaData($);

      const prevPage = $('.prev').length > 0;
      const nextPage = $('.next').length > 0;

      return NextResponse.json(
        {
          data,
          prevPage,
          nextPage
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    logError(error);
    return NextResponse.json(
      {
        status: false,
        message: error.message
      },
      { status: 500 }
    );
  }
};
