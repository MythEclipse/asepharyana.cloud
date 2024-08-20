import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Button, TextInput } from 'flowbite-react';

interface Comic {
  komik_id: string;
  title: string;
  image: string;
  chapter: string;
  score: string;
  type: string;
}

interface SearchResult {
  data: Comic[];
  prevPage: boolean;
  nextPage: boolean;
}

// Function to fetch search results from the API
const fetchSearchResults = async (query: string) => {
  try {
    const response = await fetch(`http://localhost:3090/api/komik/search?query=${encodeURIComponent(query)}`);
    const result: SearchResult = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return { data: [], prevPage: false, nextPage: false }; // Return empty data on error
  }
};

// Server Component for rendering search results
const SearchPage: FC<{ searchParams: { query: string } }> = async ({ searchParams }) => {
  const query = searchParams.query || '';
  const searchResults = await fetchSearchResults(query);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Search Comics</h1>

      <form action={`/komik/search?page=1&query=${encodeURIComponent(query)}`} method="get" className="mb-6">
        <TextInput name="query" defaultValue={query} placeholder="Search for comics..." className="mb-4" />
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
          Search
        </Button>
      </form>

      <div className="space-y-6">
        {searchResults.data.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {searchResults.data.map((comic) => (
              <Link key={comic.komik_id} href={`/komik/${comic.komik_id}`} className="block w-48 flex-shrink-0">
                <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center">
                  <div className="relative w-full h-64">
                    <Image
                      src={comic.image}
                      alt={comic.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold mb-2 dark:text-white">{comic.title}</h3>
                    <p className="text-sm text-gray-600">{comic.chapter}</p>
                    <p className="text-sm text-gray-600">Score: {comic.score}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
