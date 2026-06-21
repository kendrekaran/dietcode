# Results

Published benchmark runs land here, one Markdown file per run, named `YYYY-MM-DD-<topic>.md`.

Each writeup should record: date, models, runs per cell (`n`), the arms compared, the raw median tables (code LOC, cost, latency), and an honest read of what the numbers do and do not show. Reproduce any run from [`../README.md`](../README.md) (single-shot) or [`../agentic/README.md`](../agentic/README.md) (agentic).

No runs are committed yet for DietCode v0.1.0. Generate one with:

```bash
npx promptfoo@latest eval -c ../promptfooconfig.yaml --env-file ../../.env --repeat 10
npx promptfoo@latest share
```
