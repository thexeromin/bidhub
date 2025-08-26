import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role: string
      id: string
      accessToken: string
    } & DefaultSession['user']
  }

  interface User {
    role: string
    accessToken: string
  }
}
