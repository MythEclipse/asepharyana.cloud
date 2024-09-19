'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  pathname: string;
}

export default function Logo({ pathname }: LogoProps) {
  return (
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
  );
}
