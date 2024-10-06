import { getData } from '@/lib/GetData';
import { BaseUrl, PRODUCTION } from '@/lib/url';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ButtonBaris from '@/components/ButtonBaris';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Metadata } from 'next';
import CardA from '@/components/card/CardA';
import ButtonA from '@/components/ButtonA';

interface Genre {
  name: string;
  slug: string;
  otakudesu_url: string;
}

interface Batch {
  slug: string;
  otakudesu_url: string;
  uploaded_at: string;
}

interface Episode {
  episode: string;
  slug: string;
  otakudesu_url: string;
}

interface Recommendation {
  title: string;
  slug: string;
  poster: string;
  otakudesu_url: string;
}

interface AnimeData {
  status: string;
  data: {
    title: string;
    japanese_title: string;
    poster: string;
    rating: string;
    produser: string;
    type: string;
    status: string;
    episode_count: string;
    duration: string;
    release_date: string;
    studio: string;
    genres: Genre[];
    synopsis: string;
    batch?: Batch;
    episode_lists: Episode[];
    recommendations: Recommendation[];
  };
}

interface DetailAnimePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: DetailAnimePageProps): Promise<Metadata> {
  const anime: AnimeData = await getData(`${BaseUrl}/api/anime/detail/${params.slug}`);

  return {
    title: anime.data.title,
    description: anime.data.synopsis,
    keywords: `nextjs, anime, anime sub, anime sub indo, ${anime.data.title}`,
    openGraph: {
      title: anime.data.title,
      description: anime.data.synopsis,
      images: [anime.data.poster],
      url: `${PRODUCTION}/anime/detail/${params.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: anime.data.title,
      description: anime.data.synopsis,
      images: [anime.data.poster]
    }
  };
}

export default async function DetailAnimePage({ params }: DetailAnimePageProps) {
  const anime: AnimeData = await getData(`${BaseUrl}/api/anime/detail/${params.slug}`);

  return (
    <main className="p-6 bg-background dark:bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-dark rounded-lg shadow-lg">
        <BackgroundGradient className="rounded-[22px] p-7 bg-white dark:bg-zinc-900">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center md:justify-start">
              <Image
                src={anime.data.poster}
                alt={anime.data.title}
                width={330}
                height={450}
                className="object-cover rounded-lg shadow-md"
                priority
              />
            </div>
            <div className="w-full md:w-2/3 md:pl-6">
              <h1 className="text-3xl font-bold mb-4 text-primary-dark dark:text-primary">{anime.data.title}</h1>
              <div className="text-gray-800 dark:text-gray-200 mb-4">
                <p className="mb-2">
                  <strong>Japanese Title:</strong> {anime.data.japanese_title}
                </p>
                <p className="mb-2">
                  <strong>Rating:</strong> {anime.data.rating}
                </p>
                <p className="mb-2">
                  <strong>Producer:</strong> {anime.data.produser}
                </p>
                <p className="mb-2">
                  <strong>Type:</strong> {anime.data.type}
                </p>
                <p className="mb-2">
                  <strong>Status:</strong> {anime.data.status}
                </p>
                <p className="mb-2">
                  <strong>Episode Count:</strong> {anime.data.episode_count}
                </p>
                <p className="mb-2">
                  <strong>Duration:</strong> {anime.data.duration}
                </p>
                <p className="mb-2">
                  <strong>Release Date:</strong> {anime.data.release_date}
                </p>
                <p className="mb-4">
                  <strong>Studio:</strong> {anime.data.studio}
                </p>
                <p className="mb-4">
                  <strong>Genres:</strong>{' '}
                  {anime.data.genres ? anime.data.genres.map((genre) => genre.name).join(', ') : 'N/A'}
                </p>
                <p className="mb-4">
                  <strong>Synopsis:</strong> {anime.data.synopsis}
                </p>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2 text-primary-dark dark:text-primary">Episodes</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {anime.data.episode_lists &&
                  Array.isArray(anime.data.episode_lists) &&
                  anime.data.episode_lists.length > 0 ? (
                    anime.data.episode_lists.map((episode) => {
                      const episodeNumber = episode.episode.match(/Episode (\d+)/)?.[1] || episode.episode;
                      return (
                        <Link scroll key={episode.slug} href={`/anime/full/${episode.slug}`} className="">
                          <ButtonA className="w-full">
                            <span className="text-lg font-bold mb-1 text-center truncate text-primary-dark dark:text-primary">
                              Episode {episodeNumber}
                            </span>
                          </ButtonA>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="col-span-full text-center text-primary-dark dark:text-primary">
                      No episodes available
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2 text-primary-dark dark:text-primary">Recommendations</h2>
                <div className="overflow-x-auto py-4">
                  <div className="flex space-x-4 w-max">
                    {anime.data.recommendations &&
                    Array.isArray(anime.data.recommendations) &&
                    anime.data.recommendations.length > 0 ? (
                      anime.data.recommendations.map((recommendation) => (
                        <div key={recommendation.slug} className="flex-shrink-0">
                          <CardA
                            key={recommendation.slug}
                            title={recommendation.title}
                            imageUrl={recommendation.poster}
                            linkUrl={`/anime/detail/${recommendation.slug}`}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-primary-dark dark:text-primary">No recommendations available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </main>
  );
}
