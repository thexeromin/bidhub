import { apiEndPoint } from '../constants/endpoint'
import { Api } from '../network'

import { IAuctionPayload, IRegisterResponse, IError } from './types'

export const createAuction = async (
    payload: IAuctionPayload,
): Promise<IRegisterResponse> => {
    try {
        const response = await Api().post(apiEndPoint.CREATE_AUCTION, payload)
        return response.data
    } catch (error: any) {
        if (error.response) throw error.response.data as IError
        console.log(error)
        throw new Error('Unexpected error occurred')
    }
}
