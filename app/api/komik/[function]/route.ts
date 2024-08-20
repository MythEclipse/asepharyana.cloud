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

// Main function to handle GET requests
export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const order = url.searchParams.get('order') || 'update';
  const type = url.pathname.split('/')[3] as 'manga' | 'manhwa' | 'manhua' | 'search';

  try {
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
