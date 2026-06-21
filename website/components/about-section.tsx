"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

/* ── scramble text reveal ── */
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./:"

  useEffect(() => {
    if (!inView) return
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i < iteration) return text[i]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )
      iteration += 0.5
      if (iteration >= text.length) {
        setDisplay(text)
        clearInterval(interval)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [inView, text])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

/* ── blinking cursor ── */
function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

/* ── the ladder rungs ── */
const RUNGS = [
  { n: "1", title: "Does this need to exist?", body: "Speculative need = skip it and say so in one line. (YAGNI)" },
  { n: "2", title: "Stdlib does it?", body: "Use it before reaching for anything else." },
  { n: "3", title: "Native platform feature?", body: '<input type="date"> over a picker library, CSS over JS.' },
  { n: "4", title: "Already-installed dependency?", body: "Use it. Never add a new one for what a few lines handle." },
  { n: "5", title: "Can it be one line?", body: "One line." },
  { n: "6", title: "Only then, write code", body: "The least code that works — boring over clever." },
]

/* ── before/after code panel ── */
function CodePanel() {
  return (
    <div className="relative h-full w-full min-h-[300px] border-b-2 lg:border-b-0 lg:border-r-2 border-foreground overflow-hidden bg-foreground flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-foreground/80 backdrop-blur-sm border-b border-background/10">
        <span className="text-[10px] tracking-[0.2em] uppercase text-background/60 font-mono">
          deep_clone.diff
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#ea580c] font-mono">
          LIVE
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-6 px-5 py-8 font-mono text-xs leading-relaxed overflow-x-auto">
        <div>
          <div className="text-background/40 mb-2">{"// without dietcode"}</div>
          <div className="text-background/70">npm install lodash</div>
          <div className="text-background/40 mt-1">{" "}</div>
          <div className="text-background/70">import {"{"} cloneDeep {"}"} from &quot;lodash&quot;</div>
          <div className="text-background/70">const copy = cloneDeep(original)</div>
        </div>
        <div>
          <div className="text-[#ea580c] mb-2">{"// with dietcode"}</div>
          <div className="text-background/40">{"// dietcode: structuredClone does this"}</div>
          <div className="text-background">const copy = structuredClone(original)</div>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-background/10">
        <p className="text-[10px] text-background/50 font-mono leading-relaxed">
          1 dependency → 1 built-in. structuredClone handles Dates, Maps, Sets, and circular refs —
          everything JSON.parse/stringify silently drops.
        </p>
      </div>
    </div>
  )
}

/* ── main about section ── */
export function AboutSection() {
  return (
    <section id="how-it-works" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono shrink-0">
          {"// SECTION: HOW_IT_WORKS"}
        </span>
        <div className="flex-1 min-w-[3rem] border-t border-border" />
        <BlinkDot />
        <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono shrink-0">
          005
        </span>
      </motion.div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-0 border-2 border-foreground">
        {/* Left: code comparison */}
        <motion.div
          initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="w-full lg:w-1/2"
        >
          <CodePanel />
        </motion.div>

        {/* Right: the ladder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-col w-full lg:w-1/2"
        >
          {/* Header bar */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-3 border-b-2 border-foreground">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              LADDER.md
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground font-mono">
              stop at first rung that holds
            </span>
          </div>

          {/* Content body */}
          <div className="flex-1 flex flex-col justify-between px-5 py-6 lg:py-8">
            <div className="flex flex-col gap-5">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: 0.2, ease }}
                className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance"
              >
                Climb the ladder
                <br />
                <span className="text-[#ea580c]">before you write anything</span>
              </motion.h2>

              <div className="flex flex-col gap-3">
                {RUNGS.map((rung, i) => (
                  <motion.div
                    key={rung.n}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.4, ease }}
                    className="flex items-start gap-3 border-t border-border pt-3"
                  >
                    <span className="flex items-center justify-center h-5 w-5 shrink-0 border border-foreground text-[10px] font-mono font-bold">
                      {rung.n}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-mono font-bold uppercase tracking-wide">
                        <ScrambleText text={rung.title} />
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground leading-relaxed">
                        {rung.body}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Safety floor line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, ease }}
              style={{ transformOrigin: "left" }}
              className="flex items-start gap-3 py-3 mt-6 border-t-2 border-foreground"
            >
              <span className="h-1.5 w-1.5 bg-[#ea580c] mt-1" />
              <span className="text-[10px] tracking-[0.05em] text-muted-foreground font-mono leading-relaxed">
                Never lazy about: input validation at trust boundaries, error handling that prevents
                data loss, security, accessibility, hardware calibration, and anything you explicitly
                request.
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
