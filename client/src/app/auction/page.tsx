import Main from '@/components/template/main'
import Link from 'next/link'

export default function Page() {
    return (
        <Main title="Ongoing auctions">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
                    <div className="h-40 bg-gray-200" />
                    <div className="p-4">
                        <h4 className="text-xl font-semibold mb-2">
                            Chair action
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            Starting bid: $50
                        </p>
                        <Link
                            href="/auction/1234"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            View & Bid
                        </Link>
                    </div>
                </div>
            </div>
        </Main>
    )
}
