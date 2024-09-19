'use client';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import DropdownMenu from '@/components/navbar/DropdownMenu';
import DropdownMenuTrigger from '@/components/navbar/DropdownMenuTrigger';
import DropdownMenuContent from '@/components/navbar/DropdownMenuContent';
import DropdownMenuItem from '@/components/navbar/DropdownMenuItem';
import ButtonA from '@/components/ButtonA';

export function UserMenu({ status, session, loginUrl }: { status: string; session: any; loginUrl: string; }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative flex items-center space-x-2 md:order-2 rtl:space-x-reverse">
      {status === 'authenticated' ? (
        <DropdownMenu>
          <DropdownMenuTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="relative cursor-pointer w-8 h-8">
              <Image
                src={session?.user?.image ?? '/profile-circle-svgrepo-com.svg'}
                alt="profile"
                className="rounded-full"
                width={32}
                height={32} />
              <span className="sr-only">Open menu</span>
            </div>
          </DropdownMenuTrigger>
          {isDropdownOpen && (
            <DropdownMenuContent>
              <DropdownMenuItem>
                <span className="block text-xs">{session?.user?.name ?? session?.user?.fullname ?? 'Guest'}</span>
                <span className="block text-xs font-medium truncate">{session?.user?.email ?? 'Guest'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard" scroll={true}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" scroll={true}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()} className="text-red-600">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      ) : (
        <Link href={loginUrl} className="mr-2">
          <ButtonA>Login</ButtonA>
        </Link>
      )}
    </div>
  );
}
