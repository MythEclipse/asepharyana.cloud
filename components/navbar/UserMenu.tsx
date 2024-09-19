'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ButtonA from '@/components/ButtonA';

interface UserMenuProps {
  pathname: string;
}

export default function UserMenu({ pathname }: UserMenuProps) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const loginUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  return (
    <>
      {status === 'authenticated' ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div onClick={() => setIsOpen(!isOpen)}>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session?.user?.image ?? '/profile-circle-svgrepo-com.svg'} alt="profile" />
                <AvatarFallback>{session?.user?.name?.charAt(0) ?? 'G'}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <span className="block text-sm">{session?.user?.name ?? session?.user?.fullname ?? 'Guest'}</span>
                    <span className="block text-sm font-medium truncate">{session?.user?.email ?? 'Guest'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link scroll={true} href="/dashboard">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link scroll={true} href="/settings">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </motion.div>
            )}
          </AnimatePresence>
        </DropdownMenu>
      ) : (
        <Link scroll={true} href={loginUrl} className="mr-3">
          <ButtonA>Login</ButtonA>
        </Link>
      )}
    </>
  );
}
