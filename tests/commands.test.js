#!/usr/bin/env node
// Every dietcode command must ship in both command surfaces: Claude Code /
// Gemini (commands/*.toml) and OpenCode (.opencode/command/*.md). A command in
// one place but not the other is drift; this guards it. The canonical set is
// the six documented commands.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const EXPECTED = [
  'dietcode',
  'dietcode-review',
  'dietcode-audit',
  'dietcode-debt',
  'dietcode-gain',
  'dietcode-help',
];

function listCommands(dir, ext) {
  return fs
    .readdirSync(path.join(root, dir))
    .filter((f) => f.endsWith(ext))
    .map((f) => f.slice(0, -ext.length))
    .sort();
}

test('all six documented commands ship a commands/*.toml', () => {
  for (const name of EXPECTED) {
    assert.ok(
      fs.existsSync(path.join(root, 'commands', `${name}.toml`)),
      `missing commands/${name}.toml`,
    );
  }
});

test('every commands/*.toml has a description and prompt', () => {
  for (const name of listCommands('commands', '.toml')) {
    const toml = fs.readFileSync(path.join(root, 'commands', `${name}.toml`), 'utf8');
    assert.match(toml, /^description\s*=/m, `${name}.toml missing description`);
    assert.match(toml, /^prompt\s*=/m, `${name}.toml missing prompt`);
  }
});

test('TOML and OpenCode command surfaces match exactly', () => {
  const toml = listCommands('commands', '.toml');
  const opencode = listCommands(path.join('.opencode', 'command'), '.md');
  assert.deepEqual(toml, opencode, 'commands/ and .opencode/command/ are out of sync');
  assert.deepEqual(toml, [...EXPECTED].sort());
});
