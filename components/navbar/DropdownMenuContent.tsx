'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownMenuContentProps {
  children: ReactNode;
}

const DropdownMenuContent = ({ children }: DropdownMenuContentProps) => (
  <AnimatePresence>
    <motion.div
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default DropdownMenuContent;
