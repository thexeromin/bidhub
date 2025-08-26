export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">What Users Say</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            'Amazing deals and smooth experience!',
            'Best auction platform I’ve used.',
            'I sold my vintage watch easily!',
            'Live bidding is super fun!',
          ].map((text, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 italic mb-4">"{text}"</p>
              <div className="text-sm font-semibold text-indigo-600">
                User #{i + 101}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
