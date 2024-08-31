import DrawerWrapper from '@/components/drawer/DrawerWrapper';
import React from 'react';

export const metadata = {
  title: {
    default: 'Anime',
    template: '%s - Anime'
  },
  description: 'Tempat menonton dan mendownload anime',
  keywords: 'nextjs, anime, free'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DrawerWrapper>
      <div className="p-5">{children}</div>
    </DrawerWrapper>
  );
}
