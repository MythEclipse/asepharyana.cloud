import React from 'react';
import Link from 'next/link';
import { getData } from '@/lib/GetData';
import { notFound } from 'next/navigation';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/ButtonA';
import { ComicCard } from '@/components/ComicCard';

interface KomikData {
  data: Manga[];
  prevPage: boolean;
  nextPage: boolean;
}

interface Manga {
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

  const komikData: KomikData = await getData(`${BaseUrl}/api/komik/manga?page=${pageNumber}&order=update`);

  return (
    <main className="">
      <Link scroll href={`/komik/manga/page/${pageNumber}`}>
        <ButtonA className="w-full max-w-[800rem] text-center py-4 px-8">Latest Manga</ButtonA>
      </Link>
      <div className="flex flex-col items-center p-4">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {komikData.data.map((manga) => (
            <ComicCard key={manga.komik_id} comic={manga} />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Link scroll href={`/komik/manga/page/${komikData.prevPage ? pageNumber - 1 : '1'}`}>
          <ButtonA
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={!komikData.prevPage}
          >
            Previous Page
          </ButtonA>
        </Link>
        <Link scroll href={`/komik/manga/page/${komikData.nextPage ? pageNumber + 1 : '1'}`}>
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
