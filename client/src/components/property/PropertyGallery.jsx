import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/utils/cn'

export function PropertyGallery({ images, title }) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useLockBodyScroll(lightbox)

  const go = (step) => setIndex((prev) => (prev + step + images.length) % images.length)

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative col-span-2 row-span-2 aspect-4/3 overflow-hidden rounded-2xl bg-ice sm:aspect-auto"
        >
          <img
            src={images[0]}
            alt={title}
            className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-pill bg-navy/80 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md">
            <Expand className="size-3.5" />
            View all {images.length} photos
          </span>
        </button>

        {images.slice(1, 5).map((image, i) => (
          <button
            key={image}
            type="button"
            onClick={() => {
              setIndex(i + 1)
              setLightbox(true)
            }}
            className="group relative hidden aspect-4/3 overflow-hidden rounded-2xl bg-ice sm:block"
          >
            <img
              src={image}
              alt={`${title} — view ${i + 2}`}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(false)}
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close gallery"
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                go(-1)
              }}
              aria-label="Previous photo"
              className="absolute left-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft className="size-5" />
            </button>

            <motion.img
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={images[index]}
              alt={`${title} — view ${index + 1}`}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] max-w-5xl rounded-2xl object-contain shadow-lift"
            />

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                go(1)
              }}
              aria-label="Next photo"
              className="absolute right-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
            >
              <ChevronRight className="size-5" />
            </button>

            <div className="absolute bottom-6 flex gap-1.5">
              {images.map((image, i) => (
                <button
                  key={image}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    setIndex(i)
                  }}
                  aria-label={`Go to photo ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-pill transition-all',
                    i === index ? 'w-8 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70',
                  )}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
