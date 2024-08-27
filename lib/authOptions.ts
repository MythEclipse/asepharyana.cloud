import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { loginWithGoogle } from '@/lib/prisma/service';

// Define the User type expected by NextAuth
interface User extends PrismaUser {
  role: NonNullable<PrismaUser['role']>; // Ensure role is non-nullable
}

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.password || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }

        // Cast to User type to ensure types align with the expected return type
        return {
          ...user,
          role: user.role ?? 'member' // Default role if missing
        } as User;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as User).role;
        token.fullName = user.fullname || user.name || '';
      }

      if (account?.provider === 'google' && user) {
        const data = {
          email: user.email!,
          fullName: user.name || '',
          emailVerified: true,
          role: 'member',
          type: 'google'
        };

        await loginWithGoogle(data, (result) => {
          if (result.status) {
            token.email = result.data.email;
            token.role = result.data.role;
            token.fullname = result.data.fullname;
          }
        });
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.fullname = token.fullname as string;
      }
      return session;
    }
  }
};

export { authOptions };
