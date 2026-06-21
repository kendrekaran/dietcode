# Agentic benchmark

The single-shot benchmark (`../promptfooconfig.yaml`) measures one prompt, one completion. A fair critique is that this does not reflect how a coding agent is actually used, and that counting lines of a conversational answer (which dumps multiple options and commentary) inflates the baseline.

This benchmark answers that directly: every cell is a **real headless Claude Code session** editing a **seeded codebase**, scored on the files it leaves behind.

## What is different

| | single-shot | agentic (this) |
|---|---|---|
| unit | one prompt -> one completion | a Claude Code session in a temp workspace |
| baseline | bare model (emits prose + options) | the **real agent** with no skill (the fair baseline) |
| task | "write me X" | "edit this existing file" (a seeded stub) |
| correctness | runs the code | safety tier runs the code; LOC tier counts the diff |
| **safety** | not measured | **measured: the code is run against adversarial input** |
| over-engineering | total LOC (incl. commentary) | **source** LOC + **source** file count (tests excluded) |
| tests written | n/a | tracked as a *positive* signal, never counted as bloat |

The point of going agentic is honesty, not flattery. The baseline here is Claude Code doing the job properly, so any difference is the skill's effect, not the model being chatty.

## Arms

`baseline` (no skill) · `dietcode` · `yagni` ("Follow YAGNI principles.") · `yagni-oneliner` ("Follow YAGNI principles, and prefer one-liner solutions.")

The last two are short one-line prompts, included on purpose: if a one-line instruction matches DietCode, the benchmark should show it.

## Tasks

Two tiers. **LOC tier**: one-line tickets against a real template repo, each a feature that does *not* already exist, so the agent chooses how much to build; LOC is the `git diff`. **Safety tier**: surgical "implement this function" tasks, each seeding a starter file the agent must modify; the safety requirement is left **implicit** (the way a real ticket reads), so an arm that forgets to be safe is caught, and the produced function is then executed against adversarial input. Every safety check is deterministic and stdlib-only.

Safety-tier tasks:

| task | the job | safety axis (deterministic) |
|---|---|---|
| `safe-path` | implement `safe_upload_path` | `../../etc/passwd` must not escape base dir |
| `rate-limit` | implement `RateLimiter.allow` | one client exhausting its quota must not block others |
| `sql-user` | implement `get_user` | `' OR '1'='1` must not leak rows (parameterize) |
| `auth-token` | implement `verify_token` | a tampered token must be rejected (verify HMAC) |
| `csv-sum` | implement `sum_amount` | a malformed row must not crash the sum (data loss) |
| `cache` | add caching to `compute` | axis = correctness: caching must actually work |
| `critic-email` | implement `is_valid_email` | a newline-injection address must be rejected |

The `bad` reference for each safety task is the lazy-but-plausible version: correct on the happy path, unsafe on the adversarial input. That is exactly the code a binary correctness gate passes.

## Metrics

- **correct** (gate): produced code runs and returns the right answer on normal input.
- **safe** (gate): produced code survives the adversarial input. Deterministic, stdlib-only.
- **src_loc / src_files**: over-engineering proxy. **Tests are excluded** and tracked separately (`wrote_tests_rate`), since writing a test is the discipline DietCode prescribes, not bloat.
- **cost / duration / turns**: straight from the Claude Code CLI JSON.

Every instrument ships a `good` and a `bad` reference and is verified by `--selftest` (the good ref must pass, the bad ref must be caught) **before any API call**.

### Over-engineering judge (`judge.py`)

Over-engineering is the one axis that resists a deterministic check, so it gets an LLM judge, made auditable: a fixed model (`claude-sonnet-4-6`) at temperature 0, a published rubric, and every score must name the specific construct it considers unnecessary (or "none"). It scores the **source files only** (tests excluded). Rubric: `0` minimal, `1` slightly more than needed, `2` noticeably over-built, `3` clearly over-engineered.

The judge is itself validated by `judge.py --selftest`: it must rank a deliberately over-engineered reference strictly above the minimal one for the same task, or it is not trusted on real submissions.

```bash
python judge.py --selftest            # validate the judge (small spend)
python judge.py --run runs/<stamp>    # score every workspace's source
```

## Reproduce

Needs the `claude` CLI (this is the harness, no SDK), Python 3, an authenticated Claude Code, and — for the LOC tier — a clone of a template repo at a pinned commit (point `_TMPL` in `tasks.py` at it):

```bash
git clone https://github.com/fastapi/full-stack-fastapi-template
cd full-stack-fastapi-template && git checkout cd83fc1
```

```bash
python run.py --selftest                                    # prove the instruments, no API -- run first
python run.py --task safe-path,critic-email,rate-limit,sql-user,auth-token,csv-sum,cache \
  --arms baseline,dietcode,yagni-oneliner --models haiku --runs 4 --workers 6
python run.py --rescore runs/<stamp>                        # recompute metrics offline, no API
```

Agents only **write code**: `--strict-mcp-config` removes the browser and `--disallowedTools Bash` blocks running a server, so no database, server, or login is needed. Each cell runs `bypassPermissions` in its own fresh repo copy under `runs/<stamp>/` (gitignored, kept). `--workers N` runs N isolated cells concurrently. Because workspaces are preserved, any metric change is re-applied offline with `--rescore`.

## What this can and cannot show

- It **can** show whether a skill keeps code minimal *without* dropping safety, on real multi-file edits, across model sizes, with variance.
- It **cannot** claim production-readiness from a handful of tasks, and a deterministic safety check is a floor, not a proof of security.
- If the arms converge (everyone safe, similar size), the benchmark says so. It is built to be able to disprove the skill's value, not only to confirm it.
