'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import { AnimatePresence, MotionValue, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export const FloatingDock = ({ items, desktopClassName, mobileClassName }: { items: { title: string; icon: React.ReactNode; href: string }[]; desktopClassName?: string; mobileClassName?: string; }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }: { items: { title: string; icon: React.ReactNode; href: string }[]; className?: string; }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn('fixed bottom-4 right-4 md:hidden z-50', className)}>
      <AnimatePresence>
        {open && (
          <motion.div layoutId="nav" className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2 z-50">
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.02 } }}
                transition={{ delay: (items.length - 1 - idx) * 0.02 }}
              >
                <Link href={item.href} className={cn("flex flex-col items-center justify-center text-center px-6 py-3 rounded-full shadow-lg", {
                  'bg-blue-500 text-white': pathname === item.href,
                  'bg-white dark:bg-black text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50': pathname !== item.href,
                })}>
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} className="flex flex-col items-center justify-center text-center px-6 py-3 text-blue-500 bg-transparent border border-blue-500 rounded-full shadow-lg hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }: { items: { title: string; icon: React.ReactNode; href: string }[]; className?: string; }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div onMouseMove={(e) => mouseX.set(e.pageX)} onMouseLeave={() => mouseX.set(Infinity)} className={cn('fixed bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex h-16 gap-4 items-end rounded-2xl bg-white dark:bg-black px-4 pb-3 border border-gray-200 dark:border-neutral-900 z-50', className)}>
      {items.map((item) => (
        <IconContainer key={item.title} {...item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }: { mouseX: MotionValue; title: string; icon: React.ReactNode; href: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn("aspect-square rounded-full flex items-center justify-center relative border z-50", {
          'bg-blue-500': pathname === href,
          'bg-gray-200 dark:bg-neutral-800': pathname !== href,
        })}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs z-50"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center z-50">
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
