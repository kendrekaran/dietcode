import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { GeistPixelGrid } from 'geist/font/pixel'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dietcode.dev'),
  title: 'Diet Code — Lazy senior dev mode for AI coding agents',
  description:
    'Diet Code makes Claude Code, Cursor, Copilot, Codex and other AI agents climb a ladder before writing code: YAGNI, stdlib, native, existing deps, one line — only then write the minimum that works. 80–94% less code, 47–77% less cost.',
  keywords: [
    'AI coding agent',
    'Claude Code plugin',
    'Cursor rules',
    'YAGNI',
    'token cost',
    'AI code review',
    'overengineering',
    'AGENTS.md',
    'AI agent skill',
  ],
  authors: [{ name: 'Diet Code' }],
  creator: 'Diet Code',
  publisher: 'Diet Code',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Diet Code — Lazy senior dev mode for AI coding agents',
    description:
      'The best code is the code your agent never writes. Diet Code cuts 80–94% of unnecessary code and 47–77% of token cost across Claude, GPT, and more.',
    url: 'https://dietcode.dev/',
    siteName: 'Diet Code',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diet Code — Lazy senior dev mode for AI coding agents',
    description:
      'Stop your AI agent from over-building. YAGNI, stdlib, native, existing deps, one line — then code. 80–94% less code, 47–77% less cost.',
    images: ['/og-image.png'],
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#F2F1EA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${GeistPixelGrid.variable}`} suppressHydrationWarning>
      <body className="font-mono antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Diet Code',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'macOS, Linux, Windows',
              description:
                'Diet Code is a rule/skill set that makes AI coding agents climb a YAGNI-first ladder before writing code, cutting unnecessary code and token cost.',
              offers: [{ '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' }],
              url: 'https://dietcode.dev/',
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
