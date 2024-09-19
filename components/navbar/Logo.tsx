'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Logo() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      scroll={true}
      className="relative flex items-center space-x-2 rtl:space-x-reverse cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <Image src="/Logo.svg" alt="Logo" quality={100} loading="eager" width={50} height={40} priority />
      <span
        className={`text-sm transition-colors duration-300 ${pathname === '/' ? 'font-semibold text-blue-600' : 'text-gray-900 dark:text-gray-100'}`}
      >
        Asep Haryana
      </span>
    </Link>
  );
}
