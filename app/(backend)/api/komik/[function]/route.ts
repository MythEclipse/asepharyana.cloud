import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { fetchWithProxy } from '@/lib/fetchWithProxy';

const baseUrl = {
  komik: 'https://komikindo.pw'
};
const baseURL = baseUrl.komik;

// Logging Function
const logError = (error: { message: string }) => {
  console.error('Error:', error.message);
};

// Type Definitions
interface MangaData {
  title: string;
  image: string;
  chapter: string;
  date: string;
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

  $('.animposx').each((_, e) => {
    const title = $(e).find('.tt h4').text().trim() || '';
    let image = $(e).find('img').attr('src') || '';
    image = image.split('?')[0]; // Remove query parameters from image URL
    const chapter =
      $(e)
        .find('.lsch a')
        .text()
        .trim()
        .replace('Ch.', '')
        .match(/\d+(\.\d+)?/g)?.[0] || ''; // Keep only the numeric part
    const score = ''; // Assuming no score is provided in this structure
    const date = $(e).find('.datech').text().trim() || '';
    const type = $(e).find('.typeflag').attr('class')?.split(' ')[1] || '';
    const komik_id = $(e).find('a').attr('href')?.split('/')[4] || '';

    data.push({
      title,
      image,
      chapter,
      score,
      date,
      type,
      komik_id
    });
  });

  return data;
};

// Function to fetch data with proxy
const fetchWithProxyWrapper = async (url: string): Promise<string> => {
  try {
    const response = await fetchWithProxy(url);
    return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
  } catch (error) {
    logError(error as { message: string });
    throw new Error('Failed to fetch data');
  }
};

// Function to get manga detail
const getDetail = async (komik_id: string): Promise<MangaDetail> => {
  try {
    const body = await fetchWithProxyWrapper(`${baseURL}/komik/${komik_id}`);
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
    $('.genre-info a').each((_, el) => {
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
    $('#chapter_list ul li').each((_, el) => {
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
    logError(error as { message: string });
    throw new Error('Failed to fetch manga detail');
  }
};

// Function to get manga chapter
const getChapter = async (chapter_url: string): Promise<MangaChapter> => {
  try {
    const body = await fetchWithProxyWrapper(`${baseURL}/chapter/${chapter_url}`);
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
    $('#chimg-auh img').each((_, el) => {
      const image = $(el).attr('src') || '';
      images.push(image);
    });

    return { title, next_chapter_id, prev_chapter_id, images };
  } catch (error) {
    logError(error as { message: string });
    throw new Error('Failed to fetch manga chapter');
  }
};

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '1';
  const type = url.pathname.split('/')[3] as 'manga' | 'manhwa' | 'manhua' | 'search' | 'detail' | 'chapter';

  try {
    let data: unknown;
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
      const body = await fetchWithProxyWrapper(apiUrl);
      const $ = cheerio.load(body);
      data = {
        data: parseMangaData(body),
        prevPage: $('.prev').length > 0,
        nextPage: $('.next').length > 0
      };
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    logError(error as { message: string });
    return NextResponse.json(
      {
        status: false,
        message: (error as { message: string }).message
      },
      { status: 500 }
    );
  }
};
