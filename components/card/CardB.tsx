'use client';

import { Card as ShadcnCard } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export default function CardB({ children }: CardProps) {
  return (
    <div className="cursor-pointer">
      <ShadcnCard className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-black overflow-hidden text-blue-500 bg-transparent border border-blue-500 rounded-xl shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
        {children}
      </ShadcnCard>
    </div>
  );
}
