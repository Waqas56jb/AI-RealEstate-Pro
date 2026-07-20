import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading, Reveal } from '@/components/ui/Section'
import { categories } from '@/data/site'
import { formatNumber } from '@/utils/format'
import { cn } from '@/utils/cn'

export function ExploreCategories() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Browse by type"
        title="Whatever shape home takes for you"
        lead="From a one-bed loft to a seven-bedroom estate — every category is priced and scored by the same model."
      />

      <div className="mt-14 grid auto-rows-[13rem] grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.label} delay={index * 0.06} className={cn('h-full', category.span)}>
            <Link
              to={`/listings?type=${category.type}`}
              className="group relative flex h-full flex-col justify-end overflow-hidden rounded-card p-5 shadow-soft"
            >
              <img
                src={category.image}
                alt={category.label}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/25 to-transparent transition-opacity duration-300 group-hover:from-navy/95" />

              <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight className="size-4" />
              </span>

              <div className="relative">
                <h3 className="font-display text-xl font-extrabold text-white">{category.label}</h3>
                <p className="mt-0.5 text-sm text-ice-2/70">
                  {formatNumber(category.count)} listings
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
