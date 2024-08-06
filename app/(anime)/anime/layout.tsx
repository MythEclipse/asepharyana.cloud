import DrawerWrapper from '@/components/drawer/DrawerWrapper';
import React from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DrawerWrapper>
      <div className="p-5">{children}</div>
    </DrawerWrapper>
  );
}
