"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

interface DocsSection {
  heading: string
  body: React.ReactNode
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function DocsContent({
  title,
  updated,
  sections,
}: {
  title: string
  updated: string
  sections: DocsSection[]
}) {
  const slugs = useRef(sections.map((s) => slugify(s.heading)))
  const [activeSlug, setActiveSlug] = useState(slugs.current[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSlug(visible.target.id)
      },
      { rootMargin: "-15% 0px -70% 0px" }
    )
    slugs.current.forEach((slug) => {
      const el = document.getElementById(slug)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="w-full px-6 py-16 lg:px-12">
      <div className="max-w-6xl mx-auto">
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

        <div className="mt-10 flex flex-col lg:flex-row gap-0 border-2 border-foreground">
          {/* Sidebar */}
          <nav className="lg:w-64 shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground bg-background">
            <div className="lg:sticky lg:top-6 overflow-x-auto lg:overflow-visible">
              <ul className="flex lg:flex-col lg:gap-0 px-2 py-2 lg:px-0 lg:py-4">
                {sections.map((section, i) => {
                  const slug = slugs.current[i]
                  const active = slug === activeSlug
                  return (
                    <li key={slug} className="shrink-0 lg:max-w-64">
                      <a
                        href={`#${slug}`}
                        className={`block max-w-[180px] whitespace-nowrap lg:max-w-full lg:whitespace-normal lg:break-words px-3 py-2 lg:px-5 text-xs font-mono uppercase tracking-wide leading-snug transition-colors duration-150 border-l-2 ${
                          active
                            ? "border-[#ea580c] text-foreground font-bold"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {section.heading}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {sections.map((section, i) => (
              <motion.div
                key={section.heading}
                id={slugs.current[i]}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.4, ease }}
                className={`px-5 py-6 lg:px-8 scroll-mt-6 ${
                  i < sections.length - 1 ? "border-b-2 border-foreground" : ""
                }`}
              >
                <h3 className="text-sm font-mono font-bold uppercase tracking-wide mb-3">
                  {section.heading}
                </h3>
                <div className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed [&_a]:text-foreground [&_a]:underline [&_strong]:text-foreground [&_code]:px-1 [&_code]:border [&_code]:border-border [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2 [&_pre]:bg-foreground [&_pre]:text-background [&_pre]:px-4 [&_pre]:py-3 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-border [&_p+p]:mt-3">
                  {section.body}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
