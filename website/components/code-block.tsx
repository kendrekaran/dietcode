"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <pre className="relative group">
      <button
        onClick={handleCopy}
        aria-label="Copy command"
        className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 border border-background/20 bg-foreground text-background/70 hover:text-background hover:border-background/40 transition-colors duration-150"
      >
        {copied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} strokeWidth={2} />}
      </button>
      <code>{children}</code>
    </pre>
  )
}
