/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiEndPoint } from '../constants/endpoint'
import { Api } from '../network'

import {
    IRegisterPayload,
    IRegisterResponse,
    IError,
    IBidsResponse,
} from './types'

export const signup = async (
    payload: IRegisterPayload,
): Promise<IRegisterResponse> => {
    try {
        const response = await Api().post(apiEndPoint.REGISTER, payload)
        return response.data
    } catch (error: any) {
        if (error.response) throw error.response.data as IError
        console.log(error)
        throw new Error('Unexpected error occurred')
    }
}

export const getBidHistory = async (token: string): Promise<IBidsResponse> => {
    try {
        const response = await Api().get(
            apiEndPoint.PRODUCT_COMMON + '/bid/recent_bids',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
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
