'use client';

import { cn } from '@/lib/utils';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import { useEffect } from 'react';

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

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        {
          display: 'inline-block',
          opacity: 1,
          width: 'fit-content'
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: 'easeInOut'
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: index * 0.1 }}
                key={`char-${index}`}
                className={cn(`dark:text-white text-black`, word.className)}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <header className={cn('py-10', className)}>
      <h1 className="text-4xl sm:text-3xl md:text-4xl font-semibold">
        {renderWords()}
        <motion.span
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className={cn('inline-block rounded-sm w-[4px] h-6 bg-blue-500', cursorClassName)}
        ></motion.span>
      </h1>
    </header>
  );
};
