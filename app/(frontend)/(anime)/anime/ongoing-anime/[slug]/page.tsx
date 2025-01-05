// app/(anime)/ongoing-anime/[page]/page.tsx
import React from 'react';
import AnimeGrid from '@/components/card/AnimeGrid';
import Link from 'next/link';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/button/ScrollButton';

interface OngoingAnimeData {
  status: string;
  data: Anime[];
  pagination: Pagination;
}

interface Anime {
  title: string;
  slug: string;
  poster: string;
  episode: string;
  anime_url: string;
  rating: string;
  current_episode: string;
  release_day: string;
  newest_release_date: string;
}

interface Pagination {
  current_page: number;
  last_visible_page: number;
  has_next_page: boolean;
  next_page: number | null;
  has_previous_page: boolean;
  previous_page: number | null;
}

interface DetailAnimePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AnimePage(props: DetailAnimePageProps) {
  const params = await props.params;
  let OngoingAnimeData: OngoingAnimeData;

  try {
    const response = await fetch(
      `${BaseUrl}/api/anime/ongoing-anime/${params.slug}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    OngoingAnimeData = await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return (
      <main className='p-6'>
        <h1 className='text-2xl font-bold mt-8 mb-4'>Error Loading Data</h1>
        <p>Could not fetch data from the API. Please try again later.</p>
      </main>
    );
  }

  if (!Array.isArray(OngoingAnimeData.data)) {
    console.error('Expected OngoingAnimeData.data to be an array');
    return (
      <main className='p-6'>
        <h1 className='text-2xl font-bold mt-8 mb-4'>No Data Available</h1>
      </main>
    );
  }

  return (
    <main className='p-6'>
      <h1 className='dark:text-lighta text-2xl font-bold mt-8 mb-4'>
        Ongoing Anime
      </h1>
      <AnimeGrid animes={OngoingAnimeData.data} />
      <PaginationComponent pagination={OngoingAnimeData.pagination} />
    </main>
  );
}

const PaginationComponent = ({ pagination }: { pagination: Pagination }) => {
  return (
    <div className='flex justify-between mt-8'>
      {pagination.has_previous_page && pagination.previous_page !== null && (
        <div className='text-2xl font-bold mt-8 mb-4'>
          <Link
            scroll
            href={`/anime/ongoing-anime/${pagination.previous_page}`}
            className='text-blue-600 hover:underline'
          >
            <ButtonA>Previous</ButtonA>
          </Link>
        </div>
      )}
      {pagination.has_next_page && pagination.next_page !== null && (
        <div className='text-2xl font-bold mt-8 mb-4'>
          <Link
            href={`/anime/ongoing-anime/${pagination.next_page}`}
            className='text-blue-600 hover:underline'
          >
            <ButtonA>Next</ButtonA>
          </Link>
        </div>
      )}
    </div>
  );
};
