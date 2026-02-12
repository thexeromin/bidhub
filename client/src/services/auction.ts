import { apiClient } from '@/lib/api-client'
import { AuctionInput } from '@/lib/validations/auction'
import { Auction } from '@/types/auction'

export const auctionService = {
  /**
   * Endpoint: POST /auction
   * Content-Type: multipart/form-data
   */
  async create(data: AuctionInput, photo: File) {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('description', data.description)

    formData.append('photo', photo)

    const response = await apiClient.post('/auction', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },

  async getAll() {
    const response = await apiClient.get<Auction[]>('/auction')
    return response.data
  },
  // async getById(id: string) { ... }
}
