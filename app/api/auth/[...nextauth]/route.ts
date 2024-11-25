// import { PrismaClient, User as PrismaUser } from '@prisma/client';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { NextAuthOptions } from 'next-auth';
// import NextAuth from 'next-auth/next';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcrypt';
// import GoogleProvider from 'next-auth/providers/google';
// import { loginWithGoogle } from '@/lib/prisma/service';
// import { authOptions } from '@/lib/authOptions';

// // Define the User type expected by NextAuth
// interface User extends PrismaUser {
//   role: NonNullable<PrismaUser['role']>; // Ensure role is non-nullable
// }

// const prisma = new PrismaClient();

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
import { handlers } from '../../../../lib/auth'; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;
