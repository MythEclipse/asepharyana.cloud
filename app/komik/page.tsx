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

// Client component
const HomePage: React.FC = () => {
  const [manga, setManga] = useState<Comic[]>([]);
  const [manhua, setManhua] = useState<Comic[]>([]);
  const [manhwa, setManhwa] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch data from the API using axios
  const fetchComics = async () => {
    try {
      const [mangaRes, manhuaRes, manhwaRes] = await Promise.all([
        axios.get(`http://localhost:3090/api/komik/manga?page=1&order=update`),
        axios.get(`http://localhost:3090/api/komik/manhua?page=1&order=update`),
        axios.get(`http://localhost:3090/api/komik/manhwa?page=1&order=update`)
      ]);

      // Extract the data from the API responses
      setManga(mangaRes.data.data || []);
      setManhua(manhuaRes.data.data || []);
      setManhwa(manhwaRes.data.data || []);
    } catch (error) {
      console.error('Error fetching comics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Komik Manga, Manhua, dan Manhwa</h1>

      <div className="space-y-8">
        {renderSection('Manga', manga, loading)}
        {renderSection('Manhua', manhua, loading)}
        {renderSection('Manhwa', manhwa, loading)}
      </div>
    </div>
  );
};

// Function to render each section
const renderSection = (title: string, comics: Comic[], loading: boolean) => (
  <section className="mb-8">
    <div className="text-2xl font-bold mt-8 mb-4">
      <Link href={`/komik/${title.toLowerCase()}/page/1`}>
        <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
          {title}
        </Button>
      </Link>
    </div>
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {loading ? (
        <Loading />
      ) : comics.length > 0 ? (
        comics.map((comic) => (
          <div key={comic.komik_id} className="flex-shrink-0 w-48">
            <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center">
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
                  <div className="text-lg font-bold mb-2">{comic.title}</div>
                </Link>
                <div className="text-gray-600 dark:text-gray-400 mb-2">{comic.chapter}</div>
                <div className="text-gray-600 dark:text-gray-400 mb-2">Score: {comic.score}</div>
              </div>
            </Card>
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-white">No comics available</p>
      )}
    </div>
  </section>
);

export default HomePage;
