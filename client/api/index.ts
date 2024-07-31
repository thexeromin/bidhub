import axios, { AxiosResponse } from 'axios'

import { API } from '../utils/'
import {
    ErrorRes
} from './types'

export async function handleGetReqWithToken<T>(url: string, token: string) {
    try {
        const res = await axios.get<any, AxiosResponse<T>>(
            `${API}/${url}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error((error.response?.data as ErrorRes).message)
        }
    }
}

export * from './auth'
