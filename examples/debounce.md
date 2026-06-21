# Debounce

**Task:** "Add debounce to a search input in vanilla JavaScript. It currently fires an API call on every keystroke."

Model output from a benchmark run, no-skill arm vs DietCode arm. Reproduce: `npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml`.

## Without DietCode, 116 lines of code

A reusable `debounce` utility, then an "enhanced version with loading state", then an "advanced" debounce with `cancel` and `immediate` options, then HTML scaffolding, a stylesheet, and a benefits table:

```javascript
function debounce(func, delay, options = {}) {
  let timeoutId, lastArgs;
  const debounced = function (...args) {
    lastArgs = args;
    clearTimeout(timeoutId);
    if (options.immediate && !timeoutId) func(...args);
    timeoutId = setTimeout(() => {
      if (!options.immediate) func(...lastArgs);
      timeoutId = null;
    }, delay);
  };
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
}
// ...plus loading-state handler, HTML, CSS, and a feature table.
```

## With DietCode, 10 lines of code

```javascript
const searchInput = document.querySelector('input[type="search"]');
let debounceTimer;

searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetch(`/api/search?q=${encodeURIComponent(e.target.value)}`)
      .then(r => r.json())
      .then(data => console.log(data)); // replace with your render
  }, 300);
});
```

Skipped: debounce utility function, class wrapper, config object. `setTimeout` + `clearTimeout` *is* the debounce. Add a utility when you need it on 3+ inputs.

**116 → 10 lines of code**, same model, same prompt.
