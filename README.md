# DietCode

**Lazy senior dev mode for AI coding agents.** The best code is the code you never wrote.

DietCode makes your agent climb a ladder before writing anything: does this even need to exist (YAGNI)? Does the standard library do it? A native platform feature? An already-installed dependency? Can it be one line? Only then write the minimum that works. Less code, less cost, fewer 3am pages.

## Before / after

**Without DietCode** — "add email validation":

```js
class EmailValidator {
  constructor(rules = DEFAULT_RULES) { this.rules = rules; }
  validate(email) { /* 30 lines of regex + TLD list + options */ }
}
```

**With DietCode:**

```js
const isEmail = (s) => s.includes("@") && s.includes(".");
// dietcode: format check only; the real validation is the confirmation email.
```

→ skipped: RFC-5322 regex, TLD list. Add when you actually parse addresses, not just gate signups.

## Install

### Claude Code

```
/plugin marketplace add kendrekaran/dietcode
/plugin install dietcode
```

### Codex

Add the plugin directory (ships `.codex-plugin/plugin.json` + `hooks/claude-codex-hooks.json`). Invoke skills with `@dietcode`, `@dietcode-review`, `@dietcode-help`.

### Copilot CLI

Point Copilot at this repo's `.github/plugin/` (commands, skills, and `hooks/copilot-hooks.json`).

### Cursor

Copy `.cursor/rules/dietcode.mdc` from [github.com/kendrekaran/dietcode](https://github.com/kendrekaran/dietcode) into your project's `.cursor/rules/`, or run `dietcode init cursor` (see [CLI](#cli)). The rule is `alwaysApply: true`.

### Windsurf / Cline / Kiro / generic agents

Copy the matching rule file from [github.com/kendrekaran/dietcode](https://github.com/kendrekaran/dietcode) into your project:

- Windsurf → `.windsurf/rules/dietcode.md`
- Cline → `.clinerules/dietcode.md`
- Kiro → `.kiro/steering/dietcode.md`
- Any AGENTS.md-aware agent → `AGENTS.md`

### OpenCode

```json
{ "plugin": ["./.opencode/plugins/dietcode.mjs"] }
```

### Gemini

Ships `gemini-extension.json` with `contextFileName: AGENTS.md`.

## Modes

| Mode | Behavior |
|------|----------|
| `lite` | Build what's asked; name the lazier alternative in one line. |
| `full` | The ladder enforced. Stdlib and native first. **Default.** |
| `ultra` | YAGNI extremist. Deletion before addition. Challenges the requirement. |
| `off` | Disabled. |

Switch with `/dietcode lite|full|ultra|off`, or say "stop dietcode" / "normal mode".

Set the default with the `DIETCODE_DEFAULT_MODE` env var or `~/.config/dietcode/config.json` (`{ "defaultMode": "lite" }`). Resolution: env var > config file > `full`.

## Commands

| Command | What it does |
|---------|--------------|
| `/dietcode [lite\|full\|ultra\|off]` | Switch intensity. |
| `/dietcode-review` | Review the current diff for over-engineering. |
| `/dietcode-audit` | Audit the whole repo for over-engineering. |
| `/dietcode-debt` | Harvest `dietcode:` shortcut comments into a ledger. |
| `/dietcode-gain` | Show the measured-impact scoreboard. |
| `/dietcode-help` | Command reference. |

## Safety floor

DietCode is never lazy about: input validation at trust boundaries, error handling that prevents data loss, security, accessibility, hardware calibration, and anything you explicitly request.

## CLI

The optional [`@diet-code/cli`](./cli/) automates the manual install steps above and manages modes.

```bash
npm install -g @diet-code/cli

dietcode init cursor      # copy the Cursor rule into this project
dietcode init agents      # copy AGENTS.md into this project
dietcode mode full        # set the default mode (lite/full are free)
dietcode doctor           # verify node, config, rule files, hooks
```

Config lives in `~/.config/dietcode/`. See [`docs/configuration.md`](./docs/configuration.md).

## Benchmarks

See [`benchmarks/`](./benchmarks/) for the harness and `benchmarks/results/` for published numbers. Headline medians: 80–94% less code, 47–77% less cost, 3–6× faster across 5 everyday tasks and 3 models.

<!-- Pricing section, on hold for the free launch — everything above is free for now.
## Pricing

Free tier covers `AGENTS.md` + Cursor rule + lite/full modes. Pro ($12/mo) adds `ultra`, the full plugin + hooks bundle, and the `dietcode-review` skill. See [`docs/pricing.md`](./docs/pricing.md).
-->

## Development

```bash
npm test                              # node --test
node scripts/check-rule-copies.js     # rule sync invariant
node scripts/build-openclaw-skills.js # regenerate OpenClaw skills
```

MIT licensed.
