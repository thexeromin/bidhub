/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useMutation } from '@tanstack/react-query'
import { addProduct, createAuction } from '@/api'
import { toast } from 'sonner'

export const createAuctionCallBack = (successMsg: string) => {
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

export const addProductCallBack = (successMsg: string) => {
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
