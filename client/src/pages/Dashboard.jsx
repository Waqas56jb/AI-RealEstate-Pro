import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Calendar,
  Heart,
  LayoutDashboard,
  MessageCircle,
  Phone,
  Scale,
  TrendingUp,
  Users,
} from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PropertyCard } from '@/components/property/PropertyCard'
import { PageHeader } from '@/components/sections/PageHeader'
import { useApp } from '@/context/app-context'
import { properties, propertyById } from '@/data/properties'
import { formatPrice, formatRelative } from '@/utils/format'
import { cn } from '@/utils/cn'

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'saved', label: 'Saved', icon: Heart },
  { id: 'compare', label: 'Compare', icon: Scale },
  { id: 'leads', label: 'Leads', icon: Users },
]

const kpis = [
  { label: 'Leads this week', value: '184', delta: '+22%', icon: Users },
  { label: 'AI reply rate', value: '100%', delta: 'all channels', icon: MessageCircle },
  { label: 'Viewings booked', value: '37', delta: '+9', icon: Calendar },
  { label: 'Pipeline value', value: formatPrice(12_400_000), delta: '+4.1%', icon: TrendingUp },
]

const leads = [
  { id: 'l1', name: 'Sofia Marchetti', channel: 'whatsapp', property: 'Azure Cliff Residence', score: 94, at: '2026-07-21T08:40:00' },
  { id: 'l2', name: 'Ravi Deshmukh', channel: 'instagram', property: 'Meridian Sky Penthouse', score: 81, at: '2026-07-21T06:12:00' },
  { id: 'l3', name: 'Anonymous caller', channel: 'voice', property: 'Solstice Hill Villa', score: 76, at: '2026-07-20T22:55:00' },
  { id: 'l4', name: 'Hannah Boateng', channel: 'whatsapp', property: 'Palmwood Family Estate', score: 68, at: '2026-07-20T19:30:00' },
  { id: 'l5', name: 'Luis Ferreira', channel: 'instagram', property: 'The Glasshouse', score: 59, at: '2026-07-20T14:05:00' },
]

const channelMeta = {
  whatsapp: { icon: WhatsAppIcon, color: 'var(--color-whatsapp)', label: 'WhatsApp' },
  instagram: { icon: InstagramIcon, color: 'var(--color-instagram)', label: 'Instagram' },
  voice: { icon: Phone, color: 'var(--color-voice)', label: 'Voice' },
}

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') ?? 'overview')
  const { favorites, compare, user } = useApp()

  const savedProperties = favorites.map(propertyById).filter(Boolean)
  const compareProperties = compare.map(propertyById).filter(Boolean)

  const selectTab = (id) => {
    setTab(id)
    setSearchParams(id === 'overview' ? {} : { tab: id }, { replace: true })
  }

  return (
    <>
      <PageHeader
        eyebrow={user ? `Signed in as ${user.email}` : 'Demo workspace'}
        title={user ? `Good morning, ${user.name}` : 'Your workspace'}
        lead="Everything the AI handled overnight, and everything waiting on you."
        breadcrumb={[{ label: 'Dashboard' }]}
      />

      <Container className="py-10 lg:py-14">
        <div className="flex gap-1.5 overflow-x-auto border-b border-line pb-px no-scrollbar">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => selectTab(id)}
              aria-current={tab === id}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-semibold transition-colors',
                tab === id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-muted hover:text-ink',
              )}
            >
              <Icon className="size-4" />
              {label}
              {id === 'saved' && favorites.length > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-brand-soft text-[11px] font-bold text-brand">
                  {favorites.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="pt-10">
          {tab === 'overview' && <Overview />}
          {tab === 'saved' && (
            <SavedGrid
              items={savedProperties}
              emptyTitle="No saved homes yet"
              emptyBody="Tap the heart on any listing and it lands here."
            />
          )}
          {tab === 'compare' && (
            <SavedGrid
              items={compareProperties}
              emptyTitle="Nothing to compare"
              emptyBody="Add up to three homes with the scales icon to see them side by side."
            />
          )}
          {tab === 'leads' && <LeadsTable />}
        </div>
      </Container>
    </>
  )
}

