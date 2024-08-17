// components/Layout.tsx
'use client';

import React, { useState } from 'react';
import DrawerButton from './DrawerButton';
import SearchDrawer from './SearchDrawer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <div>
      <main>{children}</main>
      <DrawerButton onOpen={handleOpenDrawer} />
      <SearchDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
};

export default Layout;
