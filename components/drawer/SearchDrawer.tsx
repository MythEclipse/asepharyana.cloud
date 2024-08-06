'use client';

import React, { useState } from 'react';
import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiHome,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiMenu
} from 'react-icons/hi';

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
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0 flex-1"
          >
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/anime" icon={HiHome}>
                  Home
                </Sidebar.Item>
                <Sidebar.Item href="/anime/ongoing-anime" icon={HiCollection}>
                  Ongoing Anime
                </Sidebar.Item>
                <Sidebar.Item href="/anime/complete-anime" icon={HiCollection}>
                  Complete Anime
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/anime/genre" icon={HiCollection}>
                  Genre
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default SearchDrawer;
