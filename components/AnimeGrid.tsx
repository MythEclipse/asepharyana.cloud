// components/AnimeGrid.tsx
import React from 'react';
import { Card } from './ui/card';
import CardA from './card/CardA';

interface Anime {
  title: string;
  slug: string;
  rating:string;
  poster: string;
  current_episode: string;
  release_day: string;
  newest_release_date: string;
  otakudesu_url: string;
}

interface AnimeGridProps {
  animes: Anime[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {animes.map((anime) => (
          <CardA
            key={anime.slug}
            title={anime.title}
            description={`Rating: ${anime.rating || 'belum ada rating'}`}
            imageUrl={anime.poster}
            linkUrl={`/anime/detail/${anime.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeGrid;
