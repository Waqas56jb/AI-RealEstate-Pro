import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { PropertyCard } from '@/components/property/PropertyCard'
import { PropertyFilters } from '@/components/property/PropertyFilters'
import { PropertyCardSkeleton } from '@/components/ui/Skeleton'
import { PageHeader } from '@/components/sections/PageHeader'
import { fetchProperties } from '@/services/properties.service'
import { SORT_OPTIONS } from '@/utils/constants'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/utils/cn'

const emptyFilters = {
  query: '',
  type: 'all',
  status: 'all',
  beds: 'any',
  minPrice: null,
  maxPrice: null,
  amenities: [],
}

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    query: searchParams.get('query') ?? '',
    status: searchParams.get('status') ?? 'all',
    type: searchParams.get('type') ?? 'all',
  }))
  const [sort, setSort] = useState('recommended')
  const [view, setView] = useState('grid')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [result, setResult] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)

  useLockBodyScroll(drawerOpen)

  // Keep the URL shareable — filters that matter live in the query string.
  useEffect(() => {
    const next = {}
    if (filters.query) next.query = filters.query
    if (filters.status !== 'all') next.status = filters.status
    if (filters.type !== 'all') next.type = filters.type
    setSearchParams(next, { replace: true })
  }, [filters.query, filters.status, filters.type, setSearchParams])

  useEffect(() => {
    let active = true
    setLoading(true)
    fetchProperties({ filters, sort, pageSize: 12 })
      .then((data) => active && setResult(data))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [filters, sort])

  const heading = useMemo(() => {
    if (filters.status === 'rent') return 'Homes to rent'
    if (filters.status === 'sale') return 'Homes for sale'
    if (filters.status === 'new') return 'New developments'
    return 'Every listing, re-ranked for you'
  }, [filters.status])

  return (
    <>
      <PageHeader
        eyebrow={`${result.total} homes indexed`}
        title={heading}
        lead="Sorted by AI match score by default — how closely each home fits what buyers like you have actually chosen."
        breadcrumb={[{ label: 'Listings' }]}
      />

      <Container className="py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[19rem_1fr]">
          {/* Desktop filter rail */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <PropertyFilters
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(emptyFilters)}
                resultCount={result.total}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                icon={Search}
                value={filters.query}
                onChange={(event) => setFilters({ ...filters, query: event.target.value })}
                placeholder="Search by city, address or building"
                aria-label="Search listings"
                className="flex-1"
              />

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="size-4" />
                  Filters
                </Button>

                <Select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  options={SORT_OPTIONS}
                  aria-label="Sort listings"
                  className="w-45"
                />

                <div className="hidden items-center rounded-xl border border-line-2 p-1 sm:flex">
                  {[
                    { id: 'grid', icon: LayoutGrid },
                    { id: 'list', icon: List },
                  ].map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setView(id)}
                      aria-label={`${id} view`}
                      aria-pressed={view === id}
                      className={cn(
                        'grid size-8 place-items-center rounded-lg transition-colors',
                        view === id ? 'bg-brand text-white' : 'text-muted-2 hover:text-brand',
                      )}
                    >
                      <Icon className="size-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            ) : result.items.length === 0 ? (
              <EmptyState onReset={() => setFilters(emptyFilters)} />
            ) : (
              <div
                className={cn(
                  'grid gap-6',
                  view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 max-w-3xl',
                )}
              >
                {result.items.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">
          <div
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[min(22rem,90vw)] overflow-y-auto bg-white p-4 shadow-lift">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="mb-3 ml-auto grid size-10 place-items-center rounded-full text-muted hover:bg-ice"
            >
              <X className="size-5" />
            </button>
            <PropertyFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(emptyFilters)}
              resultCount={result.total}
            />
          </div>
        </div>
      )}
    </>
  )
}

function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-card border border-dashed border-line-2 bg-ice/50 py-20 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-brand-soft">
        <Search className="size-7 text-brand" />
      </span>
      <div>
        <h2 className="text-xl font-bold">Nothing matches that yet</h2>
        <p className="mt-2 max-w-sm text-muted">
          Loosen a filter or two — or let the assistant find something close and tell you what it
          compromised on.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onReset}>
          Clear filters
        </Button>
        <Button to="/valuation">Try AI search</Button>
      </div>
    </div>
  )
}
