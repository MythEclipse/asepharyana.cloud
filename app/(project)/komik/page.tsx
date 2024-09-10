'use server';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card } from 'flowbite-react';

interface Comic {
  komik_id: string;
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
}
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL
// Individual fetch functions using Next.js fetch and caching
const fetchManga = async (): Promise<Comic[]> => {
  try {
    const res = await fetch(`${BaseUrl}/api/komik/manga?page=1&order=update`, {
      next: { revalidate: 10 }, // Cache for 10 seconds
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
      next: { revalidate: 10 },
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
      next: { revalidate: 10 },
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
  <div key={comic.komik_id} className="flex-shrink-0 w-64">
    <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col p-4">
      <div className="relative w-full h-64">
        <Image
          src={comic.image}
          alt={comic.title}
          fill
          style={{ objectFit: 'cover' }}
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div className="mt-4 text-center">
        <Link scroll href={`/komik/detail/${comic.komik_id}`} className="text-blue-600 hover:underline">
          <div className="text-lg font-bold mb-2 truncate">{comic.title}</div>
        </Link>
        <div className="text-gray-600 dark:text-gray-400 mb-2">{comic.chapter}</div>
        <div className="text-gray-600 dark:text-gray-400">Score: {comic.score}</div>
      </div>
    </Card>
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
            <div className="text-2xl font-bold mb-4">
              <Link scroll href={`/komik/${type.toLowerCase()}/page/1`}>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  {type}
                </Button>
              </Link>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-4">
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
