'use server';

import React from 'react';
import Link from 'next/link';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/ButtonA';
import { ComicCard } from '@/components/ComicCard';

export interface Comic {
  komik_id: string;
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
  date: string;
}

// Individual fetch functions using Next.js fetch and caching
const fetchManga = async (): Promise<Comic[]> => {
  try {
    const res = await fetch(`${BaseUrl}/api/komik/manga?page=1&order=update`, {
      next: { revalidate: 30 } // Cache for 30 seconds
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching manga:', error);
    return [];
  }
};

const fetchManhua = async (): Promise<Comic[]> => {
  try {
    const res = await fetch(`${BaseUrl}/api/komik/manhua?page=1&order=update`, {
      next: { revalidate: 30 }
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching manhua:', error);
    return [];
  }
};

const fetchManhwa = async (): Promise<Comic[]> => {
  try {
    const res = await fetch(`${BaseUrl}/api/komik/manhwa?page=1&order=update`, {
      next: { revalidate: 30 }
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching manhwa:', error);
    return [];
  }
};

// HomePage server component
const HomePage = async () => {
  const manga = await fetchManga();
  const manhua = await fetchManhua();
  const manhwa = await fetchManhwa();

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Komik Manga, Manhua, dan Manhwa</h1>

      <div className="space-y-8">
        {['Manga', 'Manhua', 'Manhwa'].map((type) => (
          <section key={type} className="mb-8">
            <Link scroll href={`/komik/${type.toLowerCase()}/page/1`}>
              <ButtonA className="w-full max-w-[800rem] text-center py-4 px-8">{type}</ButtonA>
            </Link>
            <div className="flex flex-col items-center p-4">
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {type === 'Manga' && manga.length > 0 ? (
                  manga.map((comic) => <ComicCard key={comic.komik_id} comic={comic} />)
                ) : type === 'Manhua' && manhua.length > 0 ? (
                  manhua.map((comic) => <ComicCard key={comic.komik_id} comic={comic} />)
                ) : type === 'Manhwa' && manhwa.length > 0 ? (
                  manhwa.map((comic) => <ComicCard key={comic.komik_id} comic={comic} />)
                ) : (
                  <p className="text-gray-600 dark:text-white">No {type.toLowerCase()} available</p>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
