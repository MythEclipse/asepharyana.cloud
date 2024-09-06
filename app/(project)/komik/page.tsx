'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Button } from 'flowbite-react';
import axios from 'axios';
import Loading from '@/components/loading';

interface Comic {
  komik_id: string;
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
}

// Fetch comics from the API
const fetchComics = async () => {
  try {
    const [mangaRes, manhuaRes, manhwaRes] = await Promise.all([
      axios.get(`/api/komik/manga?page=1&order=update`),
      axios.get(`/api/komik/manhua?page=1&order=update`),
      axios.get(`/api/komik/manhwa?page=1&order=update`)
    ]);

    return {
      manga: mangaRes.data.data || [],
      manhua: manhuaRes.data.data || [],
      manhwa: manhwaRes.data.data || []
    };
  } catch (error) {
    console.error('Error fetching comics:', error);
    return { manga: [], manhua: [], manhwa: [] };
  }
};

// Render individual comic cards
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
        <Link href={`/komik/detail/${comic.komik_id}`} className="text-blue-600 hover:underline">
          <div className="text-lg font-bold mb-2 truncate">{comic.title}</div>
        </Link>
        <div className="text-gray-600 dark:text-gray-400 mb-2">{comic.chapter}</div>
        <div className="text-gray-600 dark:text-gray-400">Score: {comic.score}</div>
      </div>
    </Card>
  </div>
);

// Client component
const HomePage: React.FC = () => {
  const [manga, setManga] = useState<Comic[]>([]);
  const [manhua, setManhua] = useState<Comic[]>([]);
  const [manhwa, setManhwa] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadComics = async () => {
      const { manga, manhua, manhwa } = await fetchComics();
      setManga(manga);
      setManhua(manhua);
      setManhwa(manhwa);
      setLoading(false);
    };

    loadComics();
  }, []);

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Komik Manga, Manhua, dan Manhwa</h1>

      <div className="space-y-8">
        {['Manga', 'Manhua', 'Manhwa'].map((type) => (
          <section key={type} className="mb-8">
            <div className="text-2xl font-bold mb-4">
              <Link href={`/komik/${type.toLowerCase()}/page/1`}>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  {type}
                </Button>
              </Link>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {loading ? (
                <Loading />
              ) : type === 'Manga' ? (
                manga.length > 0 ? (
                  manga.map((comic) => <ComicCard key={comic.komik_id} comic={comic} />)
                ) : (
                  <p className="text-gray-600 dark:text-white">No manga available</p>
                )
              ) : type === 'Manhua' ? (
                manhua.length > 0 ? (
                  manhua.map((comic) => <ComicCard key={comic.komik_id} comic={comic} />)
                ) : (
                  <p className="text-gray-600 dark:text-white">No manhua available</p>
                )
              ) : manhwa.length > 0 ? (
                manhwa.map((comic) => <ComicCard key={comic.komik_id} comic={comic} />)
              ) : (
                <p className="text-gray-600 dark:text-white">No manhwa available</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
