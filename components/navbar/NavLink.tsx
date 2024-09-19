'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function NavLink({
  href,
  pathname,
  index,
  label
}: {
  href: string;
  pathname: string;
  index: number;
  label: string;
}) {
  return (
    <motion.li
      id={`nav-link-${index}`}
      className="relative z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 + 0.1, duration: 0.4 }}
    >
      <Link scroll={true} href={href}>
        <span
          className={`block rounded-lg px-2 py-1 text-sm transition-colors duration-300 ${pathname === href ? 'font-semibold text-blue-500 md:text-white underline md:underline-none' : 'text-gray-900 dark:text-gray-100'}`}
        >
          {label}
        </span>
      </Link>
    </motion.li>
  );
}
