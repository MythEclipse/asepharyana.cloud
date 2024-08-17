import React from 'react';
import Image from 'next/image';
import { Card, Button } from 'flowbite-react';
import Link from 'next/link';
import { getData } from '@/app/lib/GetData/GetData';

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

export default async function AnimePage() {
  const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app/';
  const homeData: HomeData = await getData(`${BASEURL}/v1/home`);

  return (
    <main className="p-6">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={'/anime/ongoing-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Ongoing Anime
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto py-4">
        <div className="flex space-x-4">
          {homeData.data.ongoing_anime.map((anime) => (
            <div key={anime.slug} className="flex-shrink-0 w-48">
              <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
                <div className="relative w-full h-64">
                  <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
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
            </div>
          ))}
        </div>
      </div>
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={'/anime/complete-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Complete Anime
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto py-4">
        <div className="flex space-x-4">
          {homeData.data.complete_anime.map((anime) => (
            <div key={anime.slug} className="flex-shrink-0 w-48">
              <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
                <div className="relative w-full h-64">
                  <Image
                    src={anime.poster}
                    alt={anime.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
