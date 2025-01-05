'use server';
import React from 'react';
import Link from 'next/link';
import Loading from '@/components/misc/loading';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/button/ScrollButton';
import AnimeGrid from '@/components/card/AnimeGrid';

// Define the HomeData, OngoingAnime, and CompleteAnime interfaces
interface HomeData {
  status: string;
  data: {
    ongoing_anime: OngoingAnime[];
    complete_anime: CompleteAnime[];
  };
}

interface OngoingAnime {
  title: string;
  slug: string;
  poster: string;
  current_episode: string;
  anime_url: string;
}

interface CompleteAnime {
  title: string;
  slug: string;
  poster: string;
  episode_count: string;
  anime_url: string;
  current_episode: string; // Add this line
}

// Fetch episodes data
const fetchEpisodes = async (): Promise<HomeData> => {
  const res = await fetch(`${BaseUrl}/api/anime/`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch episodes');
  }
  return res.json();
};

// Server-side rendering component
export default async function AnimePage() {
  let episodeData: HomeData | null = null;

  try {
    episodeData = await fetchEpisodes();
  } catch (error) {
    console.error('Failed to fetch episodes:', error);
  }

  return (
    <main className='p-6'>
      {/* Ongoing Anime Section */}
      <Link href={'/anime/ongoing-anime/1'}>
        <ButtonA className='w-full max-w-[800rem] text-center py-4 px-8'>
          Latest Ongoing Anime
        </ButtonA>
      </Link>

      {episodeData ? (
        <AnimeGrid
          animes={episodeData.data.ongoing_anime.map((anime) => ({
            ...anime,
            rating: '',
            release_day: '',
            newest_release_date: '',
          }))}
        />
      ) : (
        <Loading />
      )}

      {/* Complete Anime Section */}
      <Link scroll href={'/anime/complete-anime/1'}>
        <ButtonA className='w-full max-w-[800rem] text-center py-4 px-8'>
          Latest Complete Anime
        </ButtonA>
      </Link>
      {episodeData ? (
        <AnimeGrid
          animes={episodeData.data.complete_anime.map((anime) => ({
            ...anime,
            rating: '',
            release_day: '',
            newest_release_date: '',
            current_episode: '',
          }))}
        />
      ) : (
        <Loading />
      )}
    </main>
  );
}
