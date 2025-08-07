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

// Create auction
export interface IAuctionPayload {
    title: string
    description: string
    photo: FormData
}
