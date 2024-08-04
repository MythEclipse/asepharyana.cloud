// DetailProductPage.tsx
import { getData } from '../../../../../components/core/GetData/GetData';
import Image from 'next/image';
import ModalWrapper from '../../../../../components/core/modal';
import { Box, Text, Heading, Separator, Flex } from '@radix-ui/themes';

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

interface DetailProductPageProps {
  params: {
    slug: string;
  };
}

export default async function DetailProductPage(props: DetailProductPageProps) {
  const { params } = props;
  const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app/';
  const Anime: AnimeData = await getData(`${BASEURL}/v1/anime/${params.slug}`);

  return (
    <ModalWrapper title="Anime Detail">
      <div className="p-4">
        <div className="relative w-full h-60 md:h-80 lg:h-[32rem] mb-4">
          <Image
            className="object-cover rounded-lg w-full h-full"
            src={Anime.data.poster}
            alt={Anime.data.title}
            layout="fill"
          />
        </div>

        <Box className="mb-4">
          <Heading as="h3" size="3" className="mb-2">
            {Anime.data.title}
          </Heading>
          <ul className="list-disc ml-6">

            <li className="mb-1">

              <Text size="2" weight="bold" className="mb-1">
                Japanese Title: {Anime.data.japanese_title}
              </Text>
            </li><li className="mb-1">

              <Text size="2" weight="bold" className="mb-1">
                Rating: {Anime.data.rating}
              </Text>
            </li><li className="mb-1">

              <Text size="2" className="mb-1">
                Produser: {Anime.data.produser}
              </Text>
            </li>
            <li className="mb-1">
              <Text size="2" className="mb-1">
                Type: {Anime.data.type}
              </Text>
            </li>
            <li className="mb-1">
              <Text size="2" className="mb-1">
                Status: {Anime.data.status}
              </Text>
            </li>
            <li className="mb-1">
              <Text size="2" className="mb-1">
                Episode Count: {Anime.data.episode_count}
              </Text>
            </li>
            <li className="mb-1">
              <Text size="2" className="mb-1">
                Duration: {Anime.data.duration}
              </Text>
            </li>
            <li className="mb-1">
              <Text size="2" className="mb-1">
                Release Date: {Anime.data.release_date}
              </Text>
            </li>
            <li className="mb-1">
              <Text size="2" className="mb-4">
                Studio: {Anime.data.studio}
              </Text>
            </li>
          </ul>
        </Box>

        <Separator className="my-4" />

        <Box className="mb-4">
          <Text size="2" weight="bold" className="mb-2">
            Genres:
          </Text>
          <div className="flex flex-wrap gap-2 mb-4">
            {Anime.data.genres.map((genre) => (
              <a key={genre.slug} href={genre.otakudesu_url} className="text-blue-500 underline">
                {genre.name}
              </a>
            ))}
          </div>
        </Box>

        <Separator className="my-4" />

        <Box className="mb-4">
          <Text size="2" weight="bold" className="mb-2">
            Synopsis:
          </Text>
          <Text size="2" className="mb-4">
            {Anime.data.synopsis}
          </Text>
        </Box>

        {Anime.data.batch && (
          <Box className="mb-4">
            <Text size="2" weight="bold" className="mb-2">
              Batch:
            </Text>
            <Text size="2">
              <a href={Anime.data.batch.otakudesu_url} className="text-blue-500 underline">
                {Anime.data.batch.slug}
              </a> - {Anime.data.batch.uploaded_at}
            </Text>
          </Box>
        )}

        <Separator className="my-4" />

        <Box className="mb-4">
          <Text size="2" weight="bold" className="mb-2">
            Episodes:
          </Text>
          <ul className="list-disc ml-6">
            {Anime.data.episode_lists.map((episode) => (
              <li key={episode.slug} className="mb-1">
                <a href={episode.otakudesu_url} className="text-blue-500 underline">
                  {episode.episode}
                </a>
              </li>
            ))}
          </ul>
        </Box>

        <Separator className="my-4" />

        <Box>
          <Text size="2" weight="bold" className="mb-2">
            Recommendations:
          </Text>
          <div className="flex flex-wrap gap-4">
            {Anime.data.recommendations.map((recommendation) => (
              <Flex key={recommendation.slug} className="flex flex-col items-center space-y-2">
                <Image
                  className="object-cover rounded-lg"
                  src={recommendation.poster}
                  alt={recommendation.title}
                  width={100}
                  height={150}
                />
                <Text size="2" className="text-center">
                  <a href={recommendation.otakudesu_url} className="text-blue-500 underline">
                    {recommendation.title}
                  </a>
                </Text>
              </Flex>
            ))}
          </div>
        </Box>
      </div>
    </ModalWrapper>
  );
}
