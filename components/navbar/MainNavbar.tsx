'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

export default function NavbarWrapper() {
  return <Navbar />;
}

function Navbar() {
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
    <nav className='fixed top-0 z-30 w-full border-b border-blue-500 bg-white dark:bg-black shadow-md transition-all duration-300'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3 relative'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image src='/Logo.svg' alt='Logo' width={50} height={40} priority />
          <span
            className={`text-lg ${pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-300'}`}
          >
            Asep Haryana
          </span>
        </Link>
        <div className='hidden md:flex items-center space-x-6'>
          <DesktopNavLinks
            pathname={pathname}
            indicatorPos={indicatorPos}
            indicatorWidth={indicatorWidth}
          />
        </div>
        <div className='flex items-center space-x-4'>
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

function NavToggleButton({
  isNavOpen,
  setIsNavOpen,
}: {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
}) {
  return (
    <button
      className='md:hidden flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white'
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='currentColor'
        className='w-6 h-6'
      >
        {isNavOpen ? (
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        ) : (
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 6h16M4 12h16m-7 6h7'
          />
        )}
      </svg>
    </button>
  );
}

function UserMenu({
  session,
  loginUrl,
}: {
  session: Session | null;
  loginUrl: string;
}) {
  return (
    <div className='relative'>
      {session ? (
        <button className='w-10 h-10 rounded-full border border-blue-500 overflow-hidden'>
          <Image
            src={session.user?.image || '/profile-circle-svgrepo-com.svg'}
            alt='Profile'
            width={40}
            height={40}
            className='rounded-full object-cover'
          />
        </button>
      ) : (
        <Link href={loginUrl}>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-full'>
            Login
          </button>
        </Link>
      )}
    </div>
  );
}

function DesktopNavLinks({
  pathname,
  indicatorPos,
  indicatorWidth,
}: {
  pathname: string;
  indicatorPos: number;
  indicatorWidth: number;
}) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
    { href: '/project', label: 'Project' },
  ];

  return (
    <div className='relative'>
      <ul className='flex space-x-4'>
        {links.map((link, index) => (
          <li key={index} id={`nav-link-${index}`}>
            <Link href={link.href}>
              <span
                className={`px-3 py-2 relative ${pathname === link.href ? 'text-blue-600 font-semibold' : 'text-gray-900 dark:text-gray-300'}`}
                style={{
                  marginBottom: '10px', // Tambahkan jarak untuk teks
                }}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div
        className='absolute bottom-[-2px] left-0 h-1 bg-blue-600 rounded transition-transform'
        style={{
          width: `${indicatorWidth}px`,
          transform: `translateX(${indicatorPos}px)`,
          transition: 'transform 0.3s ease',
        }}
      />
    </div>
  );
}

function MobileNavLinks({
  isNavOpen,
  setIsNavOpen,
  pathname,
  loginUrl,
  session,
}: {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
  pathname: string;
  loginUrl: string;
  session: Session | null;
}) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/docs', label: 'Docs' },
    { href: '/project', label: 'Project' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsNavOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 w-full bg-white dark:bg-black transition-transform ${isNavOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <ul className='flex flex-col p-4'>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>
                <span
                  className={`block px-4 py-2 ${pathname === link.href ? 'text-blue-600 font-semibold' : 'text-gray-900 dark:text-gray-300'}`}
                  onClick={() => setIsNavOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
          <li className='mt-4'>
            <UserMenu session={session} loginUrl={loginUrl} />
          </li>
        </ul>
      </div>
    </>
  );
}
