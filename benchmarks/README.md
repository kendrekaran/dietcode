# Benchmark

Two arms (no skill, dietcode), three models, five everyday tasks, **10 runs per cell, median reported**. Code LOC is counted from fenced code blocks; tokens, cost, and latency come straight from the API.

## Reproduce

### Claude (Haiku / Sonnet / Opus)

Requires an Anthropic API key and **Node.js ≥ 22.22.0** (promptfoo's engine constraint, check with `node --version` and upgrade if needed):

```bash
cp ../.env.example .env      # add your ANTHROPIC_API_KEY
npx promptfoo@latest eval -c promptfooconfig.yaml --env-file ../.env --repeat 10
npx promptfoo@latest view
```

`--env-file ../.env` is required because promptfoo reads `.env` from the current directory (`benchmarks/`), not the repo root where the file lives.

Tasks: email validator, JS debounce, CSV sum, React countdown, FastAPI rate-limit (see `promptfooconfig.yaml`). Single-shot completions, default temperature.

## Reference medians (single-shot)

Versus the no-skill baseline, the DietCode arm writes **80–94% less code**, costs **47–77% less**, and runs **3–6× faster** across Haiku, Sonnet, and Opus on these five tasks.

> **Read this number honestly.** The single-shot gap is measured against a bare model that answers with several options plus commentary, so it counts prose, not just code, and overstates the real-world win. The [agentic benchmark](agentic/) re-runs the comparison as a real Claude Code session on a seeded codebase: DietCode cuts most on features with an over-build trap (a custom component where a native input would do), is a wash on already-minimal code, never writes more, and stays safe while a bare "one-liner" prompt can drop a guard. That is the defensible number.

## Metrics

| File | Metric | Behavior |
|------|--------|----------|
| `loc.js` | `code_loc` | Measurement — always passes, records line count |
| `correctness.js` | `correct` | Gate — fails if generated code doesn't work |
| `behavior.js` | `behavior` | Gate — fails if the refined behavior is absent (see `behavior.yaml`) |

`correctness.js` extracts fenced code blocks and runs per-task checks (spawns Python/Node for email, debounce, CSV; structural regex for React and FastAPI). A broken one-liner that scores great on LOC will fail on correctness.

> **Note:** The React countdown and FastAPI rate-limit checks are keyword/structural only (no runtime execution), so they verify plausible structure rather than full correctness. The email, debounce, and CSV checks execute the code.

### Prerequisites

Running the benchmark requires **Python 3**, **pandas**, and **Node.js** (18+).

## Notes

- Cost reflects single-shot calls (one prompt, one completion), not real multi-turn agent sessions. In a session the ruleset re-injects and the ladder deliberates every turn, so per-session cost can come out higher or lower than these numbers. Treat these as generation numbers, not a session-cost promise.
- These are everyday tasks. For multi-file edits with an honest baseline, see [`agentic/`](agentic/).
