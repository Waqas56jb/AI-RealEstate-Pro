import { SlidersHorizontal, X } from 'lucide-react'
import { Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { AMENITIES, BED_OPTIONS, LISTING_STATUS, PROPERTY_TYPES } from '@/utils/constants'
import { formatPriceShort } from '@/utils/format'
import { cn } from '@/utils/cn'

export function PropertyFilters({ filters, onChange, onReset, resultCount }) {
  const set = (key) => (event) => onChange({ ...filters, [key]: event.target.value })

  const toggleAmenity = (amenity) => {
    const next = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    onChange({ ...filters, amenities: next })
  }

  const activeCount =
    (filters.type !== 'all' ? 1 : 0) +
    (filters.status !== 'all' ? 1 : 0) +
    (filters.beds !== 'any' ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    filters.amenities.length

  return (
    <aside className="flex flex-col gap-6 rounded-card border border-line bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 font-display text-lg font-bold">
          <SlidersHorizontal className="size-4 text-brand" />
          Filters
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-brand text-[11px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-2 transition-colors hover:text-brand"
          >
            <X className="size-3.5" />
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="label-mono text-muted-2">Property type</span>
          <Select value={filters.type} onChange={set('type')} options={PROPERTY_TYPES} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="label-mono text-muted-2">Listing status</span>
          <Select value={filters.status} onChange={set('status')} options={LISTING_STATUS} />
        </label>

        <div className="flex flex-col gap-2">
          <span className="label-mono text-muted-2">Bedrooms</span>
          <div className="flex flex-wrap gap-1.5">
            {BED_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...filters, beds: option })}
                className={cn(
                  'h-9 min-w-11 rounded-pill px-3 text-sm font-semibold transition-all',
                  filters.beds === option
                    ? 'bg-brand text-white shadow-glow'
                    : 'border border-line-2 text-muted hover:border-brand hover:text-brand',
                )}
              >
                {option === 'any' ? 'Any' : option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="label-mono text-muted-2">Max price</span>
            <span className="font-mono text-sm font-semibold text-brand">
              {filters.maxPrice ? formatPriceShort(filters.maxPrice) : 'Any'}
            </span>
          </div>
          <input
            type="range"
            min={100_000}
            max={8_000_000}
            step={50_000}
            value={filters.maxPrice ?? 8_000_000}
            onChange={(event) =>
              onChange({
                ...filters,
                maxPrice: Number(event.target.value) >= 8_000_000 ? null : Number(event.target.value),
              })
            }
            className="h-1.5 w-full cursor-pointer appearance-none rounded-pill bg-line accent-brand"
            aria-label="Maximum price"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="label-mono text-muted-2">Must have</span>
          <div className="flex flex-wrap gap-1.5">
            {AMENITIES.map((amenity) => {
              const active = filters.amenities.includes(amenity)
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-pill px-3 py-1.5 text-xs font-semibold transition-all',
                    active
                      ? 'bg-brand-soft text-brand ring-1 ring-brand/30'
                      : 'border border-line text-muted hover:border-line-2 hover:text-ink',
                  )}
                >
                  {amenity}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-line pt-5">
        <p className="text-sm text-muted">
          <span className="font-display text-lg font-extrabold text-ink">{resultCount}</span> homes
          match
        </p>
        <Button to="/valuation" variant="soft" size="sm" className="mt-3 w-full">
          Not sure? Get a valuation
        </Button>
      </div>
    </aside>
  )
}
