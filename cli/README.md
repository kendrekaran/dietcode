# @dietcode/cli

Install and manage [DietCode](../README.md) — lazy senior dev mode — across your AI coding agents.

## Install

```bash
npm install -g @dietcode/cli
# or run without installing:
npx @dietcode/cli help
```

## Commands

| Command | What it does |
|---------|--------------|
| `dietcode init cursor` | Copy `.cursor/rules/dietcode.mdc` into the current project |
| `dietcode init agents` | Copy `AGENTS.md` into the current project |
| `dietcode init windsurf` / `cline` | Copy the matching rule file |
| `dietcode init claude` | Print Claude Code plugin install steps (**Pro**) |
| `dietcode mode [lite\|full\|ultra\|off]` | Show or set the default mode (`ultra` is **Pro**) |
| `dietcode doctor` | Verify Node, config, rule files, hook runnability |
| `dietcode license activate <key>` | Activate a Pro/Team license |
| `dietcode license status` | Show your current tier |

## Free vs Pro

| Feature | Free | Pro |
|---------|:----:|:---:|
| `AGENTS.md` + Cursor rule | ✅ | ✅ |
| lite + full modes | ✅ | ✅ |
| ultra mode | ❌ | ✅ |
| Full plugin + hooks bundle (`init claude`) | ❌ | ✅ |
| `dietcode-review` skill | ❌ | ✅ |
| Priority updates | ❌ | ✅ |

## License backend

Set `DIETCODE_LICENSE_API_URL` to point `license activate` at your verify endpoint (`POST /v1/license/verify` — see [`../docs/configuration.md`](../docs/configuration.md)). With no URL set, well-formed `ts_live_…` / `ts_team_…` keys activate locally so the OSS build works end to end.

Activations cache to `~/.config/dietcode/license.json` with a 7-day offline grace window.
