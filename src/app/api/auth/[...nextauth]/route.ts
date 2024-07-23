import { login, loginWithGoogle } from '@/app/lib/firebase/service';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';

const authOption: NextAuthOptions = {
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await login({ email, password });
        if (user) {
          const passwordConfirm = await bcrypt.compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === 'credentials') {
        token.email = user.email;
        token.fullName = user.fullName;
        token.role = user.role;
      }
      if (account?.provider === 'google') {
        const data = {
          email: user.email,
          fullName: user.name,
          role: 'member',
          type: 'google'
        };
        await loginWithGoogle(data, (result: { status: boolean; data: any }) => {
          if (result.status) {
            token.email = result.data.email;
            token.fullName = result.data.fullName;
            token.role = result.data.role;
          }
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      if ('fullName' in token) {
        session.user.fullName = token.fullName;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
