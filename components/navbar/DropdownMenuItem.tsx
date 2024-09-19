'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const DropdownMenuItem = ({ children, onClick, className }: DropdownMenuItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <button
      onClick={onClick}
      className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
    >
      {children}
    </button>
  </motion.div>
);

export default DropdownMenuItem;
