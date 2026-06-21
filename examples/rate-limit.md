# Rate Limiting

**Task:** "Add rate limiting to my FastAPI endpoint so users can't spam it."

Model output from a benchmark run, no-skill arm vs DietCode arm. Reproduce: `npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml`.

## Without DietCode, 128 lines of code

Four approaches "from simplest to most robust": `slowapi`, the `limits` library, a hand-rolled middleware with a request store and manual cleanup, and a Redis-backed distributed limiter, plus a comparison table and a testing section:

```python
from fastapi import FastAPI, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse

app = FastAPI()
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, lambda r, e: JSONResponse(
    status_code=429, content={"detail": "Rate limit exceeded"}))
# ...plus the limits version, a custom middleware, a Redis version, and a table.
```

## With DietCode, 10 lines of code

```python
from fastapi import FastAPI, HTTPException
from slowapi import Limiter
from slowapi.util import get_remote_address

app = FastAPI()
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.get("/api/endpoint")
@limiter.limit("10/minute")
async def my_endpoint(request):
    return {"status": "ok"}
```

Skipped: custom rate limit logic, Redis, sliding windows. `slowapi` handles it. Add when: you need distributed rate limiting across servers (swap `Limiter` for a Redis backend) or per-user limits (`key_func=lambda r: r.headers.get("authorization")`).

**128 → 10 lines of code**, same model, same prompt.
