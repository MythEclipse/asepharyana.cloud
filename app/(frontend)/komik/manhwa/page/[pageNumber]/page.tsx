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
import { ComicCard } from '@/components/ComicCard';

interface KomikData {
  data: manhwa[];
  prevPage: boolean;
  nextPage: boolean;
}

interface manhwa {
  title: string;
  image: string;
  chapter: string;
  date: string;
  score: string;
  type: string;
  komik_id: string;
}

export default async function Page(props: { params: Promise<{ pageNumber: string }> }) {
  const params = await props.params;
  const pageNumber = parseInt(params.pageNumber, 10);
  if (isNaN(pageNumber)) {
    notFound();
  }

  const komikData: KomikData = await getData(`${BaseUrl}/api/komik/manhwa?page=${pageNumber}&order=update`);

  return (
    <main className="">
      <Link scroll href={`/komik/manhwa/page/${pageNumber}`}>
        <ButtonA className="w-full max-w-[800rem] text-center py-4 px-8">Latest manhwa</ButtonA>
      </Link>
      <div className="flex flex-col items-center p-4">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {komikData.data.map((comic) => (
            <ComicCard key={comic.komik_id} comic={comic} />
          ))}
        </div>
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
