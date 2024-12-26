// components/ChapterButton.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { BackgroundGradient } from '@/components/ui/background-gradient';

interface ChapterButtonProps {
  children: React.ReactNode;
  href?: string;
}

const ChapterButton = ({ children, href }: ChapterButtonProps) => {
  const content = (
    <div className="relative max-w-xs transform transition-transform duration-200 hover:scale-105 active:scale-95">
      <BackgroundGradient className="rounded-[22px] overflow-hidden w-full h-full bg-white dark:bg-zinc-900">
        <button className="relative flex flex-col items-center justify-center p-4 border-none cursor-pointer w-full h-full bg-transparent">
          <div className="text-center flex flex-col items-center justify-center">{children}</div>
        </button>
      </BackgroundGradient>
    </div>
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
