'use client';
import React from 'react';
import Link from 'next/link';
import Loading from '@/components/misc/loading';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/button/ScrollButton';
import AnimeGrid from '@/components/card/AnimeGrid';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

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
  current_episode: string;
}

// Fetch episodes data using SWR


export default function AnimePage() {
  const { data: episodeData, error } = useSWR<HomeData>(
    '/api/anime/',
    fetcher
  );

  if (error) {
    console.error('Failed to fetch episodes:', error);
  }

  return (
    <main className='p-3'>
      <h1 className='text-3xl font-bold mb-6 dark:text-white'>Anime</h1>
      {episodeData ? (
        <>
          {/* Ongoing Anime Section */}
          <Link href={'/anime/ongoing-anime/1'}>
            <ButtonA className='w-full max-w-[800rem] text-center py-4 px-8'>
              Latest Ongoing Anime
            </ButtonA>
          </Link>
          <AnimeGrid
            animes={episodeData.data.ongoing_anime.map((anime) => ({
              ...anime,
              rating: '',
              release_day: '',
              newest_release_date: '',
            }))}
          />

          {/* Complete Anime Section */}
          <Link scroll href={'/anime/complete-anime/1'}>
            <ButtonA className='w-full max-w-[800rem] text-center py-4 px-8'>
              Latest Complete Anime
            </ButtonA>
          </Link>
          <AnimeGrid
            animes={episodeData.data.complete_anime.map((anime) => ({
              ...anime,
              rating: '',
              release_day: '',
              newest_release_date: '',
              current_episode: '',
            }))}
          />
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}
