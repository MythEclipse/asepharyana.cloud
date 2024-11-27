'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SessionProvider, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { signOut } from '@/lib/auth';

export default function NavbarWrapper() {
  return <Navbar />;
}

function Navbar() {
  const { data: session } = useSession();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    <nav className="fixed top-0 z-30 w-full border-b border-blue-500 bg-white dark:bg-black shadow-md transition-all duration-300 ease-in-out">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3 relative">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/Logo.svg" alt="Logo" quality={100} loading="eager" width={50} height={40} priority />
          <span
            className={`text-lg transition-colors duration-300 ${pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'}`}
          >
            Asep Haryana
          </span>
        </Link>
        <div className="relative flex items-center space-x-2 md:order-2">
          <UserMenu
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            session={session}
            status={session ? 'authenticated' : 'unauthenticated'}
            loginUrl={loginUrl}
          />
          <NavToggleButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </div>
        <div className="hidden md:block">
          <DesktopNavLinks pathname={pathname} indicatorPos={indicatorPos} indicatorWidth={indicatorWidth} />
        </div>
        <MobileNavLinks
          isNavOpen={isNavOpen}
          pathname={pathname}
          loginUrl={loginUrl}
          userStatus={session ? 'authenticated' : 'unauthenticated'}
        />
      </div>
    </nav>
  );
}

function NavLink({
  href,
  pathname,
  label,
  index,
  isOpen
}: {
  href: string;
  pathname: string;
  label: string;
  index: number;
  isOpen: boolean;
}) {
  const isActive = pathname === href;

  return (
    <li id={`nav-link-${index}`} className="relative z-10 group">
      <Link href={href}>
        <span
          className={`text-lg inline-block px-3 py-1 transition-all duration-300 rounded-md ${isActive || isOpen ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'
            } hover:text-blue-600`}
        >
          {label}
        </span>
      </Link>
      <div
        className={`absolute left-0 right-0 h-1 rounded-full transition-all duration-300 ${isActive || isOpen ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
          }`}
      ></div>
    </li>
  );
}

function DesktopNavLinks({
  pathname,
  indicatorPos,
  indicatorWidth
}: {
  pathname: string;
  indicatorPos: number;
  indicatorWidth: number;
}) {
  return (
    <ul className="flex space-x-8 relative">
      <NavLink href="/" pathname={pathname} label="Home" index={0} isOpen={false} />
      <NavLink href="/docs" pathname={pathname} label="Docs" index={1} isOpen={false} />
      <NavLink href="/project" pathname={pathname} label="Project" index={2} isOpen={false} />
    </ul>
  );
}

function MobileNavLinks({
  isNavOpen,
  pathname,
  loginUrl,
  userStatus
}: {
  isNavOpen: boolean;
  pathname: string;
  loginUrl: string;
  userStatus: string | null;
}) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-20 ${isNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <ul
        className={`absolute top-0 left-0 w-full bg-white dark:bg-black py-6 transform transition-all duration-300 ease-in-out z-20 ${isNavOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <NavLink href="/" pathname={pathname} label="Home" index={0} isOpen={false} />
        <NavLink href="/docs" pathname={pathname} label="Docs" index={1} isOpen={false} />
        <NavLink href="/project" pathname={pathname} label="Project" index={2} isOpen={false} />
        {userStatus !== 'authenticated' ? (
          <li className="text-center mt-4">
            <Link href={loginUrl}>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-full">Login</button>
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function NavToggleButton({
  isNavOpen,
  setIsNavOpen
}: {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="fixed top-3 right-3 z-30 flex items-center justify-center w-10 h-10 bg-transparent border border-blue-500 rounded-full md:hidden"
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <svg
        className={`w-6 h-6 transition-transform duration-300 ${isNavOpen ? 'rotate-90' : 'rotate-0'}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  );
}

function UserMenu({
  isDropdownOpen,
  setIsDropdownOpen,
  session,
  status,
  loginUrl
}: {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
  session: Session | null;
  status: string | null;
  loginUrl: string;
}) {
  return (
    <div className="relative">
      {status === 'authenticated' ? (
        <button
          className="relative w-10 h-10 rounded-full border border-blue-500"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Image
            src={session?.user?.image ?? '/profile-circle-svgrepo-com.svg'}
            alt="profile"
            className="rounded-full"
            width={32}
            height={32}
          />
        </button>
      ) : (
        <Link href={loginUrl}>
          <button className="hidden md:block px-4 py-2 bg-blue-500 text-white rounded-full z-30">Login</button>
        </Link>
      )}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-40">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Link href="/settings">Settings</Link>
            </li>
            <li className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 rounded-b-lg">
              <button onClick={async () => {
                "use server"
                await signOut()
              }}>Sign Out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
