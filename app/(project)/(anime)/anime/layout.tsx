import DrawerWrapper from '@/components/drawer/DrawerWrapper';
import React from 'react';

export const metadata = {
  title: {
    default: 'Anime',
    template: '%s - Anime'
  },
  description: 'Tempat menonton dan mendownload anime',
  keywords:
    'nextjs, anime, anime sub, anime sub indo, anime sub indo terbaru, anime sub terbaru, anime sub indo terlengkap, anime sub terlengkap, Anime Sub Indo, Nonton Anime Sub Indo, Streaming Anime Sub Indo, Download Anime Sub Indo, Anime Terbaru Sub Indo, Anime Populer Sub Indo, Anime HD Sub Indo, Anime Subtitle Indonesia, Nonton Anime Online Sub Indo, Anime Batch Sub Indo, Anime Lengkap Sub Indo, Anime Action Sub Indo, Anime Romance Sub Indo, Anime Komedi Sub Indo, Anime Terbaik Sub Indo, Anime Movie Sub Indo, Anime Series Sub Indo, Anime 2024 Sub Indo, Anime Favorit Sub Indo, Anime Adventure Sub Indo, Anime Fantasy Sub Indo, Anime Horor Sub Indo, Anime Isekai Sub Indo, Anime Drama Sub Indo, Anime Shounen Sub Indo, Anime Seinen Sub Indo, Anime Slice of Life Sub Indo, Anime Terjemahan Indo, Streaming Anime Gratis Sub Indo, Download Gratis Anime Sub Indo'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DrawerWrapper>
      <div className="p-5">{children}</div>
    </DrawerWrapper>
  );
}
