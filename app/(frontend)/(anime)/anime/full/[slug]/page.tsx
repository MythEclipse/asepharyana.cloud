import Link from 'next/link';
import ClientPlayer from '@/components/ClientPlayer';
import { BaseUrl } from '@/lib/url';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import ButtonA from '@/components/ButtonA';

interface AnimeResponse {
  status: string;
  data: AnimeData;
}

interface AnimeData {
  episode: string;
  episode_number: string;
  anime: AnimeInfo;
  has_next_episode: boolean;
  next_episode: EpisodeInfo | null;
  has_previous_episode: boolean;
  previous_episode: EpisodeInfo | null;
  stream_url: string;
  download_urls: Record<string, { server: string; url: string }[]>;
  image_url: string;
}

interface AnimeInfo {
  slug: string;
}

interface EpisodeInfo {
  slug: string;
}

interface DetailAnimePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DetailAnimePage(props: DetailAnimePageProps) {
  const { params } = props;
  const response = await fetch(`${BaseUrl}/api/anime/full/${(await params).slug}`);
  const Anime: AnimeResponse = await response.json();

  if (Anime.status !== 'Ok') {
    return (
      <div className="p-4 max-w-screen-md mx-auto">
        <p className="text-red-500">Error loading anime details</p>
      </div>
    );
  }

  return (
    <BackgroundGradient className="rounded-[22px] p-7 bg-white dark:bg-zinc-900">
      <h1 className="text-4xl font-bold text-white-900">{Anime.data.episode}</h1>
      <hr className="my-4 border-white-300" />

      <div className="flex flex-col gap-2 mt-4">
        {/* {Anime.data.stream_url && <ClientPlayer url={Anime.data.stream_url} />} */}
        <div className="flex justify-between mt-8">
          {Anime.data.previous_episode && (
            <p className="text-lg text-white-700">
              <Link scroll href={`/anime/full/${Anime.data.previous_episode.slug}`}>
                <ButtonA>Previous Episode</ButtonA>
              </Link>
            </p>
          )}
          {Anime.data.next_episode && (
            <p className="text-lg text-white-700">
              <Link scroll href={`/anime/full/${Anime.data.next_episode.slug}`}>
                <ButtonA>Next Episode</ButtonA>
              </Link>
            </p>
          )}
        </div>
      </div>

      <hr className="my-4 border-white-300 dark:border-darka" />

      <h2 className="text-3xl font-semibold mt-4 text-white-900">Download Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Object.entries(Anime.data.download_urls).map(([resolution, links]) => (
          <BackgroundGradient key={resolution} className="rounded-[22px] bg-lighta dark:bg-dark p-4 shadow-lg">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{resolution}</p>
            <div className="flex flex-col gap-3 mt-3">
              {links.map((link, index) => (
                <div key={index}>
                  <p className="text-md text-gray-800 dark:text-gray-300">{link.server}</p>
                  <ButtonA className="text-center" href={link.url}>
                    <div className="text-lg font-bold">Download</div>
                  </ButtonA>
                </div>
              ))}
            </div>
          </BackgroundGradient>
        ))}
      </div>
    </BackgroundGradient>
  );
}
