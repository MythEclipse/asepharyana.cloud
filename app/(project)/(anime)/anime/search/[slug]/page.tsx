// app/search/[slug]/page.tsx
import React from 'react';
import SearchForm from '@/components/SearchForm';
import CardA from '@/components/card/CardA';
import { BaseUrl } from '@/lib/url';

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

const fetchSearchResults = async (query: string): Promise<SearchDetailData> => {
  try {
    const response = await fetch(`${BaseUrl}/api/anime/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result: SearchDetailData = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return { status: 'error', data: [] }; // Return empty data on error
  }
};

const SearchPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const query = decodeURIComponent(params.slug || ''); // Decode the query here
  const searchResults = await fetchSearchResults(query);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Search Anime</h1>
      <SearchForm classname="w-full mb-6" initialQuery={query} />
      <div>
        {searchResults.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {searchResults.data.map((anime) => (
              <CardA
                key={anime.slug}
                title={anime.title}
                description={`Status: ${anime.status ?? 'Unknown'} | Rating: ${anime.rating ?? 'N/A'}`}
                imageUrl={anime.poster}
                linkUrl={`/anime/detail/${anime.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
