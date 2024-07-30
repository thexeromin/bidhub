import NextAuth, { type User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signinAPI } from './api'
import { AdapterUser } from 'next-auth/adapters'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { type: 'text' },
                password: { type: 'text' },
            },
            authorize: async (credentials) => {
                let response = await signinAPI({
                    email: credentials?.email || '',
                    password: credentials?.password,
                })

                if (!response?.id) {
                    throw new Error('User not found.')
                }

                return response
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && user.profile) {
                // First login, save the `access_token`, `refresh_token`, and other
                // details into the JWT
                const userProfile: User = {
                    id: token.sub,
                    name: `${user.profile.firstName} ${user.profile.lastName}`,
                    email: user.email,
                    image: user.profile.avatarUrl,
                }

                return {
                    accessToken: user.token?.accessToken,
                    expires_at: token.exp || Math.floor(Date.now() / 1000) + 30,
                    refreshToken: user.token?.refreshToken,
                    user: userProfile,
                }
            } else if (Date.now() < token.expires_at * 1000) {
                // Subsequent logins, if the `access_token` is still valid, return the JWT
                return token
            } else {
                // Subsequent logins, if the `access_token` has expired, try to refresh it
                if (!token.refreshToken)
                    throw new Error('Missing refresh token')

                try {
                    // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
                    // at their `/.well-known/openid-configuration` endpoint.
                    // i.e. https://accounts.google.com/.well-known/openid-configuration
                    let headersList = {
                        Authorization: `Bearer ${token.refreshToken}`,
                    }
                    let response = await fetch(
                        `${process.env.API}/auth/refresh`,
                        {
                            method: 'POST',
                            headers: headersList,
                        },
                    )

                    let data = await response.json()
                    return {
                        // Keep the previous token properties
                        ...token,
                        access_token: data.accessToken,
                        expires_at: Math.floor(Date.now() / 1000) + 30,
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        refresh_token: data.refreshToken ?? token.refreshToken,
                    }
                } catch (error) {
                    console.error('Error refreshing access token', error)
                    // The error property can be used client-side to handle the refresh token error
                    return {
                        ...token,
                        error: 'RefreshAccessTokenError' as const,
                    }
                }
            }
        },
        session({ session, token }) {
            if (token.user) {
                session.user = token.user as User & AdapterUser
                session.accessToken = token.accessToken
            }
            return session
        },
    },
})

declare module 'next-auth' {
    interface User {
        profile?: {
            firstName: string
            lastName: string
            avatarUrl: string
        }
        token?: {
            accessToken: string
            refreshToken: string
        }
    }

    interface Session {
        accessToken?: string
        error?: 'RefreshAccessTokenError'
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        accessToken?: string
        expires_at: number
        refreshToken?: string
        error?: 'RefreshAccessTokenError'
    }
}
