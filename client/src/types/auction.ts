export type AuctionStatus = 'Ongoing' | 'Ended'

export interface Auction {
  id: string
  title: string
  status: AuctionStatus
  description: string | null
  photo: string | null
  startDate: string // JSON dates come as ISO strings
  endDate: string // JSON dates come as ISO strings
}
