#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repo = path.join(__dirname, '..', '..');
const out = path.join(__dirname, '..', 'bundled');

const files = [
  'AGENTS.md',
  '.cursor/rules/dietcode.mdc',
  '.windsurf/rules/dietcode.md',
  '.clinerules/dietcode.md',
];

for (const rel of files) {
  const dest = path.join(out, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(repo, rel), dest);
}

console.log(`bundled ${files.length} rule files into cli/bundled/`);
