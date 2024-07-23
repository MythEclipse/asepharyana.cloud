import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    fullName?: string
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }
}
