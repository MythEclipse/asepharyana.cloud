import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

const logError = (error: any) => {
  console.error('Error:', error.message);
};

interface AnimeResponse {
  status: string;
  data: AnimeData;
}

interface AnimeData {
  episode: string;
  episode_number: string;
  anime: AnimeInfo;
  has_next_episode: boolean;
  next_episode: EpisodeInfo | null;
  has_previous_episode: boolean;
  previous_episode: EpisodeInfo | null;
  stream_url: string;
  download_urls: string;
  image_url: string;
}

interface AnimeInfo {
  slug: string;
}

interface EpisodeInfo {
  slug: string;
}

export async function GET(_: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const url = `https://samehadaku.li/${slug}/`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract the episode title
    const episode = $('h1.entry-title').text();

    // Extract the episode number
    const episode_number = $('meta[itemprop="episodeNumber"]').attr('content') || '';

    // Extract the image URL
    const image_url = $('meta[itemprop="url"]').attr('content') || '';

    const stream_url = $('#embed_holder iframe').attr('src') || '';

    const download_urls = $('.video-nav .iconx a[aria-label="Download"]').attr('href') || '';

    // Extract next and previous episode links
    const nextEpisodeElement = $('.nvs a[rel="next"]');
    const prevEpisodeElement = $('.nvs a[rel="prev"]');

    const next_episode_url = nextEpisodeElement.attr('href') || null;
    const previous_episode_url = prevEpisodeElement.attr('href') || null;

    // Parse the slugs from the URLs
    const next_episode_slug = next_episode_url ? new URL(next_episode_url).pathname.replace(/^\/|\/$/g, '') : null;
    const previous_episode_slug = previous_episode_url
      ? new URL(previous_episode_url).pathname.replace(/^\/|\/$/g, '')
      : null;

    const data: AnimeData = {
      episode,
      episode_number,
      anime: { slug },
      has_next_episode: !!next_episode_slug,
      next_episode: next_episode_slug ? { slug: next_episode_slug } : null,
      has_previous_episode: !!previous_episode_slug,
      previous_episode: previous_episode_slug ? { slug: previous_episode_slug } : null,
      stream_url,
      download_urls,
      image_url
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
