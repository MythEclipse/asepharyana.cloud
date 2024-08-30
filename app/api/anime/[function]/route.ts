import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';

const baseUrl = {
  anime: 'https://otakudesu.cloud',
};
const baseURL = baseUrl.anime;

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
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
};

// Logging Function
const logError = (error: any) => {
  console.error('Error:', error.message);
};

const fetchWithCache = async (url: string): Promise<any> => {
  try {
    const res = await fetch(url, {
      headers: DEFAULT_HEADERS,
      next: { revalidate: 3600 } // Cache response for 60 minutes
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return await res.text(); // Fetch as text to parse later
  } catch (error) {
    logError(error);
    throw new Error('Failed to fetch data');
  }
};

const getOngoing = async (page: string) => {
  try {
    const data = await fetchWithCache(`${baseURL}/complete-anime/page/${page}`);
    const $ = cheerio.load(data);
    const $parentElement = $('#venkonten > div > div.venser > div.venutama > div.rseries > div > div.venz > ul > li');

    const list = $parentElement
      .map((i, el) => {
        const title = $(el).find('div > div.thumb > a > div > h2').text();
        const thumbnail = $(el).find('div > div.thumb > a > div > img').attr('src');
        const episode = $(el).find('div > div.epz').text();
        const temp = $(el).find('div > div.thumb > a').attr('href')?.split('/');

        return {
          id: temp?.[temp.length - 2],
          title,
          thumbnail,
          episode
        };
      })
      .get();

    return list;
  } catch (error) {
    logError(error);
    throw new Error('Failed to fetch ongoing anime');
  }
};

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const type = url.pathname.split('/')[3] as 'home' | 'ongoing' | 'complete' | 'search' | 'detail' | 'episode';

  try {
    let data: any;

    if (type === 'ongoing') {
      data = await getOngoing(page);
    }

    return NextResponse.json(data, { status: 200 });
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
