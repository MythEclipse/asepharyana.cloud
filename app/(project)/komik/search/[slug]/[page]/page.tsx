import React from 'react';
import { BaseUrl } from '@/lib/url';
import SearchForm from '@/components/SearchForm';
import CardA from '@/components/card/CardA';

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

// Function to fetch search results from the API with pagination
const fetchSearchResults = async (query: string, page: number): Promise<SearchResult> => {
  try {
    const response = await fetch(`${BaseUrl}/api/komik/search?query=${encodeURIComponent(query)}&page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result: SearchResult = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return { data: [], prevPage: false, nextPage: false }; // Return empty data on error
  }
};

const SearchPage = async (props: { params: Promise<{ slug: string; page: string }> }) => {
  const params = await props.params;
  const query = decodeURIComponent(params.slug || ''); // Decode query parameter
  const page = parseInt(params.page as string, 10) || 1; // Get current page from URL or default to 1
  const searchResults = await fetchSearchResults(query, page);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Search Comics</h1>
      <SearchForm initialQuery={query} />
      <div>
        {searchResults.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {searchResults.data.map((comic) => (
                <div key={comic.komik_id} className="flex-shrink-0 w-64 mx-auto md:mx-0">
                  <CardA
                    title={comic.title}
                    description={`Chapter: ${comic.chapter} | Score: ${comic.score}`}
                    imageUrl={comic.image}
                    linkUrl={`/komik/detail/${comic.komik_id}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              {searchResults.prevPage && (
                <a
                  href={`/komik/search/${encodeURIComponent(query)}/${page - 1}`}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Previous
                </a>
              )}
              {searchResults.nextPage && (
                <a
                  href={`/komik/search/${encodeURIComponent(query)}/${page + 1}`}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Next
                </a>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-600">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
