import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { askConcierge } from '@/services/ai.service'
import { cn } from '@/utils/cn'

const GREETING = {
  from: 'ai',
  text: "Hi — I'm the Estatly assistant, and yes, I'm an AI. Tell me your budget and area and I'll shortlist in a few seconds.",
}

export function ConciergeWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const send = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || thinking) return

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }])
    setInput('')
    setThinking(true)

    try {
      const response = await askConcierge(trimmed)
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: response.reply, suggestions: response.suggestions },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: 'I lost that one — could you send it again?' },
      ])
    } finally {
      setThinking(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close assistant' : 'Open AI assistant'}
        className="fixed bottom-6 right-6 z-90 grid size-14 place-items-center rounded-full bg-brand text-white shadow-glow transition-all duration-300 hover:scale-105 hover:bg-brand-dark"
      >
        {!open && (
          <span
            className="absolute inset-0 animate-[var(--animate-pulse-ring)] rounded-full bg-brand/50"
            aria-hidden="true"
          />
        )}
        <span className="relative">
          {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-90 flex h-[30rem] w-[min(23rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-card border border-line bg-white shadow-lift"
          >
            <header className="flex items-center gap-3 bg-navy-panel px-5 py-4">
              <span className="grid size-9 place-items-center rounded-xl bg-white/10">
                <Sparkles className="size-4.5 text-accent" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Estatly Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-ice-2/60">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  Typically replies in 2 seconds
                </p>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className={cn('flex flex-col gap-2', message.from === 'user' && 'items-end')}>
                  <p
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                      message.from === 'ai'
                        ? 'rounded-bl-sm bg-ice text-ink'
                        : 'rounded-br-sm bg-brand text-white',
                    )}
                  >
                    {message.text}
                  </p>

                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1.5">
                      {message.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => send(suggestion)}
                          className="rounded-pill border border-line-2 px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {thinking && (
                <div className="flex w-fit gap-1 rounded-2xl rounded-bl-sm bg-ice px-4 py-3">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.18 }}
                      className="size-1.5 rounded-full bg-muted-2"
                    />
                  ))}
                </div>
              )}

              <div ref={endRef} />
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about any listing…"
                aria-label="Message the assistant"
                className="h-10 flex-1 rounded-pill bg-ice px-4 text-sm text-ink placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                aria-label="Send message"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
