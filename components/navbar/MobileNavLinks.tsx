'use client';

import React from 'react';
import Link from 'next/link';
import UserMenu from './UserMenu';
import { Session } from 'next-auth';

interface MobileNavLinksProps {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
  pathname: string;
  loginUrl: string;
  session: Session | null;
}

export default function MobileNavLinks({ isNavOpen, setIsNavOpen, pathname, loginUrl, session }: MobileNavLinksProps) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
    { href: '/project', label: 'Project' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsNavOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 w-full bg-white dark:bg-black transition-transform ${
          isNavOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <ul className="flex flex-col p-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>
                <span
                  className={`block px-4 py-2 ${
                    pathname === link.href ? 'text-blue-600 font-semibold' : 'text-gray-900 dark:text-gray-300'
                  }`}
                  onClick={() => setIsNavOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <UserMenu session={session} loginUrl={loginUrl} />
          </li>
        </ul>
      </div>
    </>
  );
}
