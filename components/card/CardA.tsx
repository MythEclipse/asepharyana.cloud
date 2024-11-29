'use client';

import { Card as ShadcnCard } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl: string;
}

export default function CardA({ title, description, imageUrl, linkUrl }: CardProps) {
  return (
    <Link href={linkUrl}>
      <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:rotate-1 active:scale-95">
        <ShadcnCard className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-black overflow-hidden transform transition-transform duration-300 hover:shadow-2xl text-blue-500 bg-transparent border border-blue-500 rounded-xl shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-opacity duration-500 ease-in-out"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-black dark:text-gray-200 truncate">{title}</h3>
            {description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>}
          </div>
        </ShadcnCard>
      </div>
    </Link>
  );
}
