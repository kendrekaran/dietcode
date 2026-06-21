"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const LEFT_LABELS = ["YAGNI", "Stdlib", "Native"]
const RIGHT_LABELS = ["Deps", "One line", "Code"]
const ALL_LABELS = [...LEFT_LABELS, ...RIGHT_LABELS]

function PillLabel({
  label,
  x,
  y,
  delay,
}: {
  label: string
  x: number
  y: number
  delay: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0, x: x > 400 ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <rect
        x={x}
        y={y}
        width={80}
        height={26}
        rx={13}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth={1.5}
      />
      <text
        x={x + 40}
        y={y + 17}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        fontSize={10}
        fontFamily="var(--font-mono), monospace"
        fontWeight={500}
        letterSpacing="0.05em"
      >
        {label}
      </text>
    </motion.g>
  )
}

export function WorkflowDiagram() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[200px] w-full md:h-[200px]" />
  }

  const centerX = 400
  const centerY = 100

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      {/* Mobile: vertical ladder */}
      <div className="flex flex-col items-center gap-2 py-2 md:hidden" role="img" aria-label="The Diet Code ladder: YAGNI, Stdlib, Native, Deps, One line, Code">
        {ALL_LABELS.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="px-4 py-1.5 border border-foreground rounded-full text-[10px] font-mono tracking-wide uppercase">
              {label}
            </span>
            {i < ALL_LABELS.length - 1 && (
              <span className="text-muted-foreground text-xs">↓</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Desktop: radial diagram */}
      <svg
        viewBox="0 0 800 200"
        className="hidden md:block w-full h-auto"
        role="img"
        aria-label="The Diet Code ladder: YAGNI, Stdlib, Native, Deps, One line, Code"
      >
        {/* Left lines from center to left labels */}
        {LEFT_LABELS.map((_, i) => {
          const pillX = 60
          const pillY = 30 + i * 60
          return (
            <motion.line
              key={`left-line-${i}`}
              x1={centerX - 40}
              y1={centerY}
              x2={pillX + 80}
              y2={pillY + 13}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            />
          )
        })}

        {/* Right lines from center to right labels */}
        {RIGHT_LABELS.map((_, i) => {
          const pillX = 660
          const pillY = 30 + i * 60
          return (
            <motion.line
              key={`right-line-${i}`}
              x1={centerX + 40}
              y1={centerY}
              x2={pillX}
              y2={pillY + 13}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            />
          )
        })}

        {/* Data packets flowing along lines */}
        {LEFT_LABELS.map((_, i) => {
          const pillX = 60
          const pillY = 30 + i * 60
          return (
            <motion.circle
              key={`left-packet-${i}`}
              r={3}
              fill="#ea580c"
              initial={{ cx: pillX + 80, cy: pillY + 13 }}
              animate={{
                cx: [pillX + 80, centerX - 40],
                cy: [pillY + 13, centerY],
              }}
              transition={{
                duration: 1.8,
                delay: 0.8 + i * 0.6,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
            />
          )
        })}

        {RIGHT_LABELS.map((_, i) => {
          const pillX = 660
          const pillY = 30 + i * 60
          return (
            <motion.circle
              key={`right-packet-${i}`}
              r={3}
              fill="#ea580c"
              initial={{ cx: centerX + 40, cy: centerY }}
              animate={{
                cx: [centerX + 40, pillX],
                cy: [centerY, pillY + 13],
              }}
              transition={{
                duration: 1.8,
                delay: 1.2 + i * 0.6,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
            />
          )
        })}

        {/* Left pill labels */}
        {LEFT_LABELS.map((label, i) => (
          <PillLabel
            key={`left-${label}`}
            label={label}
            x={60}
            y={30 + i * 60}
            delay={0.1 + i * 0.1}
          />
        ))}

        {/* Right pill labels */}
        {RIGHT_LABELS.map((label, i) => (
          <PillLabel
            key={`right-${label}`}
            label={label}
            x={660}
            y={30 + i * 60}
            delay={0.1 + i * 0.1}
          />
        ))}

        {/* Center logo square */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <rect
            x={centerX - 36}
            y={centerY - 36}
            width={72}
            height={72}
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth={1.5}
          />
          {/* Abstract cross/flower logo shape */}
          <line x1={centerX} y1={centerY - 18} x2={centerX} y2={centerY + 18} stroke="hsl(var(--foreground))" strokeWidth={3} />
          <line x1={centerX - 18} y1={centerY} x2={centerX + 18} y2={centerY} stroke="hsl(var(--foreground))" strokeWidth={3} />
          <line x1={centerX - 12} y1={centerY - 12} x2={centerX + 12} y2={centerY + 12} stroke="hsl(var(--foreground))" strokeWidth={2} />
          <line x1={centerX + 12} y1={centerY - 12} x2={centerX - 12} y2={centerY + 12} stroke="hsl(var(--foreground))" strokeWidth={2} />
          {/* Pulsing ring */}
          <circle cx={centerX} cy={centerY} r={30} fill="none" stroke="#ea580c" strokeWidth={1}>
            <animate
              attributeName="r"
              values="30;34;30"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0.2;0.6"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </motion.g>
      </svg>
    </div>
  )
}
