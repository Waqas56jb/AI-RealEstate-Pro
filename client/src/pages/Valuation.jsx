import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2, Sparkles, TrendingUp } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Field, Input, Select } from '@/components/ui/Input'
import { PageHeader } from '@/components/sections/PageHeader'
import { estimateValue } from '@/services/ai.service'
import { PROPERTY_TYPES } from '@/utils/constants'
import { formatDate, formatPrice, formatDelta } from '@/utils/format'
import { cn } from '@/utils/cn'

const CONDITIONS = [
  { value: 'new', label: 'Newly built' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'needsWork', label: 'Needs work' },
]

const initialForm = {
  address: '',
  type: 'apartment',
  area: 1500,
  beds: 3,
  baths: 2,
  year: 2015,
  condition: 'good',
}

export default function Valuation() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value })

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      setResult(await estimateValue(form))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Free · No signup · 3 seconds"
        title="What is this property actually worth?"
        lead="A gradient-boosted model trained on 12 million closed transactions. You get a price band, the comparables behind it, and an honest confidence figure."
        breadcrumb={[{ label: 'AI Valuation' }]}
      />

      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[24rem_1fr] lg:items-start">
          {/* -------------------- Input form -------------------- */}
          <Card className="p-7 lg:sticky lg:top-24">
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-extrabold">Property details</h2>
                <p className="mt-1 text-sm text-muted">
                  Six fields. The more you give, the tighter the band.
                </p>
              </div>

              <Field label="Address">
                <Input
                  required
                  value={form.address}
                  onChange={set('address')}
                  placeholder="18 Coastal Ridge Drive, Malibu"
                />
              </Field>

              <Field label="Property type">
                <Select
                  value={form.type}
                  onChange={set('type')}
                  options={PROPERTY_TYPES.filter((option) => option.value !== 'all')}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Interior (sq ft)">
                  <Input type="number" min={200} value={form.area} onChange={set('area')} />
                </Field>
                <Field label="Year built">
                  <Input type="number" min={1800} max={2026} value={form.year} onChange={set('year')} />
                </Field>
                <Field label="Bedrooms">
                  <Input type="number" min={0} max={20} value={form.beds} onChange={set('beds')} />
                </Field>
                <Field label="Bathrooms">
                  <Input type="number" min={0} max={20} value={form.baths} onChange={set('baths')} />
                </Field>
              </div>

              <Field label="Condition">
                <Select value={form.condition} onChange={set('condition')} options={CONDITIONS} />
              </Field>

              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Running the model…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Get my valuation
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-2">
                We do not sell your address to agents. No call unless you ask.
              </p>
            </form>
          </Card>

          {/* -------------------- Result -------------------- */}
          <div>
            {loading && <ThinkingState />}
            {!loading && !result && <EmptyResult />}
            {!loading && result && <ValuationResult result={result} form={form} />}
          </div>
        </div>
      </Container>
    </>
  )
}

function EmptyResult() {
  return (
    <div className="flex h-full min-h-100 flex-col items-center justify-center gap-5 rounded-card border border-dashed border-line-2 bg-ice/50 p-12 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-brand-soft">
        <Sparkles className="size-7 text-brand" />
      </span>
      <div>
        <h2 className="text-xl font-bold">Your estimate appears here</h2>
        <p className="mt-2 max-w-sm text-muted">
          Fill in the form and the model returns a price band, the three closest comparable sales,
          and what drove the number up or down.
        </p>
      </div>
    </div>
  )
}

function ThinkingState() {
  const steps = [
    'Geocoding the address',
    'Pulling 12 comparable sales',
    'Scoring condition and finish',
    'Running the price model',
  ]

  return (
    <div className="flex h-full min-h-100 flex-col justify-center gap-6 rounded-card border border-line bg-white p-12 shadow-soft">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0.25, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.32, duration: 0.4 }}
          className="flex items-center gap-3.5"
        >
          <Loader2 className="size-4 animate-spin text-brand" />
          <span className="text-muted">{step}…</span>
        </motion.div>
      ))}
    </div>
  )
}

