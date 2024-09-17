// components/GenreButton.tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const GenreButton = ({ genre }: any) => {
  return (
    <Link href={`/anime/genre/${genre.slug}`} passHref>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative  w-full h-24"
      >
          <BackgroundGradient className="rounded-[22px] overflow-hidden w-full h-full bg-white dark:bg-zinc-900">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center justify-center p-4 border-none cursor-pointer w-full h-full bg-transparent"
            >
              <div className="text-center flex flex-col items-center justify-center">
                <div className="text-lg font-bold mb-2">{genre.name}</div>
              </div>
            </motion.button>
          </BackgroundGradient>
      </motion.div>
    </Link>
  );
};

export default GenreButton;
