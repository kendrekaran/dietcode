"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

interface LegalSection {
  heading: string
  body: React.ReactNode
}

export function LegalContent({
  title,
  updated,
  sections,
}: {
  title: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <section className="w-full px-6 py-16 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-4"
        >
          <a href="/" className="hover:text-foreground transition-colors">
            Home
          </a>{" "}
          / {title}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="text-2xl lg:text-4xl font-mono font-bold tracking-tight uppercase mb-2"
        >
          {title}
        </motion.h1>
        <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-mono">
          Last updated: {updated}
        </span>

        <div className="mt-10 border-2 border-foreground">
          {sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.4, ease }}
              className={`px-5 py-5 ${i < sections.length - 1 ? "border-b-2 border-foreground" : ""}`}
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wide mb-2">
                {section.heading}
              </h3>
              <div className="text-xs font-mono text-muted-foreground leading-relaxed [&_a]:text-foreground [&_a]:underline [&_strong]:text-foreground [&_code]:px-1 [&_code]:border [&_code]:border-border [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2">
                {section.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
