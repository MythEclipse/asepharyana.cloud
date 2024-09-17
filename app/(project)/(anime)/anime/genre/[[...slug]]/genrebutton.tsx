'use client';
// components/GenreButton.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const GenreButton = ({ genre }: any) => {
  return (
    <BackgroundGradient className="rounded-[22px] p-7 bg-white dark:bg-zinc-900">
      <Link href={`/anime/genre/${genre.slug}`} passHref>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4 border-none cursor-pointer w-full h-48 flex-grow"
        >
          <div className="mt-4 text-center flex-grow">
            <div className="text-lg font-bold mb-2">{genre.name}</div>
          </div>
        </motion.button>
      </Link>
    </BackgroundGradient>
  );
};

export default GenreButton;
