'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import DesktopNavLinks from './DesktopNavLinks';
import MobileNavLinks from './MobileNavLinks';
import NavToggleButton from './NavToggleButton';
import UserMenu from './UserMenu';

export default function Navbar() {
  const { data: session } = useSession();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [indicatorPos, setIndicatorPos] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const pathname = usePathname();
  const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  useEffect(() => {
    const links = ['/', '/docs', '/project'];
    const currentIndex = links.indexOf(pathname);
    if (currentIndex !== -1) {
      const activeLink = document.getElementById(`nav-link-${currentIndex}`);
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setIndicatorPos(offsetLeft);
        setIndicatorWidth(offsetWidth);
      }
    }
  }, [pathname]);

  return (
    <nav className="fixed top-0 z-30 w-full border-b border-blue-500 bg-white dark:bg-black shadow-md transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 relative">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/Logo.svg" alt="Logo" width={50} height={40} priority />
          <span
            className={`text-lg ${
              pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-300'
            }`}
          >
            Asep Haryana
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <DesktopNavLinks pathname={pathname} indicatorPos={indicatorPos} indicatorWidth={indicatorWidth} />
        </div>
        <div className="flex items-center space-x-4">
          <UserMenu session={session} loginUrl={loginUrl} />
          <NavToggleButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </div>
        <MobileNavLinks
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          pathname={pathname}
          loginUrl={loginUrl}
          session={session}
        />
      </div>
    </nav>
  );
}
