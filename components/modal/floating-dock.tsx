'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn('fixed bottom-4 right-4 md:hidden z-50', className)}>
      <div
        className={`absolute bottom-full mb-2 inset-x-0 flex flex-col gap-4 z-50 transition-all duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {items.map((item, idx) => (
          <div
            key={item.title}
            className={`transition-transform duration-300 ease-in-out transform ${
              open ? 'translate-y-0' : 'translate-y-4'
            }`}
            style={{ transitionDelay: `${idx * 0.02}s` }}
          >
            <Link
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center text-center px-3 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out',
                {
                  'bg-blue-500 text-white': pathname === item.href,
                  'bg-white dark:bg-black text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50':
                    pathname !== item.href
                }
              )}
            >
              <div className="h-8 w-8">{item.icon}</div>
            </Link>
          </div>
        ))}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col items-center justify-center text-center px-3 py-2 text-blue-500 bg-transparent border-2 border-blue-500 rounded-full shadow-lg hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        <IconLayoutNavbarCollapse className="h-8 w-8 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex h-16 gap-6 items-end rounded-2xl bg-transparent px-4 pb-6 border border-transparent z-50',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}
    </div>
  );
};

function IconContainer({ title, icon, href }: { title: string; icon: React.ReactNode; href: string }) {
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const [scale, setScale] = useState(1);

  const handleMouseEnter = () => {
    setHovered(true);
    setScale(1.2);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setScale(1);
  };

  return (
    <Link href={href}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'aspect-square rounded-full flex items-center justify-center relative border transition-all duration-200',
          {
            'bg-blue-500': pathname === href,
            'bg-gray-200 dark:bg-neutral-800': pathname !== href
          }
        )}
        style={{ transform: `scale(${scale})` }}
      >
        {hovered && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 px-4 py-2 whitespace-pre rounded-md bg-white dark:bg-black dark:border-neutral-900 dark:text-white border border-gray-200 text-sm">
            {title}
          </div>
        )}
        <div className="h-14 w-14 text-blue-500 border border-blue-500 rounded-full shadow-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center">
          <div className="h-7 w-7">{icon}</div>
        </div>
      </div>
    </Link>
  );
}
