import React from 'react';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/lib/GetData/GetData';
import { notFound } from 'next/navigation';

interface KomikData {
  data: manhua[];
  prevPage: boolean;
  nextPage: boolean;
}

interface manhua {
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

  const komikData: KomikData = await getData(`http://localhost:3090/api/komik/manhua?page=${pageNumber}&order=update`);

  return (
    <main className="p-6">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={`/komik/manhua/page/${pageNumber}`}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest manhua
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {komikData.data.map((manhua) => (
          <Card key={manhua.komik_id} className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
            <Image
              src={manhua.image}
              alt={manhua.title}
              width={165}
              height={225}
              className="object-cover w-full h-auto"
            />
            <div className="mt-4 text-center">
              <Link href={`/komik/detail/${manhua.komik_id}`} className="text-blue-600 hover:underline">
                <div className="text-lg font-bold mb-2">{manhua.title}</div>
              </Link>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{manhua.chapter}</div>
              <div className="text-gray-600 dark:text-gray-400 mb-2">Score: {manhua.score}</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Link href={`/komik/manhua/page/${komikData.prevPage ? pageNumber - 1 : '1'}`}>
          <Button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.prevPage}
          >
            Previous Page
          </Button>
        </Link>
        <Link href={`/komik/manhua/page/${komikData.nextPage ? pageNumber + 1 : '1'}`}>
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