'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export const AnimatedHeader = ({
  words,
  className,
  cursorClassName
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // Memisahkan teks ke dalam array karakter
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split('')
    };
  });

  const [isInView, setIsInView] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const renderWords = () => {
    return (
      <div ref={headerRef} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <span
                key={`char-${index}`}
                className={cn(
                  `dark:text-white text-black transition-opacity duration-300 ease-in-out`,
                  isInView ? 'opacity-100' : 'opacity-0',
                  word.className
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {char}
              </span>
            ))}
            &nbsp;
          </div>
        ))}
      </div>
    );
  };

  return (
    <header className={cn('py-10', className)}>
      <h1 className="text-4xl sm:text-3xl md:text-4xl font-semibold">
        {renderWords()}
        <span className={cn('inline-block rounded-sm w-[4px] h-6 bg-blue-500 animate-blink', cursorClassName)}></span>
      </h1>
    </header>
  );
};
