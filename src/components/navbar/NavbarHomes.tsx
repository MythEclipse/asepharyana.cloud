"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "flowbite-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  return (
    <nav className="fixed top-0 z-10 w-full bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col items-center justify-between sm:flex-row">
          <div className="flex items-center py-3">
            <div
              className={`${
                pathname === "/"
                  ? "border border-gray-800 bg-primary-600"
                  : "bg-primary-600"
              } shrink-0 items-center justify-center rounded-md shadow-md hover:opacity-80`}
            >
              <Link href="/">
                <Image
                  src="/ASEPHARYANA.png"
                  className="cursor-pointer transition duration-300 ease-in-out hover:scale-110"
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
              } sm:flex sm:flex-1 sm:items-center sm:justify-end`}
            >
              <ul
                className={`flex flex-col items-center justify-center px-3 sm:flex-row md:space-x-4 ${
                  isOpen ? "hidden" : ""
                } `}
              >
                <li>
                  <Link href="/about">
                    <span
                      className={`${
                        pathname === "/about"
                          ? "text-primary-600"
                          : "text-gray-900 dark:text-gray-100"
                      } block rounded-md px-3 py-4 text-sm font-medium hover:bg-gray-700 hover:text-white sm:p-0`}
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
                          : "text-gray-900 dark:text-gray-100"
                      } block rounded-md px-3 py-4 text-sm font-medium hover:bg-gray-700 hover:text-white sm:p-0`}
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
                          : "text-gray-900 dark:text-gray-100"
                      } block rounded-md px-3 py-4 text-sm font-medium hover:bg-gray-700 hover:text-white sm:p-0`}
                    >
                      Contact
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <Button
              className="flex items-center rounded-md border border-primary-600 p-3 text-teal-200 hover:border-white hover:text-white sm:hidden"
              onClick={() => setIsOpen(!isOpen)}
              title="Toggle Menu"
            >
              <svg
                className="size-3 fill-current"
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
              isOpen ? "hidden" : "flex"
            } sm:flex sm:flex-1 sm:items-center sm:justify-end`}
          >
            <ul
              className={`flex-col items-center justify-center px-3 sm:flex-row md:space-x-4 ${
                isOpen ? "sm:hidden" : "flex"
              } `}
            >
              <li>
                <Link href="/about">
                  <span
                    className={`${
                      pathname === "/about"
                        ? "text-primary-600"
                        : "text-gray-900 dark:text-gray-100"
                    } block rounded-md px-3 py-4 text-sm font-medium hover:bg-gray-700 hover:text-white sm:p-0 md:hidden lg:hidden`}
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
                        : "text-gray-900 dark:text-gray-100"
                    } block rounded-md px-3 py-4 text-sm font-medium hover:bg-gray-700 hover:text-white sm:p-0 md:hidden lg:hidden`}
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
                        : "text-gray-900 dark:text-gray-100"
                    } block rounded-md px-3 py-4 text-sm font-medium hover:bg-gray-700 hover:text-white sm:p-0 md:hidden lg:hidden`}
                  >
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <h4 className="text-sm text-teal-500">
                  {session?.user?.email}
                </h4>
              </li>
              <li>
                {status === "authenticated" ? (
                  <div className="">
                    <Button color={"red"} onClick={() => signOut()}>
                      {/* <span className={`${pathname === "/login" ? "text-primary-600" : "text-gray-900 dark:text-gray-100"} block px-3 py-4 rounded-md text-sm font-medium sm:px-0 sm:py-0`}> */}
                      Logout
                      {/* </span> */}
                    </Button>
                  </div>
                ) : (
                  <Button color={"blue"} as={Link} href="/login">
                    {/* <span className={`${pathname === "/login" ? "text-primary-600" : "text-gray-900 dark:text-gray-100"} block px-3 py-4 rounded-md text-sm font-medium sm:px-0 sm:py-0`}> */}
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
