import { getData } from '../../../../../components/core/GetData/GetData';
import Image from 'next/image';
import ModalWrapper from '../../../../../components/core/modal';
import Link from 'next/link';

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
  const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app/';
  const Anime: AnimeResponse = await getData(`${BASEURL}/v1/episode/${params.slug}`);

  if (Anime.status !== 'Ok') {
    return <div>Error loading anime details</div>;
  }


  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold">{Anime.data.episode}</h1>
      <hr className="my-4" />

      <p className="text-lg">Anime: <Link href={`/anime/detail/${Anime.data.anime.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{Anime.data.anime.slug}</Link></p>

      <div className="flex flex-col gap-2 mt-4">
        {Anime.data.stream_url && (
          <p className="text-lg">
            <a href={Anime.data.stream_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Watch Stream</a>
          </p>
        )}

        {Anime.data.next_episode && (
          <p className="text-lg">
            Next Episode: <Link href={`/anime/full/${Anime.data.next_episode.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{Anime.data.next_episode.slug}</Link>
          </p>
        )}

        {Anime.data.previous_episode && (
          <p className="text-lg">
            Previous Episode: <Link href={`/anime/full/${Anime.data.previous_episode.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{Anime.data.previous_episode.slug}</Link>
          </p>
        )}
      </div>

      <hr className="my-4" />

      <h2 className="text-3xl font-semibold mt-4">Download Links</h2>
      <div className="flex flex-col gap-2 mt-2">
        {Object.entries(Anime.data.download_urls).map(([format, resolutions]) => (
          <div key={format}>
            <p className="text-lg font-medium">{format.toUpperCase()}</p>
            {resolutions.map((resolution: VideoResolution, resolutionIdx: number) => (
              <div key={resolutionIdx} className="mt-2">
                <p className="text-lg">{resolution.resolution}</p>
                <div className="flex flex-col gap-1 mt-1">
                  {resolution.urls.map((urlObj: DownloadUrl, urlIdx: number) => (
                    <p key={urlIdx} className="text-lg">
                      <a href={urlObj.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {urlObj.provider}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
