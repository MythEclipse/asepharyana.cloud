'use client';
import React from 'react';
import { Card as ShadcnCard } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl: string;
  type?: string;
}

const TypeLabel = ({ type }: { type: string | undefined }) => {
  if (!type) return null;

  const typeColors = {
    Manga: 'bg-red-500',
    Manhua: 'bg-green-500',
    Manhwa: 'bg-blue-500'
  };

  return (
    <span
      className={`absolute top-2 right-2 px-2 py-1 rounded-md text-white text-sm font-bold ${typeColors[type as keyof typeof typeColors] || 'bg-gray-500'}`}
    >
      {type}
    </span>
  );
};

export default function CardA({ title, description, imageUrl, linkUrl, type }: CardProps) {
  return (
    <Link href={linkUrl}>
      <div className="cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:rotate-1 active:scale-95">
        <ShadcnCard className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-black overflow-hidden transform transition-transform duration-300 hover:shadow-2xl text-blue-500 bg-transparent border border-blue-500 rounded-xl shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:ring-4 hover:ring-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500">
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-opacity duration-500 ease-in-out"
            />
            <TypeLabel type={type} />
          </div>
          <div className="p-4">
            <h3 className="text-xs sm:text-sm md:text-lg font-bold text-black dark:text-gray-200 truncate">{title}</h3>
            {description && (
              <p className="text-sm sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">{description}</p>
            )}
          </div>
        </ShadcnCard>
      </div>
    </Link>
  );
}
