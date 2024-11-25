'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

export default function Navbar({ sessionData, statusData }: { sessionData: any; statusData: string | null }) {
  const [session, setSession] = useState(sessionData);
  const [userStatus, setUserStatus] = useState<string | null>(statusData);
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
    <nav className="fixed top-0 z-30 w-full border-b border-blue-500 bg-white dark:bg-black shadow-md transition-all duration-300 ease-in-out">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3 relative">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/Logo.svg"
            alt="Logo"
            quality={100}
            loading="eager"
            width={50}
            height={40}
            priority
          />
          <span
            className={`text-lg transition-colors duration-300 ${pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'
              }`}
          >
            Asep Haryana
          </span>
        </Link>
        <UserMenu status={userStatus} session={session} loginUrl={loginUrl} />
        <NavToggleButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <NavLinks
          isNavOpen={isNavOpen}
          pathname={pathname}
          indicatorPos={indicatorPos}
          indicatorWidth={indicatorWidth}
        />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-16 rounded-full bg-blue-500 dark:bg-blue-700 border-2 border-transparent hidden md:block transition-all duration-300"
          style={{
            left: indicatorPos - 10, // Tambahkan sedikit padding
            width: indicatorWidth + 20, // Tambahkan sedikit lebar
            zIndex: 0
          }}
        />
      </div>
    </nav>
  );
}

function NavLink({
  href,
  pathname,
  label,
  index
}: {
  href: string;
  pathname: string;
  label: string;
  index: number;
}) {
  return (
    <li id={`nav-link-${index}`} className="relative z-10">
      <Link href={href}>
        <span
          className={`text-lg transition-all duration-300 ${pathname === href ? 'font-semibold ' : 'text-gray-900 dark:text-gray-100'
            }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}

function NavLinks({
  isNavOpen,
  pathname,
  indicatorPos,
  indicatorWidth
}: {
  isNavOpen: boolean;
  pathname: string;
  indicatorPos: number;
  indicatorWidth: number;
}) {
  return (
    <ul className="mt-2 flex flex-col gap-4 rounded-lg border border-blue-500 bg-gray-50 p-2 font-medium dark:border-blue-500 dark:bg-black md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent rtl:space-x-reverse">
      <NavLink href="/" pathname={pathname} label="Home" index={0} />
      <NavLink href="/docs" pathname={pathname} label="Docs" index={1} />
      <NavLink href="/project" pathname={pathname} label="Project" index={2} />
    </ul>
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
      className="relative flex flex-col items-center justify-center text-center px-6 py-4 bg-transparent border border-blue-500 rounded-full shadow-lg hover:bg-blue-500 hover:text-white md:hidden"
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isNavOpen ? 'rotate-45' : 'rotate-0'
          }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  );
}

function UserMenu({
  status,
  session,
  loginUrl
}: {
  status: string | null;
  session: any;
  loginUrl: string;
}) {
  return (
    <div className="relative flex items-center space-x-2 md:order-2 rtl:space-x-reverse">
      {status === 'authenticated' ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative cursor-pointer w-8 h-8">
              <Image
                src={session?.user?.image ?? '/profile-circle-svgrepo-com.svg'}
                alt="profile"
                className="rounded-full"
                width={32}
                height={32}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex items-center">
                <User className="mr-2" />
                <span>{session?.user?.name ?? 'Guest'}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={() => alert('Sign out action')}>Sign Out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={loginUrl}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full">Login</button>
        </Link>
      )}
    </div>
  );
}
