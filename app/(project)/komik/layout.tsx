import DrawerWrapper from '@/components/drawerKomik/DrawerWrapper';
import React from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DrawerWrapper>
      <div className="p-5">{children}</div>
    </DrawerWrapper>
  );
}
