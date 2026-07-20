import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/Section'
import { faqs } from '@/data/site'
import { cn } from '@/utils/cn'

export function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="Questions we get asked"
        title="Before you ask sales"
        lead="If your question is not here, the concierge in the corner answers it in about two seconds."
      />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-line rounded-card border border-line bg-white shadow-soft">
        {faqs.map((faq, index) => {
          const isOpen = open === index
          return (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-ice/60"
              >
                <span className="font-display text-base font-bold text-ink sm:text-lg">
                  {faq.q}
                </span>
                <span
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300',
                    isOpen ? 'rotate-45 bg-brand text-white' : 'bg-brand-soft text-brand',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 leading-relaxed text-muted">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
