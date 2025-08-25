// TODO: add loading spinner & handle error

'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getProductsForAuction } from '@/api'
import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '../ui/button'
import { bidCallBack } from '@/app/hooks/mutations'

interface Props {
    id: string
}

export default function ViewAllProducts({ id }: Props) {
    const { data: sessionData } = useSession()
    const { data, error, isLoading } = useQuery({
        queryKey: ['products', sessionData?.user.accessToken],
        queryFn: () => getProductsForAuction(id, sessionData!.user.accessToken),
        enabled: !!sessionData?.user.accessToken,
    })
    const mutation = bidCallBack('Bidded')

    return (
        <>
            {isLoading && <p>Loading...</p>}

            {Array.isArray(data) && data.length == 0 && (
                <Alert>
                    <AlertCircleIcon />
                    <AlertTitle>Info</AlertTitle>
                    <AlertDescription>
                        No products found for this auction...
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.isArray(data) &&
                    data.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <img
                                src={product.photo || ''}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">
                                    {product.name}
                                </h3>
                                <p className="mt-1 text-gray-600">
                                    Current Bid: ${product.currentBid}
                                </p>

                                {/* Bid Button */}
                                <Button
                                    onClick={() =>
                                        mutation.mutate({
                                            id: product.id,
                                            token: sessionData!.user
                                                .accessToken,
                                        })
                                    }
                                    className="mt-3 w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending
                                        ? 'Please wait...'
                                        : 'Place Bid'}
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}
