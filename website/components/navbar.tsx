"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Modes", href: "#modes" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Docs", href: "/docs" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full px-4 pt-4 lg:px-6 lg:pt-6"
    >
      <nav className="w-full border border-foreground/20 bg-background/80 backdrop-blur-sm px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span className="flex items-center justify-center w-5 h-5 bg-foreground text-background text-[11px] font-bold">
              D
            </span>
            <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold">
              Diet Code
            </span>
          </motion.a>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right side: theme toggle + CTA + mobile menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center gap-2 sm:gap-4"
          >
            <ThemeToggle />
            <motion.a
              href="#install"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:inline-flex bg-foreground text-background px-3 py-2 text-xs font-mono tracking-widest uppercase sm:px-4"
            >
              Install now
            </motion.a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 border border-foreground/30 text-foreground"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </motion.div>
        </div>

        {open && (
          <div className="md:hidden border-t border-foreground/20 mt-3 pt-3 flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#install"
              onClick={() => setOpen(false)}
              className="bg-foreground text-background px-4 py-2 text-xs font-mono tracking-widest uppercase text-center"
            >
              Install now
            </a>
          </div>
        )}
      </nav>
    </motion.div>
  )
}
