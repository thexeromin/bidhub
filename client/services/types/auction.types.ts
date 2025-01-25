
export interface ErrorRes {
    message: string
    error: string
    statusCode: string
}

export interface Auction {
    id: string
    title: string
    status: string
    photo: string
    description: string
    startDate: string
    endDate: string
}

export interface WinnerType {
    id: string
    profile: {
        firstName: string
        lastName: string
        address: string
        avatarUrl: string
    }
    email: string
}

export interface Product {
    id: string
    name: string
    description: string
    photo: string
    location: string
    sellerId: string
    startingBid: number
    currentBid: number
    status: string
    auctionId: string
    createdAt: string
    updatedAt: string
}
