'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button'; // Import Button dari shadcn ui
import { Input } from '@/components/ui/input'; // Import Input dari shadcn ui
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'; // Untuk Drawer
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
    <>
      <div className="flex min-h-[50vh] items-center justify-center mb-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Show Search Drawer</Button>
          </SheetTrigger>
          <SheetContent side="right">
            {' '}
            {/* Bisa diubah ke "left" untuk slide dari kiri */}
            <SheetHeader>
              <SheetTitle>Search for Anime</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSearch} className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2">
                <FaSearch />
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for anime..."
                  required
                  className="bg-transparent text-gray-900 dark:text-gray-100"
                />
              </div>
              <Button type="submit" className="mt-2">
                Search
              </Button>
              <Link href={'/anime'}>
                <Button className="mt-2">Home Anime</Button>
              </Link>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default SearchComponent;
