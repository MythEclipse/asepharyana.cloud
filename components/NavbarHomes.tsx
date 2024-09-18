'use client';

import { useState } from 'react';
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
import ButtonA from './ButtonA';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  return (
    <nav className="fixed top-0 z-[30] w-full border-b border-blue-500 bg-white dark:bg-darkb shadow-md transition-all duration-300 ease-in-out">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          scroll={true}
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <Image src="/Logo.svg" alt="Logo" quality={100} loading="eager" width={75} height={56} priority />
          <span
            className={`${
              pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'
            } text-lg transition-colors duration-300`}
          >
            Asep Haryana
          </span>
        </Link>

        <div className="relative flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session?.user?.image ?? '/profile-circle-svgrepo-com.svg'} alt="profile" />
                  <AvatarFallback>{session?.user?.name?.charAt(0) ?? 'G'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <span className="block text-sm">{session?.user?.name ?? session?.user?.fullname ?? 'Guest'}</span>
                  <span className="block text-sm font-medium truncate">{session?.user?.email ?? 'Guest'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link scroll={true} href="/dashboard">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link scroll={true} href="/settings">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link scroll={true} href={loginUrl} className="mr-3">
              <ButtonA>Login</ButtonA>
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="flex flex-col items-center justify-center text-center px-6 py-3 text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 md:hidden"
            aria-controls="navbar-user"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
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
        </div>
        <div className={`${isNavOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`} id="navbar-user">
          <ul
            className={`mt-4 flex flex-col rounded-lg border border-blue-500 bg-gray-50 p-4 font-medium dark:border-blue-500 dark:bg-darka md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent rtl:space-x-reverse transition-all duration-300 ease-in-out transform ${
              isNavOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
            } md:transform-none md:opacity-100`}
          >
            <li>
              <Link scroll={true} href="/docs">
                <span
                  className={`${
                    pathname === '/docs' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'
                  } block rounded px-3 py-2 transition-colors duration-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  Docs
                </span>
              </Link>
            </li>
            <li>
              <Link scroll={true} href="/project">
                <span
                  className={`${
                    pathname === '/project' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'
                  } block rounded px-3 py-2 transition-colors duration-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
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
