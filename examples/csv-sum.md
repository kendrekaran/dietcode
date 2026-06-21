# CSV Sum

**Task:** "Write Python code that reads sales.csv and sums the 'amount' column."

Model output from a benchmark run, no-skill arm vs DietCode arm. Reproduce: `npx promptfoo@latest eval -c benchmarks/promptfooconfig.yaml`.

## Without DietCode, 20 lines of code

A pandas version, a `csv`-module alternative, and a third pandas version with try/except for `FileNotFoundError` and `KeyError`, plus a paragraph arguing pandas is "recommended":

```python
import pandas as pd

df = pd.read_csv('sales.csv')
total_amount = df['amount'].sum()
print(f"Total amount: ${total_amount:,.2f}")
# ...plus a csv-module variant and a try/except variant.
```

## With DietCode, 3 lines of code

```python
import csv

total = sum(float(row['amount']) for row in csv.DictReader(open('sales.csv')))
print(total)
```

Skipped: pandas, error handling, file closing. Add when the CSV is large, malformed, or you need more analysis.

**20 → 3 lines of code**, same model, same prompt.
