'use client'
import React, { useState, useEffect } from 'react'

export default function FeaturedListings() {
    const [items, setItems] = useState<
        Array<{
            id: number
            title: string
            startingBid: number
        }>
    >([])

    useEffect(() => {
        const generated: Array<{
            id: number
            title: string
            startingBid: number
        }> = Array.from({ length: 6 }).map((_, i) => ({
            id: i + 1,
            title: `Item #${i + 1}`,
            startingBid: Math.floor(20 + Math.random() * 80),
        }))
        setItems(generated)
    }, [])
    return (
        <section className="py-16 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-10">
                    Featured Listings
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="h-40 bg-gray-200" />
                            <div className="p-4">
                                <h4 className="text-xl font-semibold mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-3">
                                    Starting bid: ${item.startingBid}
                                </p>
                                <a
                                    href="#"
                                    className="text-indigo-600 font-medium hover:underline"
                                >
                                    View & Bid
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
