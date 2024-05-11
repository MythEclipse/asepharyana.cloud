import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/ASEPHARYANA.svg"
                  className="logo"
                  alt="logo"
                  quality={100}
                  loading = 'eager'
                  width={112}
                  height={57}
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/about">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </span>
                </Link>
                <Link href="/services">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Services
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Contact
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
 
  );
};



export default Navbar;
