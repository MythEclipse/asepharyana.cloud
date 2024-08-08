'use client';

import React, { useState } from 'react';
import { Button, Drawer, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiHome, HiCollection, HiSearch, HiMenu } from 'react-icons/hi';

const SearchDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/anime/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Drawer.Header title="MENU" titleIcon={() => <HiMenu />} />
      <Drawer.Items>
        <div className="flex h-full flex-col">
          <form onSubmit={handleSearch} className="p-4">
            <TextInput
              icon={HiSearch}
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
          </form>
          <div className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/anime">
                  <Button color="light" className="w-full text-left">
                    <HiHome className="inline-block mr-2" /> Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/anime/ongoing-anime/1">
                  <Button color="light" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Ongoing Anime
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/anime/complete-anime/1">
                  <Button color="light" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Complete Anime
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/anime/genre">
                  <Button color="light" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Genre
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default SearchDrawer;
