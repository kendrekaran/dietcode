import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Pricing — Diet Code",
  description:
    "Diet Code pricing: Free (AGENTS.md + Cursor rule + lite/full modes), Pro (ultra mode, one CLI for every host), Team, and Enterprise.",
  alternates: { canonical: "/pricing" },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <ComingSoon
          title="Pricing"
          message="Pricing isn't live yet — Diet Code is currently free."
        />
      </main>
      <Footer />
    </div>
  )
}
