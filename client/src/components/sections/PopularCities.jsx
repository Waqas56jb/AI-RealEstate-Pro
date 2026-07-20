import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { Section, SectionHeading, Reveal } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { cities } from '@/data/site'
import { formatNumber } from '@/utils/format'

export function PopularCities() {
  return (
    <Section bg="ice">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Where buyers are looking"
          title="Explore the hottest markets"
          lead="Live inventory in every city our valuation models cover — updated the moment a listing changes."
        />
        <Reveal delay={0.1}>
          <Button to="/listings" variant="secondary" className="shrink-0">
            All locations
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cities.map((city, index) => (
          <Reveal key={city.name} delay={index * 0.05}>
            <Link
              to={`/listings?query=${encodeURIComponent(city.name)}`}
              className="group relative flex aspect-4/3 flex-col justify-end overflow-hidden rounded-card p-5 shadow-soft"
            >
              <img
                src={city.image}
                alt={city.name}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/30 to-transparent" />

              <div className="relative">
                <p className="inline-flex items-center gap-1.5 font-display text-lg font-extrabold text-white">
                  <MapPin className="size-4 text-accent" />
                  {city.name}
                </p>
                <p className="mt-0.5 text-sm text-ice-2/75">
                  {formatNumber(city.count)} homes
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
