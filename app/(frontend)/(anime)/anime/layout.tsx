import DockKomik from '@/components/modal/DockKomik';
import React from 'react';
import { HiHome, HiOutlineSearch } from 'react-icons/hi';
import { MdUpdate } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa'; // Ganti FaDragon dengan FaCheckCircle

export const metadata = {
  title: {
    default: 'Anime',
    template: '%s - Anime'
  },
  description: 'Tempat menonton dan mendownload anime',
  keywords:
    'nextjs, anime, anime sub, anime sub indo, anime sub indo terbaru, anime sub terbaru, anime sub indo terlengkap, anime sub terlengkap, Anime Sub Indo, Nonton Anime Sub Indo, Streaming Anime Sub Indo, Download Anime Sub Indo, Anime Terbaru Sub Indo, Anime Populer Sub Indo, Anime HD Sub Indo, Anime Subtitle Indonesia, Nonton Anime Online Sub Indo, Anime Batch Sub Indo, Anime Lengkap Sub Indo, Anime Action Sub Indo, Anime Romance Sub Indo, Anime Komedi Sub Indo, Anime Terbaik Sub Indo, Anime Movie Sub Indo, Anime Series Sub Indo, Anime 2024 Sub Indo, Anime Favorit Sub Indo, Anime Adventure Sub Indo, Anime Fantasy Sub Indo, Anime Horor Sub Indo, Anime Isekai Sub Indo, Anime Drama Sub Indo, Anime Shounen Sub Indo, Anime Seinen Sub Indo, Anime Slice of Life Sub Indo, Anime Terjemahan Indo, Streaming Anime Gratis Sub Indo, Download Gratis Anime Sub Indo'
};

const anime = [
  {
    title: 'Home',
    icon: <HiHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: '/anime'
  },
  {
    title: 'Ongoing Anime',
    icon: <MdUpdate className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: '/anime/ongoing-anime/1'
  },
  {
    title: 'Complete Anime',
    icon: <FaCheckCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, // Ganti dengan ikon ceklis
    href: '/anime/complete-anime/1'
  },
  {
    title: 'Search',
    icon: <HiOutlineSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: `/anime/search/${encodeURIComponent('a')}`
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="">{children}</div>
      <DockKomik content={anime} />
    </>
  );
}
