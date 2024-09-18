import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/lib/GetData';
import { notFound } from 'next/navigation';
import { BaseUrl } from '@/lib/url';
import MiniTildCard from '@/components/MiniTildCard';
import CardA from '@/components/card/CardA';
import ButtonA from '@/components/ButtonA';

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

  const komikData: KomikData = await getData(`${BaseUrl}/api/komik/manhwa?page=${pageNumber}&order=update`);

  return (
    <main className="">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link scroll href={`/komik/manhwa/page/${pageNumber}`}>
        <ButtonA className='lg:min-w-[1200px] w-full max-w-lg text-center py-4 px-8' >
            Latest manhwa
          </ButtonA>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {komikData.data.map((manhwa) => (
          <div key={manhwa.komik_id} className="flex-shrink-0 w-64 mx-auto md:mx-0">
            <CardA
              title={manhwa.title}
              description={`Chapter: ${manhwa.chapter} - Score: ${manhwa.score}`}
              imageUrl={manhwa.image}
              linkUrl={`/komik/detail/${manhwa.komik_id}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Link scroll href={`/komik/manhwa/page/${komikData.prevPage ? pageNumber - 1 : '1'}`}>
          <ButtonA
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.prevPage}
          >
            Previous Page
          </ButtonA>
        </Link>
        <Link scroll href={`/komik/manhwa/page/${komikData.nextPage ? pageNumber + 1 : '1'}`}>
          <ButtonA
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.nextPage}
          >
            Next Page
          </ButtonA>
        </Link>
      </div>
    </main>
  );
}
