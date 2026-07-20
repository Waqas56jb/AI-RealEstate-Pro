import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, TriangleAlert } from 'lucide-react'
import { useApp } from '@/context/app-context'

export function Toast() {
  const { toast } = useApp()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-100 flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center gap-2.5 rounded-pill bg-navy px-5 py-3 text-sm font-semibold text-white shadow-lift"
          >
            {toast.tone === 'warn' ? (
              <TriangleAlert className="size-4 text-voice" />
            ) : (
              <CheckCircle2 className="size-4 text-accent" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
