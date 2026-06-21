---
name: dietcode-help
description: "Quick reference for dietcode's modes, skills, and commands. One-shot display."
homepage: https://github.com/kendrekaran/dietcode
license: MIT
---

# DietCode Help

Display this reference card when invoked. One-shot, do NOT change mode,
write flag files, or persist anything.

## Levels

| Level | Trigger | What change |
|-------|---------|-------------|
| **Lite** | `/dietcode lite` | Build what's asked, name the lazier alternative in one line. |
| **Full** | `/dietcode` | The ladder enforced: YAGNI → stdlib → native → one line → minimum. Default. |
| **Ultra** | `/dietcode ultra` | YAGNI extremist. Deletion before addition. Challenges requirements before building. |

Level sticks until changed or session end.

## Skills

| Skill | Trigger | What it does |
|-------|---------|--------------|
| **dietcode** | `/dietcode` | Lazy mode itself. Simplest solution that works. |
| **dietcode-review** | `/dietcode-review` | Over-engineering review: `L42: yagni: factory, one product. Inline.` |
| **dietcode-audit** | `/dietcode-audit` | Whole-repo over-engineering audit, ranked biggest cut first. |
| **dietcode-debt** | `/dietcode-debt` | Harvest `dietcode:` shortcut comments into a ledger. |
| **dietcode-gain** | `/dietcode-gain` | Measured-impact scoreboard: less code, less cost, more speed. |
| **dietcode-help** | `/dietcode-help` | This card. |

Codex uses `@dietcode`, `@dietcode-review`, and `@dietcode-help`; Claude Code
and OpenCode use the slash-command forms above (OpenCode ships `/dietcode` and
`/dietcode-review`).

## Deactivate

Say "stop dietcode" or "normal mode". Resume anytime with `/dietcode`.
`/dietcode off` also works.

## Configure Default Mode

Default mode = `full`, auto-active every session. Change it:

**Environment variable** (highest priority):
```bash
export DIETCODE_DEFAULT_MODE=ultra
```

**Config file** (`~/.config/dietcode/config.json`, Windows: `%APPDATA%\dietcode\config.json`):
```json
{ "defaultMode": "lite" }
```

Set `"off"` to disable auto-activation on session start, activate manually
with `/dietcode` when wanted.

Resolution: env var > config file > `full`.

## Update

Enable auto-update once: open `/plugin`, go to Marketplaces, pick dietcode, Enable auto-update. Claude Code then pulls new versions at startup (run `/reload-plugins` when it prompts). Manual refresh: `/plugin marketplace update dietcode` then `/reload-plugins`.

If `/plugin` is not recognized, your Claude Code is out of date. Update it (`npm install -g @anthropic-ai/claude-code@latest`, or `brew upgrade claude-code`) and restart. Other hosts use their own update flow.

## More

Full docs + examples: https://github.com/kendrekaran/dietcode
