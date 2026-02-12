'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Gavel, Plus, Loader2, PackageOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { productService } from '@/services/product'
import { Product } from '@/types/product'

export default function AuctionDetailsPage() {
  const params = useParams()
  const auctionId = params.auctionId as string

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProductsByAuctionId(auctionId)
        setProducts(data)
      } catch (error) {
        console.error('Failed to load products', error)
      } finally {
        setIsLoading(false)
      }
    }
    if (auctionId) loadProducts()
  }, [auctionId])

  // Helper to display price
  const getDisplayPrice = (product: Product) => {
    if (product.currentBid) return `$${product.currentBid.toLocaleString()}`
    if (product.startingBid) return `$${product.startingBid.toLocaleString()}`
    return 'No Price Set'
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Auction Items</h1>
          <p className="text-muted-foreground">
            Browse items listed in this event.
          </p>
        </div>

        {/* 👇 Link to the Sell Page */}
        <Link href={`/auction/${auctionId}/sell`}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> List an Item
          </Button>
        </Link>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-xl border border-dashed">
          <div className="bg-background p-4 rounded-full mb-4">
            <PackageOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium">No items listed yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to list an item in this auction!
          </p>
          <Link href={`/auction/${auctionId}/sell`}>
            <Button variant="outline">List Item Now</Button>
          </Link>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden group hover:shadow-lg transition-all"
            >
              {/* Product Image */}
              <div className="aspect-square relative bg-muted">
                <Image
                  src={product.photo}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      product.status === 'Sold' ? 'secondary' : 'default'
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
              </div>

              {/* Details */}
              <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-lg">
                  {product.name}
                </CardTitle>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="mr-1 h-3 w-3" />
                  {product.location}
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {product.currentBid ? 'Current Bid' : 'Starting Bid'}
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {getDisplayPrice(product)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full" disabled={product.status === 'Sold'}>
                  <Gavel className="mr-2 h-4 w-4" />
                  {product.status === 'Sold' ? 'Sold Out' : 'Place Bid'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
