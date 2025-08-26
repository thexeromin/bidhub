/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMutation } from '@tanstack/react-query'
import { signup } from '@/api/user'
import { toast } from 'sonner'

export const signupUser = (onSuccessAction: () => void) => {
  return useMutation({
    mutationFn: signup,
    onError: (error: any) => {
      toast(`Oops ${error?.statusCode || ''}!`, {
        description: error?.message || 'Something went wrong.',
      })
    },
    onSuccess: () => {
      toast('Hurray!', {
        description: 'Your account has been created successfully! Login now.',
      })

      // Redirect to login
      onSuccessAction()
    },
  })
}
