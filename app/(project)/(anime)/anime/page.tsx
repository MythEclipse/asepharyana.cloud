'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, Button } from 'flowbite-react';
import Link from 'next/link';
import axios from 'axios';
import Loading from '@/components/loading';
import { getData } from '@/lib/GetData';

interface HomeData {
  status: string;
  data: {
    ongoing_anime: Anime[];
    complete_anime: Anime[];
  };
}

interface Anime {
  title: string;
  slug: string;
  poster: string;
  current_episode: string;
  release_day: string;
  newest_release_date: string;
  otakudesu_url: string;
}

const fetchEpisodes = async (): Promise<HomeData> => {
  const { data } = await axios.get(`/api/anime/`);
  return data;
};

const AnimeList = ({ animeList, isLoading }: { animeList: Anime[]; isLoading: boolean }) => (
  <div className="overflow-x-auto py-4">
    {isLoading ? (
      <Loading />
    ) : (
      <div className="flex space-x-4">
        {animeList.map((anime) => (
          <div key={anime.slug} className="flex-shrink-0 w-64">
            <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col p-4">
              <div className="relative w-full h-64">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <div className="mt-4 text-center flex flex-col flex-grow">
                <Link href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
                  <div className="text-lg font-bold mb-2 truncate">{anime.title}</div>
                </Link>
                <div className="text-gray-600 dark:text-gray-400 mb-2">{anime.current_episode}</div>
                <div className="text-gray-600 dark:text-gray-400">
                  {anime.release_day} - {anime.newest_release_date}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default function AnimePage() {
  const [episodeData, setEpisodeData] = useState<HomeData | null>(null);
  const [loadingOngoing, setLoadingOngoing] = useState<boolean>(true);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(true);

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const data = await fetchEpisodes();
        setEpisodeData(data);
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
      } finally {
        setLoadingOngoing(false);
        setLoadingComplete(false);
      }
    };

    getEpisodes();
  }, []);

  return (
    <main className="p-6">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={'/anime/ongoing-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Ongoing Anime
          </Button>
        </Link>
      </div>

      <AnimeList animeList={episodeData?.data.ongoing_anime || []} isLoading={loadingOngoing} />

      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={'/anime/complete-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Complete Anime
          </Button>
        </Link>
      </div>

      <AnimeList animeList={episodeData?.data.complete_anime || []} isLoading={loadingComplete} />
    </main>
  );
}
