import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

const logError = (error: any) => {
  console.error('Error:', error.message);
};

interface AnimeResponse {
  status: string;
  data: AnimeData;
}

interface AnimeData {
  episode: string;
  anime: AnimeInfo;
  has_next_episode: boolean;
  next_episode: EpisodeInfo | null;
  has_previous_episode: boolean;
  previous_episode: EpisodeInfo | null;
  stream_url: string;
  download_urls: DownloadUrls;
}

interface AnimeInfo {
  slug: string;
}

interface EpisodeInfo {
  slug: string;
}

interface DownloadUrls {
  mp4: VideoResolution[];
  mkv: VideoResolution[];
}

interface VideoResolution {
  resolution: string;
  urls: DownloadUrl[];
}

interface DownloadUrl {
  provider: string;
  url: string;
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const url = `https://otakudesu.cloud/episode/${slug}/`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract the required data from the HTML
    const episode = $('.venutama h1.posttl').text();
    const stream_url = $('#embed_holder iframe').attr('src') || '';
    const download_urls: DownloadUrls = {
      mp4: [],
      mkv: []
    };

    // Extract download URLs
    $('.download ul li').each((_, element) => {
      const resolution = $(element).find('strong').text().trim();
      const links: DownloadUrl[] = [];
      $(element)
        .find('a')
        .each((_, link) => {
          const provider = $(link).text().trim();
          const url = $(link).attr('href') || '';
          links.push({ provider, url });
        });

      if (resolution.includes('360p') || resolution.includes('480p') || resolution.includes('720p')) {
        download_urls.mp4.push({ resolution, urls: links });
      } else {
        download_urls.mkv.push({ resolution, urls: links });
      }
    });

    const data: AnimeData = {
      episode,
      anime: { slug },
      has_next_episode: false,
      next_episode: null,
      has_previous_episode: false,
      previous_episode: null,
      stream_url,
      download_urls
    };

    const animeResponse: AnimeResponse = {
      status: 'Ok',
      data
    };

    return NextResponse.json(animeResponse, { status: 200 });
  } catch (error: any) {
    logError(error);
    return NextResponse.json(
      {
        status: 'Error',
        message: error.message
      },
      { status: 500 }
    );
  }
}
