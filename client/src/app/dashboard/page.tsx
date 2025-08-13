import Main from '@/components/template/main'

export default function Page() {
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/100',
        memberSince: 'Jan 2023',
        totalBids: 34,
        wonItems: 5,
    }

    const auctionStats = [
        { title: 'Active Auctions', value: '42', change: '+5' },
        { title: 'Total Bids', value: '1,024', change: '+12' },
        { title: 'Items Won', value: '87', change: '+3' },
    ]

    return (
        <Main title="Dashboard">
            {/* User Profile */}
            <section className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
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
                            <p className="text-xl font-semibold">
                                {user.wonItems}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Auction Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctionStats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white p-4 rounded-lg shadow"
                    >
                        <h3 className="text-gray-500 text-sm font-medium">
                            {stat.title}
                        </h3>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <span className="text-sm font-medium text-green-500">
                            {stat.change} today
                        </span>
                    </div>
                ))}
            </section>

            {/* Live Auctions Table */}
            <section className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2">Item</th>
                            <th className="px-4 py-2">Current Bid</th>
                            <th className="px-4 py-2">Time Left</th>
                            <th className="px-4 py-2">Bidders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">
                                    Antique Vase #{i + 1}
                                </td>
                                <td className="px-4 py-2">
                                    ${(200 + i * 50).toLocaleString()}
                                </td>
                                <td className="px-4 py-2">
                                    {2 + i}h {15 - i}m
                                </td>
                                <td className="px-4 py-2">{5 + i}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </Main>
    )
}
