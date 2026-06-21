"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const PRODUCT_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Modes", href: "#modes" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Docs", href: "/docs" },
]

const HOST_LINKS = [
  { label: "Claude Code", href: "#install" },
  { label: "Cursor", href: "#install" },
  { label: "Codex", href: "#install" },
  { label: "Copilot CLI", href: "#install" },
]

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund", href: "/refund" },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease }}
      className="w-full border-t-2 border-foreground px-6 py-12 lg:px-12"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 bg-foreground text-background text-[11px] font-bold">
              D
            </span>
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold text-foreground">
              Diet Code
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed max-w-[240px]">
            Lazy senior dev mode for AI coding agents. The best code is the code you never wrote.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Product
          </span>
          {PRODUCT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Hosts
          </span>
          {HOST_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Legal
          </span>
          {LEGAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:karankendreg@gmail.com"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mt-10 pt-6 border-t border-border">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          {"© 2026 Diet Code. MIT licensed (free tier)."}
        </span>
        <a
          href="mailto:karankendreg@gmail.com"
          className="text-[10px] font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          karankendreg@gmail.com
        </a>
      </div>
    </motion.footer>
  )
}
