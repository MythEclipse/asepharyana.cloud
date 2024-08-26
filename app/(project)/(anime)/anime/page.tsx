'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, Button } from 'flowbite-react';
import Link from 'next/link';
import axios from 'axios';
import Loading from '@/components/loading';

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

const BASEURL = 'https://otakudesu-unofficial-api.vercel.app';
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
  referer: `${BASEURL}`,
  origin: `${BASEURL}`
};

const axiosInstance = axios.create({
  headers: DEFAULT_HEADERS
});

const fetchEpisodes = async (): Promise<HomeData> => {
  const { data } = await axiosInstance.get(`${BASEURL}/v1/home`);
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
