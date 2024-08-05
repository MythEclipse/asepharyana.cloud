import { getData } from '../../../../../components/core/GetData/GetData';
import Link from 'next/link';
import { Button, Grid } from '@radix-ui/themes';
import ClientPlayer from '@/components/ClientPlayer';

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
    return (
      <div className="p-4 max-w-screen-md mx-auto">
        <p className="text-red-500">Error loading anime details</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-screen-md mx-auto bg-white-100 dark:bg-darkb rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-white-900">{Anime.data.episode}</h1>
      <hr className="my-4 border-white-300" />

      <p className="text-lg text-white-700">
        Anime:{' '}
        <Link
          href={`/anime/detail/${Anime.data.anime.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {Anime.data.anime.slug}
        </Link>
      </p>

      <div className="flex flex-col gap-2 mt-4">
        {Anime.data.stream_url && (
            <ClientPlayer url={Anime.data.stream_url} />
        )}
        <div className="flex justify-between mt-8">
          {Anime.data.previous_episode && (
            <p className="text-lg text-white-700">
              <Link
                href={`/anime/full/${Anime.data.previous_episode.slug}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                <Button size="3">Previous Episode</Button>
              </Link>
            </p>
          )}
          {Anime.data.next_episode && (
            <Link
              href={`/anime/full/${Anime.data.next_episode.slug}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              <p className="text-lg text-white-700">
                <Button size="3">Next Episode</Button>
              </p>
            </Link>
          )}
        </div>
      </div>

      <hr className="my-4 border-white-300 dark:border-darka" />

      <h2 className="text-3xl font-semibold mt-4 text-white-900">Download Links</h2>
      <div className="flex flex-col gap-4 mt-4">
  {Object.entries(Anime.data.download_urls).map(([format, resolutions]) => (
    <div key={format} className="bg-white dark:bg-dark p-4 rounded-lg shadow-lg">
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{format.toUpperCase()}</p>
      <div className="flex flex-col gap-3 mt-3">
        {resolutions.map((resolution: VideoResolution, resolutionIdx: number) => (
          <div key={resolutionIdx}>
            <p className="text-md text-gray-800 dark:text-gray-300">{resolution.resolution}</p>
            <Grid columns={{ sm: '1', md: '3', lg: '5' }} gap="4">
              {resolution.urls.map((urlObj: DownloadUrl, urlIdx: number) => (
                <p key={urlIdx} className="text-sm">
                  <Button size="3" >

                  <a
                    href={urlObj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                    >
                    {urlObj.provider}
                  </a>
                    </Button>
                </p>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
