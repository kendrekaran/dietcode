"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const ease = [0.22, 1, 0.36, 1] as const

const FAQS = [
  {
    q: "How do I install it?",
    a: "Run npm install -g @diet-code/cli, cd into your project, then dietcode init cursor (or agents, windsurf, cline). Claude Code users install via the plugin marketplace instead. See npmjs.com/package/@diet-code/cli.",
  },
  {
    q: "Does Diet Code see my code or prompts?",
    a: "No. Diet Code is a rule/instruction file your AI agent reads locally. We never see, log, or store your source code, prompts, or conversations.",
  },
  {
    q: "Will it skip validation, error handling, or security?",
    a: "No. The safety floor is explicit: input validation at trust boundaries, error handling that prevents data loss, security, accessibility, and hardware calibration are never skipped.",
  },
  {
    q: "Which agents does it support?",
    a: "Claude Code, Cursor, Codex, Copilot CLI, Windsurf, Cline, Kiro, OpenCode, Gemini, and any AGENTS.md-aware agent.",
  },
  {
    q: "Is the free tier actually usable, or a teaser?",
    a: "It's the full ladder behavior via the AGENTS.md rule and Cursor rule, in lite and full modes.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="w-full px-6 py-20 lg:px-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono shrink-0">
          {"// SECTION: FAQ"}
        </span>
        <div className="flex-1 min-w-[3rem] border-t border-border" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase mb-10"
      >
        FAQ
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="border-2 border-foreground"
      >
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className={`border-foreground px-5 ${i < FAQS.length - 1 ? "border-b-2" : ""}`}
            >
              <AccordionTrigger className="text-left text-xs lg:text-sm font-mono font-bold uppercase tracking-wide hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs font-mono text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
