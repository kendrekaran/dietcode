# Examples

The same everyday task, answered with no skill (`## Without DietCode`) and with DietCode (`## With DietCode`), so you can compare side by side. The benchmark-sourced ones (debounce, email, CSV, countdown, rate limit) are taken from real model output; the platform-native ones show where a built-in replaces a dependency.

Reproduce the benchmark arms yourself: `npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml`. Method, models, and median numbers live in [`../benchmarks/`](../benchmarks/).

| Example | Without (LOC) | With (LOC) |
|---|--:|--:|
| [Email Validation](email-validation.md) | 75 | 3 |
| [Debounce](debounce.md) | 116 | 10 |
| [CSV Sum](csv-sum.md) | 20 | 3 |
| [Countdown Timer](react-countdown.md) | 267 | 9 |
| [Rate Limiting](rate-limit.md) | 128 | 10 |

Platform-native swaps (1 dependency → 0):

- [Deep Clone](deep-clone.md) — `structuredClone`
- [Group By](group-by.md) — `Object.groupBy`
- [Number Formatting](number-formatting.md) — `Intl.NumberFormat`
- [URL Parameters](url-params.md) — `URLSearchParams`
- [Infinite Scroll](infinite-scroll.md) — `IntersectionObserver`
- [Modal Dialog](modal-dialog.md) — native `<dialog>`
