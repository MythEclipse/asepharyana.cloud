import { getData } from '../../../../../components/core/GetData/GetData';
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
  const Anime: AnimeData = await getData(`${BASEURL}/v1/anime/${params.slug}`);

  return (
    <div className="p-4">
      <div className="relative w-full h-60 md:h-80 lg:h-[32rem] mb-4">
        <Image
          className="object-cover rounded-lg w-full h-full"
          src={Anime.data.poster}
          alt={Anime.data.title}
          fill
          quality={100}
          priority
        />
      </div>

      <div className="mb-4 dark:text-lighta">
        <h3 className="text-2xl font-bold mb-2">{Anime.data.title}</h3>
        <ul className="list-disc ml-6">
          <li className="mb-1">
            <strong>Japanese Title:</strong> {Anime.data.japanese_title}
          </li>
          <li className="mb-1">
            <strong>Rating:</strong> {Anime.data.rating}
          </li>
          <li className="mb-1">
            <strong>Produser:</strong> {Anime.data.produser}
          </li>
          <li className="mb-1">
            <strong>Type:</strong> {Anime.data.type}
          </li>
          <li className="mb-1">
            <strong>Status:</strong> {Anime.data.status}
          </li>
          <li className="mb-1">
            <strong>Episode Count:</strong> {Anime.data.episode_count}
          </li>
          <li className="mb-1">
            <strong>Duration:</strong> {Anime.data.duration}
          </li>
          <li className="mb-1">
            <strong>Release Date:</strong> {Anime.data.release_date}
          </li>
          <li className="mb-1">
            <strong>Studio:</strong> {Anime.data.studio}
          </li>
        </ul>
      </div>

      <hr className="my-4" />

      <div className="mb-4 dark:text-lighta">
        <strong className="block mb-2">Genres:</strong>
        <div className="flex flex-wrap gap-2 mb-4">
          {Anime.data.genres.map((genre) => (
            <Link key={genre.slug} href={`/anime/genre/${genre.slug}`} className="text-blue-500 underline">
              {genre.name}
            </Link>
          ))}
        </div>
      </div>

      <hr className="my-4" />

      <div className="mb-4 dark:text-lighta">
        <strong className="block mb-2">Synopsis:</strong>
        <p>{Anime.data.synopsis}</p>
      </div>

      {Anime.data.batch && (
        <div className="mb-4 dark:text-lighta">
          <strong className="block mb-2">Batch:</strong>
          <p>
            <Link href={Anime.data.batch.otakudesu_url} className="text-blue-500 underline">
              {Anime.data.batch.slug}
            </Link>{' '}
            - {Anime.data.batch.uploaded_at}
          </p>
        </div>
      )}

      <hr className="my-4" />

      <div className="mb-4 dark:text-lighta">
        <strong className="block mb-2">Episodes:</strong>
        <ul className="list-disc ml-6">
          {Anime.data.episode_lists.map((episode) => (
            <li key={episode.slug} className="mb-1">
              <Link key={episode.slug} href={`/anime/full/${episode.slug}`} className="text-blue-600 hover:underline">
                {episode.slug}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-4" />

      <div className="mb-4 dark:text-lighta">
        <strong className="block mb-2">Recommendations:</strong>
        <div className="flex flex-wrap gap-4">
          {Anime.data.recommendations.map((recommendation) => (
            <div key={recommendation.slug} className="flex flex-col items-center space-y-2">
              <Image
                className="object-cover rounded-lg"
                src={recommendation.poster}
                alt={recommendation.title}
                width={240}
                height={320}
              />
              <Link
                key={recommendation.slug}
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
  );
}
