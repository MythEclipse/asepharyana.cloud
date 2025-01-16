'use client';

import React from 'react';
import Link from 'next/link';

interface DesktopNavLinksProps {
  pathname: string;
  indicatorPos: number;
  indicatorWidth: number;
}

export default function DesktopNavLinks({
  pathname,
  indicatorPos,
  indicatorWidth,
}: DesktopNavLinksProps) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
    { href: '/project', label: 'Project' },
  ];

  return (
    <div className='relative'>
      <ul className='flex space-x-4'>
        {links.map((link, index) => (
          <li key={index} id={`nav-link-${index}`}>
            <Link href={link.href}>
              <span
                className={`px-3 py-2 relative ${
                  pathname === link.href
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-900 dark:text-gray-300'
                }`}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div
        className='absolute bottom-[-2px] left-0 h-1 bg-blue-600 rounded transition-transform'
        style={{
          width: `${indicatorWidth}px`,
          transform: `translateX(${indicatorPos}px)`,
          transition: 'transform 0.3s ease',
        }}
      />
    </div>
  );
}
