import Base from '@/components/Base'
import Feature from '@/components/Feature'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'

export default function Home() {
    return (
        <>
            <Base>
                <main>
                    <Hero />
                </main>

                <Feature />
            </Base>
            <Footer />
        </>
    )
}
