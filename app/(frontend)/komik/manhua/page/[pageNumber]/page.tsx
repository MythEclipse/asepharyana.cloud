import React from 'react';
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

export default async function Page(props: { params: Promise<{ pageNumber: string }> }) {
  const params = await props.params;
  const pageNumber = parseInt(params.pageNumber, 10);
  if (isNaN(pageNumber)) {
    notFound();
  }

  const komikData: KomikData = await getData(`${BaseUrl}/api/komik/manhua?page=${pageNumber}&order=update`);

  return (
    <main className="">
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link scroll href={`/komik/manhua/page/${pageNumber}`}>
          <ButtonA className="lg:min-w-[1200px] w-full max-w-lg text-center py-4 px-8">Latest manhua</ButtonA>
        </Link>
      </div>
      <div className="flex flex-col items-center p-4">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {komikData.data.map((manhua) => (
            <CardA
              key={manhua.komik_id}
              title={manhua.title}
              description={`Chapter: ${manhua.chapter} - Score: ${manhua.score}`}
              imageUrl={manhua.image}
              linkUrl={`/komik/detail/${manhua.komik_id}`}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Link scroll href={`/komik/manhua/page/${komikData.prevPage ? pageNumber - 1 : '1'}`}>
          <ButtonA
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.prevPage}
          >
            Previous Page
          </ButtonA>
        </Link>
        <Link scroll href={`/komik/manhua/page/${komikData.nextPage ? pageNumber + 1 : '1'}`}>
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
