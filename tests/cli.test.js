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

// Isolate config/license under a temp XDG dir; isolate file drops under a temp cwd.
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dietcode-cli-'));
const xdg = path.join(temp, 'config');
const project = path.join(temp, 'project');
fs.mkdirSync(project, { recursive: true });
const cleanEnv = { XDG_CONFIG_HOME: xdg, DIETCODE_DEFAULT_MODE: '', DIETCODE_LICENSE_API_URL: '' };

// help + version exit 0
assert.equal(run(['help'], cleanEnv).status, 0);
assert.equal(run([], cleanEnv).status, 0);
assert.equal(run(['--version'], cleanEnv).stdout.trim().length > 0, true);

// unknown command exits 1
assert.equal(run(['frobnicate'], cleanEnv).status, 1);

// mode defaults to full, then can be set to lite/full/off
assert.equal(run(['mode'], cleanEnv).stdout.trim(), 'full');
assert.equal(run(['mode', 'lite'], cleanEnv).status, 0);
assert.equal(run(['mode'], cleanEnv).stdout.trim(), 'lite');
assert.equal(JSON.parse(fs.readFileSync(path.join(xdg, 'dietcode', 'config.json'), 'utf8')).defaultMode, 'lite');

// ultra is gated for free tier
let ultra = run(['mode', 'ultra'], cleanEnv);
assert.equal(ultra.status, 1, 'ultra should be gated without Pro');
assert.match(ultra.stderr, /Pro/);

// invalid mode rejected
assert.equal(run(['mode', 'bogus'], cleanEnv).status, 1);

// init cursor copies the rule file into cwd
let initCursor = run(['init', 'cursor'], cleanEnv, project);
assert.equal(initCursor.status, 0, initCursor.stderr);
assert.equal(fs.existsSync(path.join(project, '.cursor', 'rules', 'dietcode.mdc')), true);

// init agents copies AGENTS.md
assert.equal(run(['init', 'agents'], cleanEnv, project).status, 0);
assert.equal(fs.existsSync(path.join(project, 'AGENTS.md')), true);

// init claude gated for free tier
let initClaude = run(['init', 'claude'], cleanEnv, project);
assert.equal(initClaude.status, 1);
assert.match(initClaude.stderr, /Pro/);

// license status defaults to free
assert.match(run(['license', 'status'], cleanEnv).stdout, /tier: free/);

// license activate (local stub) unlocks pro, then ultra + init claude work
let activate = run(['license', 'activate', 'ts_live_' + 'a'.repeat(32)], cleanEnv);
assert.equal(activate.status, 0, activate.stderr);
assert.match(run(['license', 'status'], cleanEnv).stdout, /tier: pro/);
assert.equal(run(['mode', 'ultra'], cleanEnv).status, 0, 'ultra should work once Pro');
assert.equal(run(['init', 'claude'], cleanEnv, project).status, 0, 'init claude should work once Pro');

// bad license key rejected
assert.equal(run(['license', 'activate', 'not-a-key'], { ...cleanEnv, XDG_CONFIG_HOME: path.join(temp, 'config2') }).status, 1);

// doctor runs; exit code reflects health (0 expected on this repo)
let doctor = run(['doctor'], cleanEnv);
assert.match(doctor.stdout, /node/);

fs.rmSync(temp, { recursive: true, force: true });
console.log('cli.test.js ok');
