'use client';

import React from 'react';

interface NavToggleButtonProps {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
}

export default function NavToggleButton({ isNavOpen, setIsNavOpen }: NavToggleButtonProps) {
  return (
    <button
      className="md:hidden flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white"
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        {isNavOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        )}
      </svg>
    </button>
  );
}
