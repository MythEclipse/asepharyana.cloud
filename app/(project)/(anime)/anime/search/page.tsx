"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getData } from '@/lib/GetData';
import { ANIMEAPI } from '@/lib/url';
import { Card } from '@/components/ui/card';

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

const fetchSearchData = async (query: string) => {
  try {
    const data = await getData(`${ANIMEAPI}/v1/search?query=${query}`);
    return data as SearchDetailData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};

const SearchPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [homeData, setHomeData] = useState<SearchDetailData | null>(null);

  // Fetch data based on the query parameter in the URL
  useEffect(() => {
    const { query } = router.query;
    if (typeof query === 'string') {
      fetchSearchData(query).then((data) => {
        setHomeData(data);
      });
    }
  }, [router.query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for anime..."
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-96"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 ml-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>

      {homeData ? (
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
                <Link scroll href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
                  <div className="text-lg mb-2 font-bold">{anime.title}</div>
                </Link>
                {anime.episode_count && <div className="text-gray-500 mb-2">Episodes: {anime.episode_count}</div>}
                {anime.rating && <div className="text-gray-500 mb-2">Rating: {anime.rating}</div>}
                {anime.last_release_date && (
                  <div className="text-gray-500 mb-2">Last Release Date: {anime.last_release_date}</div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p>No data found</p>
      )}
    </main>
  );
};

export default SearchPage;
