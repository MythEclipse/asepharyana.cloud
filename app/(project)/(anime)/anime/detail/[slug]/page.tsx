import { getData } from '@/lib/GetData';
import { BaseUrl, PRODUCTION } from '@/lib/url';
import Image from 'next/image';
import Link from 'next/link';
import ButtonA from '@/components/ButtonA';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Metadata } from 'next';
import CardA from '@/components/card/CardA';

interface Genre {
  name: string;
  slug: string;
  anime_url: string;
}

interface Batch {
  res: string;
  buttons: { name: string; url: string }[];
}

interface Episode {
  episode: string;
  slug: string;
  quality: Batch[];
}

interface Recommendation {
  title: string;
  slug: string;
  poster: string;
  anime_url: string;
}

interface AnimeData {
  status: string;
  data: {
    title: string;
    japanese_title: string;
    poster: string;
    rating: string;
    credit: string;
    type: string;
    status: string;
    episode_count: string;
    duration: string;
    release_date: string;
    studio: string;
    genres: Genre[];
    synopsis: string;
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
                  <strong>Japanese Title:</strong> {anime.data.japanese_title || 'N/A'}
                </p>
                <p className="mb-2">
                  <strong>Rating:</strong> {anime.data.rating || 'N/A'}
                </p>
                <p className="mb-2">
                  <strong>Credit:</strong> {anime.data.credit || 'N/A'}
                </p>
                <p className="mb-2">
                  <strong>Type:</strong> {anime.data.type || 'N/A'}
                </p>
                <p className="mb-2">
                  <strong>Status:</strong> {anime.data.status || 'N/A'}
                </p>
                <p className="mb-2">
                  <strong>Episode Count:</strong> {anime.data.episode_count || 'N/A'}
                </p>
                <p className="mb-2">
                  <strong>Duration:</strong> {anime.data.duration || 'N/A'}
                </p>
                <p className="mb-2">
                  <strong>Release Date:</strong> {anime.data.release_date || 'N/A'}
                </p>
                <p className="mb-4">
                  <strong>Studio:</strong> {anime.data.studio || 'N/A'}
                </p>
                <p className="mb-4">
                  <strong>Genres:</strong>{' '}
                  {anime.data.genres.length > 0 ? anime.data.genres.map((genre) => genre.name).join(', ') : 'N/A'}
                </p>
                <p className="mb-4">
                  <strong>Synopsis:</strong> {anime.data.synopsis}
                </p>
              </div>
              <div className="mt-4">
                {anime.data.episode_lists.map((episode) => (
                  <div key={episode.slug} className="mb-4">
                    <h3 className="font-bold text-blue-500">{episode.episode}</h3>
                    {episode.quality.map((quality) => (
                      <div key={quality.res} className="mb-2">
                        <h4 className="font-medium">{quality.res}</h4>
                        <div className="flex overflow-x-auto space-x-2">
                          {' '}
                          {/* Add overflow-x-auto and space-x-2 for horizontal scrolling */}
                          {quality.buttons.map((button) => (
                            <Link key={button.url} href={button.url} passHref>
                              <ButtonA className="bg-blue-600 text-black dark:text-white hover:bg-blue-500 transition whitespace-nowrap">
                                {/* Add whitespace-nowrap to prevent text wrapping */}
                                {button.name}
                              </ButtonA>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BackgroundGradient>
        <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="inline-flex gap-4">
            {anime.data.recommendations.map((recommendation) => (
              <CardA
                key={recommendation.slug}
                title={recommendation.title}
                linkUrl={recommendation.slug}
                imageUrl={recommendation.poster}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
