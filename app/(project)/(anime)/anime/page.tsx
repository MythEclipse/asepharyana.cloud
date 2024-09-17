import Image from 'next/image';
import { Button } from '@/components/ui/moving-border';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Loading from '@/components/loading';
import CardA from '@/components/card/CardA';
import { BaseUrl } from '@/lib/url';

// Define the HomeData, OngoingAnime, and CompleteAnime interfaces
interface HomeData {
  status: string;
  data: {
    ongoing_anime: OngoingAnime[];
    complete_anime: CompleteAnime[];
  };
}

interface OngoingAnime {
  title: string;
  slug: string;
  poster: string;
  current_episode: string;
  release_day: string;
  newest_release_date: string;
  otakudesu_url: string;
}

interface CompleteAnime {
  title: string;
  slug: string;
  poster: string;
  episode_count: string;
  rating: string;
  last_release_date: string;
  otakudesu_url: string;
}
// Fetch episodes data
const fetchEpisodes = async (): Promise<HomeData> => {
  const res = await fetch(`${BaseUrl}/api/anime/`, {
    next: { revalidate: 60 } // Use revalidate for ISR
  });
  if (!res.ok) {
    throw new Error('Failed to fetch episodes');
  }
  return res.json();
};

// Component to render a list of ongoing anime
const OngoingAnimeList = ({ animeList }: { animeList: OngoingAnime[] }) => (
  <div className="overflow-x-auto py-4">
    <div className="flex space-x-4">
      {animeList.map((anime) => (
        <div key={anime.slug} className="flex-shrink-0 w-64">
          <CardA
            title={anime.title}
            description={`Episodes: ${anime.current_episode} | Release: ${anime.release_day} | Last: ${anime.newest_release_date}`}
            imageUrl={anime.poster}
            linkUrl={`/anime/detail/${anime.slug}`}
          />
        </div>
      ))}
    </div>
  </div>
);

// Component to render a list of complete anime
const CompleteAnimeList = ({ animeList }: { animeList: CompleteAnime[] }) => (
  <div className="overflow-x-auto py-4">
    <div className="flex space-x-4">
      {animeList.map((anime) => (
        <div key={anime.slug} className="flex-shrink-0 w-64">
          <CardA
            title={anime.title}
            description={`Episodes: ${anime.episode_count} | Rating: ${anime.rating} | Last Release: ${anime.last_release_date}`}
            imageUrl={anime.poster}
            linkUrl={`/anime/detail/${anime.slug}`}
          />
        </div>
      ))}
    </div>
  </div>
);

// Server-side rendering component
export default async function AnimePage() {
  let episodeData: HomeData | null = null;

  try {
    episodeData = await fetchEpisodes();
  } catch (error) {
    console.error('Failed to fetch episodes:', error);
  }

  return (
    <main className="p-6">
      {/* Ongoing Anime Section */}
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={'/anime/ongoing-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Ongoing Anime
          </Button>
        </Link>
      </div>

      {episodeData ? <OngoingAnimeList animeList={episodeData.data.ongoing_anime} /> : <Loading />}

      {/* Complete Anime Section */}
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link scroll href={'/anime/complete-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Complete Anime
          </Button>
        </Link>
      </div>

      {episodeData ? <CompleteAnimeList animeList={episodeData.data.complete_anime} /> : <Loading />}
    </main>
  );
}
