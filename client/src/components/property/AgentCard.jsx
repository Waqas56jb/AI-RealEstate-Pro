import { Mail, Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import { Card } from '@/components/ui/Card'

export function AgentCard({ agent, variant = 'full' }) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3.5">
        <img
          src={agent.photo}
          alt={agent.name}
          loading="lazy"
          className="size-13 rounded-full object-cover ring-2 ring-brand-soft"
        />
        <div className="min-w-0">
          <p className="truncate font-bold text-ink">{agent.name}</p>
          <p className="truncate text-xs text-muted-2">{agent.title}</p>
          <Rating value={agent.rating} count={agent.reviews} className="mt-1" />
        </div>
      </div>
    )
  }

  return (
    <Card hover className="flex flex-col items-center gap-4 p-7 text-center">
      <div className="relative">
        <img
          src={agent.photo}
          alt={agent.name}
          loading="lazy"
          className="size-24 rounded-full object-cover ring-4 ring-brand-soft"
        />
        <span className="absolute bottom-1 right-1 size-4 rounded-full bg-emerald-500 ring-3 ring-white" title="Available now" />
      </div>

      <div>
        <h3 className="text-lg font-bold">{agent.name}</h3>
        <p className="mt-0.5 text-sm text-muted">{agent.title}</p>
      </div>

      <Rating value={agent.rating} count={agent.reviews} />

      <p className="text-sm leading-relaxed text-muted">{agent.bio}</p>

      <div className="grid w-full grid-cols-2 gap-3 border-t border-line pt-4 text-center">
        <div>
          <p className="font-display text-xl font-extrabold text-ink">{agent.deals}</p>
          <p className="label-mono text-muted-2">Deals closed</p>
        </div>
        <div>
          <p className="font-display text-xl font-extrabold text-ink">{agent.languages.length}</p>
          <p className="label-mono text-muted-2">Languages</p>
        </div>
      </div>

      <div className="flex w-full gap-2">
        <Button
          href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`}
          size="sm"
          className="flex-1 bg-whatsapp shadow-none hover:bg-whatsapp-dark"
        >
          <WhatsAppIcon className="size-4" />
          WhatsApp
        </Button>
        <Button
          href={`tel:${agent.phone.replace(/\s/g, '')}`}
          variant="secondary"
          size="sm"
          aria-label={`Call ${agent.name}`}
          className="px-3"
        >
          <Phone className="size-4" />
        </Button>
        <Button
          href={`mailto:${agent.email}`}
          variant="secondary"
          size="sm"
          aria-label={`Email ${agent.name}`}
          className="px-3"
        >
          <Mail className="size-4" />
        </Button>
      </div>
    </Card>
  )
}
