export default function Categories() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-10">
                    Browse by Category
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {['Electronics', 'Antiques', 'Art', 'Collectibles'].map(
                        (cat, i) => (
                            <div
                                key={i}
                                className="bg-indigo-50 rounded-xl p-6 text-center hover:bg-indigo-100 transition"
                            >
                                <span className="block text-lg font-semibold">
                                    {cat}
                                </span>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    )
}
