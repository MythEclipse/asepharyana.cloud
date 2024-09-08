import DrawerWrapper from '@/components/drawerKomik/DrawerWrapper';
import React from 'react';

export const metadata = {
  title: {
    default: 'Tempat baca komik',
    template: '%s - Tempat baca komik'
  },
  description: 'Tempat baca komik',
  keywords:
    'nextjs, manga, manhua, manhwa, Baca online One Piece, Baca Online Solo Leveling, Baca Online Apotheois, Baca Online Star Martial God Technique, Baca Komik lengkap, Baca Manga, Baca Manhua, Baca Manhwa'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DrawerWrapper>
      <div className="">{children}</div>
    </DrawerWrapper>
  );
}
