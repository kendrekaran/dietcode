"use client"

import { useEffect, useState } from "react"

const MODES = [
  { name: "lite", status: "ACTIVE", behavior: "Name the lazier alt" },
  { name: "full", status: "DEFAULT", behavior: "Ladder enforced" },
  { name: "off", status: "STANDBY", behavior: "Disabled" },
]

export function StatusCard() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2">
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
          modes.status
        </span>
        <span className="text-[10px] tracking-widest text-muted-foreground">
          {`TICK:${String(tick).padStart(4, "0")}`}
        </span>
      </div>
      <div className="flex-1 flex flex-col p-4 gap-0">
        {/* Table header */}
        <div className="grid grid-cols-3 gap-2 border-b border-border pb-2 mb-2">
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Mode</span>
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Status</span>
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground text-right">Behavior</span>
        </div>
        {MODES.map((mode) => (
          <div
            key={mode.name}
            className="grid grid-cols-3 gap-2 py-2 border-b border-border last:border-none"
          >
            <span className="text-[10px] sm:text-xs font-mono text-foreground">{mode.name}</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0"
                style={{
                  backgroundColor: mode.status === "STANDBY" ? "hsl(var(--muted-foreground))" : "#ea580c",
                }}
              />
              <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">{mode.status}</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-foreground text-right">{mode.behavior}</span>
          </div>
        ))}
        {/* Command hint */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
              Switch mode
            </span>
          </div>
          <div className="border border-foreground px-2 py-1.5">
            <span className="text-[10px] font-mono text-foreground">/dietcode lite|full|off</span>
          </div>
        </div>
      </div>
    </div>
  )
}
