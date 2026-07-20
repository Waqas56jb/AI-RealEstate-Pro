import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Container } from './Container'
import { Eyebrow } from './Badge'

const backgrounds = {
  white: 'bg-white',
  ice: 'bg-ice',
  navy: 'bg-navy-panel text-white',
}

export function Section({ id, bg = 'white', className, containerSize, children }) {
  return (
    <section id={id} className={cn('py-20 sm:py-28', backgrounds[bg], className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}

/**
 * Standard section header: mono eyebrow, display title, muted lead.
 * Fades up once on scroll so long pages feel alive without being busy.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  light = false,
  className,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-[2.75rem]',
          align === 'center' ? 'max-w-3xl' : 'max-w-2xl',
          light && 'text-white',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            'text-lg leading-relaxed',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl',
            light ? 'text-ice-2/80' : 'text-muted',
          )}
        >
          {lead}
        </p>
      )}
      {children}
    </motion.div>
  )
}

/** Wrap any block to give it the same fade-up entrance as SectionHeading. */
export function Reveal({ delay = 0, y = 24, className, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
