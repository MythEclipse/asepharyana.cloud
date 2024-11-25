'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export const TypewriterEffect = ({
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
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split('')
    };
  });

  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const renderWords = () => {
    return (
      <div ref={ref} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 transition-opacity duration-300 ease-in-out`,
                    word.className,
                    isInView ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn('text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center', className)}>
      {renderWords()}
      <span
        className={cn(
          'inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500 animate-blink',
          cursorClassName
        )}
      ></span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
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
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split('')
    };
  });

  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span key={`char-${index}`} className={cn(`dark:text-white text-black `, word.className)}>
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn('flex space-x-1 my-6', className)}>
      <div
        className={cn(
          'overflow-hidden pb-2 transition-all duration-2000 ease-linear',
          isInView ? 'w-fit' : 'w-0'
        )}
        ref={ref}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: 'nowrap'
          }}
        >
          {renderWords()}{' '}
        </div>{' '}
      </div>
      <span
        className={cn(
          'block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500 animate-blink',
          cursorClassName
        )}
      ></span>
    </div>
  );
};

// Add this to your global CSS or Tailwind CSS configuration
// .animate-blink {
//   @apply animate-pulse;
// }
