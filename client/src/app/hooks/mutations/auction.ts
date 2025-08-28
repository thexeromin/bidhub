/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMutation } from '@tanstack/react-query'
import { addProduct, createAuction, bidProduct } from '@/api'
import { toast } from 'sonner'

export const useCreateAuction = (successMsg: string) => {
  return useMutation({
    mutationFn: createAuction,
    onError: (error: any) => {
      toast(`Oops ${error?.statusCode || ''}!`, {
        description: error?.message || 'Something went wrong.',
      })
    },
    onSuccess: () => {
      toast('Hurray!', {
        description: successMsg,
      })
    },
  })
}

export const useAddProduct = (successMsg: string) => {
  return useMutation({
    mutationFn: addProduct,
    onError: (error: any) => {
      toast(`Oops ${error?.statusCode || ''}!`, {
        description: error?.message || 'Something went wrong.',
      })
    },
    onSuccess: () => {
      toast('Hurray!', {
        description: successMsg,
      })
    },
  })
}

export const useBidOnProduct = (successMsg: string) => {
  return useMutation({
    mutationFn: bidProduct,
    onError: (error: any) => {
      toast(`Oops ${error?.statusCode || ''}!`, {
        description: error?.message || 'Something went wrong.',
      })
    },
    onSuccess: () => {
      toast('Congrats!', {
        description: successMsg,
      })
    },
  })
}
