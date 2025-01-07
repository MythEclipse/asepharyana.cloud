'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';

interface UserMenuProps {
  session: Session | null;
  loginUrl: string;
}

export default function UserMenu({ session, loginUrl }: UserMenuProps) {
  return (
    <div className="relative">
      {session ? (
        <button className="w-10 h-10 rounded-full border border-blue-500 overflow-hidden">
          <Image
            src={session.user?.image || '/profile-circle-svgrepo-com.svg'}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </button>
      ) : (
        <Link href={loginUrl}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full">Login</button>
        </Link>
      )}
    </div>
  );
}
