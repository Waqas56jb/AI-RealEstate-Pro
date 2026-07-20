import { Link } from 'react-router-dom'
import { Bath, BedDouble, Heart, MapPin, Maximize, Scale, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { useApp } from '@/context/app-context'
import { formatArea, formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'

const statusLabel = { sale: 'For sale', rent: 'For rent', new: 'New build' }

export function PropertyCard({ property, compact = false }) {
  const { isFavorite, toggleFavorite, isComparing, toggleCompare } = useApp()
  const saved = isFavorite(property.id)
  const comparing = isComparing(property.id)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-soft transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-line-2 hover:shadow-lift">
      <div className="relative aspect-4/3 overflow-hidden bg-ice">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
        />

        {/* Gradient scrim so white chips stay legible on any photo */}
        <div
          className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-navy/55 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge tone="glass">{statusLabel[property.status]}</Badge>
            {property.tags.includes('Best value') && (
              <Badge className="bg-accent text-navy">
                <Sparkles className="size-3" />
                Best value
              </Badge>
            )}
          </div>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => toggleCompare(property.id)}
              aria-label={comparing ? 'Remove from compare' : 'Add to compare'}
              aria-pressed={comparing}
              className={cn(
                'grid size-9 place-items-center rounded-full backdrop-blur-md transition-all hover:scale-110',
                comparing ? 'bg-brand text-white' : 'bg-white/20 text-white hover:bg-white/30',
              )}
            >
              <Scale className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(property.id)}
              aria-label={saved ? 'Remove from saved' : 'Save this home'}
              aria-pressed={saved}
              className={cn(
                'grid size-9 place-items-center rounded-full backdrop-blur-md transition-all hover:scale-110',
                saved ? 'bg-white text-red-500' : 'bg-white/20 text-white hover:bg-white/30',
              )}
            >
              <Heart className={cn('size-4', saved && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* AI match score — the platform's core differentiator, always visible */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-pill bg-navy/85 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
          <Sparkles className="size-3.5 text-accent" />
          {property.aiScore}% match
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-xl font-extrabold text-ink">
            {formatPrice(property.price)}
            {property.status === 'rent' && (
              <span className="text-sm font-semibold text-muted-2"> /mo</span>
            )}
          </p>
          <span
            className={cn(
              'label-mono',
              property.priceDelta < 0 ? 'text-emerald-600' : 'text-muted-2',
            )}
            title="Difference vs our AI valuation"
          >
            {property.priceDelta < 0 ? 'Under' : 'Over'} est.
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold leading-snug">
            <Link to={`/property/${property.slug}`} className="hover:text-brand">
              {/* Stretched link makes the whole card clickable without nesting anchors */}
              <span className="absolute inset-0 z-1" aria-hidden="true" />
              {property.title}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-3.5 shrink-0 text-muted-2" />
            {property.city}, {property.region}
          </p>
        </div>

        {!compact && (
          <div className="mt-auto flex items-center gap-4 border-t border-line pt-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="size-4 text-brand" />
              {property.beds}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-4 text-brand" />
              {property.baths}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Maximize className="size-4 text-brand" />
              {formatArea(property.area)}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
