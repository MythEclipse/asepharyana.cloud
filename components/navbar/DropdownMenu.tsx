'use client';

import { ReactNode } from 'react';

interface DropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

export default DropdownMenu;