function ValuationResult({ result, form }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6"
    >
      {/* Headline number */}
      <div className="relative overflow-hidden rounded-card bg-navy-panel p-8 text-white sm:p-10">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative">
          <p className="label-mono inline-flex items-center gap-2 text-accent">
            <Sparkles className="size-3.5" />
            Estimated market value
          </p>

          <p className="mt-4 font-display text-5xl font-extrabold sm:text-6xl">
            {formatPrice(result.estimate)}
          </p>

          <p className="mt-2 text-ice-2/70">
            Likely range {formatPrice(result.low)} – {formatPrice(result.high)}
          </p>

          {/* Confidence band visual */}
          <div className="mt-7">
            <div className="relative h-2 rounded-pill bg-white/12">
              <div className="absolute inset-y-0 left-[12%] right-[12%] rounded-pill bg-linear-100 from-brand-light to-accent" />
              <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lift" />
            </div>
            <div className="mt-2 flex justify-between font-mono text-xs text-ice-2/50">
              <span>{formatPrice(result.low)}</span>
              <span className="text-accent">{result.confidence}% confidence</span>
              <span>{formatPrice(result.high)}</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="font-display text-2xl font-extrabold">
                {formatPrice(result.pricePerSqft)}
              </p>
              <p className="label-mono mt-1 text-ice-2/50">Per sq ft</p>
            </div>
            <div>
              <p className="inline-flex items-center gap-1.5 font-display text-2xl font-extrabold text-emerald-300">
                <TrendingUp className="size-5" />
                {formatDelta(result.forecast12m)}
              </p>
              <p className="label-mono mt-1 text-ice-2/50">12-month forecast</p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold">{form.area}</p>
              <p className="label-mono mt-1 text-ice-2/50">Sq ft entered</p>
            </div>
          </div>
        </div>
      </div>

      {/* What moved the number */}
      <Card className="p-7">
        <h3 className="text-lg font-bold">What moved the number</h3>
        <p className="mt-1 text-sm text-muted">
          Each factor's contribution relative to the market baseline.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {result.drivers.map((driver) => {
            const positive = driver.impact > 0
            const width = Math.min(Math.abs(driver.impact) * 5, 100)
            return (
              <div key={driver.label} className="flex items-center gap-4">
                <span className="w-32 shrink-0 text-sm text-muted">{driver.label}</span>
                <div className="relative h-2.5 flex-1 rounded-pill bg-ice">
                  <div
                    className={cn(
                      'h-full rounded-pill',
                      positive ? 'bg-linear-100 from-brand to-brand-light' : 'bg-voice',
                    )}
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span
                  className={cn(
                    'w-14 shrink-0 text-right font-mono text-sm font-semibold',
                    positive ? 'text-brand' : 'text-voice',
                  )}
                >
                  {formatDelta(driver.impact)}
                </span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Comparables */}
      <Card className="overflow-hidden">
        <div className="border-b border-line p-7 pb-5">
          <h3 className="text-lg font-bold">Comparable sales</h3>
          <p className="mt-1 text-sm text-muted">
            The three closest closed transactions the model weighted most heavily.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-125 text-sm">
            <thead>
              <tr className="border-b border-line bg-ice/60">
                <th className="label-mono px-7 py-3 text-left text-muted-2">Address</th>
                <th className="label-mono px-4 py-3 text-right text-muted-2">Sold for</th>
                <th className="label-mono px-4 py-3 text-right text-muted-2">Area</th>
                <th className="label-mono px-7 py-3 text-right text-muted-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {result.comparables.map((comp) => (
                <tr key={comp.address} className="transition-colors hover:bg-ice/40">
                  <td className="px-7 py-4 font-semibold text-ink">{comp.address}</td>
                  <td className="px-4 py-4 text-right font-mono text-ink">
                    {formatPrice(comp.price)}
                  </td>
                  <td className="px-4 py-4 text-right text-muted">{comp.area} sq ft</td>
                  <td className="px-7 py-4 text-right text-muted-2">{formatDate(comp.soldAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-ice/40 px-7 py-5">
          <p className="text-sm text-muted">
            Want this as a PDF you can take to a seller?
          </p>
          <Button size="sm">
            Download report
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
