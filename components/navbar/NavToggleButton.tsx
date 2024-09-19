'use client';
import { motion } from 'framer-motion';

export function NavToggleButton({
  isNavOpen,
  setIsNavOpen
}: {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: boolean) => void;
}) {
  return (
    <button
      data-collapse-toggle="navbar-user"
      type="button"
      className="relative flex flex-col items-center justify-center text-center px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 md:hidden"
      aria-controls="navbar-user"
      aria-expanded={isNavOpen}
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <span className="sr-only">Open main menu</span>
      <motion.svg
        className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isNavOpen ? 'rotate-45' : 'rotate-0'}`}
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
      </motion.svg>
    </button>
  );
}
