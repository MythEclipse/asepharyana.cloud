import React from 'react';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/app/lib/GetData/GetData';

interface KomikData {
  data: Manga[];
  prevPage: boolean;
  nextPage: boolean;
}

interface Manga {
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
  komik_id: string;
}

export default async function MangaPage() {
  const BASEURL = process.env.KOMIK || 'https://api-otaku.vercel.app/api';
  const komikData: KomikData = await getData(`${BASEURL}/komik/manga`);

  return (
    <main className="p-6">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href="/komik/manga/page/1">
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Manga
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {komikData.data.map((manga) => (
          <Card key={manga.komik_id} className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
            <Image
              src={manga.image}
              alt={manga.title}
              width={165}
              height={225}
              className="object-cover w-full h-auto"
            />
            <div className="mt-4 text-center">
              <Link href={`/komik/detail/${manga.komik_id}`} className="text-blue-600 hover:underline">
                <div className="text-lg font-bold mb-2">{manga.title}</div>
              </Link>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{manga.chapter}</div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">Score: {manga.score}</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        {/* Previous and Next Page Links */}
        <Link href={`/komik/manga/page/${komikData.prevPage ? 'prev' : '1'}`}>
          <Button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.prevPage}
          >
            Previous Page
          </Button>
        </Link>
        <Link href={`/komik/manga/page/${komikData.nextPage ? '2' : '2'}`}>
          <Button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.nextPage}
          >
            Next Page
          </Button>
        </Link>
      </div>
    </main>
  );
}
