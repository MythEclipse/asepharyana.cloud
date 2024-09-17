import DockKomik from '@/components/DockKomik';
import DrawerWrapper from '@/components/drawerKomik/DrawerWrapper';
import React from 'react';
import { HiHome, HiCollection, HiMenu, HiOutlineSearch } from 'react-icons/hi';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaPencilAlt, FaDragon, FaBook } from 'react-icons/fa';

const komik = [
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
export const metadata = {
  title: {
    default: 'Tempat baca komik',
    template: '%s - Tempat baca komik'
  },
  description: 'Tempat baca komik',
  keywords: 'nextjs, asep, haryana, saputra, asep haryana, asep haryana saputra'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="">{children}</div>
      <DockKomik content={komik} />
    </>
  );
}
