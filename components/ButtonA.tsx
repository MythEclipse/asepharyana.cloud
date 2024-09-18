"use client";

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const AnimatedButton: FC<ButtonProps> = ({ children, onClick, className, href }) => {
  const buttonContent = (
    <motion.div
      className={`w-full text-center px-6 py-3 text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href}>
          {buttonContent}
      </Link>
    );
  }

  return (
    <motion.button
      className={`w-full text-center px-6 py-3 text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
