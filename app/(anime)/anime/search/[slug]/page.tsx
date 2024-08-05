import React from 'react';
import { Card, Box, Text, Grid, Button } from '@radix-ui/themes'; // Ensure the import path is correct
import Link from 'next/link';
import Image from 'next/image';
import { getData } from '@/components/core/GetData/GetData';

interface Genre {
  name: string;
  slug: string;
  otakudesu_url: string;
}

interface Anime {
  title?: string;
  slug: string;
  poster?: string;
  genres?: Genre[];
  status?: string;
  rating?: string;
  url?: string;
}

interface SearchDetailData {
  status: string;
  data: Anime[];
}

interface DetailAnimePageProps {
  params: {
    slug: string[];
  };
}

const BASEURL = process.env.ANIME || 'https://otakudesu-unofficial-api.vercel.app';

const fetchSearchData = async ({ params }: DetailAnimePageProps) => {
  try {
    const data = await getData(`${BASEURL}/v1/search/${params.slug}`);
    return data as SearchDetailData; // Cast the fetched data to SearchDetailData
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};

const SearchPage = async ({ params }: DetailAnimePageProps) => {
  const homeData = await fetchSearchData({ params });

  if (!homeData || !homeData.data) {
    return <p>No data found</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <Grid columns={{ sm: '3', md: '5', lg: '7' }} gap="4">
        {homeData.data.map((anime: Anime) => (
          <Card key={anime.slug} className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4">
            <Box className="mt-4 text-center">
              <Link href={`/anime/detail/${anime.slug}`} className="text-blue-600 hover:underline">
                <Text as="div" size="2" weight="bold" className="text-lg mb-2">
                  {anime.title || 'No Title'}
                </Text>
              </Link>
              {anime.poster && (
                <Image src={anime.poster} alt={anime.title || 'Anime Poster'} width={200} height={300} className="mb-2" />
              )}
              {anime.genres && (
                <div className="text-sm mb-2">
                  {anime.genres.map((genre) => (
                    <Link href={`/anime/genre/${genre.slug}`} key={genre.slug}>
                    <Button key={genre.slug} className="">
                      {genre.name}
                    </Button>
                    </Link>
                  ))}
                </div>
              )}
              {anime.rating && (
                <div className="text-sm text-gray-600 mb-2">Rating: {anime.rating}</div>
              )}
            </Box>
          </Card>
        ))}
      </Grid>
    </main>
  );
};

export default SearchPage;
