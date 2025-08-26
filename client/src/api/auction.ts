import { apiEndPoint } from '../constants/endpoint'
import { Api } from '../network'

import {
  IAuctionResponse,
  IAuctionsResponse,
  IError,
  IProductsResponse,
} from './types'

export const createAuction = async (data: {
  token: string
  payload: FormData
}): Promise<IAuctionResponse> => {
  try {
    const response = await Api().post(
      apiEndPoint.AUCTION_COMMON,
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
    const response = await Api().get(apiEndPoint.AUCTION_COMMON, {
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

export const getSpecificAuction = async (
  id: string,
  token: string,
): Promise<IAuctionResponse> => {
  try {
    const response = await Api().get(apiEndPoint.AUCTION_COMMON + `/${id}`, {
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

export const getProductsForAuction = async (
  id: string,
  token: string,
): Promise<IProductsResponse> => {
  try {
    const response = await Api().get(
      apiEndPoint.AUCTION_COMMON + `/products/${id}`,
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

export const addProduct = async (data: {
  token: string
  payload: FormData
}): Promise<IAuctionResponse> => {
  try {
    const response = await Api().post(
      apiEndPoint.PRODUCT_COMMON,
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

export const bidProduct = async (data: {
  id: string
  token: string
}): Promise<IAuctionResponse> => {
  try {
    const response = await Api().post(
      apiEndPoint.PRODUCT_COMMON + `/bid/${data.id}`,
      {},
      {
        headers: {
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
