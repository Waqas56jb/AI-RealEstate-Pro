import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Input'
import { PageHeader } from '@/components/sections/PageHeader'
import { useApp } from '@/context/app-context'
import { site } from '@/data/site'

const TOPICS = [
  { value: 'sales', label: 'Talk to sales' },
  { value: 'demo', label: 'Book a demo' },
  { value: 'support', label: 'Product support' },
  { value: 'partnership', label: 'Partnership' },
]

const channels = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: 'Message us — the AI answers first',
    href: `https://wa.me/${site.phone.replace(/\D/g, '')}`,
    color: 'var(--color-whatsapp)',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@estatly',
    href: '#',
    color: 'var(--color-instagram)',
  },
  {
    icon: Phone,
    label: 'Voice',
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, '')}`,
    color: 'var(--color-voice)',
  },
  {
    icon: Mail,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    color: 'var(--color-brand)',
  },
]

export default function Contact() {
  const { notify } = useApp()
  const [sending, setSending] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    // Wire to POST /api/contact once the backend endpoint exists.
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSending(false)
    event.target.reset()
    notify('Message sent — we reply within the hour')
  }

  return (
    <>
      <PageHeader
        eyebrow="We answer fast. Obviously."
        title="Talk to us on whatever channel you prefer"
        lead="Sales questions get a human within the hour. Product questions get the AI in about two seconds, and it is usually the better answer."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
          <Card className="p-7 sm:p-9">
            <h2 className="text-2xl">Send us a message</h2>
            <p className="mt-2 text-muted">
              The more context you give, the more useful the first reply will be.
            </p>

            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name">
                  <Input required name="name" placeholder="Jordan Ellis" />
                </Field>
                <Field label="Work email">
                  <Input required type="email" name="email" placeholder="jordan@brokerage.com" />
                </Field>
                <Field label="Company">
                  <Input name="company" placeholder="Ellis & Partners" />
                </Field>
                <Field label="What is this about?">
                  <Select name="topic" options={TOPICS} />
                </Field>
              </div>

              <Field label="Message" hint="Team size and current tools help us skip the discovery call.">
                <Textarea
                  required
                  name="message"
                  placeholder="We run six agents across two offices and lose most of our weekend enquiries…"
                />
              </Field>

              <Button type="submit" size="lg" disabled={sending} className="sm:w-fit">
                {sending ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          </Card>

          <aside className="flex flex-col gap-4">
            {channels.map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                className="group flex items-center gap-4 rounded-card border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="label-mono text-muted-2">{label}</p>
                  <p className="truncate font-semibold text-ink group-hover:text-brand">{value}</p>
                </div>
              </a>
            ))}

            <Card className="flex gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft">
                <MapPin className="size-5 text-brand" />
              </span>
              <div>
                <p className="label-mono text-muted-2">Office</p>
                <p className="font-semibold text-ink">{site.address}</p>
                <p className="mt-1 text-sm text-muted-2">Mon–Fri, 9am–6pm PT</p>
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </>
  )
}
