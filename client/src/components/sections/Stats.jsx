import { Container } from '@/components/ui/Container'
import { useCountUp } from '@/hooks/useCountUp'
import { stats } from '@/data/site'
import { formatNumber } from '@/utils/format'

function Stat({ value, suffix, label, decimals = 0 }) {
  const [current, ref] = useCountUp(value)
  const display =
    decimals > 0 ? current.toFixed(decimals) : formatNumber(Math.round(current))

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 text-center">
      <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
        {display}
        <span className="text-gradient-brand">{suffix}</span>
      </p>
      <p className="label-mono text-ice-2/55">{label}</p>
    </div>
  )
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy py-16">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  )
}
