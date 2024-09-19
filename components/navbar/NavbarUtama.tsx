'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import ButtonA from '@/components/ButtonA';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
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
        <Link href="/" scroll={true} className="relative flex items-center space-x-2 rtl:space-x-reverse cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
          <Image src="/Logo.svg" alt="Logo" quality={100} loading="eager" width={50} height={40} priority />
          <span className={`text-sm transition-colors duration-300 ${pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'}`}>
            Asep Haryana
          </span>
        </Link>

        <div className="relative flex items-center space-x-2 md:order-2 rtl:space-x-reverse">
          {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-8 h-8">
                  <AvatarImage src={session?.user?.image ?? '/profile-circle-svgrepo-com.svg'} alt="profile" />
                  <AvatarFallback>{session?.user?.name?.charAt(0) ?? 'G'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2">
                <DropdownMenuItem className="p-1 text-sm">
                  <span className="block text-xs">{session?.user?.name ?? session?.user?.fullname ?? 'Guest'}</span>
                  <span className="block text-xs font-medium truncate">{session?.user?.email ?? 'Guest'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link scroll={true} href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link scroll={true} href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className="text-red-600">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link scroll={true} href={loginUrl} className="mr-2">
              <ButtonA>Login</ButtonA>
            </Link>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="flex flex-col items-center justify-center text-center px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 md:hidden"
            aria-controls="navbar-user"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div className={`${isNavOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`} id="navbar-user">
          <ul className="relative mt-2 flex flex-col rounded-lg border border-blue-500 bg-gray-50 p-2 font-medium dark:border-blue-500 dark:bg-black md:mt-0 md:flex-row md:space-x-4 md:border-0 md:bg-transparent rtl:space-x-reverse">
            {/* Animasi Background Bergerak */}
            <motion.div
              className="absolute top-0 left-0 h-10 rounded-full bg-blue-500 dark:bg-blue-700 border-2 border-transparent"
              initial={{ left: 0, width: 0 }}
              animate={{ left: indicatorPos, width: indicatorWidth }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ zIndex: 0 }} // Set lower z-index for background
            />

            <li id="nav-link-0" className="relative z-10"> {/* Ensure list items are above the animated div */}
              <Link scroll={true} href="/">
                <span className={`block rounded-lg px-2 py-1 text-sm transition-colors duration-300 ${pathname === '/' ? 'font-semibold text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                  Home
                </span>
              </Link>
            </li>

            <li id="nav-link-1" className="relative z-10">
              <Link scroll={true} href="/docs">
                <span className={`block rounded-lg px-2 py-1 text-sm transition-colors duration-300 ${pathname === '/docs' ? 'font-semibold text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                  Docs
                </span>
              </Link>
            </li>

            <li id="nav-link-2" className="relative z-10">
              <Link scroll={true} href="/project">
                <span className={`block rounded-lg px-2 py-1 text-sm transition-colors duration-300 ${pathname === '/project' ? 'font-semibold text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                  Project
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
