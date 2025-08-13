import { apiEndPoint } from '../constants/endpoint'
import { Api } from '../network'

import { IAuctionCreateResponse, IAuctionsResponse, IError } from './types'

export const createAuction = async (data: {
    token: string
    payload: FormData
}): Promise<IAuctionCreateResponse> => {
    try {
        const response = await Api().post(
            apiEndPoint.CREATE_AUCTION,
            data.payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${data.token}`,
                },
            },
        )
        return response.data
    } catch (error: any) {
        if (error.response) throw error.response.data as IError
        console.log(error)
        throw new Error('Unexpected error occurred')
    }
}

export const getLiveAuctions = async (
    token: string,
): Promise<IAuctionsResponse> => {
    try {
        const response = await Api().get(apiEndPoint.VIEW_ALL_AUCTION, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error: any) {
        if (error.response) throw error.response.data as IError
        console.log(error)
        throw new Error('Unexpected error occurred')
    }
}
