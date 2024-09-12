// components/AnimeGrid.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from './ui/card';

interface Anime {
  title: string;
  slug: string;
  poster: string;
  episode_count?: string;
  rating: string;
  otakudesu_url: string;
}

interface AnimeGridProps {
  animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {animes.map((anime) => (
        <Card key={anime.slug} className="shadow-lg rounded-lg flex flex-col p-4">
          <div className="relative w-full h-64">
            <Image
              src={anime.poster}
              alt={anime.title}
              width={400}
              height={600}
              style={{ objectFit: 'cover' }}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <div className="mt-4 text-center">
            <Link scroll href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
              <div className="text-lg mb-2 font-bold">{anime.title}</div>
            </Link>
            {anime.episode_count && <div className="text-gray-500 mb-2">Episodes: {anime.episode_count}</div>}
            {anime.rating && <div className="text-gray-500 mb-2">Rating: {anime.rating}</div>}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnimeGrid;
