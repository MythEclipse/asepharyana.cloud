'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const MenuItem = ({
  setActive,
  active,
  item,
  children
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <p className="cursor-pointer text-black hover:opacity-90 dark:text-white transition-opacity duration-300">
        {item}
      </p>
      {active !== null && (
        <div
          className={`absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 transition-all duration-300 ${
            active === item ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
          }`}
        >
          {active === item && (
            <div className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl p-4">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image src={src} width={140} height={70} alt={title} className="flex-shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">{title}</h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">{description}</p>
      </div>
    </Link>
  );
};

import { LinkProps } from 'next/link';

import { ReactNode } from 'react';

interface HoveredLinkProps extends LinkProps {
  children: ReactNode;
}

export const HoveredLink = ({ children, ...rest }: HoveredLinkProps) => {
  return (
    <Link {...rest} className="text-neutral-700 dark:text-neutral-200 hover:text-black transition-colors duration-300">
      {children}
    </Link>
  );
};
