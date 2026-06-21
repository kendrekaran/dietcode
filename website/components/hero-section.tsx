"use client"

import { WorkflowDiagram } from "@/components/workflow-diagram"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  return (
    <section className="relative w-full px-12 pt-6 pb-12 lg:px-24 lg:pt-10 lg:pb-16">
      <div className="flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-2 text-[10px] lg:text-xs tracking-widest uppercase text-muted-foreground font-mono mb-4"
        >
          <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
          Works with Claude Code, Cursor, Copilot, Codex, Windsurf &amp; more
        </motion.span>

        {/* Top headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground mb-2 select-none"
        >
          PUT YOUR AGENT
        </motion.h1>

        {/* Central Workflow Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="w-full max-w-2xl my-4 lg:my-6"
        >
          <WorkflowDiagram />
        </motion.div>

        {/* Bottom headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground mb-4 select-none"
        >
          ON A DIET.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="text-xs lg:text-sm text-muted-foreground max-w-lg mb-2 leading-relaxed font-mono"
        >
          Diet Code is lazy senior dev mode for AI coding agents. Claude Code, Cursor, Copilot, and
          Codex climb a ladder before writing anything — then ship the minimum that works.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-[10px] lg:text-xs text-muted-foreground/70 font-mono mb-6"
        >
          MIT licensed core · install in under a minute · no telemetry on your code
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#how-it-works"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-0 bg-foreground text-background text-sm font-mono tracking-wider uppercase"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
            <motion.span
              className="inline-flex"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowRight size={16} strokeWidth={2} className="text-background" />
            </motion.span>
          </span>
          <span className="px-5 py-2.5">
            How it works
          </span>
        </motion.a>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease }}
          className="grid grid-cols-3 gap-0 border-2 border-foreground mt-10 w-full max-w-2xl"
        >
          {[
            { num: "80–94%", label: "less code written" },
            { num: "47–77%", label: "less token cost" },
            { num: "3–6×", label: "faster generations" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1 py-5 ${
                i < 2 ? "border-r-2 border-foreground" : ""
              }`}
            >
              <span className="text-xl lg:text-2xl font-mono font-bold text-[#ea580c]">{stat.num}</span>
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-mono text-center px-2">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
