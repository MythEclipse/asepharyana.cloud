'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import ButtonA from '../ButtonA';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  const [indicatorPos, setIndicatorPos] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

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
        <Logo />
        <UserMenu status={status} session={session} loginUrl={loginUrl} />
        <NavToggleButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <NavLinks isNavOpen={isNavOpen} pathname={pathname} indicatorPos={indicatorPos} indicatorWidth={indicatorWidth} />
        <motion.div
          className="top-4 absolute h-10 rounded-full bg-blue-500 dark:bg-blue-700 border-2 border-transparent hidden md:block"
          initial={{ left: 0, width: 0 }}
          animate={{ left: indicatorPos, width: indicatorWidth }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ zIndex: 0 }}
        />
      </div>
    </nav>
  );
}

function NavLink({ href, pathname, label, index }: { href: string; pathname: string; label: string; index: number; }) {
  return (
    <motion.li
      id={`nav-link-${index}`}
      className="relative z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={href}>
        <span className={`block rounded-lg px-2 py-1 text-sm transition-colors duration-300 ${pathname === href ? 'font-semibold text-blue-500 md:text-white underline md:underline-none' : 'text-gray-900 dark:text-gray-100'}`}>
          {label}
        </span>
      </Link>
    </motion.li>
  );
}

function NavLinks({ isNavOpen, pathname, indicatorPos, indicatorWidth }: { isNavOpen: boolean; pathname: string; indicatorPos: number; indicatorWidth: number; }) {
  return (
    <div className={`${isNavOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`}>
      <ul className="mt-2 flex flex-col rounded-lg border border-blue-500 bg-gray-50 p-2 font-medium dark:border-blue-500 dark:bg-black md:mt-0 md:flex-row md:space-x-4 md:border-0 md:bg-transparent rtl:space-x-reverse">
        <NavLink href="/" pathname={pathname} label="Home" index={0} />
        <NavLink href="/docs" pathname={pathname} label="Docs" index={1} />
        <NavLink href="/project" pathname={pathname} label="Project" index={2} />
      </ul>
    </div>
  );
}

function NavToggleButton({ isNavOpen, setIsNavOpen }: { isNavOpen: boolean; setIsNavOpen: (isNavOpen: boolean) => void; }) {
  return (
    <button
      type="button"
      className="relative flex flex-col items-center justify-center text-center px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg hover:bg-blue-500 hover:text-white md:hidden"
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <span className="sr-only">Open main menu</span>
      <motion.svg
        className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isNavOpen ? 'rotate-45' : 'rotate-0'}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
      </motion.svg>
    </button>
  );
}

function UserMenu({ status, session, loginUrl }: { status: string; session: any; loginUrl: string; }) {
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
            <DropdownMenuItem onClick={() => signOut()} className="text-red-600">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={loginUrl}>
          <ButtonA className='w-16 h-8'>Login</ButtonA>
        </Link>
      )}
    </div>
  );
}

function Logo() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className="relative flex items-center space-x-2 rtl:space-x-reverse cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <Image src="/Logo.svg" alt="Logo" quality={100} loading="eager" width={50} height={40} priority />
      <span className={`text-sm transition-colors duration-300 ${pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'}`}>Asep Haryana</span>
    </Link>
  );
}
