import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DocsContent } from "@/components/docs-content"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Documentation — Diet Code",
  description:
    "Diet Code documentation: how the ladder works, the safety floor, installing for Claude Code, Cursor, Codex, Copilot CLI, Windsurf, Cline, Kiro and AGENTS.md-aware agents, mode switching, the CLI, and FAQ.",
  alternates: { canonical: "/docs" },
}

const SECTIONS = [
  {
    heading: "What is Diet Code",
    body: (
      <p>
        Diet Code is a rule/instruction set that makes AI coding agents climb a YAGNI-first ladder
        before writing any code. Instead of reaching straight for a new dependency or abstraction,
        the agent checks whether the feature needs to exist, whether the standard library or a
        native platform feature already does it, whether an already-installed dependency covers it,
        and whether it can be done in one line — only then does it write the minimum code that
        works.
      </p>
    ),
  },
  {
    heading: "The ladder",
    body: (
      <ol>
        <li>
          <strong>Does this need to exist?</strong> Speculative need = skip it and say so in one
          line. (YAGNI)
        </li>
        <li>
          <strong>Stdlib does it?</strong> Use it before reaching for anything else.
        </li>
        <li>
          <strong>Native platform feature?</strong> e.g. <code>&lt;input type=&quot;date&quot;&gt;</code> over a
          picker library, CSS over JS.
        </li>
        <li>
          <strong>Already-installed dependency?</strong> Use it. Never add a new one for what a few
          lines handle.
        </li>
        <li>
          <strong>Can it be one line?</strong> One line.
        </li>
        <li>
          <strong>Only then, write code.</strong> The least code that works — boring over clever.
        </li>
      </ol>
    ),
  },
  {
    heading: "Safety floor",
    body: (
      <p>
        Diet Code is never lazy about: input validation at trust boundaries, error handling that
        prevents data loss, security, accessibility, hardware calibration, and anything you
        explicitly request. The ladder only applies to incidental complexity — not to correctness or
        safety.
      </p>
    ),
  },
  {
    heading: "Installing — Claude Code",
    body: <CodeBlock>{"/plugin marketplace add kendrekaran/dietcode\n/plugin install dietcode"}</CodeBlock>,
  },
  {
    heading: "Installing — Cursor",
    body: (
      <CodeBlock>
        {"dietcode init cursor\n# or copy .cursor/rules/dietcode.mdc into your project"}
      </CodeBlock>
    ),
  },
  {
    heading: "Installing — Codex",
    body: (
      <p>
        Codex support ships as <code>.codex-plugin/plugin.json</code> plus hooks, exposing the
        commands <code>@dietcode</code>, <code>@dietcode-review</code>, and{" "}
        <code>@dietcode-help</code>.
      </p>
    ),
  },
  {
    heading: "Installing — Copilot CLI",
    body: (
      <p>
        Point Copilot at this repo&apos;s <code>.github/plugin/</code> directory — it ships commands,
        skills, and <code>hooks/copilot-hooks.json</code>.
      </p>
    ),
  },
  {
    heading: "Installing — Windsurf, Cline, Kiro, and AGENTS.md agents",
    body: (
      <ul>
        <li>
          Windsurf → <code>.windsurf/rules/dietcode.md</code>
        </li>
        <li>
          Cline → <code>.clinerules/dietcode.md</code>
        </li>
        <li>
          Kiro → <code>.kiro/steering/dietcode.md</code>
        </li>
        <li>
          Any AGENTS.md-aware agent (OpenCode, Gemini, etc.) → <code>AGENTS.md</code>
        </li>
      </ul>
    ),
  },
  {
    heading: "Installing — via the CLI",
    body: (
      <>
        <p>
          Prefer one command for everything? Install the CLI, then init it for your host, where{" "}
          <code>&lt;host&gt;</code> is one of <code>claude</code>, <code>cursor</code>,{" "}
          <code>codex</code>, <code>copilot</code>, <code>windsurf</code>, <code>cline</code>, or{" "}
          <code>kiro</code>.
        </p>
        <CodeBlock>{"npm install -g @diet-code/cli\ndietcode init <host>"}</CodeBlock>
      </>
    ),
  },
  {
    heading: "Modes",
    body: (
      <>
        <p>
          Switch modes with <code>/dietcode lite|full|off</code>, or just say &quot;stop
          dietcode&quot; / &quot;normal mode&quot; in the conversation.
        </p>
        <ul>
          <li>
            <strong>LITE</strong> (<code>/dietcode lite</code>) — builds what&apos;s asked, and the
            agent names a lazier alternative in one line. Stdlib-first suggestions, but the ladder
            isn&apos;t enforced and speculative abstractions aren&apos;t blocked.
          </li>
          <li>
            <strong>FULL</strong> (<code>/dietcode full</code>, default) — the ladder is enforced
            before writing: stdlib and native first, then minimum code, and speculative
            abstractions are blocked.
          </li>
          <li>
            <strong>OFF</strong> (<code>/dietcode off</code>) — disabled. Your agent behaves exactly
            as it would without Diet Code.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Benchmarks",
    body: (
      <p>
        Across measured sessions, Diet Code reduces the amount of code written by 80–94%, cuts
        token cost by 47–77%, and produces generations 3–6× faster, by stopping the agent from
        reaching for dependencies or abstractions a project doesn&apos;t need.
      </p>
    ),
  },
  {
    heading: "Privacy",
    body: (
      <p>
        Diet Code is a rule/instruction file your AI agent reads locally. We never see, log, or
        store your source code, prompts, or conversations. See the{" "}
        <a href="/privacy">Privacy Policy</a> for details.
      </p>
    ),
  },
  {
    heading: "FAQ",
    body: (
      <>
        <p>
          <strong>Does Diet Code see my code or prompts?</strong> No — see Privacy above.
        </p>
        <p>
          <strong>Will it skip validation, error handling, or security?</strong> No. The safety
          floor above is never skipped.
        </p>
        <p>
          <strong>Which agents does it support?</strong> Claude Code, Cursor, Codex, Copilot CLI,
          Windsurf, Cline, Kiro, OpenCode, Gemini, and any AGENTS.md-aware agent.
        </p>
        <p>
          <strong>Is the free tier actually usable, or a teaser?</strong> It&apos;s the full ladder
          behavior via the AGENTS.md rule and Cursor rule, in lite and full modes.
        </p>
      </>
    ),
  },
  {
    heading: "Support",
    body: (
      <p>
        Questions or issues: <a href="mailto:karankendreg@gmail.com">karankendreg@gmail.com</a>
      </p>
    ),
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <DocsContent title="Documentation" updated="22 June 2026" sections={SECTIONS} />
      </main>
      <Footer />
    </div>
  )
}
