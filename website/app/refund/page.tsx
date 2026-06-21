import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Refund Policy — Diet Code",
  description:
    "Diet Code refund policy: 14-day money-back window on paid plans, how refunds are processed through Paddle, and what is eligible.",
  alternates: { canonical: "/refund" },
}

export default function RefundPage() {
  return (
    <div className="min-h-screen dot-grid-bg overflow-x-hidden">
      <Navbar />
      <main>
        <ComingSoon
          title="Refund Policy"
          message="There are no paid plans yet — Diet Code is currently free."
        />
      </main>
      <Footer />
    </div>
  )
}
