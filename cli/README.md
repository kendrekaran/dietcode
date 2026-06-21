# @diet-code/cli

Install and manage [DietCode](../README.md) — lazy senior dev mode — across your AI coding agents.

## Install

```bash
npm install -g @diet-code/cli
# or run without installing:
npx @diet-code/cli help
```

## Commands

| Command | What it does |
|---------|--------------|
| `dietcode init cursor` | Copy `.cursor/rules/dietcode.mdc` into the current project |
| `dietcode init agents` | Copy `AGENTS.md` into the current project |
| `dietcode init windsurf` / `cline` | Copy the matching rule file |
| `dietcode init claude` | Print Claude Code plugin install steps |
| `dietcode mode [lite\|full\|off]` | Show or set the default mode |
| `dietcode doctor` | Verify Node, config, and bundled rule files |

## Manual install (no npm)

Copy rule files from [github.com/kendrekaran/dietcode](https://github.com/kendrekaran/dietcode) into your project, or use raw GitHub URLs.
