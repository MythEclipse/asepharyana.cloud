import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getData } from '@/app/lib/GetData/GetData';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import Loading from '@/components/loading';

interface ChapterDetail {
  title: string;
  komik_id: string;
  prev_chapter_id: string;
  next_chapter_id: string;
  downloadUrl: string;
  images: string[];
}

export default async function ChapterPage({ params }: { params: { chapterId: string } }) {
  const { chapterId } = params;
  const BASEURL = process.env.NEXT_PUBLIC_KOMIK;
  const chapter: ChapterDetail = await getData(`${BASEURL}/komik/chapter?chapter_url=${chapterId}`);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="p-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold dark:text-white">{chapter.title}</h1>
        <div className="mt-4 flex justify-between gap-4">
          {chapter.prev_chapter_id && (
            <Link href={`/komik/chapter/${chapter.prev_chapter_id}`}>
              <Button size="md" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                Previous Chapter
              </Button>
            </Link>
          )}
          {chapter.next_chapter_id && (
            <Link href={`/komik/chapter/${chapter.next_chapter_id}`}>
              <Button size="md" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                Next Chapter
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Suspense fallback={<Loading />}></Suspense>
      <div className="flex flex-col items-center">
        {chapter.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Chapter ${chapter.title} - page ${index + 1}`}
            width={600}
            height={900}
            className="my-2 object-cover"
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between gap-4">
        {chapter.prev_chapter_id && (
          <Link href={`/komik/chapter/${chapter.prev_chapter_id}`}>
            <Button size="md" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
              Previous Chapter
            </Button>
          </Link>
        )}
        {chapter.next_chapter_id && (
          <Link href={`/komik/chapter/${chapter.next_chapter_id}`}>
            <Button size="md" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
              Next Chapter
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
}
