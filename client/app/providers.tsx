'use client'

import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme.ts'

export function Providers({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export function NextAuthProvider({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>
}
