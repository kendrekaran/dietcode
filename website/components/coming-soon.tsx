"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function ComingSoon({ title, message }: { title: string; message: string }) {
  return (
    <section className="w-full px-6 py-24 lg:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="max-w-lg mx-auto flex flex-col items-center gap-4 border-2 border-foreground px-8 py-12"
      >
        <h1 className="text-xl lg:text-2xl font-mono font-bold tracking-tight uppercase">
          {title}
        </h1>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
          {message}
        </p>
        <a
          href="/"
          className="mt-2 text-xs font-mono tracking-widest uppercase text-[#ea580c] hover:underline"
        >
          ← Back home
        </a>
      </motion.div>
    </section>
  )
}
