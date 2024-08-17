import React from 'react';
import { notFound } from 'next/navigation';
import { getData } from '@/app/lib/GetData/GetData';
import Image from 'next/image';

interface MangaDetail {
  title: string;
  alternativeTitle: string;
  image: string;
  score: string;
  synopsis: string;
  status: string;
  type: string;
  released: string;
  author: string;
  artist: string;
  serialization: string;
  postedBy: string;
  postedOn: string;
  updatedOn: string;
  genres: string[];
  chapterList: {
    title: string;
    date: string;
    chapter_id: string;
  }[];
}

export default async function DetailPage({ params }: { params: { komikId: string } }) {
  const { komikId } = params;
  const BASEURL = process.env.KOMIK || 'https://api-otaku.vercel.app/api';
  const manga: MangaDetail = await getData(`${BASEURL}/komik/${komikId}`);

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
                <strong>Released:</strong> {manga.released}
              </p>
              <p className="mb-4">
                <strong>Genres:</strong> {manga.genres.join(', ')}
              </p>
              <p className="mb-4">
                <strong>Synopsis:</strong> {manga.synopsis}
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white">Chapters</h2>
              <ul className="space-y-2">
                {manga.chapterList.map((chapter) => (
                  <li key={chapter.chapter_id}>
                    <a
                      href={`/komik/chapter/${chapter.chapter_id}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {chapter.title} - {chapter.date}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
