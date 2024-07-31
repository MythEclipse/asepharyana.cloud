import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: string;
    type: string;
    fullName?: string | null;
    avatar?: string | null;
    bio?: string | null;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }

  interface JWT {
    email: string;
    fullName?: string;
    role: string;
  }
}
