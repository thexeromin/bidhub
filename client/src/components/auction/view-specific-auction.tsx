// TODO: handle error and loding state

'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getSpecificAuction } from '@/api'
import { IAuction, IError } from '@/api/types'
import { Button } from '@/components/ui/button'

interface Props {
    id: string
}

export default function ViewSpecificAuction({ id }: Props) {
    const { data: sessionData } = useSession()
    const { data, error, isLoading } = useQuery({
        queryKey: ['data', sessionData?.user.accessToken],
        queryFn: () => getSpecificAuction(id, sessionData!.user.accessToken),
        enabled: !!sessionData?.user.accessToken,
    })

    function isAuction(data: IAuction | IError | undefined): data is IAuction {
        return !!data && 'id' in data // or any property unique to IAuction
    }

    const products = [
        {
            id: 1,
            name: '1957 Chevrolet Bel Air',
            currentBid: 55000,
            image: 'https://images.unsplash.com/photo-1511391931914-690e1a8e10e3?auto=format&fit=crop&w=400&q=80',
        },
        {
            id: 2,
            name: '1965 Ford Mustang',
            currentBid: 42000,
            image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80',
        },
        {
            id: 3,
            name: '1969 Dodge Charger',
            currentBid: 61000,
            image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=80',
        },
    ]

    return (
        <>
            {isAuction(data) ? (
                <div className="space-y-8">
                    {/* Auction Header */}
                    <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow">
                        <img
                            src={data.photo || ''}
                            alt={data.title}
                            className="w-full md:w-1/3 rounded-lg object-cover"
                        />
                        <div className="md:flex-1">
                            <h1 className="text-3xl font-bold mb-3">
                                {data.title}
                            </h1>
                            <p className="text-gray-700">{data.description}</p>
                        </div>
                    </div>

                    {/* Products List with Add Product button */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Products</h2>
                            <Link href={`/auction/product/add/${id}`}>
                                <Button variant={'brand'}>+ Add Product</Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 text-gray-600">
                                            Current Bid: $
                                            {product.currentBid.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Auction not found</p>
            )}
        </>
    )
}
