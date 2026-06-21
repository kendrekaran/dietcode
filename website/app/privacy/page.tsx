import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalContent } from "@/components/legal-content"

export const metadata: Metadata = {
  title: "Privacy Policy — Diet Code",
  description:
    "Diet Code privacy policy: what license, billing, and local configuration data we collect — and the source code, prompts, and conversations we never see.",
  alternates: { canonical: "/privacy" },
}

const SECTIONS = [
  {
    heading: "What this covers",
    body: (
      <p>
        This policy explains what data Diet Code (&quot;we&quot;, &quot;us&quot;) collects when you
        use the free rule files, the CLI, or a paid plan, and how that data is handled.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <ul>
        <li>
          <strong>License data:</strong> when you activate a Pro/Team license key, the CLI sends the
          key and a non-identifying machine fingerprint (a one-way hash of hostname, platform, and
          architecture) to our license server for verification. We store the key, plan tier, and
          expiry date.
        </li>
        <li>
          <strong>Billing data:</strong> payments are handled entirely by Paddle.com, our merchant of
          record. We do not receive or store your card details. Paddle may collect your name, email,
          and billing address to process the transaction and applicable tax — see Paddle&apos;s own
          privacy policy for details.
        </li>
        <li>
          <strong>Local configuration:</strong> your selected mode and license cache are stored
          locally on your machine (<code>~/.config/dietcode/</code>) and are not transmitted to us
          except during license verification.
        </li>
        <li>
          <strong>No code or prompts:</strong> Diet Code is a rule/instruction file read by your AI
          coding agent (Claude Code, Cursor, etc.). We do not see, log, or store your source code,
          prompts, or conversations — those stay between you and your AI provider.
        </li>
      </ul>
    ),
  },
  {
    heading: "How we use data",
    body: (
      <p>
        Solely to verify licenses, provide support, and process payments. We do not sell your data to
        third parties.
      </p>
    ),
  },
  {
    heading: "Third parties",
    body: (
      <p>
        We rely on Paddle.com for payment processing and tax compliance, and on standard
        infrastructure providers to run our license server. Each handles data under its own privacy
        policy.
      </p>
    ),
  },
  {
    heading: "Data retention",
    body: (
      <p>
        License records are retained for as long as your account is active and for a reasonable
        period afterward for billing and support records.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        You may request access to, correction of, or deletion of your license/account data at any
        time by contacting us at the address below.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about this policy: <a href="mailto:karankendreg@gmail.com">karankendreg@gmail.com</a>
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <LegalContent title="Privacy Policy" updated="20 June 2026" sections={SECTIONS} />
      </main>
      <Footer />
    </div>
  )
}
