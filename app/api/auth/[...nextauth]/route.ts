import { PrismaClient, User } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

const authOption: NextAuthOptions = {
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({ where: { email } });
        if (user?.password) {
          const passwordConfirm = await bcrypt.compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === 'credentials' && user) {
        token.email = user.email ?? ''; // Perbaikan di sini
        token.fullName = user.fullName ?? ''; // Perbaikan di sini
        token.role = user.role ?? ''; // Perbaikan di sini
      }
      if (account?.provider === 'google' && user) {
        const dbUser = await prisma.user.upsert({
          where: { email: user.email ?? '' }, // Perbaikan di sini
          update: {},
          create: {
            email: user.email ?? '',
            fullName: user.name ?? '',
            role: 'member',
            type: 'google',
            password: '' // or any default value as per your requirement
          }
        });
        token.email = dbUser.email ?? ''; // Perbaikan di sini
        token.fullName = dbUser.fullName ?? ''; // Perbaikan di sini
        token.role = dbUser.role ?? ''; // Perbaikan di sini
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email as string; // Perbaikan di sini
      session.user.role = token.role as string; // Perbaikan di sini
      session.user.fullName = token.fullName as string | undefined; // Perbaikan di sini
      return session;
    }
  }
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
