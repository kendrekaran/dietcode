"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const HOSTS = [
  {
    id: "claude",
    label: "Claude Code",
    lines: ["/plugin marketplace add kendrekaran/dietcode", "/plugin install dietcode"],
  },
  {
    id: "cursor",
    label: "Cursor",
    lines: ["dietcode init cursor", "# or copy from github.com/kendrekaran/dietcode"],
  },
  {
    id: "codex",
    label: "Codex",
    lines: ["# ships .codex-plugin/plugin.json + hooks", "@dietcode, @dietcode-review, @dietcode-help"],
  },
  {
    id: "copilot",
    label: "Copilot CLI",
    lines: ["# point Copilot at this repo's .github/plugin/", "# commands, skills, and hooks/copilot-hooks.json"],
  },
  {
    id: "generic",
    label: "Windsurf / Cline / Kiro",
    lines: [
      "Windsurf → .windsurf/rules/dietcode.md",
      "Cline → .clinerules/dietcode.md",
      "Kiro → .kiro/steering/dietcode.md",
      "Any AGENTS.md-aware agent → AGENTS.md",
    ],
  },
]

export function InstallSection() {
  const [active, setActive] = useState(HOSTS[0].id)
  const activeHost = HOSTS.find((h) => h.id === active) ?? HOSTS[0]

  return (
    <section id="install" className="w-full px-6 py-20 lg:px-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: INSTALL"}
        </span>
        <div className="flex-1 border-t border-border" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col gap-2 mb-10"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase">
          Install for your agent
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground">
          One ruleset, every host. Pick yours.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="border-2 border-foreground"
      >
        <div className="flex flex-wrap border-b-2 border-foreground">
          {HOSTS.map((host) => (
            <button
              key={host.id}
              onClick={() => setActive(host.id)}
              className={`px-4 py-3 text-xs font-mono tracking-wide uppercase border-r-2 border-foreground last:border-r-0 transition-colors duration-150 ${
                active === host.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {host.label}
            </button>
          ))}
        </div>
        <div className="bg-foreground p-5">
          <div className="flex flex-col gap-1">
            {activeHost.lines.map((line, i) => (
              <span key={i} className="text-xs font-mono text-background leading-relaxed">
                {line.startsWith("#") ? <span className="text-background/40">{line}</span> : line}
              </span>
            ))}
          </div>
        </div>
        <div className="px-5 py-3 border-t-2 border-foreground">
          <p className="text-[11px] font-mono text-muted-foreground">
            Prefer one command for everything?{" "}
            <code className="px-1 border border-border">npm install -g @diet-code/cli</code> then{" "}
            <code className="px-1 border border-border">dietcode init &lt;host&gt;</code>.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
