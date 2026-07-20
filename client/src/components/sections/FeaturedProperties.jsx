import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeading, Reveal } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { PropertyCard } from '@/components/property/PropertyCard'
import { PropertyCardSkeleton } from '@/components/ui/Skeleton'
import { fetchFeatured } from '@/services/properties.service'

export function FeaturedProperties() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchFeatured()
      .then((data) => active && setItems(data))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return (
    <Section bg="ice">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Handpicked by the model"
          title="This week's strongest matches"
          lead="Ranked by our valuation gap, days on market, and how buyers like you have reacted to each one."
        />
        <Reveal delay={0.1}>
          <Button to="/listings" variant="secondary" className="shrink-0">
            View all listings
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }, (_, index) => <PropertyCardSkeleton key={index} />)
          : items.map((property, index) => (
              <Reveal key={property.id} delay={index * 0.08}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
      </div>
    </Section>
  )
}
