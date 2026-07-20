import {
  Compass,
  MessageSquare,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Section, SectionHeading, Reveal } from '@/components/ui/Section'
import { Card, IconChip } from '@/components/ui/Card'
import { aiFeatures } from '@/data/site'

const icons = { Sparkles, Compass, MessageSquare, TrendingUp, ScanSearch, ShieldCheck }

export function AIFeatures() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="What the AI actually does"
        title="Six models doing the work of a back office"
        lead="Not a chatbot bolted onto a listings site. Each of these runs on its own model, trained on transaction data rather than marketing copy."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aiFeatures.map((feature, index) => {
          const Icon = icons[feature.icon]
          return (
            <Reveal key={feature.title} delay={index * 0.06}>
              <Card hover className="group h-full p-7">
                <IconChip className="transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-5.5" />
                </IconChip>
                <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2.5 leading-relaxed text-muted">{feature.body}</p>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
