# Email Validation

**Task:** "Write me a Python function that validates email addresses."

Model output from a benchmark run, no-skill arm vs DietCode arm. Reproduce: `npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml`.

## Without DietCode, 75 lines of code

A regex validator with a docstring and test harness, then a "more robust" version with length checks, local-part rules, and consecutive-dot detection, then a third version recommending the `email-validator` library, then a comparison table:

```python
import re

def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

# ...plus validate_email_advanced() with 8 branch checks,
# ...plus a validate_email_production() wrapper around a pip dependency,
# ...plus a pros/cons table for all three.
```

## With DietCode, 3 lines of code

```python
import re

def is_valid_email(email: str) -> bool:
    return bool(re.match(r'^[^@]+@[^@]+\.[^@]+$', email))
```

Skipped: RFC 5322 parser, DNS MX lookup, confirmation email. Add when you actually need to reject `user+tag@sub.domain.co.uk` or catch typos; until then, this catches 99% of "oops I fat-fingered it" cases.

**75 → 3 lines of code**, same model, same prompt.
