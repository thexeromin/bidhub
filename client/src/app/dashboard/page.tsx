import Main from '@/components/template/main'
import UserInfo from '@/components/user/user-info'

export default function Page() {
  const auctionStats = [
    { title: 'Active Auctions', value: '42', change: '+5' },
    { title: 'Total Bids', value: '1,024', change: '+12' },
    { title: 'Items Won', value: '87', change: '+3' },
  ]

  return (
    <Main title="Dashboard">
      {/* User Profile */}
      <UserInfo />

      {/* Auction Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctionStats.map((stat) => (
          <div key={stat.title} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
            <span className="text-sm font-medium text-green-500">
              {stat.change} today
            </span>
          </div>
        ))}
      </section>

      {/* Live Auctions Table */}
    </Main>
  )
}
