import Link from 'next/link';
import Loading from '@/components/loading';
import { BaseUrl } from '@/lib/url';
import ButtonA from '@/components/ButtonA';
import AnimeGrid from '@/components/AnimeGrid';

interface OngoingAnime {
  title: string;
  slug: string;
  poster: string;
  current_episode: string;
  anime_url: string;
}

interface CompleteAnime {
  title: string;
  slug: string;
  poster: string;
  episode_count: string;
  anime_url: string;
  current_episode: string;
}

// Fetch ongoing anime data
const fetchOngoingAnime = async (): Promise<OngoingAnime[]> => {
  try {
    const res = await fetch(`${BaseUrl}/api/anime/ongoing-anime/1`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching ongoing anime:', error);
    return [];
  }
};

// Fetch complete anime data
const fetchCompleteAnime = async (): Promise<CompleteAnime[]> => {
  try {
    const res = await fetch(`${BaseUrl}/api/anime/complete-anime/1`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching complete anime:', error);
    return [];
  }
};

// Server-side rendering component
const AnimePage = async () => {
  const ongoingAnime = await fetchOngoingAnime();
  const completeAnime = await fetchCompleteAnime();

  return (
    <main className="p-6">
      {/* Ongoing Anime Section */}
      <section className="mb-8">
        <Link href={'/anime/ongoing-anime/1'}>
          <ButtonA className="w-full max-w-[800rem] text-center py-4 px-8">Latest Ongoing Anime</ButtonA>
        </Link>
        <div className="flex flex-col items-center p-4">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ongoingAnime.length > 0 ? (
              <AnimeGrid
                animes={ongoingAnime.map((anime) => ({
                  ...anime,
                  rating: '',
                  release_day: '',
                  newest_release_date: ''
                }))}
              />
            ) : (
              <p className="text-gray-600 dark:text-white">No ongoing anime available</p>
            )}
          </div>
        </div>
      </section>

      {/* Complete Anime Section */}
      <section className="mb-8">
        <Link scroll href={'/anime/complete-anime/1'}>
          <ButtonA className="w-full max-w-[800rem] text-center py-4 px-8">Latest Complete Anime</ButtonA>
        </Link>
        <div className="flex flex-col items-center p-4">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {completeAnime.length > 0 ? (
              <AnimeGrid
                animes={completeAnime.map((anime) => ({
                  ...anime,
                  rating: '',
                  release_day: '',
                  newest_release_date: '',
                  current_episode: ''
                }))}
              />
            ) : (
              <p className="text-gray-600 dark:text-white">No complete anime available</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AnimePage;
