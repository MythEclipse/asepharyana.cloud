import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Button } from 'flowbite-react';

interface Comic {
  komik_id: string;
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
}

// Function to fetch data from the API
const fetchComics = async () => {
  try {
    const [mangaRes, manhuaRes, manhwaRes] = await Promise.all([
      fetch(`http://localhost:3090/api/komik/manga?page=1&order=update`).then((res) => res.json()),
      fetch(`http://localhost:3090/api/komik/manhua?page=1&order=update`).then((res) => res.json()),
      fetch(`http://localhost:3090/api/komik/manhwa?page=1&order=update`).then((res) => res.json())
    ]);

    // Extract the data from the API responses
    const manga = mangaRes.data || [];
    const manhua = manhuaRes.data || [];
    const manhwa = manhwaRes.data || [];

    return { manga, manhua, manhwa };
  } catch (error) {
    console.error('Error fetching comics:', error);
    return { manga: [], manhua: [], manhwa: [] }; // Return empty arrays on error
  }
};

// Server Component for rendering
const HomePage: FC = async () => {
  const { manga, manhua, manhwa } = await fetchComics();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Komik Manga, Manhua, dan Manhwa</h1>

      <div className="space-y-8">
        {renderSection('Manga', manga)}
        {renderSection('Manhua', manhua)}
        {renderSection('Manhwa', manhwa)}
      </div>
    </div>
  );
};

// Function to render each section
const renderSection = (title: string, comics: Comic[]) => (
  <section className="mb-8">
    <div className="text-2xl font-bold mt-8 mb-4">
      <Link href={`/komik/${title.toLowerCase()}/page/1`}>
        <Button size="lg" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
          {title}
        </Button>
      </Link>
    </div>
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {comics.length > 0 ? (
        comics.map((comic) => (
          <div key={comic.komik_id} className="flex-shrink-0 w-48">
            <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center">
              <div className="relative w-full h-64">
                <Image
                  src={comic.image}
                  alt={comic.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <div className="mt-4 text-center">
                <Link href={`/komik/detail/${comic.komik_id}`} className="text-blue-600 hover:underline">
                  <div className="text-lg font-bold mb-2">{comic.title}</div>
                </Link>
                <div className="text-gray-600 dark:text-gray-400 mb-2">{comic.chapter}</div>
                <div className="text-gray-600 dark:text-gray-400 mb-2">Score: {comic.score}</div>
              </div>
            </Card>
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-white">No comics available</p>
      )}
    </div>
  </section>
);

export default HomePage;
