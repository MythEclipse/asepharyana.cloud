// components/AnimeGrid.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from './ui/card';
import CardA from './card/CardA';

interface Anime {
  title: string;
  slug: string;
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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {animes.map((anime) => (
        <CardA
        key={anime.slug}
        title={anime.title}
        description={`Episodes: ${anime.current_episode} | Release: ${anime.release_day} | Last: ${anime.newest_release_date}`}
        imageUrl={anime.poster}
        linkUrl={`/anime/detail/${anime.slug}`}
      />
      ))}
    </div>
  );
};

export default AnimeGrid;
