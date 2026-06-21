#!/usr/bin/env node

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const bin = path.join(root, 'cli', 'src', 'index.js');

function run(args, env = {}, cwd = process.cwd()) {
  return spawnSync(process.execPath, [bin, ...args], {
    env: { ...process.env, ...env },
    cwd,
    encoding: 'utf8',
  });
}

// Isolate config under a temp XDG dir; isolate file drops under a temp cwd.
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dietcode-cli-'));
const xdg = path.join(temp, 'config');
const project = path.join(temp, 'project');
fs.mkdirSync(project, { recursive: true });
const cleanEnv = { XDG_CONFIG_HOME: xdg, DIETCODE_DEFAULT_MODE: '', DIETCODE_LICENSE_API_URL: '' };

assert.equal(run(['help'], cleanEnv).status, 0);
assert.equal(run([], cleanEnv).status, 0);
assert.equal(run(['--version'], cleanEnv).stdout.trim().length > 0, true);
assert.equal(run(['frobnicate'], cleanEnv).status, 1);

assert.equal(run(['mode'], cleanEnv).stdout.trim(), 'full');
assert.equal(run(['mode', 'lite'], cleanEnv).status, 0);
assert.equal(run(['mode'], cleanEnv).stdout.trim(), 'lite');
assert.equal(JSON.parse(fs.readFileSync(path.join(xdg, 'dietcode', 'config.json'), 'utf8')).defaultMode, 'lite');

let ultra = run(['mode', 'ultra'], cleanEnv);
assert.equal(ultra.status, 1, 'ultra should be unavailable');
assert.match(ultra.stderr, /not available yet/);

assert.equal(run(['mode', 'bogus'], cleanEnv).status, 1);

let initCursor = run(['init', 'cursor'], cleanEnv, project);
assert.equal(initCursor.status, 0, initCursor.stderr);
assert.equal(fs.existsSync(path.join(project, '.cursor', 'rules', 'dietcode.mdc')), true);

assert.equal(run(['init', 'agents'], cleanEnv, project).status, 0);
assert.equal(fs.existsSync(path.join(project, 'AGENTS.md')), true);

let initClaude = run(['init', 'claude'], cleanEnv, project);
assert.equal(initClaude.status, 0);
assert.match(initClaude.stdout, /plugin marketplace add kendrekaran\/dietcode/);

let doctor = run(['doctor'], cleanEnv);
assert.match(doctor.stdout, /node/);

fs.rmSync(temp, { recursive: true, force: true });
console.log('cli.test.js ok');
