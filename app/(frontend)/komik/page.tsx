'use client';

import React from 'react';
import Link from 'next/link';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/button/ScrollButton';
import { ComicCard } from '@/components/card/ComicCard';
import useSWR from 'swr';
import Loading from '@/components/misc/loading';
import fetcher from '@/lib/fetcher';

export interface Comic {
  komik_id: string;
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
  date: string;
}

// Fetch comics data using SWR


const HomePage = () => {
  const { data: manga, error: mangaError } = useSWR<Comic[]>(
    '/api/komik/manga?page=1&order=update',
    fetcher
  );
  const { data: manhua, error: manhuaError } = useSWR<Comic[]>(
    '/api/komik/manhua?page=1&order=update',
    fetcher
  );
  const { data: manhwa, error: manhwaError } = useSWR<Comic[]>(
    '/api/komik/manhwa?page=1&order=update',
    fetcher
  );

  if (mangaError || manhuaError || manhwaError) {
    console.error('Error fetching comics data');
  }

  const isLoading = !manga || !manhua || !manhwa;

  return (
    <div className='p-3'>
      <h1 className='text-3xl font-bold mb-6 dark:text-white'>
        Komik Manga, Manhua, dan Manhwa
      </h1>

      <div className='space-y-8'>
        {['Manga', 'Manhua', 'Manhwa'].map((type) => (
          <section key={type} className='mb-8'>
            {!isLoading && (
              <Link scroll href={`/komik/${type.toLowerCase()}/page/1`}>
                <ButtonA className='w-full max-w-[800rem] text-center py-4 px-8'>
                  {type}
                </ButtonA>
              </Link>
            )}
            <div className='flex flex-col items-center p-4'>
              <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {isLoading ? (
                  <Loading />
                ) : type === 'Manga' && manga ? (
                  manga.length > 0 ? (
                    manga.map((comic) => (
                      <ComicCard key={comic.komik_id} comic={comic} />
                    ))
                  ) : (
                    <p className='text-gray-600 dark:text-white'>
                      No manga available
                    </p>
                  )
                ) : type === 'Manhua' && manhua ? (
                  manhua.length > 0 ? (
                    manhua.map((comic) => (
                      <ComicCard key={comic.komik_id} comic={comic} />
                    ))
                  ) : (
                    <p className='text-gray-600 dark:text-white'>
                      No manhua available
                    </p>
                  )
                ) : type === 'Manhwa' && manhwa ? (
                  manhwa.length > 0 ? (
                    manhwa.map((comic) => (
                      <ComicCard key={comic.komik_id} comic={comic} />
                    ))
                  ) : (
                    <p className='text-gray-600 dark:text-white'>
                      No manhwa available
                    </p>
                  )
                ) : null}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
