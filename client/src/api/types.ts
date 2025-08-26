// Error response structure
export interface IError {
    message: string
    statusCode: number
}

/*
 * For register user api
 */
export interface IRegisterPayload {
    email: string
    phone: string
    password: string
}

// Success response structure
export interface IRegisterSuccess {
    id: string
    email: string
    createdAt: string
}

// Union type for the response
export type IRegisterResponse = IRegisterSuccess | IError

// Auction Create
export interface IAuction {
    id: string
    title: string
    description: string | null
    photo: string | null
    startDate: Date
    endDate: Date
}

export interface IBid {
    id: string
    amount: number
    increment_amount: number
    productId: string
    userId: string
    isWinner: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IProduct {
    id: string
    name: string
    description: string
    photo: string | null
    location: string
    sellerId: string
    startingBid: number | null
    currentBid: number | null
    status: 'Sold' | 'Unsold'
    auctionId: string
    createdAt: Date
    updatedAt: Date
}

export type IAuctionResponse = IAuction | IError
export type IAuctionsResponse = Array<IAuction> | IError
export type IBidsResponse = Array<IBid> | IError
export type IProductsResponse = Array<IProduct> | IError
