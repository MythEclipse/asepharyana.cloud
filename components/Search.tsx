'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { Button, Drawer, TextInput } from 'flowbite-react';
import Link from 'next/link';

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/anime/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center mb-5">
        <Button onClick={() => setIsDrawerOpen(true)} color="blue">
          Show Search Drawer
        </Button>
      </div>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Drawer.Header title="Search for Anime" titleIcon={() => <FaSearch />} />
        <Drawer.Items>
          <form onSubmit={handleSearch} className="flex flex-col gap-4 p-4">
            <TextInput
              icon={FaSearch}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anime..."
              required
              className="border-none outline-none bg-transparent text-gray-900 dark:text-gray-100"
            />
            <Button type="submit" color="blue" className="mt-2">
              Search
            </Button>
            <Link href={'/anime'}>
              <Button color="blue" className="mt-2">
                Home Anime
              </Button>
            </Link>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default SearchComponent;