function Overview() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, delta, icon: Icon }) => (
          <Card key={label} hover className="p-6">
            <div className="flex items-start justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft">
                <Icon className="size-5 text-brand" />
              </span>
              <Badge tone="success">{delta}</Badge>
            </div>
            <p className="mt-5 font-display text-3xl font-extrabold text-ink">{value}</p>
            <p className="label-mono mt-1 text-muted-2">{label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="p-7">
          <h2 className="text-xl font-extrabold">Leads by channel</h2>
          <p className="mt-1 text-sm text-muted">Last 7 days, all offices.</p>

          <div className="mt-7 flex flex-col gap-5">
            {[
              { id: 'whatsapp', count: 96, pct: 52 },
              { id: 'instagram', count: 58, pct: 32 },
              { id: 'voice', count: 30, pct: 16 },
            ].map(({ id, count, pct }) => {
              const meta = channelMeta[id]
              const Icon = meta.icon
              return (
                <div key={id} className="flex items-center gap-4">
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-xl text-white"
                    style={{ backgroundColor: meta.color }}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-ink">{meta.label}</span>
                      <span className="font-mono text-sm text-muted">{count}</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-pill bg-ice">
                      <div
                        className="h-full rounded-pill transition-all"
                        style={{ width: `${pct}%`, backgroundColor: meta.color }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-7">
          <h2 className="text-xl font-extrabold">Today</h2>
          <div className="mt-6 flex flex-col gap-4">
            {[
              { time: '11:00', text: 'Viewing — Azure Cliff Residence', who: 'Sofia Marchetti' },
              { time: '14:30', text: 'Callback — Solstice Hill Villa', who: 'Unknown caller' },
              { time: '16:00', text: 'Valuation review', who: 'Palmwood Estate' },
            ].map((item) => (
              <div key={item.time} className="flex gap-4 border-l-2 border-brand pl-4">
                <div>
                  <p className="font-mono text-xs font-semibold text-brand">{item.time}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">{item.text}</p>
                  <p className="text-xs text-muted-2">{item.who}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="soft" size="sm" className="mt-6 w-full">
            Open calendar
          </Button>
        </Card>
      </div>

      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl">Recommended for your buyers</h2>
            <p className="mt-1.5 text-muted">Re-scored this morning against your active briefs.</p>
          </div>
          <Button to="/listings" variant="secondary" className="hidden sm:inline-flex">
            View all
          </Button>
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SavedGrid({ items, emptyTitle, emptyBody }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-card border border-dashed border-line-2 bg-ice/50 py-20 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-brand-soft">
          <Heart className="size-7 text-brand" />
        </span>
        <div>
          <h2 className="text-xl font-bold">{emptyTitle}</h2>
          <p className="mt-2 max-w-sm text-muted">{emptyBody}</p>
        </div>
        <Button to="/listings">Browse listings</Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

function LeadsTable() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-7">
        <div>
          <h2 className="text-xl font-extrabold">Recent leads</h2>
          <p className="mt-1 text-sm text-muted">
            All five were answered by AI before an agent opened the thread.
          </p>
        </div>
        <Button variant="secondary" size="sm">
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-sm">
          <thead>
            <tr className="border-b border-line bg-ice/60">
              <th className="label-mono px-7 py-3 text-left text-muted-2">Lead</th>
              <th className="label-mono px-4 py-3 text-left text-muted-2">Channel</th>
              <th className="label-mono px-4 py-3 text-left text-muted-2">Interested in</th>
              <th className="label-mono px-4 py-3 text-left text-muted-2">Intent</th>
              <th className="label-mono px-7 py-3 text-right text-muted-2">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {leads.map((lead) => {
              const meta = channelMeta[lead.channel]
              const Icon = meta.icon
              return (
                <tr key={lead.id} className="transition-colors hover:bg-ice/40">
                  <td className="px-7 py-4 font-semibold text-ink">{lead.name}</td>
                  <td className="px-4 py-4">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold"
                      style={{ backgroundColor: `${meta.color}1f`, color: meta.color }}
                    >
                      <Icon className="size-3.5" />
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted">{lead.property}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-1.5 w-20 rounded-pill bg-ice">
                        <div
                          className={cn(
                            'h-full rounded-pill',
                            lead.score >= 80 ? 'bg-emerald-500' : lead.score >= 65 ? 'bg-brand' : 'bg-muted-2',
                          )}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-semibold text-ink">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-7 py-4 text-right text-muted-2">{formatRelative(lead.at)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
