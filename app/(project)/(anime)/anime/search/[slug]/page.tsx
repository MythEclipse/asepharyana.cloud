import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/lib/GetData/GetData';

interface Genre {
  name: string;
  slug: string;
  otakudesu_url: string;
}

interface Anime {
  title?: string;
  slug: string;
  poster?: string;
  genres?: Genre[];
  status?: string;
  rating?: string;
  url?: string;
}

interface SearchDetailData {
  status: string;
  data: Anime[];
}

interface DetailAnimePageProps {
  params: {
    slug: string[];
  };
}

const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app';

const fetchSearchData = async ({ params }: DetailAnimePageProps) => {
  try {
    const data = await getData(`${BASEURL}/v1/search/${params.slug}`);
    return data as SearchDetailData; // Cast the fetched data to SearchDetailData
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
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {homeData.data.map((anime: Anime) => (
          <div
            key={anime.slug}
            className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4 bg-white dark:bg-gray-800"
          >
            <div className="mt-4 text-center">
              <Link href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
                <div className="text-lg font-bold mb-2">{anime.title || 'No Title'}</div>
              </Link>
              {anime.poster && (
                <Image
                  src={anime.poster}
                  alt={anime.title || 'Anime Poster'}
                  width={200}
                  height={300}
                  className="mb-2"
                />
              )}
              {anime.genres && (
                <div className="text-sm mb-2">
                  {anime.genres.map((genre) => (
                    <Link href={`/anime/genre/${genre.slug}`} key={genre.slug} className="inline-block mr-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">{genre.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {anime.rating && <div className="text-sm text-gray-600 mb-2">Rating: {anime.rating}</div>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
