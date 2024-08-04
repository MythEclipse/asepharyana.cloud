// src/app/anime/[slug]/episodes/page.tsx
import { getData } from '@/utils/fetchData';
import { Box, Text, Heading, Separator } from '@radix-ui/themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Episode {
  episode: string;
  slug: string;
  otakudesu_url: string;
}

interface AnimeEpisodesData {
  status: string;
  data: {
    episode_lists: Episode[];
  };
}

const AnimeEpisodesPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const BASEURL = process.env.NEXT_PUBLIC_ANIME_API || 'https://otakudesu-unofficial-api.vercel.app/';
      const animeEpisodesData: AnimeEpisodesData = await getData(`${BASEURL}/v1/anime/${slug}/episodes`);
      setEpisodes(animeEpisodesData.data.episode_lists);
      setLoading(false);
    };

    if (slug) {
      fetchEpisodes();
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Heading as="h3" size="3" className="mb-4">
        Episodes
      </Heading>

      <Separator className="my-4" />

      <Box className="mb-4">
        <ul className="list-disc ml-6">
          {episodes.map((episode) => (
            <li key={episode.slug} className="mb-1">
              <a href={episode.otakudesu_url} className="text-blue-500 underline">
                {episode.episode}
              </a>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
};

export default AnimeEpisodesPage;
