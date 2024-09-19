'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { NavToggleButton } from './NavToggleButton';
import { NavLinks } from './NavLinks';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicatorPos, setIndicatorPos] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  useEffect(() => {
    const links = ['/', '/docs', '/project'];
    const currentIndex = links.indexOf(pathname);
    setActiveIndex(currentIndex);
  }, [pathname]);

  useEffect(() => {
    if (activeIndex !== null) {
      const activeLink = document.getElementById(`nav-link-${activeIndex}`);
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setIndicatorPos(offsetLeft);
        setIndicatorWidth(offsetWidth);
      }
    }
  }, [activeIndex]);

  return (
    <nav className="fixed top-0 z-30 w-full border-b border-blue-500 bg-white dark:bg-black shadow-md transition-all duration-300 ease-in-out">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3 relative">
        <Logo />
        <UserMenu status={status} session={session} loginUrl={loginUrl} />
        <NavToggleButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <NavLinks
          isNavOpen={isNavOpen}
          indicatorPos={indicatorPos}
          indicatorWidth={indicatorWidth}
          pathname={pathname}
        />
      </div>
    </nav>
  );
}
