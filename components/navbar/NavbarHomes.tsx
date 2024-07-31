'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button, DropdownMenu } from '@radix-ui/themes';

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 z-10 w-full bg-white dark:bg-darkb shadow-md">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/Logo.svg"
            className="cursor-pointer transition duration-300 ease-in-out hover:scale-110"
            alt="Logo"
            quality={100}
            loading="eager"
            width={75}
            height={100}
          />
          <span
            className={`${
              pathname === '/' ? 'font-semibold text-primary-600' : 'text-gray-900 dark:text-gray-100'
            } text-lg transition duration-300`}
          >
            Asep Haryana
          </span>
        </Link>
        <div className="relative flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {status === 'authenticated' ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button className='invisible'>
                  <Image
                    className="rounded-full text-dark dark:fill-current dark:text-gray-100"
                    alt="profile"
                    src={session?.user?.image ?? '/profile-circle-svgrepo-com.svg'}
                    width={50}
                    height={50}
                  />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>{session?.user?.name ?? session?.user?.fullName ?? 'Guest'}</DropdownMenu.Item>
                <DropdownMenu.Item>{session?.user?.email ?? 'Guest'}</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => signOut()} color="red">
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <Link href="/login" className="mr-3">
              <Button variant="solid" color="blue">
                Login
              </Button>
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
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
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-darka md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent rtl:space-x-reverse">
            <li>
              <Link href="/about">
                <span
                  className={`${
                    pathname === '/about' ? 'font-semibold text-primary-600' : 'text-gray-900 dark:text-gray-100'
                  } block rounded px-3 py-2 transition duration-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link href="/portfolio">
                <span
                  className={`${
                    pathname === '/portfolio' ? 'font-semibold text-primary-600' : 'text-gray-900 dark:text-gray-100'
                  } block rounded px-3 py-2 transition duration-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  Portfolio
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
