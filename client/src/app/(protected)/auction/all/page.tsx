'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Loader2, Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { auctionService } from '@/services/auction'
import { Auction } from '@/types/auction'

export default function AuctionsListPage() {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await auctionService.getAll()
        setAuctions(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load auctions. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuctions()
  }, [])

  // Helper to format dates (e.g., "Feb 12, 2024")
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // 2. Error State
  if (error) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4"
          variant="outline"
        >
          Retry
        </Button>
      </div>
    )
  }

  // 3. Main Content
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse Auctions</h1>
        <p className="text-muted-foreground">
          Discover our weekly curated events. Join an ongoing auction or preview
          upcoming ones.
        </p>
      </div>

      {auctions.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
          <Clock className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No auctions available</h3>
          <p className="text-muted-foreground">
            Please check back later for new events.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {auctions.map((auction) => (
            <Card
              key={auction.id}
              className="overflow-hidden flex flex-col group hover:shadow-lg transition-shadow"
            >
              {/* Image Section */}
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={
                    auction.photo ||
                    'https://images.unsplash.com/photo-1550948537-130a1ce83314?auto=format&fit=crop&q=80'
                  } // Fallback image
                  alt={auction.title}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    !auction.photo ? 'opacity-50 grayscale' : ''
                  }`}
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      auction.status === 'Ongoing' ? 'default' : 'secondary'
                    }
                    className={
                      auction.status === 'Ongoing'
                        ? 'bg-green-600 hover:bg-green-700'
                        : ''
                    }
                  >
                    {auction.status}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-1 text-xl">
                  {auction.title}
                </CardTitle>
                <div className="flex items-center text-xs text-muted-foreground mt-2 space-x-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {formatDate(auction.startDate)} -{' '}
                    {formatDate(auction.endDate)}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {auction.description ||
                    'No description provided for this event.'}
                </p>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button
                  asChild
                  className="w-full"
                  disabled={auction.status === 'Ended'}
                >
                  <Link href={`/auctions/${auction.id}`}>
                    {auction.status === 'Ended' ? (
                      'Auction Ended'
                    ) : (
                      <>
                        View Items <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
