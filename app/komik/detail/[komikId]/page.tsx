import React from 'react';
import { notFound } from 'next/navigation';
import { getData } from '@/app/lib/GetData/GetData';
import Image from 'next/image';
import Link from 'next/link';

interface MangaDetail {
  title: string;
  alternativeTitle: string;
  image: string;
  score: string;
  description: string;
  status: string;
  type: string;
  releaseDate: string;
  author: string;
  artist: string;
  serialization: string;
  postedBy: string;
  postedOn: string;
  updatedOn: string;
  genres: string[];
  chapters: {
    chapter: string;
    date: string;
    chapter_id: string;
  }[];
}

export default async function DetailPage({ params }: { params: { komikId: string } }) {
  const { komikId } = params;
  const manga: MangaDetail = await getData(`http://127.0.0.1:3090/api/komik/detail?komik_id=${komikId}`);

  if (!manga) {
    notFound();
  }

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Image
              src={manga.image}
              alt={manga.title}
              width={330}
              height={450}
              className="object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-2/3 md:pl-6">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{manga.title}</h1>
            <div className="text-gray-800 dark:text-gray-200 mb-4">
              <p className="mb-2">
                <strong>Alternative Title:</strong> {manga.alternativeTitle}
              </p>
              <p className="mb-2">
                <strong>Score:</strong> {manga.score}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {manga.status}
              </p>
              <p className="mb-2">
                <strong>Author:</strong> {manga.author}
              </p>
              <p className="mb-2">
                <strong>Type:</strong> {manga.type}
              </p>
              <p className="mb-2">
                <strong>Release Date:</strong> {manga.releaseDate}
              </p>
              <p className="mb-4">
                <strong>Genres:</strong> {manga.genres ? manga.genres.join(', ') : 'N/A'}
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {manga.description}
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white">Chapters</h2>
              <ul className="space-y-2">
                {manga.chapters && Array.isArray(manga.chapters) && manga.chapters.length > 0 ? (
                  manga.chapters.map((chapter) => (
                    <li key={chapter.chapter_id}>
                      <Link
                        href={`/komik/chapter/${chapter.chapter_id}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {chapter.chapter} - {chapter.date}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No chapters available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
