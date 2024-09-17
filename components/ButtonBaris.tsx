'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ChapterButton = ({ children }: any) => {
  return (
    <motion.button
      className="flex flex-col items-center justify-center p-4 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-600 w-44 h-32 max-w-xs"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
};

export default ChapterButton;
