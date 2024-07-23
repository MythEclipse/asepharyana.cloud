'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Component() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <nav className='fixed top-0 z-10 w-full border-gray-200'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <Link href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <Image
            src='/Logo.svg'
            className='cursor-pointer transition duration-300 ease-in-out hover:scale-110'
            alt='Logo'
            quality={100}
            loading='eager'
            width={75}
            height={100}
          />
          <span
            className={`${
              pathname === '/' ? 'font-semibold text-primary-600' : 'text-gray-900 dark:text-gray-100'
            } block rounded px-3 py-2 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}
          >
            Asep Haryana
          </span>
        </Link>
        <div className='relative flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse'>
          {status === 'authenticated' ? (
            <>
              <button
                type='button'
                className='relative flex rounded-full fill-current text-sm text-white focus:ring-4 focus:ring-gray-300 dark:fill-current dark:text-gray-100 dark:focus:ring-gray-600 md:me-0'
                id='user-menu-button'
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <span className='sr-only'>Open user menu</span>
                {status === 'authenticated' ? (
                  <div>
                    <Image
                      className='rounded-full text-dark dark:fill-current dark:text-gray-100'
                      alt='profile'
                      src={session?.user?.image ?? '/profile-circle-svgrepo-com.svg'}
                      width={50}
                      height={50}
                    ></Image>
                  </div>
                ) : (
                  <Image
                    className='rounded-full fill-current text-white dark:fill-current dark:text-gray-100'
                    alt='profile'
                    src='/profile-circle-svgrepo-com.svg'
                    width={50}
                    height={50}
                  ></Image>
                )}
              </button>
            </>
          ) : (
            <Link href='/login' className='mr-3'>
              <button className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Login
              </button>
            </Link>
          )}
          <button
            data-collapse-toggle='navbar-user'
            type='button'
            className='inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
            aria-controls='navbar-user'
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='size-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${isNavOpen ? 'block' : 'hidden'} w-full md:order-1 md:flex md:w-auto`}
          id='navbar-user'
        >
          <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent rtl:space-x-reverse'>
            <li>
              <Link href='/about'>
                <span
                  className={`${
                    pathname === '/about' ? 'font-semibold text-primary-600' : 'text-gray-900 dark:text-gray-100'
                  } block rounded px-3 py-2 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}
                >
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link href='/services'>
                <span
                  className={`${
                    pathname === '/services' ? 'font-semibold text-primary-600' : 'text-gray-900 dark:text-gray-100'
                  } block rounded px-3 py-2 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}
                >
                  Services
                </span>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <span
                  className={`${
                    pathname === '/contact' ? 'font-semibold text-primary-600' : 'text-gray-900 dark:text-gray-100'
                  } block rounded px-3 py-2 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}
                >
                  Contact
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {isProfileOpen && (
            <div
              className='absolute right-0 z-50 mt-4 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700'
              id='user-dropdown'
            >
              <div className='px-4 py-3'>
                <span className='block text-sm text-gray-900 dark:text-white'>
                  {session?.user.name ?? session?.user?.fullName ?? 'Guest'}
                </span>
                <span className='block truncate text-sm text-gray-500 dark:text-gray-400'>
                  {session?.user?.email ?? 'Guest'}
                </span>
              </div>
              <ul className='py-2' aria-labelledby='user-menu-button'>
                <li>
                  <Link
                    href='/dashboard'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href='/settings'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
