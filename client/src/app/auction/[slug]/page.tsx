import Main from '@/components/template/main'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const auction = {
        title: 'Vintage Car Auction 2025',
        description:
            'A collection of rare vintage cars from the 1950s and 60s. Bid now to own a classic piece of history!',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
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
        <Main title={`Auction #${slug}`}>
            <div className="space-y-8">
                {/* Auction Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow">
                    <img
                        src={auction.image}
                        alt={auction.title}
                        className="w-full md:w-1/3 rounded-lg object-cover"
                    />
                    <div className="md:flex-1">
                        <h1 className="text-3xl font-bold mb-3">
                            {auction.title}
                        </h1>
                        <p className="text-gray-700">{auction.description}</p>
                    </div>
                </div>

                {/* Products List with Add Product button */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Products</h2>
                        <Link href={`/auction/product/add/${slug}`}>
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
        </Main>
    )
}
