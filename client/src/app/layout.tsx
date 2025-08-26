import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { getServerSession } from 'next-auth'
import QueryProvider from '@/app/providers/QueryProvider'
import NextAuthProvider from '@/app/providers/NextAuthProvider'
import { authOptions } from '@/lib/auth'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bidhub',
  description: 'An auction marketplace',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <NextAuthProvider session={session}>{children}</NextAuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
