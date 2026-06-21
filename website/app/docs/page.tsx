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
    heading: "Installing — npm CLI",
    body: (
      <>
        <p>
          The fastest path for Cursor, Windsurf, Cline, and AGENTS.md-aware agents. Published on{" "}
          <a href="https://www.npmjs.com/package/@diet-code/cli">npm as @diet-code/cli</a>.
        </p>
        <CodeBlock>
          {"npm install -g @diet-code/cli\ncd my-project\ndietcode init cursor    # or agents, windsurf, cline\ndietcode init claude    # prints Claude plugin steps\ndietcode doctor         # verify install"}
        </CodeBlock>
      </>
    ),
  },
  {
    heading: "Installing — Claude Code",
    body: (
      <>
        <p>
          Requires the public{" "}
          <a href="https://github.com/kendrekaran/dietcode">kendrekaran/dietcode</a> repo on GitHub.
        </p>
        <CodeBlock>{"/plugin marketplace add kendrekaran/dietcode\n/plugin install dietcode"}</CodeBlock>
      </>
    ),
  },
  {
    heading: "Installing — Cursor",
    body: (
      <>
        <CodeBlock>
          {"npm install -g @diet-code/cli\ndietcode init cursor"}
        </CodeBlock>
        <p className="mt-4">
          Manual alternative: copy{" "}
          <code>.cursor/rules/dietcode.mdc</code> from{" "}
          <a href="https://github.com/kendrekaran/dietcode">github.com/kendrekaran/dietcode</a> into
          your project.
        </p>
      </>
    ),
  },
  {
    heading: "Installing — Codex",
    body: (
      <p>
        Clone{" "}
        <a href="https://github.com/kendrekaran/dietcode">github.com/kendrekaran/dietcode</a>, add
        the <code>.codex-plugin/</code> directory as a plugin, then invoke{" "}
        <code>@dietcode</code>, <code>@dietcode-review</code>, and <code>@dietcode-help</code>.
      </p>
    ),
  },
  {
    heading: "Installing — Copilot CLI",
    body: (
      <p>
        Clone{" "}
        <a href="https://github.com/kendrekaran/dietcode">github.com/kendrekaran/dietcode</a> and
        point Copilot at the <code>.github/plugin/</code> directory — it ships commands, skills,
        and <code>hooks/copilot-hooks.json</code>.
      </p>
    ),
  },
  {
    heading: "Installing — Windsurf, Cline, Kiro, and AGENTS.md agents",
    body: (
      <>
        <CodeBlock>
          {"npm install -g @diet-code/cli\ndietcode init windsurf   # .windsurf/rules/dietcode.md\ndietcode init cline      # .clinerules/dietcode.md\ndietcode init agents     # AGENTS.md"}
        </CodeBlock>
        <p className="mt-4">
          Kiro: copy <code>.kiro/steering/dietcode.md</code> from{" "}
          <a href="https://github.com/kendrekaran/dietcode">GitHub</a>. OpenCode and Gemini also
          read <code>AGENTS.md</code> via <code>dietcode init agents</code>.
        </p>
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
          <strong>How do I install it?</strong> Run{" "}
          <code>npm install -g @diet-code/cli</code>, then <code>dietcode init &lt;host&gt;</code>.
          Package:{" "}
          <a href="https://www.npmjs.com/package/@diet-code/cli">@diet-code/cli on npm</a>.
        </p>
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
    <div className="min-h-screen dot-grid-bg overflow-x-hidden">
      <Navbar />
      <main>
        <DocsContent title="Documentation" updated="22 June 2026" sections={SECTIONS} />
      </main>
      <Footer />
    </div>
  )
}
