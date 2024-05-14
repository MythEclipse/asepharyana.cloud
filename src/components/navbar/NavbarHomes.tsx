"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-full">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/ASEPHARYANA.png"
                  className="logo cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  alt="logo"
                  quality={100}
                  loading="eager"
                  width={100}
                  height={50}
                />
              </Link>
            </div>
            <button
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white sm:hidden"
              onClick={() => setIsOpen(!isOpen)}
              title="Toggle Menu"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className={`${isOpen ? "block" : "hidden"} sm:flex sm:items-center sm:justify-end sm:flex-1`}>
            <ul className="flex flex-col sm:flex-row md:space-x-4">
              <li>
                <Link href="/about">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium sm:px-0 sm:py-0">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium sm:px-0 sm:py-0">
                    Services
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium sm:px-0 sm:py-0">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;