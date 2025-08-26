import Categories from '@/components/homepage/categories'
import Cta from '@/components/homepage/cta'
import FeaturedListings from '@/components/homepage/featured-listings'
import Hero from '@/components/homepage/hero'
import HowItWorks from '@/components/homepage/how-it-works'
import Testimonials from '@/components/homepage/testimonials'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <Hero />
      <Categories />
      <FeaturedListings />
      <HowItWorks />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  )
}
