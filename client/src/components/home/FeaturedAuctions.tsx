import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'

export default function FeaturedAuctions() {
  // Mock Data with Real Images
  const featuredItems = [
    {
      id: 1,
      title: 'Vintage Polaroid Camera 1980',
      price: '$145.00',
      image:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      timeLeft: '12:45',
    },
    {
      id: 2,
      title: 'Sony WH-1000XM4 Headphones',
      price: '$280.00',
      image:
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
      timeLeft: '02:10',
    },
    {
      id: 3,
      title: 'Premium Laptop Pro 16"',
      price: '$1,450.00',
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
      timeLeft: '1d 4h',
    },
    {
      id: 4,
      title: 'Mechanical Gaming Keyboard',
      price: '$85.00',
      image:
        'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
      timeLeft: '5h 20m',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredItems.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
          {/* Image Container */}
          <div className="aspect-square relative bg-muted">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={item.id <= 2} // Load the first two images immediately
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay Badge */}
            <div className="absolute top-2 right-2 z-10">
              <Badge
                variant="destructive"
                className="flex items-center gap-1 bg-red-600/90 backdrop-blur-sm"
              >
                <Clock className="h-3 w-3" /> {item.timeLeft}
              </Badge>
            </div>
          </div>

          <CardHeader className="p-4 space-y-2">
            <CardTitle className="line-clamp-1 text-base font-semibold">
              {item.title}
            </CardTitle>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Current Bid</span>
              <span className="font-bold text-primary text-lg">
                {item.price}
              </span>
            </div>
          </CardHeader>

          <CardFooter className="p-4 pt-0">
            <Button className="w-full font-medium" size="sm">
              Place Bid
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
