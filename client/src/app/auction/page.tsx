export default function Page() {
    return (
        <section className="py-16 bg-gray-100 h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-10">
                    Ongoing auctions
                </h3>
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
                            <a
                                href="#"
                                className="text-indigo-600 font-medium hover:underline"
                            >
                                View & Bid
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
