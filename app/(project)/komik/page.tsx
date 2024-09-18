'use server';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card'; // Adjust the path as necessary
import MiniTildCard from '@/components/MiniTildCard';
import CardA from '@/components/card/CardA';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/ButtonA';

interface Comic {
  komik_id: string;
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
}

// Individual fetch functions using Next.js fetch and caching
const fetchManga = async (): Promise<Comic[]> => {
  try {
    const res = await fetch(`${BaseUrl}/api/komik/manga?page=1&order=update`, {
      next: { revalidate: 10 } // Cache for 10 seconds
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
      next: { revalidate: 10 }
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
      next: { revalidate: 10 }
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching manhwa:', error);
    return [];
  }
};

// ComicCard component
const ComicCard = ({ comic }: { comic: Comic }) => (
  <div key={comic.komik_id} className="flex-shrink-0 w-64 overflow-visible p-5">
    <CardA
      title={comic.title}
      description={`Chapter: ${comic.chapter} | Score: ${comic.score}`}
      imageUrl={comic.image}
      linkUrl={`/komik/detail/${comic.komik_id}`}
    />
  </div>
);

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
          <div className="w-full mx-auto mb-4"> 
            <Link scroll href={`/komik/${type.toLowerCase()}/page/1`}>
              <ButtonA className="lg:min-w-[1200px] w-full max-w-lg text-center py-4 px-8"> 
                {type}
              </ButtonA>
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4 overflow-visible">
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
        </section>
      ))}
    </div>
  </div>
  

  );
};

export default HomePage;
