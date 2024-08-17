import React from 'react';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/app/lib/GetData/GetData';
import { notFound } from 'next/navigation';

interface KomikData {
  data: manhwa[];
  prevPage: boolean;
  nextPage: boolean;
}

interface manhwa {
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
  komik_id: string;
}

export default async function Page({ params }: { params: { pageNumber: string } }) {
  const pageNumber = parseInt(params.pageNumber, 10);
  if (isNaN(pageNumber)) {
    notFound();
  }

  const BASEURL = process.env.KOMIK || 'https://api-otaku.vercel.app/api';
  const komikData: KomikData = await getData(`${BASEURL}/komik/manhwa?page=${pageNumber}`);

  return (
    <main className="p-6">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={`/komik/manhwa/page/${pageNumber}`}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest manhwa
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {komikData.data.map((manhwa) => (
          <Card key={manhwa.komik_id} className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
            <Image
              src={manhwa.image}
              alt={manhwa.title}
              width={165}
              height={225}
              className="object-cover w-full h-auto"
            />
            <div className="mt-4 text-center">
              <Link href={`/komik/detail/${manhwa.komik_id}`} className="text-blue-600 hover:underline">
                <div className="text-lg font-bold mb-2">{manhwa.title}</div>
              </Link>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{manhwa.chapter}</div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">Score: {manhwa.score}</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Link href={`/komik/manhwa/page/${komikData.prevPage ? pageNumber - 1 : '1'}`}>
          <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" disabled={!komikData.prevPage}>
            Previous Page
          </Button>
        </Link>
        <Link href={`/komik/manhwa/page/${komikData.nextPage ? pageNumber + 1 : '1'}`}>
          <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" disabled={!komikData.nextPage}>
            Next Page
          </Button>
        </Link>
      </div>
    </main>
  );
}
