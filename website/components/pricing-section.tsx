"use client"

import { ArrowRight, Check, Minus } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

/* ── blinking cursor indicator ── */
function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

/* ── mode config ── */
interface Mode {
  id: string
  name: string
  command: string
  tag: string | null
  description: string
  features: { text: string; included: boolean }[]
  cta: string
  highlighted: boolean
}

const MODES: Mode[] = [
  {
    id: "lite",
    name: "LITE",
    command: "/dietcode lite",
    tag: null,
    description: "Build what's asked. The agent names the lazier alternative in one line.",
    features: [
      { text: "Builds the requested feature", included: true },
      { text: "Notes a lazier alternative", included: true },
      { text: "Stdlib-first suggestions", included: true },
      { text: "Ladder enforced before writing", included: false },
      { text: "Blocks speculative abstractions", included: false },
    ],
    cta: "USE LITE",
    highlighted: false,
  },
  {
    id: "full",
    name: "FULL",
    command: "/dietcode full",
    tag: "DEFAULT",
    description: "The ladder enforced. Stdlib and native first, then minimum code.",
    features: [
      { text: "Builds the requested feature", included: true },
      { text: "Notes a lazier alternative", included: true },
      { text: "Stdlib-first suggestions", included: true },
      { text: "Ladder enforced before writing", included: true },
      { text: "Blocks speculative abstractions", included: true },
    ],
    cta: "USE FULL",
    highlighted: true,
  },
  {
    id: "off",
    name: "OFF",
    command: "/dietcode off",
    tag: null,
    description: "Disabled. Your agent behaves exactly as it would without Diet Code.",
    features: [
      { text: "Builds the requested feature", included: true },
      { text: "Notes a lazier alternative", included: false },
      { text: "Stdlib-first suggestions", included: false },
      { text: "Ladder enforced before writing", included: false },
      { text: "Blocks speculative abstractions", included: false },
    ],
    cta: "DISABLE",
    highlighted: false,
  },
]

/* ── single mode card ── */
function ModeCard({ mode, index }: { mode: Mode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease }}
      className={`flex flex-col h-full ${
        mode.highlighted
          ? "border-2 border-foreground bg-foreground text-background"
          : "border-2 border-foreground bg-background text-foreground"
      }`}
    >
      {/* Card header */}
      <div
        className={`flex items-center justify-between px-5 py-3 border-b-2 ${
          mode.highlighted ? "border-background/20" : "border-foreground"
        }`}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono">
          {mode.name}
        </span>
        <div className="flex items-center gap-2">
          {mode.tag && (
            <span className="bg-[#ea580c] text-background text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono">
              {mode.tag}
            </span>
          )}
          <span className="text-[10px] tracking-[0.2em] font-mono opacity-50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Command block */}
      <div className="px-5 pt-6 pb-4">
        <div
          className={`border px-3 py-2 inline-block ${
            mode.highlighted ? "border-background/30" : "border-foreground"
          }`}
        >
          <span className="text-sm lg:text-base font-mono font-bold tracking-tight">
            {mode.command}
          </span>
        </div>
        <p
          className={`text-xs font-mono mt-3 leading-relaxed ${
            mode.highlighted ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          {mode.description}
        </p>
      </div>

      {/* Feature list */}
      <div
        className={`flex-1 px-5 py-4 border-t-2 ${
          mode.highlighted ? "border-background/20" : "border-foreground"
        }`}
      >
        <div className="flex flex-col gap-3">
          {mode.features.map((feature, fi) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.3 + fi * 0.04, duration: 0.35, ease }}
              className="flex items-start gap-3"
            >
              {feature.included ? (
                <Check
                  size={12}
                  strokeWidth={2.5}
                  className="mt-0.5 shrink-0 text-[#ea580c]"
                />
              ) : (
                <Minus
                  size={12}
                  strokeWidth={2}
                  className={`mt-0.5 shrink-0 ${
                    mode.highlighted ? "text-background/30" : "text-muted-foreground/40"
                  }`}
                />
              )}
              <span
                className={`text-xs font-mono leading-relaxed ${
                  feature.included
                    ? ""
                    : mode.highlighted
                    ? "text-background/30 line-through"
                    : "text-muted-foreground/40 line-through"
                }`}
              >
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 pt-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`group w-full flex items-center justify-center gap-0 text-xs font-mono tracking-wider uppercase ${
            mode.highlighted
              ? "bg-background text-foreground"
              : "bg-foreground text-background"
          }`}
        >
          <span className="flex items-center justify-center w-9 h-9 bg-[#ea580c]">
            <ArrowRight size={14} strokeWidth={2} className="text-background" />
          </span>
          <span className="flex-1 py-2.5">{mode.cta}</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ── main modes section ── */
export function PricingSection() {
  return (
    <section id="modes" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono shrink-0">
          {"// SECTION: MODES"}
        </span>
        <div className="flex-1 min-w-[3rem] border-t border-border" />
        <BlinkDot />
        <span className="hidden sm:inline text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono shrink-0">
          006
        </span>
      </motion.div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground text-balance">
            Pick your intensity
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
            Switch with <code className="px-1 border border-border">/dietcode lite|full|off</code>, or just say
            &quot;stop dietcode&quot; / &quot;normal mode&quot;.
          </p>
        </div>
      </motion.div>

      {/* Mode grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {MODES.map((mode, i) => (
          <ModeCard key={mode.id} mode={mode} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease }}
        className="flex flex-col sm:flex-row sm:items-center gap-3 mt-6"
      >
        <span className="text-[10px] tracking-[0.05em] sm:tracking-[0.2em] uppercase text-muted-foreground font-mono leading-relaxed">
          {"* Diet Code is never lazy about validation, error handling, security, or accessibility."}
        </span>
        <div className="hidden sm:block flex-1 border-t border-border" />
      </motion.div>
    </section>
  )
}
