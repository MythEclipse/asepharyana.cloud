import React from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';
import { HiHome, HiCollection, HiMenu, HiOutlineSearch } from 'react-icons/hi';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaPencilAlt, FaDragon, FaBook } from 'react-icons/fa';

const links = [
  {
    title: 'Home',
    icon: <HiHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: '/komik'
  },
  {
    title: 'Latest Manga',
    icon: <FaPencilAlt className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: '/komik/manga/page/1'
  },
  {
    title: 'Latest Manhua',
    icon: <FaDragon className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: '/komik/manhua/page/1'
  },
  {
    title: 'Latest Manhwa',
    icon: <FaBook className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: '/komik/manhwa/page/1'
  },
  {
    title: 'Search',
    icon: <HiOutlineSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: `/komik/search?query=${encodeURIComponent('')}` // Placeholder link for the menu item
  }
];

export default function FloatingDockDemo() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-30">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
