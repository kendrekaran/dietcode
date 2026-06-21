"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function FinalCtaSection() {
  return (
    <section className="w-full px-6 py-20 lg:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col items-center gap-4"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-balance px-2">
          Stop paying your agent to over-build.
        </h2>
        <p className="text-xs lg:text-sm text-muted-foreground font-mono">
          Free in under a minute.
        </p>
        <motion.a
          href="#install"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-0 bg-foreground text-background text-sm font-mono tracking-wider uppercase mt-4"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
            <ArrowRight size={16} strokeWidth={2} className="text-background" />
          </span>
          <span className="px-5 py-2.5">Install now</span>
        </motion.a>
      </motion.div>
    </section>
  )
}
