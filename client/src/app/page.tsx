import Link from 'next/link'
import { ArrowRight, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Gavel } from 'lucide-react'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-muted/30 border-b">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            New Feature: Speed Bidding ⚡️
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Win Exclusive Items in <br className="hidden md:block" />
            <span className="text-primary">Real-Time Auctions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of bidders securing rare collectibles, tech, and art.
            Bids start at $1. No reserve.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/auctions">
              <Button size="lg" className="h-12 px-8">
                Start Bidding
              </Button>
            </Link>
            <Link href="/auction/create">
              <Button size="lg" variant="outline" className="h-12 px-8">
                List an Item
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Auctions Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Live Auctions</h2>
          <Link
            href="/auctions"
            className="text-primary font-medium hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* MOCK DATA: We will replace this with your API data later */}
          {[1, 2, 3, 4].map((item) => (
            <Card
              key={item}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-muted relative">
                {/* Placeholder for Product Image */}
                <div className="absolute top-2 right-2">
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" /> 12:45
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1 text-lg">
                  Vintage Polaroid Camera 1980
                </CardTitle>
                <div className="text-sm text-muted-foreground flex justify-between mt-2">
                  <span>Current Bid</span>
                  <span className="font-bold text-foreground">$145.00</span>
                </div>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Place Bid</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="container mx-auto px-4 py-12 bg-primary/5 rounded-2xl">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Instant Bidding</h3>
            <p className="text-sm text-muted-foreground">
              Real-time updates via WebSockets. No refreshing needed.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Gavel className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">
              Funds are held in escrow until the product is delivered.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Anti-Snipe Protection</h3>
            <p className="text-sm text-muted-foreground">
              Auctions extend by 30s if a bid is placed in the last minute.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
