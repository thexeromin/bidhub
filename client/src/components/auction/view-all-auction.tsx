// TODO: add loading spinner & handle error

'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getLiveAuctions } from '@/api'

export default function ViewAllAuction() {
  const { data: sessionData } = useSession()
  const { data, error, isLoading } = useQuery({
    queryKey: ['data', sessionData?.user.accessToken],
    queryFn: () => getLiveAuctions(sessionData!.user.accessToken),
    enabled: !!sessionData?.user.accessToken,
  })

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {Array.isArray(data) &&
        data.map((auction, index) => (
          <div
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            key={auction.id}
          >
            {auction.photo ? (
              <img
                src={auction.photo}
                className="w-full h-40 bg-gray-200 object-cover"
              />
            ) : (
              <div className="h-40 bg-gray-200" />
            )}
            <div className="p-4">
              {/* Status Badge */}
              {(() => {
                const now = new Date()
                const start = new Date(auction.startDate)
                const end = new Date(auction.endDate)
                const isLive = now >= start && now <= end

                return (
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${
                      isLive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isLive ? 'Ongoing' : 'Ended'}
                  </span>
                )
              })()}

              <h4 className="text-xl font-semibold mb-2">{auction.title}</h4>
              <p className="text-sm text-gray-600 mb-3">
                {auction.description}
              </p>
              <Link
                href={`/auction/${auction.id}`}
                className="text-indigo-600 font-medium hover:underline"
              >
                View & Bid
              </Link>
            </div>
          </div>
        ))}
    </>
  )
}
