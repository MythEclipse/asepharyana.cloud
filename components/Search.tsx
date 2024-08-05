'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Button } from '@radix-ui/themes';
import Link from 'next/link';

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/anime/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <main className="flex justify-center items-center mb-5">
      <form onSubmit={handleSearch} className="w-full max-w-md bg-gray-100 dark:bg-darka p-5 rounded-lg shadow-lg">
        <Link className="flex justify-center m-2" href={'/anime'}>
          <Button size="4" className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            Home Anime
          </Button>
        </Link>
        <div className="flex flex-col gap-4">
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md shadow-sm overflow-hidden">
            <MagnifyingGlassIcon height="16" width="16" className="text-gray-500 dark:text-gray-400 ml-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anime..."
              className="flex-1 p-2 border-none outline-none bg-transparent text-gray-900 dark:text-gray-100"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 py-2 px-4 rounded-md"
          >
            Search
          </Button>
        </div>
      </form>
    </main>
  );
};

export default SearchComponent;
