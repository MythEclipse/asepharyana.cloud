'use client';
import { motion } from 'framer-motion';
import { NavLink } from './NavLink';

export function NavLinks({
  isNavOpen,
  indicatorPos,
  indicatorWidth,
  pathname
}: {
  isNavOpen: boolean;
  indicatorPos: number;
  indicatorWidth: number;
  pathname: string;
}) {
  return (
    <div className={`${isNavOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`} id="navbar-user">
      <ul className="relative mt-2 flex flex-col rounded-lg border border-blue-500 bg-gray-50 p-2 font-medium dark:border-blue-500 dark:bg-black md:mt-0 md:flex-row md:space-x-4 md:border-0 md:bg-transparent rtl:space-x-reverse">
        <motion.div
          className="absolute top-0 left-0 h-10 rounded-full bg-blue-500 dark:bg-blue-700 border-2 border-transparent hidden md:block"
          initial={{ left: 0, width: 0 }}
          animate={{ left: indicatorPos, width: indicatorWidth }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ zIndex: 0 }}
        />
        <NavLink href="/" pathname={pathname} index={0} label="Home" />
        <NavLink href="/docs" pathname={pathname} index={1} label="Docs" />
        <NavLink href="/project" pathname={pathname} index={2} label="Project" />
      </ul>
    </div>
  );
}
