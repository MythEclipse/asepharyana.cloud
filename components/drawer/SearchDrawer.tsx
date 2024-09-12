'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiHome, HiCollection, HiSearch, HiMenu } from 'react-icons/hi';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <HiMenu className="inline-block mr-2" /> MENU
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <form onSubmit={handleSearch} className="p-4">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anime..."
              className="bg-transparent text-gray-900 dark:text-gray-100"
              required
            />
            <Button type="submit" className="mt-2">
              Search
            </Button>
          </form>
          <div className="flex-1 p-4">
            <ul className="space-y-2">
              <li >
                <Link href="/anime">
                  <Button variant="outline" className="w-full text-left">
                    <HiHome className="inline-block mr-2" /> Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/anime/ongoing-anime/1">
                  <Button variant="outline" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Ongoing Anime
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/anime/complete-anime/1">
                  <Button variant="outline" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Complete Anime
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/anime/genre">
                  <Button variant="outline" className="w-full text-left">
                    <HiCollection className="inline-block mr-2" /> Genre
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchDrawer;
