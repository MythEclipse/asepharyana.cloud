/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/GetData';
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

function ImageWithPlaceholder({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '300px', // Placeholder height, adjust as needed
        backgroundColor: '#f0f0f0', // Placeholder background color
      }}
      className="my-2"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading /> {/* Loading spinner */}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`object-cover w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
      />
    </div>
  );
}

export default async function ChapterPage({ params }: { params: { chapterId: string } }) {
  const { chapterId } = params;
  const chapter: ChapterDetail = await getData(`http://localhost:3090/api/komik/chapter?chapter_url=${chapterId}`);

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

      <div className="flex flex-col items-center">
        {chapter.images.map((image, index) => (
          <ImageWithPlaceholder
            key={index}
            src={image}
            alt={`Chapter ${chapter.title} - page ${index + 1}`}
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
