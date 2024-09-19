'use client';

import { ReactNode } from 'react';

interface DropdownMenuTriggerProps {
  children: ReactNode;
  onClick?: () => void;
}

const DropdownMenuTrigger = ({ children, onClick }: DropdownMenuTriggerProps) => (
  <button type="button" className="flex items-center" onClick={onClick}>
    {children}
  </button>
);

export default DropdownMenuTrigger;
