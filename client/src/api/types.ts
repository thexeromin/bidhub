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
    status: 'Ongoing' | 'Ended'
    description: string | null
    photo: string | null
    startDate: Date
    endDate: Date
}

export type IAuctionResponse = IAuction | IError
export type IAuctionsResponse = Array<IAuction> | IError
