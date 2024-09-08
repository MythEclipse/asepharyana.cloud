import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const baseUrl = {
  komik: 'https://komikindo.tv'
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

  $('.film-list .animepost').each((i, e) => {
    const title = $(e).find('.tt h4').text().trim() || '';
    let image = $(e).find('img').attr('src') || '';
    image = image.split('?')[0]; // Remove query parameters from image URL
    const chapter = $(e).find('.lsch a').text().trim().replace('Ch.', '') || ''; // Keep only the numeric part
    const score = ''; // Assuming no score is provided in this structure
    const type = $(e).find('.typeflag').text().trim() || '';
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
      next: { revalidate: 360 } // Cache response for 60 minutes
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

    // Title
    const title = $('h1.entry-title').text().trim() || '';

    // Alternative Title
    const alternativeTitle =
      $(".spe span:contains('Judul Alternatif:')").text().replace('Judul Alternatif:', '').trim() || '';

    // Score
    const score = $('.rtg > div > i').text().trim() || '';

    // Image
    let image = $('.thumb img').attr('src') || '';
    image = image.split('?')[0]; // Remove query parameters from image URL

    // Description
    const description = $('.shortcsc').text().trim() || '';

    // Status
    const status = $(".spe span:contains('Status:')").text().replace('Status:', '').trim() || '';

    // Genres
    const genres: string[] = [];
    $('.genre-info a').each((i, el) => {
      genres.push($(el).text().trim());
    });

    // Release Date (if available, assuming it's in the same location as before)
    const releaseDate = ''; // Not provided in the new HTML, keep empty or fetch from another source

    // Author
    const author = $(".spe span:contains('Pengarang:')").text().replace('Pengarang:', '').trim();

    // Type
    const type = $(".spe span:contains('Jenis Komik:') a").text().trim();

    // Total Chapter (if available, otherwise remove this field)
    const totalChapter = ''; // Not provided in the new HTML, keep empty or fetch from another source

    // Updated On (if available, otherwise remove this field)
    const updatedOn = ''; // Not provided in the new HTML, keep empty or fetch from another source

    // Chapters list from the `#chapter_list` element
    const chapters: { chapter: string; date: string; chapter_id: string }[] = [];
    $('#chapter_list ul li').each((i, el) => {
      const chapter = $(el).find('.lchx a').text().trim();
      const date = $(el).find('.dt a').text().trim();
      const chapter_id = $(el).find('.lchx a').attr('href')?.split('/')[3] || '';
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

    const title = $('.entry-title').text().trim() || '';

    // Handling previous chapter ID
    const prev_chapter_element = $('.nextprev a[rel="prev"]');
    const prev_chapter_id = prev_chapter_element.length ? prev_chapter_element.attr('href')?.split('/')[3] || '' : '';

    // Handling next chapter ID
    const next_chapter_element = $('.nextprev a[rel="next"]');
    const next_chapter_id = next_chapter_element.length ? next_chapter_element.attr('href')?.split('/')[3] || '' : '';

    // Extracting images
    const images: string[] = [];
    $('#chimg-auh img').each((i, el) => {
      const image = $(el).attr('src') || '';
      images.push(image);
    });

    return { title, next_chapter_id, prev_chapter_id, images };
  } catch (error) {
    logError(error);
    throw new Error('Failed to fetch manga chapter');
  }
};

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const order = url.searchParams.get('order') || 'update';
  const type = url.pathname.split('/')[3] as 'manga' | 'manhwa' | 'manhua' | 'search' | 'detail' | 'chapter';

  try {
    let data: any;
    if (type === 'detail') {
      const komik_id = url.searchParams.get('komik_id') || 'one-piece';
      data = await getDetail(komik_id);
    } else if (type === 'chapter') {
      const chapter_url = url.searchParams.get('chapter_url') || '';
      data = await getChapter(chapter_url);
    } else {
      let apiUrl = `${baseURL}/${type}/page/${page}/`;
      if (type === 'search') {
        const query = url.searchParams.get('query') || '';
        apiUrl = `${baseURL}/page/${page}/?s=${query}`;
      }
      const body = await fetchWithCache(apiUrl);
      const $ = cheerio.load(body);
      data = {
        data: parseMangaData(body),
        prevPage: $('.prev').length > 0,
        nextPage: $('.next').length > 0
      };
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
