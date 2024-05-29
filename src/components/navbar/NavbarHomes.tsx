"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "flowbite-react";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  return (
    <nav className="bg-white dark:bg-gray-800 fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-full">
          <div className="flex items-center pt-3 ">
            <div
              className={`${
                pathname === "/"
                  ? "border border-gray-800 bg-primary-600 "
                  : "bg-primary-600"
              } flex-shrink-0   hover:opacity-80 rounded-md shadow-md`}
            >
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
            <div
            className={`${
              isOpen ? "block" : "hidden"
            } sm:flex sm:items-center sm:justify-end sm:flex-1`}
          >
            <ul className="flex flex-col sm:flex-row md:space-x-4 px-3">
            <li>
                <Link href="/about">
                  <span
                    className={`${
                      pathname === "/about"
                        ? "text-primary-600"
                        : "text-gray-900"
                    } hover:bg-gray-700 hover:text-white block px-3 py-4 rounded-md text-sm font-medium sm:px-0 sm:py-0`}
                  >
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span
                    className={`${
                      pathname === "/services"
                        ? "text-primary-600"
                        : "text-gray-900"
                    } hover:bg-gray-700 hover:text-white block px-3 py-4 rounded-md text-sm font-medium sm:px-0 sm:py-0`}
                  >
                    Services
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span
                    className={`${
                      pathname === "/contact"
                        ? "text-primary-600"
                        : "text-gray-900"
                    } hover:bg-gray-700 hover:text-white block px-3 py-4 rounded-md text-sm font-medium sm:px-0 sm:py-0`}
                  >
                    Contact
                  </span>
                </Link>
              </li>
              
            </ul>

          </div>
            <Button
              className="flex items-center px-3 py-3 border rounded-md text-teal-200 border-primary-600 hover:text-white hover:border-white sm:hidden"
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
            </Button>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } sm:flex sm:items-center sm:justify-end sm:flex-1`}
          >
            <ul className="flex flex-col sm:flex-row md:space-x-4">
            <li>
              <h4 className="text-teal-500 text-sm">{session?.user?.email}</h4>
              </li>
              <li>
                {status === "authenticated" ? (
                  <div className="">
                    
                    <Button color={"red"} onClick={() => signOut()}>
                      {/* <span className={`${pathname === "/login" ? "text-primary-600" : "text-gray-900"} block px-3 py-4 rounded-md text-sm font-medium sm:px-0 sm:py-0`}> */}
                      Logout
                      {/* </span> */}
                    </Button>
                  </div>
                ) : (
                  <Button color={"blue"} as={Link} href="/login">
                    {/* <span className={`${pathname === "/login" ? "text-primary-600" : "text-gray-900"} block px-3 py-4 rounded-md text-sm font-medium sm:px-0 sm:py-0`}> */}
                    Login
                    {/* </span> */}
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
