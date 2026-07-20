import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Bath,
  BedDouble,
  Calendar,
  Car,
  ChevronRight,
  Eye,
  Heart,
  Leaf,
  Maximize,
  Ruler,
  Scale,
  Share2,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { PropertyCard } from '@/components/property/PropertyCard'
import { AgentCard } from '@/components/property/AgentCard'
import { fetchPropertyBySlug, fetchSimilar } from '@/services/properties.service'
import { agentById } from '@/data/agents'
import { useApp } from '@/context/app-context'
import { formatArea, formatNumber, formatPrice, formatDelta } from '@/utils/format'
import { cn } from '@/utils/cn'

export default function PropertyDetail() {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const { isFavorite, toggleFavorite, isComparing, toggleCompare, notify } = useApp()

  useEffect(() => {
    let active = true
    setLoading(true)
    fetchPropertyBySlug(slug)
      .then((data) => {
        if (!active) return
        setProperty(data)
        return fetchSimilar(slug)
      })
      .then((data) => active && data && setSimilar(data))
      .catch(() => active && setProperty(null))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [slug])

  if (loading) return <DetailSkeleton />

  if (!property) {
    return (
      <Container className="flex flex-col items-center gap-5 py-32 text-center">
        <h1 className="text-3xl">We could not find that home</h1>
        <p className="text-muted">It may have been sold or withdrawn.</p>
        <Button to="/listings">Back to listings</Button>
      </Container>
    )
  }

  const agent = agentById(property.agentId)
  const saved = isFavorite(property.id)
  const underValued = property.priceDelta < 0

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      notify('Link copied')
    } catch {
      notify('Could not copy the link', 'warn')
    }
  }

  const specs = [
    { icon: BedDouble, label: 'Bedrooms', value: property.beds },
    { icon: Bath, label: 'Bathrooms', value: property.baths },
    { icon: Maximize, label: 'Interior', value: formatArea(property.area) },
    { icon: Ruler, label: 'Plot', value: property.plot ? formatArea(property.plot) : '—' },
    { icon: Car, label: 'Parking', value: `${property.parking} cars` },
    { icon: Calendar, label: 'Built', value: property.yearBuilt },
    { icon: Leaf, label: 'Energy', value: `Rating ${property.energyRating}` },
    { icon: Eye, label: 'Views', value: formatNumber(property.views) },
  ]

  return (
    <>
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-2">
          <Link to="/" className="hover:text-brand">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link to="/listings" className="hover:text-brand">
            Listings
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-ink">{property.title}</span>
        </nav>
      </Container>

      <Container className="py-6">
        <PropertyGallery images={property.images} title={property.title} />
      </Container>

      <Container className="pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          {/* -------------------- Main column -------------------- */}
          <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{property.type}</Badge>
                <Badge tone="neutral">
                  {property.status === 'rent' ? 'For rent' : property.status === 'new' ? 'New build' : 'For sale'}
                </Badge>
                {property.virtualTour && <Badge tone="accent">Virtual tour</Badge>}
                {property.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl">{property.title}</h1>
                  <p className="mt-2 text-muted">
                    {property.address}, {property.city}, {property.region}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(property.id)}
                    aria-pressed={saved}
                    className={cn(
                      'grid size-11 place-items-center rounded-full border transition-all hover:-translate-y-0.5',
                      saved
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-line-2 text-muted hover:border-brand hover:text-brand',
                    )}
                    aria-label={saved ? 'Remove from saved' : 'Save this home'}
                  >
                    <Heart className={cn('size-4.5', saved && 'fill-current')} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCompare(property.id)}
                    aria-pressed={isComparing(property.id)}
                    className={cn(
                      'grid size-11 place-items-center rounded-full border transition-all hover:-translate-y-0.5',
                      isComparing(property.id)
                        ? 'border-brand bg-brand-soft text-brand'
                        : 'border-line-2 text-muted hover:border-brand hover:text-brand',
                    )}
                    aria-label="Add to compare"
                  >
                    <Scale className="size-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={share}
                    aria-label="Copy link"
                    className="grid size-11 place-items-center rounded-full border border-line-2 text-muted transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                  >
                    <Share2 className="size-4.5" />
                  </button>
                </div>
              </div>
            </header>

            {/* AI valuation verdict — the reason to use this site over a portal */}
            <Card className="overflow-hidden border-0 bg-navy-panel p-0 text-white">
              <div className="bg-grid relative p-7">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <p className="label-mono inline-flex items-center gap-2 text-accent">
                      <Sparkles className="size-3.5" />
                      AI verdict
                    </p>
                    <p className="mt-3 font-display text-3xl font-extrabold">
                      {formatPrice(property.aiEstimate)}
                    </p>
                    <p className="mt-1 text-sm text-ice-2/60">
                      Our estimate · {property.aiScore}% confidence
                    </p>
                  </div>

                  <div
                    className={cn(
                      'flex items-center gap-2.5 rounded-2xl px-4 py-3',
                      underValued ? 'bg-emerald-400/15 text-emerald-300' : 'bg-voice/15 text-voice',
                    )}
                  >
                    {underValued ? (
                      <TrendingDown className="size-5" />
                    ) : (
                      <TrendingUp className="size-5" />
                    )}
                    <div>
                      <p className="font-display text-xl font-extrabold">
                        {formatDelta(property.priceDelta)}
                      </p>
                      <p className="text-xs opacity-80">
                        asking vs estimate
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-6 max-w-2xl leading-relaxed text-ice-2/75">
                  {underValued
                    ? `Listed ${formatDelta(Math.abs(property.priceDelta))} below our estimate. At ${property.daysOnMarket} days on market, there is limited room to negotiate further — but the asking price already favours the buyer.`
                    : `Listed ${formatDelta(property.priceDelta)} above our estimate. After ${property.daysOnMarket} days on market, an offer near our number is defensible with the comparables attached.`}
                </p>

                <Button to="/valuation" variant="navy" size="sm" className="mt-6">
                  See the comparables
                </Button>
              </div>
            </Card>

            <section>
              <h2 className="text-2xl">About this home</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{property.description}</p>
            </section>

            <section>
              <h2 className="text-2xl">Key facts</h2>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1.5 rounded-2xl border border-line bg-ice/60 p-4"
                  >
                    <Icon className="size-5 text-brand" />
                    <p className="font-display text-lg font-extrabold text-ink">{value}</p>
                    <p className="label-mono text-muted-2">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl">Features</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {property.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-pill border border-line bg-white px-4 py-2 text-sm font-semibold text-muted"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl">Location</h2>
              {/* Static map placeholder — swap for the Google Maps embed once the key is wired */}
              <div className="bg-grid-light mt-5 flex aspect-21/9 items-center justify-center rounded-2xl border border-line bg-ice">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="relative grid size-12 place-items-center rounded-full bg-brand text-white shadow-glow">
                    <span className="absolute inset-0 animate-[var(--animate-pulse-ring)] rounded-full bg-brand/50" />
                    <Maximize className="relative size-5" />
                  </span>
                  <p className="font-bold text-ink">
                    {property.city}, {property.region}
                  </p>
                  <p className="font-mono text-xs text-muted-2">
                    {property.coords.lat.toFixed(4)}, {property.coords.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* -------------------- Sticky sidebar -------------------- */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="flex flex-col gap-5 p-6">
              <div>
                <p className="label-mono text-muted-2">Asking price</p>
                <p className="mt-1 font-display text-3xl font-extrabold text-ink">
                  {formatPrice(property.price)}
                  {property.status === 'rent' && (
                    <span className="text-base font-semibold text-muted-2"> /mo</span>
                  )}
                </p>
                <p className="mt-1 text-sm text-muted-2">
                  {formatPrice(Math.round(property.price / property.area))} per sq ft ·{' '}
                  {property.daysOnMarket} days listed
                </p>
              </div>

              <div className="border-t border-line pt-5">
                <p className="label-mono mb-3 text-muted-2">Listed by</p>
                <AgentCard agent={agent} variant="compact" />
              </div>

              <div className="flex flex-col gap-2">
                <Button size="lg" className="w-full">
                  Book a viewing
                </Button>
                <Button
                  href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`}
                  size="lg"
                  className="w-full bg-whatsapp shadow-none hover:bg-whatsapp-dark"
                >
                  Ask on WhatsApp
                </Button>
                <Button variant="secondary" size="lg" className="w-full">
                  Request floor plan
                </Button>
              </div>

              <p className="text-center text-xs text-muted-2">
                Replies are AI-assisted and typically arrive in under 3 seconds.
              </p>
            </Card>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl">Similar homes</h2>
                <p className="mt-2 text-muted">
                  Closest matches by type, price band and location.
                </p>
              </div>
              <Button to="/listings" variant="secondary" className="hidden sm:inline-flex">
                See all
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  )
}

function DetailSkeleton() {
  return (
    <Container className="py-12">
      <Skeleton className="h-6 w-64" />
      <Skeleton className="mt-6 aspect-21/9 w-full" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    </Container>
  )
}
