'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export const AnimatedHeader = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(''),
  }));

  const [isInView, setIsInView] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const currentHeaderRef = headerRef.current;
    if (currentHeaderRef) observer.observe(currentHeaderRef);

    return () => {
      if (currentHeaderRef) observer.unobserve(currentHeaderRef);
    };
  }, []);

  const renderWords = () => {
    let globalIndex = 0; // Untuk mengatur delay secara global di semua huruf
    return (
      <div ref={headerRef} className='inline'>
        {wordsArray.map((word, wordIdx) => (
          <div key={`word-${wordIdx}`} className='inline-block'>
            {word.text.map((char, charIdx) => {
              const charDelay = globalIndex * 100; // Delay 100ms per huruf
              globalIndex++; // Tingkatkan indeks global untuk huruf berikutnya
              return (
                <span
                  key={`char-${charIdx}`}
                  className={cn(
                    `dark:text-white text-black transition-opacity duration-300 ease-in-out`,
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2',
                    word.className
                  )}
                  style={{ transitionDelay: `${charDelay}ms` }}
                >
                  {char}
                </span>
              );
            })}
            &nbsp;
          </div>
        ))}
      </div>
    );
  };

  return (
    <header className={cn('py-8', className)}>
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight'>
        {renderWords()}
        <span
          className={cn(
            'inline-block rounded-sm w-[3px] h-7 bg-blue-500 animate-blink ml-1',
            cursorClassName
          )}
        ></span>
      </h1>
    </header>
  );
};
