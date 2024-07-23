import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    fullName?: string
  }

  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }
}
