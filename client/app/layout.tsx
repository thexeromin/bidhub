import type { Metadata } from 'next'
import { Providers, NextAuthProvider } from './providers'

export const metadata: Metadata = {
    title: 'Marketplace',
    description: 'a marketplace app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <NextAuthProvider>{children}</NextAuthProvider>
                </Providers>
            </body>
        </html>
    )
}
