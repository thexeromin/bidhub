/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMutation } from '@tanstack/react-query'
import { createUser } from '@/api/user'
import { toast } from 'sonner'

export const useCreateUser = (onSuccessAction: () => void) => {
    return useMutation({
        mutationFn: createUser,
        onError: (error: any) => {
            toast(`Oops ${error?.statusCode || ''}!`, {
                description: error?.message || 'Something went wrong.',
            })
        },
        onSuccess: () => {
            toast('Hurray!', {
                description:
                    'Your account has been created successfully! Login now.',
            })

            // Redirect to login
            onSuccessAction()
        },
    })
}
