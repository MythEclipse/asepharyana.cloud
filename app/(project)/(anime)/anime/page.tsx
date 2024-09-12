import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Loading from '@/components/loading';

// Define the HomeData and Anime interfaces
interface HomeData {
  status: string;
  data: {
    ongoing_anime: Anime[];
    complete_anime: Anime[];
  };
}

interface Anime {
  title: string;
  slug: string;
  poster: string;
  current_episode: string;
  release_day: string;
  newest_release_date: string;
  otakudesu_url: string;
}

// Fetch episodes data
const fetchEpisodes = async (): Promise<HomeData> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/anime/`, {
    next: { revalidate: 60 } // Use revalidate for ISR
  });
  if (!res.ok) {
    throw new Error('Failed to fetch episodes');
  }
  return res.json();
};

// Component to render a list of anime
const AnimeList = ({ animeList }: { animeList: Anime[] }) => (
  <div className="overflow-x-auto py-4">
    <div className="flex space-x-4">
      {animeList.map((anime) => (
        <div key={anime.slug} className="flex-shrink-0 w-64">
          <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col p-4">
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
            <div className="mt-4 text-center flex flex-col flex-grow">
              <Link href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
                <div className="text-lg font-bold mb-2 truncate">{anime.title}</div>
              </Link>
              <div className="text-gray-600 dark:text-gray-400 mb-2">{anime.current_episode}</div>
              <div className="text-gray-600 dark:text-gray-400">
                {anime.release_day} - {anime.newest_release_date}
              </div>
            </div>
          </Card>
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
      <div className="text-2xl font-bold mt-8 mb-4">
        <Link href={'/anime/ongoing-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Ongoing Anime
          </Button>
        </Link>
      </div>

      {episodeData ? <AnimeList animeList={episodeData.data.ongoing_anime} /> : <Loading />}

      <div className="text-2xl font-bold mt-8 mb-4">
        <Link scroll href={'/anime/complete-anime/1'}>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Latest Complete Anime
          </Button>
        </Link>
      </div>

      {episodeData ? <AnimeList animeList={episodeData.data.complete_anime} /> : <Loading />}
    </main>
  );
}
