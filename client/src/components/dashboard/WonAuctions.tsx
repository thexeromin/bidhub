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
import { CheckCircle2, CreditCard } from 'lucide-react'

export function WonAuctions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Won Auctions</CardTitle>
        <CardDescription>
          Congratulations! Here are the items you have won.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Winning Bid</TableHead>
              <TableHead>Date Won</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mock Row 1: Unpaid */}
            <TableRow>
              <TableCell className="font-medium">
                Herman Miller Aeron Chair
              </TableCell>
              <TableCell>$450.00</TableCell>
              <TableCell>Oct 24, 2023</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="border-yellow-500 text-yellow-600"
                >
                  Pending
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <CreditCard className="mr-2 h-3 w-3" /> Pay Now
                </Button>
              </TableCell>
            </TableRow>

            {/* Mock Row 2: Paid & Delivered */}
            <TableRow>
              <TableCell className="font-medium">
                Nintendo Switch OLED
              </TableCell>
              <TableCell>$280.00</TableCell>
              <TableCell>Oct 10, 2023</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 hover:bg-green-100"
                >
                  Paid
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" disabled>
                  <CheckCircle2 className="mr-2 h-3 w-3" /> Completed
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
