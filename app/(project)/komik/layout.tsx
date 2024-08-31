import DrawerWrapper from '@/components/drawerKomik/DrawerWrapper';
import React from 'react';

export const metadata = {
  title: {
    default: 'Tempat baca komik',
    template: '%s - Tempat baca komik',
  },
  description: 'Tempat baca komik',
  keywords: 'nextjs, manga, manhua, manhwa, free',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DrawerWrapper>
      <div className="p-5">{children}</div>
    </DrawerWrapper>
  );
}
