import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentails',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email' },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'password',
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Invalid credentails')
                }
                try {
                    // Call login api here
                    const res = await fetch(
                        process.env.NEXT_PUBLIC_API + '/auth/local/signin',
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        },
                    )

                    if (!res.ok) {
                        return null // Authentication failed
                    }

                    const data = await res.json()
                    console.log(data)
                    return {
                        id: data.id,
                        email: data.email,
                        role: 'user',
                        accessToken: data.token.accessToken,
                    }
                } catch (error) {
                    console.error('Auth Error', error)
                    throw error
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.email = user.email
                token.accessToken = user.accessToken
                token.name = user.name
            }

            return token
        },
        async session({ session, token }) {
            session.user.id = token.id as string
            session.user.role = token.role as string
            session.user.email = token.email as string
            session.user.name = token.name as string
            session.user.accessToken = token.accessToken as string

            return session
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}
