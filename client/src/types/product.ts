export type ProductStatus = 'Sold' | 'Unsold'

export interface Product {
  id: string
  name: string
  description: string
  photo: string
  location: string
  status: ProductStatus
  startingBid: number | null
  currentBid: number | null
  sellerId: string
  auctionId: string
  createdAt: string // ISO Date string
  updatedAt: string
}
