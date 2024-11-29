// components/AnimeGrid.tsx
import React from 'react';
import { Card } from './ui/card';
import CardA from './card/CardA';

interface Anime {
  title: string;
  slug: string;
  rating?: string;
  poster?: string;
  current_episode?: string;
  release_day?: string;
  newest_release_date?: string;
  anime_url?: string;
}

interface AnimeGridProps {
  animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {animes.map((anime) => (
          <CardA
            key={anime.slug}
            title={anime.title}
            description={`${anime.rating || ''}`}
            imageUrl={anime.poster || ''}
            linkUrl={`/anime/detail/${anime.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeGrid;
