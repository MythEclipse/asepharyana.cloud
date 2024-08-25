import { getData } from '@/lib/GetData/GetData';
import Image from 'next/image';
import Link from 'next/link';

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

export default async function DetailAnimePage(props: DetailAnimePageProps) {
  const { params } = props;
  const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app/';
  const anime: AnimeData = await getData(`${BASEURL}/v1/anime/${params.slug}`);

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
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
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{anime.data.title}</h1>
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
            </div>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
            <div className="mb-4 dark:text-gray-200">
              <strong className="block mb-2 text-lg">Genres:</strong>
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.data.genres.map((genre) => (
                  <Link key={genre.slug} href={`/anime/genre/${genre.slug}`} className="text-blue-500 hover:underline">
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
            <div className="mb-4 dark:text-gray-200">
              <strong className="block mb-2 text-lg">Synopsis:</strong>
              <p>{anime.data.synopsis}</p>
            </div>
            {anime.data.batch && (
              <div className="mb-4 dark:text-gray-200">
                <strong className="block mb-2 text-lg">Batch:</strong>
                <p>
                  <Link href={anime.data.batch.otakudesu_url} className="text-blue-500 hover:underline">
                    {anime.data.batch.slug}
                  </Link>{' '}
                  - {anime.data.batch.uploaded_at}
                </p>
              </div>
            )}
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
            <div className="mb-4 dark:text-gray-200">
              <strong className="block mb-2 text-lg">Episodes:</strong>
              <ul className="list-disc ml-6 space-y-1">
                {anime.data.episode_lists.map((episode) => (
                  <li key={episode.slug}>
                    <Link href={`/anime/full/${episode.slug}`} className="text-blue-600 hover:underline">
                      {episode.episode}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
            <div className="mb-4 dark:text-gray-200">
              <strong className="block mb-2 text-lg">Recommendations:</strong>
              <div className="flex flex-wrap gap-4">
                {anime.data.recommendations.map((recommendation) => (
                  <div key={recommendation.slug} className="flex flex-col items-center space-y-2">
                    <Image
                      src={recommendation.poster}
                      alt={recommendation.title}
                      width={240}
                      height={320}
                      className="object-cover rounded-lg shadow-md"
                    />
                    <Link
                      href={`/anime/detail/${recommendation.slug}`}
                      className="text-blue-600 hover:underline text-center"
                    >
                      {recommendation.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
