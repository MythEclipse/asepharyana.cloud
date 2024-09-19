'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarLinksProps {
  isNavOpen: boolean;
  pathname: string;
}

export default function NavbarLinks({ isNavOpen, pathname }: NavbarLinksProps) {
  const navItems = [
    { href: '/docs', label: 'Docs' },
    { href: '/project', label: 'Project' }
  ];

  return (
    <div className={`${isNavOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`} id="navbar-user">
      <ul
        className={`mt-4 flex flex-col rounded-lg border border-blue-500 bg-gray-50 p-4 font-medium dark:border-blue-500 dark:bg-darka md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent rtl:space-x-reverse transition-all duration-300 ease-in-out transform ${
          isNavOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
        } md:transform-none md:opacity-100`}
      >
        {navItems.map((item) => (
          <li key={item.href}>
            <Link scroll={true} href={item.href}>
              <motion.span
                initial={{ color: 'gray' }}
                animate={{
                  color: pathname === item.href ? '#1D4ED8' : 'gray',
                  transition: { duration: 0.3, ease: 'easeInOut' }
                }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className={`${
                  pathname === item.href ? 'font-semibold' : 'text-gray-900 dark:text-gray-100'
                } block rounded px-3 py-2 transition-colors duration-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="h-0.5 bg-blue-600 rounded-full"
                    style={{ marginTop: '2px' }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                )}
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
