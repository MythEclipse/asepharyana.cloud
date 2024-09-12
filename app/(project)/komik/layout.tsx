import DockKomik from '@/components/DockKomik';
import DrawerWrapper from '@/components/drawerKomik/DrawerWrapper';
import React from 'react';

export const metadata = {
  title: {
    default: 'Tempat baca komik',
    template: '%s - Tempat baca komik'
  },
  description: 'Tempat baca komik',
  keywords:
    'nextjs, manga, manhua, manhwa, Baca online One Piece, Baca Online Solo Leveling, Baca Online Apotheosis, Baca Online Star Martial God Technique, Baca Komik lengkap, Baca Manga, Baca Manhua, Baca Manhwa, Baca Komik Naruto, Baca Komik Bleach, Baca Komik One Piece, Baca Komik Boruto, Baca Komik Dragon Ball, Baca Komik Black Clover, Baca Komik Attack on Titan, Baca Komik Fairy Tail, Baca Komik My Hero Academia, Baca Komik Demon Slayer, Baca Komik Jujutsu Kaisen, Baca Komik Tokyo Revengers, Baca Komik Hunter x Hunter, Baca Manhua Martial Peak, Baca Manhua Tales of Demons and Gods, Baca Manhua The Great Ruler, Baca Manhwa Solo Leveling, Baca Manhwa The Beginning After The End, Baca Manhwa Tower of God, Baca Manhwa Noblesse, Baca Manhwa The God of High School, Komik Gratis, Komik Terbaru, Baca Komik Bahasa Indonesia, Baca Manga Bahasa Indonesia, Baca Manhua Bahasa Indonesia, Baca Manhwa Bahasa Indonesia, Manga Sub Indo, Manhua Sub Indo, Manhwa Sub Indo, Baca Komik Sub Indo, Manga Terjemahan, Manhua Terjemahan, Manhwa Terjemahan, Baca Komik Online, Komik Terjemahan, Baca Komik di HP, Komik Digital, Manga Terpopuler, Manhua Terpopuler, Manhwa Terpopuler'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="">{children}</div>
      <DockKomik />
    </>
  );
}
