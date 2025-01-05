'use client';

import { Card as ShadcnCard } from '@/components/card/card';
import { ReactNode } from 'react';
import React from 'react';
interface CardProps {
  children: ReactNode;
}

export default function CardB({ children }: CardProps) {
  return (
    <ShadcnCard className='w-full h-full bg-white dark:bg-black overflow-hidden text-blue-500 bg-transparent border rounded-lg shadow-lg shadow-blue-500/50'>
      {children}
    </ShadcnCard>
  );
}
