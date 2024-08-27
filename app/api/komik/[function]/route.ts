import { NextResponse } from 'next/server';
import cheerio from 'cheerio';

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
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
};

// Logging Function
const logError = (error: any) => {
  console.error('Error:', error.message);
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
  alternativeTitle: string;
  score: string;
  image: string;
  description: string;
  status: string;
  type: string;
  releaseDate: string;
  author: string;
  totalChapter: string;
  updatedOn: string;
  genres: string[];
  chapters: { chapter: string; date: string; chapter_id: string }[];
}

interface MangaChapter {
  title: string;
  next_chapter_id: string;
  prev_chapter_id: string;
  images: string[];
}

// Utility function to parse manga data
const parseMangaData = (body: string): MangaData[] => {
  const $ = cheerio.load(body);
  const data: MangaData[] = [];

  $('.list-update_items-wrapper .list-update_item').each((i, e) => {
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

// Function to fetch data with Next.js 14 caching
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

// Function to get manga detail
const getDetail = async (komik_id: string): Promise<MangaDetail> => {
  try {
    const body = await fetchWithCache(`${baseURL}/komik/${komik_id}`);
    const $ = cheerio.load(body);

    const title = $('.komik_info-content-body-title').text() || '';
    const alternativeTitle = $('.komik_info-content-native').text() || '';
    const score =
      $(
        '#content > div > div > div:nth-child(2) > div.komik_info-content > div.komik_info-content-rating > div > div.data-rating > strong'
      ).text() || '';
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
    const chapters: { chapter: string; date: string; chapter_id: string }[] = [];
    $('.komik_info-chapters-wrapper li').each((i, el) => {
      const chapter = $(el).find('a').text().trim();
      const date = $(el).find('.chapter-link-time').text().trim();
      const chapter_id = $(el).find('a').attr('href')?.split('/')[4] || '';
      chapters.push({ chapter, date, chapter_id });
    });

    return {
      title,
      alternativeTitle,
      score,
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
    const body = await fetchWithCache(`${baseURL}/chapter/${chapter_url}`);
    const $ = cheerio.load(body);

    const title = $('#content > div > div > div.chapter_headpost > h1').text() || '';

    // Handling previous chapter ID
    const prev_chapter_element = $('#chapter_body > div:nth-child(2) > div.right-control > div > a[rel="prev"]');
    const prev_chapter_id = prev_chapter_element.length
      ? prev_chapter_element.attr('href')?.split('/')[4] || ''
      : '';

    // Handling next chapter ID
    const next_chapter_element = $('#chapter_body > div:nth-child(2) > div.right-control > div > a[rel="next"]');
    const next_chapter_id = next_chapter_element.length
      ? next_chapter_element.attr('href')?.split('/')[4] || ''
      : '';

    const images: string[] = [];
    $('.main-reading-area img').each((i, el) => {
      const image = $(el).attr('src') || '';
      images.push(image);
    });

    return { title, next_chapter_id, prev_chapter_id, images };
  } catch (error) {
    logError(error);
    throw new Error('Failed to fetch manga chapter');
  }
};

/**
 * @swagger
 * /api/komik:
 *   get:
 *     summary: Fetch manga details or chapters
 *     description: Fetches either manga details or chapter images based on query parameters.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [manga, manhwa, manhua, search, detail, chapter]
 *         required: true
 *         description: Type of content to fetch.
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: The page number to fetch.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [update, latest]
 *         required: false
 *         description: The order in which to fetch content.
 *       - in: query
 *         name: komik_id
 *         schema:
 *           type: string
 *         required: false
 *         description: The ID of the manga to fetch details for (used when type is 'detail').
 *       - in: query
 *         name: chapter_url
 *         schema:
 *           type: string
 *         required: false
 *         description: The URL of the chapter to fetch images for (used when type is 'chapter').
 *     responses:
 *       200:
 *         description: A JSON object containing the requested data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: []
 *       400:
 *         description: Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing type or other required query parameters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing the request."
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const page = searchParams.get('page') || '1';
  const order = searchParams.get('order');
  const komik_id = searchParams.get('komik_id');
  const chapter_url = searchParams.get('chapter_url');

  if (!type) {
    return NextResponse.json({ message: 'Missing type or other required query parameters.' }, { status: 400 });
  }

  try {
    let data;
    if (type === 'detail' && komik_id) {
      data = await getDetail(komik_id);
    } else if (type === 'chapter' && chapter_url) {
      data = await getChapter(chapter_url);
    } else {
      const url = `${baseURL}/page/${page}/?orderby=${order}`;
      const body = await fetchWithCache(url);
      data = parseMangaData(body);
    }

    return NextResponse.json({ message: 'Success', data });
  } catch (error) {
    logError(error);
    return NextResponse.json({ message: 'An error occurred while processing the request.' }, { status: 500 });
  }
}
