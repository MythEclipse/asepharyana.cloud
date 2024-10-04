// components/AnimeGrid2.tsx
import React from 'react';
import CardA from './card/CardA';

interface AnimeGrid2Props {
  animes: Anime[];
}
// types/types.d.ts

// Define the Genre type
interface Genre {
  name: string;
  slug: string;
  otakudesu_url: string;
}

// Define the Anime type
interface Anime {
  title: string;
  slug: string;
  poster: string;
  rating: string | null;
  episode_count: string | null;
  season: string | null;
  studio: string | null;
  genres: Genre[];
  synopsis: string | null;
  otakudesu_url: string;
}

// Define the Pagination type
interface Pagination {
  current_page: number;
  last_visible_page: number;
  has_next_page: boolean;
  next_page: number | null;
  has_previous_page: boolean;
  previous_page: number | null;
}

// Define the HomeData type
interface HomeData {
  status: string;
  data: Genre[];
}

// Define the GenreDetailData type
interface GenreDetailData {
  status: string;
  data: {
    anime: Anime[];
    pagination: Pagination;
  };
}

const AnimeGrid2: React.FC<AnimeGrid2Props> = ({ animes }) => {
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

export default AnimeGrid2;
