'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset'; // Restricting type to valid HTML button types
}

const AnimatedButton: FC<ButtonProps> = ({ children, disabled, onClick, type = 'button', className, href }) => {
  // Default value for type
  const buttonContent = (
    <motion.div
      className={`flex flex-col items-center justify-center text-center 
        px-3 py-1 text-sm  // Kecil untuk md ke bawah
        md:px-6 md:py-3 md:text-base // Ukuran default mulai dari md ke atas
        text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return (
    <motion.button
      className={`flex flex-col items-center justify-center text-center 
        px-3 py-1 text-sm // Kecil untuk md ke bawah
        md:px-6 md:py-3 md:text-base // Ukuran default mulai dari md ke atas
        text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      type={type} // Ensure the type is either "button", "submit", or "reset"
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
