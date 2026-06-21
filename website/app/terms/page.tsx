import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalContent } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "Terms and Conditions — Diet Code",
  description:
    "Diet Code terms of service: licensing, subscriptions and billing via Paddle, refunds, acceptable use, warranty, and liability.",
  alternates: { canonical: "/terms" },
}

const SECTIONS = [
  {
    heading: "1. Agreement",
    body: (
      <p>
        By installing, accessing, or using Diet Code (the &quot;Software&quot;), you agree to these
        Terms. If you do not agree, do not use the Software.
      </p>
    ),
  },
  {
    heading: "2. License",
    body: (
      <p>
        The free tier (rule files, Cursor rule, lite/full modes) is provided under the MIT License —
        you may use, copy, and modify it freely. Paid tiers (Pro, Team, Enterprise) grant you a
        personal, non-transferable, non-exclusive license to use the corresponding plugin bundle,
        CLI, and skills for as long as your subscription is active. You may not resell, sublicense,
        or redistribute paid features, or share a license key beyond the seats you&apos;ve purchased.
      </p>
    ),
  },
  {
    heading: "3. Subscriptions and billing",
    body: (
      <p>
        Paid plans are billed monthly or annually in advance through Paddle.com, our merchant of
        record, who is responsible for collecting payment and remitting applicable taxes.
        Subscriptions renew automatically until cancelled. You can cancel at any time; access
        continues until the end of the current billing period.
      </p>
    ),
  },
  {
    heading: "4. Refunds",
    body: (
      <p>
        Refund requests are handled per Paddle&apos;s buyer policies. Contact us within 14 days of
        purchase if you are not satisfied, and we will work with Paddle to process eligible refunds.
        See our <a href="/refund">Refund Policy</a> for details.
      </p>
    ),
  },
  {
    heading: "5. Acceptable use",
    body: (
      <p>
        You agree not to: reverse-engineer the license verification system to bypass payment;
        redistribute Pro/Team/Enterprise content without authorization; or use the Software for any
        unlawful purpose.
      </p>
    ),
  },
  {
    heading: "6. No warranty",
    body: (
      <p>
        The Software is provided &quot;as is&quot;, without warranty of any kind. Diet Code is a set
        of instructions for an AI coding agent — it influences but does not control the output of
        that agent, and we make no guarantee about the correctness, security, or suitability of code
        generated while using it. You remain responsible for reviewing and testing any code before
        relying on it.
      </p>
    ),
  },
  {
    heading: "7. Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, Diet Code and its creator shall not be liable for any
        indirect, incidental, or consequential damages arising from use of the Software, including
        but not limited to lost profits, lost data, or damages from bugs introduced by AI-generated
        code.
      </p>
    ),
  },
  {
    heading: "8. Changes",
    body: (
      <p>
        We may update these Terms, the Privacy Policy, or pricing from time to time. Material changes
        will be reflected by updating the &quot;Last updated&quot; date above. Continued use after
        changes constitutes acceptance.
      </p>
    ),
  },
  {
    heading: "9. Termination",
    body: (
      <p>
        We may suspend or terminate access to paid features for breach of these Terms, including
        license key sharing or non-payment.
      </p>
    ),
  },
  {
    heading: "10. Governing law",
    body: (
      <p>
        These Terms are governed by the laws of India, without regard to conflict-of-law principles.
        Any dispute shall be subject to the exclusive jurisdiction of the courts of India.
      </p>
    ),
  },
  {
    heading: "11. Contact",
    body: (
      <p>
        Questions about these Terms: <a href="mailto:karankendreg@gmail.com">karankendreg@gmail.com</a>
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen dot-grid-bg overflow-x-hidden">
      <Navbar />
      <main>
        <LegalContent title="Terms and Conditions" updated="20 June 2026" sections={SECTIONS} />
      </main>
      <Footer />
    </div>
  )
}
