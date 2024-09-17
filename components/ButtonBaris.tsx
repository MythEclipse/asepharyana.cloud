// components/ChapterButton.tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/background-gradient';

interface ChapterButtonProps {
  children: React.ReactNode;
  href?: string; 
}

const ChapterButton = ({ children, href }: ChapterButtonProps) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative max-w-xs"
    >
      <BackgroundGradient className="rounded-[22px] overflow-hidden w-full h-full bg-white dark:bg-zinc-900">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex flex-col items-center justify-center p-4 border-none cursor-pointer w-full h-full bg-transparent"
        >
          <div className="text-center flex flex-col items-center justify-center">
            {children}
          </div>
        </motion.button>
      </BackgroundGradient>
    </motion.div>
  );

  return href ? (
    <Link href={href} passHref>
      {content}
    </Link>
  ) : (
    content
  );
};

export default ChapterButton;
