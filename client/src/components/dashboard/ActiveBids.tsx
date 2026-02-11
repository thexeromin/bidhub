import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ExternalLink } from 'lucide-react'

export function ActiveBids() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Bids</CardTitle>
        <CardDescription>
          Live auctions you are currently participating in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Your Max Bid</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time Left</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mock Row 1: Winning */}
            <TableRow>
              <TableCell className="font-medium">
                Sony WH-1000XM4 Headphones
              </TableCell>
              <TableCell>$180.00</TableCell>
              <TableCell>$200.00</TableCell>
              <TableCell>
                <Badge className="bg-green-600 hover:bg-green-700">
                  Winning
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">2h 15m</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link href="/auctions/123">
                    View <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>

            {/* Mock Row 2: Outbid */}
            <TableRow>
              <TableCell className="font-medium">
                Vintage Canon AE-1 Camera
              </TableCell>
              <TableCell>$320.00</TableCell>
              <TableCell>$280.00</TableCell>
              <TableCell>
                <Badge variant="destructive">Outbid</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">45m</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="default" asChild>
                  <Link href="/auctions/456">Bid Again</Link>
                </Button>
              </TableCell>
            </TableRow>

            {/* Mock Row 3: Winning */}
            <TableRow>
              <TableCell className="font-medium">
                MacBook Pro M1 (Used)
              </TableCell>
              <TableCell>$850.00</TableCell>
              <TableCell>$900.00</TableCell>
              <TableCell>
                <Badge className="bg-green-600 hover:bg-green-700">
                  Winning
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">1d 4h</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link href="/auctions/789">
                    View <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
