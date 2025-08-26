'use client'

import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

interface Props {
  session: Session | null
  children: React.ReactNode
}

const NextAuthProvider: React.FC<Props> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default NextAuthProvider
