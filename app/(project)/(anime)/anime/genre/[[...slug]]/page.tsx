// components/GenrePage.tsx
import React from 'react';
import Link from 'next/link';
import { getData } from '@/lib/GetData';
import AnimeGrid3 from '@/components/AnimeGrid3';
import { ANIMEAPI } from '@/lib/url';
import { Button } from '@/components/ui/button';
import GenreButton from './genrebutton';

// types/types.d.ts

// Define the Genre type
interface Genre {
  name: string;
  slug: string;
  otakudesu_url: string;
}

// Define the Anime type
interface Anime {
  title: string;
  slug: string;
  poster: string;
  rating: string | null;
  episode_count: string | null;
  season: string | null;
  studio: string | null;
  genres: Genre[];
  synopsis: string | null;
  otakudesu_url: string;
}

// Define the Pagination type
interface Pagination {
  current_page: number;
  last_visible_page: number;
  has_next_page: boolean;
  next_page: number | null;
  has_previous_page: boolean;
  previous_page: number | null;
}

// Define the HomeData type
interface HomeData {
  status: string;
  data: Genre[];
}

// Define the GenreDetailData type
interface GenreDetailData {
  status: string;
  data: {
    anime: Anime[];
    pagination: Pagination;
  };
}

// Fetch home data for the genres list
const fetchHomeData = async (): Promise<HomeData> => {
  const res = await fetch(`${ANIMEAPI}/v1/genres`, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error('Failed to fetch genre data');
  }

  return res.json();
};

// Fetch genre-specific data
const fetchGenreData = async (slug: string[]): Promise<GenreDetailData | null> => {
  const genreSlug = slug.join('/');
  try {
    const data = await getData(`${ANIMEAPI}/v1/genres/${genreSlug}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch genre data:', error);
    return null;
  }
};

// Main genre page component
const GenrePage = async ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;

  if (!slug || slug.length === 0) {
    const homeData = await fetchHomeData();

    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4 dark:text-lighta">Genres</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {homeData.data.map((genre) => (
           <GenreButton key={genre.slug} genre={genre} />
          ))}
        </div>
      </main>
    );
  }

  const genreDetailData = await fetchGenreData(slug);

  if (!genreDetailData) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mt-8 mb-4">Error Loading Data</h1>
        <p>Could not fetch data from the API. Please try again later.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mt-8 mb-4 dark:text-lighta">Genre: {slug[0]}</h1>
      <AnimeGrid3 animes={genreDetailData.data.anime} />
      <PaginationComponent pagination={genreDetailData.data.pagination} params={params} />
    </main>
  );
};

const PaginationComponent = ({
  pagination,
  params
}: {
  pagination: Pagination;
  params: { slug: string[] };
}) => {
  const { slug } = params;
  const genreSlug = slug[0];
  const currentPage = slug[1] ? parseInt(slug[1], 10) : 1;

  return (
    <div className="flex justify-between mt-8 dark:text-lighta">
      {pagination.has_previous_page && pagination.previous_page !== null && (
        <div className="text-2xl font-bold mt-8 mb-4 dark:text-lighta">
          <Link
            scroll
            href={`/anime/genre/${genreSlug}${currentPage > 2 ? `/${currentPage - 1}` : ''}`}
            className="text-blue-600 hover:underline"
          >
            <Button>Previous</Button>
          </Link>
        </div>
      )}
      {pagination.has_next_page && pagination.next_page !== null && (
        <div className="text-2xl font-bold mt-8 mb-4">
          <Link scroll href={`/anime/genre/${genreSlug}/${currentPage + 1}`} className="text-blue-600 hover:underline">
            <Button>Next</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
