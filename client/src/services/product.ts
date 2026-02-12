import { apiClient } from '@/lib/api-client'
import { ProductInput } from '@/lib/validations/product'
import { Product } from '@/types/product'

export const productService = {
  async create(data: ProductInput, auctionId: string, photo: File) {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('location', data.location)
    formData.append('auctionId', auctionId)
    formData.append('photo', photo)

    // Axios handles the boundary automatically
    const response = await apiClient.post('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async getProductsByAuctionId(auctionId: string) {
    const response = await apiClient.get<Product[]>(
      `/auction/products/${auctionId}`,
    )
    return response.data
  },
}
