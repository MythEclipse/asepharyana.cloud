// components/AnimeGrid.tsx
import React from 'react';
import Image from 'next/image';
import { Card } from 'flowbite-react';
import Link from 'next/link';

interface Anime {
  title: string;
  slug: string;
  poster: string;
  episode_count: string;
  rating: string;
  last_release_date: string;
  otakudesu_url: string;
}

interface AnimeGridProps {
  animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
      {animes.map((anime) => (
        <Card key={anime.slug} className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
          <Image src={anime.poster} alt={anime.title} width={460} height={651} className="object-cover w-full h-auto" />
          <div className="mt-4 text-center">
            <Link href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
              <div className="text-lg mb-2 font-bold">
                {anime.title}
              </div>
            </Link>
            <div className="text-gray-500 mb-2">
              Episodes: {anime.episode_count}
            </div>
            <div className="text-gray-500 mb-2">
              Rating: {anime.rating}
            </div>
            <div className="text-gray-500 mb-2">
              Last Release Date: {anime.last_release_date}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnimeGrid;
