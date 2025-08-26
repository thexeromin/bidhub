'use client'

import { useSession } from 'next-auth/react'

export default function UserInfo() {
    const { data } = useSession()
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/100?img=',
        memberSince: '2025',
        totalBids: '-',
        wonItems: '-',
    }
    console.log({ data })

    return (
        <section className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
            <img
                src={user.avatar + data!.user.id[0]}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border border-gray-300"
            />
            <div>
                <h2 className="text-2xl font-bold">{data!.user.id}</h2>
                <p className="text-gray-600">{data!.user.email}</p>
                <p className="mt-2 text-sm text-gray-500">
                    Member since {user.memberSince}
                </p>
                <div className="mt-4 flex gap-6">
                    <div>
                        <p className="text-gray-500 text-sm">Total Bids</p>
                        <p className="text-xl font-semibold">
                            {user.totalBids}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Items Won</p>
                        <p className="text-xl font-semibold">{user.wonItems}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
