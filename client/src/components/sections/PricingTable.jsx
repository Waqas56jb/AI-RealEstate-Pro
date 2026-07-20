import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Section'
import { pricing } from '@/data/site'
import { cn } from '@/utils/cn'

export function PricingTable() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
      {pricing.map((plan, index) => (
        <Reveal key={plan.id} delay={index * 0.08}>
          <div
            className={cn(
              'relative flex h-full flex-col gap-6 rounded-card border p-8 transition-all duration-300',
              plan.highlight
                ? 'border-transparent bg-navy-panel text-white shadow-lift lg:-translate-y-4 lg:p-10'
                : 'border-line bg-white shadow-soft hover:-translate-y-1 hover:shadow-card',
            )}
          >
            {plan.ribbon && (
              <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-pill bg-accent px-4 py-1.5 text-xs font-bold text-navy shadow-lift">
                <Sparkles className="size-3.5" />
                {plan.ribbon}
              </span>
            )}

            <div>
              <h3 className={cn('text-xl font-extrabold', plan.highlight && 'text-white')}>
                {plan.name}
              </h3>
              <p className={cn('mt-1.5 text-sm', plan.highlight ? 'text-ice-2/70' : 'text-muted')}>
                {plan.tagline}
              </p>
            </div>

            <div className="flex items-baseline gap-1.5">
              {plan.price === null ? (
                <span
                  className={cn(
                    'font-display text-4xl font-extrabold',
                    plan.highlight ? 'text-white' : 'text-ink',
                  )}
                >
                  Custom
                </span>
              ) : (
                <>
                  <span
                    className={cn(
                      'font-display text-5xl font-extrabold',
                      plan.highlight ? 'text-white' : 'text-ink',
                    )}
                  >
                    ${plan.price}
                  </span>
                  <span className={cn('text-sm', plan.highlight ? 'text-ice-2/60' : 'text-muted-2')}>
                    /{plan.period}
                  </span>
                </>
              )}
            </div>

            <Button
              to={plan.id === 'brokerage' ? '/contact' : '/register'}
              variant={plan.highlight ? 'navy' : 'secondary'}
              size="lg"
              className="w-full"
            >
              {plan.cta}
            </Button>

            <ul
              className={cn(
                'flex flex-col gap-3.5 border-t pt-6',
                plan.highlight ? 'border-white/12' : 'border-line',
              )}
            >
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check
                    className={cn(
                      'mt-0.5 size-4.5 shrink-0',
                      plan.highlight ? 'text-accent' : 'text-brand',
                    )}
                  />
                  <span className={plan.highlight ? 'text-ice-2/85' : 'text-muted'}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
