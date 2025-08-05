export type Tokens = {
    accessToken: string
    refreshToken: string
}

export type User = {
    id: string
    email: string
    phone: string
    token: Tokens
    createdAt: Date
}
