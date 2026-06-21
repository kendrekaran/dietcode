# Countdown Timer

**Task:** "Build me a countdown timer component in React that counts down from a given number of seconds."

Model output from a benchmark run, no-skill arm vs DietCode arm. Reproduce: `npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml`.

## Without DietCode, 267 lines of code

A basic timer with start/pause/reset, an "advanced" timer with `HH:MM:SS` formatting, progress bar, and completion callback, a reusable `useCountdown` hook, a `styled-components` version with animations, a CSS stylesheet, usage examples, and a feature checklist:

```jsx
import { useState, useEffect } from 'react';

export function CountdownTimer({ initialSeconds = 60 }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) setIsActive(false);
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  // ...plus AdvancedCountdownTimer, useCountdown, StyledCountdownTimer, CSS.
}
```

## With DietCode, 9 lines of code

```jsx
export function CountdownTimer({ seconds }) {
  const [remaining, setRemaining] = React.useState(seconds);

  React.useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => setRemaining(r => r - 1), 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  return <div>{remaining}s</div>;
}
```

Skipped: pause/resume, formatted display (mm:ss), sound on zero, styling. Add when needed.

**267 → 9 lines of code**, same model, same prompt.
