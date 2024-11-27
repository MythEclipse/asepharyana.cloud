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
    <Link href={linkUrl} passHref>
      <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:rotate-1 active:scale-95">
        <ShadcnCard className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-black overflow-hidden transform transition-transform duration-300 hover:shadow-2xl text-blue-500 bg-transparent border border-blue-500 rounded-xl shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          <div className="relative h-48 sm:h-56 md:h-60 lg:h-72"> {/* Fixed image height for consistency */}
            {/* If image URL exists, render Image, otherwise show fallback */}
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={300}
                className="opacity-0 scale-90 transition-transform duration-600 ease-in-out"
                onLoad={(e) => {
                  e.currentTarget.classList.remove('opacity-0', 'scale-90');
                  e.currentTarget.classList.add('opacity-100', 'scale-100');
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700" /> // Fallback background
            )}
          </div>
          <div className="p-4 flex flex-col justify-between h-full">
            <h3 className="text-lg font-bold text-black dark:text-gray-200 truncate">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex-grow">{description}</p>
          </div>
        </ShadcnCard>
      </div>
    </Link>
  );
}
