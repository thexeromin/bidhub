export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            ['Create Account', 'Sign up and get started in seconds.'],
            ['List or Browse', 'Post your items or explore live listings.'],
            ['Place Bids', 'Bid in real-time and win auctions.'],
          ].map(([title, desc], i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-600 text-white flex items-center justify-center rounded-full text-2xl font-bold">
                {i + 1}
              </div>
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
