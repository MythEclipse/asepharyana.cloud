import { getData } from '@/lib/GetData';
import Link from 'next/link';
import ClientPlayer from '@/components/ClientPlayer';
import { Button } from '@/components/ui/button';
import { BaseUrl } from '@/lib/url';

interface AnimeResponse {
  status: string;
  data: AnimeData;
}

interface AnimeData {
  episode: string;
  anime: AnimeInfo;
  has_next_episode: boolean;
  next_episode: EpisodeInfo | null;
  has_previous_episode: boolean;
  previous_episode: EpisodeInfo | null;
  stream_url: string;
  download_urls: DownloadUrls;
}

interface AnimeInfo {
  slug: string;
}

interface EpisodeInfo {
  slug: string;
}

interface DownloadUrls {
  mp4: VideoResolution[];
  mkv: VideoResolution[];
}

interface VideoResolution {
  resolution: string;
  urls: DownloadUrl[];
}

interface DownloadUrl {
  provider: string;
  url: string;
}

interface DetailAnimePageProps {
  params: {
    slug: string;
  };
}

export default async function DetailAnimePage(props: DetailAnimePageProps) {
  const { params } = props;
  const Anime: AnimeResponse = await getData(`${BaseUrl}/api/anime/full/${params.slug}`);

  if (Anime.status !== 'Ok') {
    return (
      <div className="p-4 max-w-screen-md mx-auto">
        <p className="text-red-500">Error loading anime details</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-screen-md mx-auto bg-lightb dark:text-lighta dark:bg-darkb rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-white-900">{Anime.data.episode}</h1>
      <hr className="my-4 border-white-300" />

      <div className="flex flex-col gap-2 mt-4">
        {Anime.data.stream_url && <ClientPlayer url={Anime.data.stream_url} />}
        <div className="flex justify-between mt-8">
          {Anime.data.previous_episode && (
            <p className="text-lg text-white-700">
              <Link scroll href={`/anime/full/${Anime.data.previous_episode.slug}`}>
                <Button className="w-full my-3 text-left">Previous Episode</Button>
              </Link>
            </p>
          )}
          {Anime.data.next_episode && (
            <p className="text-lg text-white-700">
              <Link scroll href={`/anime/full/${Anime.data.next_episode.slug}`}>
                <Button className="w-full my-3 text-left">Next Episode</Button>
              </Link>
            </p>
          )}
        </div>
      </div>

      <hr className="my-4 border-white-300 dark:border-darka" />

      <h2 className="text-3xl font-semibold mt-4 text-white-900">Download Links</h2>
      <div className="flex flex-col gap-4 mt-4">
        {Object.entries(Anime.data.download_urls).map(([format, resolutions]) => (
          <div key={format} className="bg-lighta dark:bg-dark p-4 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{format.toUpperCase()}</p>
            <div className="flex flex-col gap-3 mt-3">
              {resolutions.map((resolution: VideoResolution, resolutionIdx: number) => (
                <div key={resolutionIdx}>
                  <p className="text-md text-gray-800 dark:text-gray-300">{resolution.resolution}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {resolution.urls.map((urlObj: DownloadUrl, urlIdx: number) => (
                      <p key={urlIdx} className="text-sm">
                        <a
                          href={urlObj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-2 bg-blue-600 text-darkc rounded text-center"
                        >
                          {urlObj.provider}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
