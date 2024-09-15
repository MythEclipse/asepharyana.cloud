'use client';
import { motion } from 'framer-motion';
import { Card as ShadcnCard } from '@/components/ui/card';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export default function CardA({ title, description, imageUrl, linkUrl }: CardProps) {
  return (
    <Link href={linkUrl} passHref>
      <motion.div
        whileHover={{ scale: 1.08, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="cursor-pointer"
      >
        <ShadcnCard
          className="w-60 h-96 bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:shadow-2xl"
        >
          <div className="relative">
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-72 object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          </div>
        </ShadcnCard>
      </motion.div>
    </Link>
  );
}
