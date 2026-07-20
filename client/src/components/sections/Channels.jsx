import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { Section, SectionHeading, Reveal } from '@/components/ui/Section'
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons'
import { channels } from '@/data/site'
import { cn } from '@/utils/cn'

const icons = { whatsapp: WhatsAppIcon, instagram: InstagramIcon, voice: Phone }

export function Channels() {
  const [active, setActive] = useState(channels[0].id)
  const current = channels.find((channel) => channel.id === active)
  const ActiveIcon = icons[current.id]

  return (
    <Section bg="navy" className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative">
        <SectionHeading
          light
          eyebrow="Wherever your buyer already is"
          title="Three channels, one AI agent"
          lead="Same context, same tone, same live listing data. The buyer never notices a handover, and nobody waits until Monday."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {channels.map((channel) => {
            const Icon = icons[channel.id]
            const isActive = channel.id === active
            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => setActive(channel.id)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex items-center gap-2 rounded-pill px-5 py-3 text-sm font-bold transition-all duration-300',
                  isActive
                    ? 'text-white shadow-lift'
                    : 'border border-white/15 text-ice-2/70 hover:border-white/30 hover:text-white',
                )}
                style={isActive ? { backgroundColor: channel.color } : undefined}
              >
                <Icon className="size-4" />
                {channel.name}
              </button>
            )
          })}
        </div>

        <Reveal className="mt-10">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto grid max-w-5xl items-center gap-10 rounded-[2rem] border border-white/12 bg-white/5 p-8 backdrop-blur-xl sm:p-12 lg:grid-cols-2"
          >
            <div className="flex flex-col items-start gap-5">
              <span
                className="grid size-14 place-items-center rounded-2xl text-white"
                style={{ backgroundColor: current.color }}
              >
                <ActiveIcon className="size-6" />
              </span>
              <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                {current.headline}
              </h3>
              <p className="leading-relaxed text-ice-2/75">{current.body}</p>
              <span
                className="label-mono rounded-pill px-3.5 py-2"
                style={{ backgroundColor: `${current.color}1f`, color: current.color }}
              >
                {current.metric}
              </span>
            </div>

            <ChatPreview channel={current} />
          </motion.div>
        </Reveal>
      </div>
    </Section>
  )
}

/** Static conversation mock — sells the speed claim better than a screenshot. */
function ChatPreview({ channel }) {
  const messages = {
    whatsapp: [
      { from: 'them', text: 'Is the Malibu cliff house still available?' },
      { from: 'ai', text: 'It is — 5 bed, 6 bath, listed at $4.85M. That is 3.4% below our valuation. Want the floor plan?' },
      { from: 'them', text: 'Yes, and can I see it Saturday?' },
      { from: 'ai', text: 'Saturday 11am or 2pm are open. Which suits?' },
    ],
    instagram: [
      { from: 'them', text: 'saw the reel — what floor is this one on?' },
      { from: 'ai', text: 'Floor 48, full-floor penthouse. Private lift lobby and 360° glazing. Budget range in mind?' },
      { from: 'them', text: 'around 3m' },
      { from: 'ai', text: 'Then this is a fit at $3.275M. Routing you to Daniel, who covers the tower.' },
    ],
    voice: [
      { from: 'them', text: '“Hi — calling about the Scottsdale villa.”' },
      { from: 'ai', text: '“Of course. Solstice Hill, seven bedrooms, just completed. Are you looking to view this week?”' },
      { from: 'them', text: '“Possibly Thursday afternoon.”' },
      { from: 'ai', text: '“Thursday 3pm is free. I have booked it and sent you the details.”' },
    ],
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-navy/50 p-5">
      {messages[channel.id].map((message, index) => (
        <motion.div
          key={message.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + index * 0.12, duration: 0.35 }}
          className={cn('flex', message.from === 'ai' ? 'justify-start' : 'justify-end')}
        >
          <p
            className={cn(
              'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
              message.from === 'ai'
                ? 'rounded-bl-sm bg-white/10 text-ice-2'
                : 'rounded-br-sm text-white',
            )}
            style={
              message.from === 'them' ? { backgroundColor: channel.color } : undefined
            }
          >
            {message.text}
          </p>
        </motion.div>
      ))}
      <p className="label-mono mt-1 text-center text-ice-2/40">
        AI identifies itself on first contact
      </p>
    </div>
  )
}
