export interface Bid {
    id: string
    amount: number
    increment_amount: number
    productId: string
    userId: string
    isWinner: boolean
    createdAt: string
    updatedAt: string
}