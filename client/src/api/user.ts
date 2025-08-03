/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiEndPoint } from '../constants/endpoint'
import { Api } from '../network'

import { IRegisterPayload, IRegisterResponse, IError } from './types'

export const createUser = async (
    payload: IRegisterPayload,
): Promise<IRegisterResponse> => {
    try {
        const response = await Api().post(apiEndPoint.CREATE_USER, payload)
        return response.data
    } catch (error: any) {
        if (error.response) throw error.response.data as IError
        console.log(error)
        throw new Error('Unexpected error occurred')
    }
}
