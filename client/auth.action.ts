'use server'

import { signIn as authSignIn, signOut as authSignOut } from './auth'
import { SigninPayload } from './api/types'

export const signInAction = async (data: SigninPayload) => {
    return authSignIn('credentials', {
        ...data,
        redirectTo: '/dashboard',
    })
}

export const signOutAction = async () => {
    await authSignOut()
}
