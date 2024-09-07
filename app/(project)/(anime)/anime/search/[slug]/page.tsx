import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/lib/GetData';
import { ANIMEAPI } from '@/lib/url';
import { Card } from 'flowbite-react';

interface Genre {
  name: string;
  slug: string;
  otakudesu_url: string;
}

interface Anime {
  title: string;
  slug: string;
  poster: string;
  genres?: Genre[];
  status?: string;
  rating?: string;
  episode_count?: number;
  last_release_date?: string;
  url?: string;
}

interface SearchDetailData {
  status: string;
  data: Anime[];
}

interface DetailAnimePageProps {
  params: {
    slug: string;
  };
}

const fetchSearchData = async ({ params }: DetailAnimePageProps) => {
  try {
    const data = await getData(`${ANIMEAPI}/v1/search/${params.slug}`);
    return data as SearchDetailData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};

const SearchPage = async ({ params }: DetailAnimePageProps) => {
  const homeData = await fetchSearchData({ params });

  if (!homeData || !homeData.data) {
    return <p>No data found</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {homeData.data.map((anime) => (
          <Card key={anime.slug} className="shadow-lg rounded-lg flex flex-col p-4">
            {anime.poster && (
              <div className="relative w-full h-64">
                <Image
                  src={anime.poster}
                  alt={anime.title}
                  width={400}
                  height={600}
                  style={{ objectFit: 'cover' }}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            )}
            <div className="mt-4 text-center">
              <Link href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
                <div className="text-lg mb-2 font-bold">{anime.title}</div>
              </Link>
              {anime.episode_count && (
                <div className="text-gray-500 mb-2">Episodes: {anime.episode_count}</div>
              )}
              {anime.rating && (
                <div className="text-gray-500 mb-2">Rating: {anime.rating}</div>
              )}
              {anime.last_release_date && (
                <div className="text-gray-500 mb-2">Last Release Date: {anime.last_release_date}</div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
