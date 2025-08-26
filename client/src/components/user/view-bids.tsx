'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { getBidHistory } from '@/api'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function ViewBids() {
  const { data: sessionData } = useSession()
  const { data, error, isLoading } = useQuery({
    queryKey: ['data', sessionData?.user.accessToken],
    queryFn: () => getBidHistory(sessionData!.user.accessToken),
    enabled: !!sessionData?.user.accessToken,
  })

  return (
    <>
      {isLoading && <p>Loading...</p>}

      <Table className="bg-white">
        <TableCaption>A list of your bids.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Amount</TableHead>
            <TableHead>Product Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) &&
            data.map((bid, index) => (
              <TableRow key={bid.id}>
                <TableCell className="font-medium">{bid.amount}</TableCell>
                <TableCell>{bid.productId}</TableCell>
                <TableCell>{bid.isWinner ? 'You won' : '-'}</TableCell>
                <TableCell className="text-right">
                  {bid.createdAt?.toString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}
