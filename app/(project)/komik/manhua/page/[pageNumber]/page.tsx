import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/lib/GetData';
import { notFound } from 'next/navigation';
import { Local } from '@/lib/url';
import MiniTildCard from '@/components/MiniTildCard';

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

  const komikData: KomikData = await getData(`${Local}/api/komik/manhua?page=${pageNumber}&order=update`);

  return (
    <main className="">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link scroll href={`/komik/manhua/page/${pageNumber}`}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest manhua
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {komikData.data.map((manhua) => (
        <div key={manhua.komik_id} className="flex-shrink-0 w-64 mx-auto md:mx-0">
          <MiniTildCard
            title={manhua.title}
            description={`Chapter: ${manhua.chapter} - Score: ${manhua.score}`}
            imageUrl={manhua.image}
            linkUrl={`/komik/detail/${manhua.komik_id}`}
          />
        </div>
      ))}
      </div>
      <div className="flex justify-between mt-8">
        <Link scroll href={`/komik/manhua/page/${komikData.prevPage ? pageNumber - 1 : '1'}`}>
          <Button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.prevPage}
          >
            Previous Page
          </Button>
        </Link>
        <Link scroll href={`/komik/manhua/page/${komikData.nextPage ? pageNumber + 1 : '1'}`}>
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
