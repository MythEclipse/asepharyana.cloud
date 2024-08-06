import React from 'react';
import Image from 'next/image';
import { Card, Button } from 'flowbite-react';
import Link from 'next/link';

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

async function fetchHomeData(): Promise<HomeData> {
  const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app/';
  const res = await fetch(`${BASEURL}/v1/home`, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function AnimePage() {
  const homeData = await fetchHomeData();

  return (
    <main className="p-6">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={'/anime/ongoing-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Ongoing Anime
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {homeData.data.ongoing_anime.map((anime) => (
          <Card key={anime.slug} className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
            <Image
              src={anime.poster}
              alt={anime.title}
              width={460}
              height={651}
              className="object-cover w-full h-auto"
            />
            <div className="mt-4 text-center">
              <Link href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
                <div className="text-lg font-bold mb-2">{anime.title}</div>
              </Link>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{anime.current_episode}</div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">
                {anime.release_day} - {anime.newest_release_date}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={'/anime/complete-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Complete Anime
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {homeData.data.complete_anime.map((anime) => (
          <Card key={anime.slug} className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
            <Image
              src={anime.poster}
              alt={anime.title}
              width={460}
              height={651}
              className="object-cover w-full h-auto"
            />
            <div className="mt-4 text-center">
              <Link href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
                <div className="text-lg font-bold mb-2">{anime.title}</div>
              </Link>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{anime.current_episode}</div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">
                {anime.release_day} - {anime.newest_release_date}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
