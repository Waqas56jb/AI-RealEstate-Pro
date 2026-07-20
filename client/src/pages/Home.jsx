import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { FeaturedProperties } from '@/components/sections/FeaturedProperties'
import { ExploreCategories } from '@/components/sections/ExploreCategories'
import { Channels } from '@/components/sections/Channels'
import { PopularCities } from '@/components/sections/PopularCities'
import { AIFeatures } from '@/components/sections/AIFeatures'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { ValuationCTA } from '@/components/sections/ValuationCTA'
import { Stats } from '@/components/sections/Stats'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProperties />
      <ExploreCategories />
      <Channels />
      <PopularCities />
      <AIFeatures />
      <HowItWorks />
      <ValuationCTA />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
