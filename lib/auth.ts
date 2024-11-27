import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    authorized: async ({ auth, request }) => {
      if (auth) {
        return true;
      } else {
        const pathname = request.nextUrl.pathname;
        const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || encodeURIComponent(pathname);
        request.nextUrl.pathname = `/login`;
        request.nextUrl.searchParams.set('callbackUrl', callbackUrl);
        return false;
      }
    }
  }
});
