// `dietcode doctor` — verify Node, config, rule files, and hook runnability.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const config = require('../lib/config');
// const license = require('../lib/license'); // Pro gate, on hold for the free launch.

const PKG_ROOT = path.join(__dirname, '..', '..', '..');

function check(label, ok, detail) {
  console.log(`${ok ? 'ok  ' : 'XX  '}${label}${detail ? '  ' + detail : ''}`);
  return ok ? 0 : 1;
}

function doctor() {
  let failures = 0;

  const major = Number(process.versions.node.split('.')[0]);
  failures += check('node', major >= 18, `v${process.versions.node} (need >= 18)`);

  failures += check('config readable', true, `mode=${config.getMode()} (${config.configPath()})`);

  const ruleFiles = ['AGENTS.md', '.cursor/rules/dietcode.mdc', 'skills/dietcode/SKILL.md'];
  for (const rel of ruleFiles) {
    failures += check(`rule file ${rel}`, fs.existsSync(path.join(PKG_ROOT, rel)));
  }

  // Rule-copy invariant: run the repo's own checker if present.
  const checker = path.join(PKG_ROOT, 'scripts', 'check-rule-copies.js');
  if (fs.existsSync(checker)) {
    const r = spawnSync(process.execPath, [checker], { encoding: 'utf8' });
    failures += check('rule copies in sync', r.status === 0, (r.stdout || r.stderr || '').trim().split('\n').pop());
  }

  // Hook is runnable: SessionStart hook should exit 0.
  const activate = path.join(PKG_ROOT, 'hooks', 'dietcode-activate.js');
  if (fs.existsSync(activate)) {
    const r = spawnSync(process.execPath, [activate], { encoding: 'utf8', env: { ...process.env, DIETCODE_DEFAULT_MODE: 'off' } });
    failures += check('hooks runnable', r.status === 0);
  }

  // failures += check('license tier', true, license.tier());

  console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
  return failures ? 1 : 0;
}

module.exports = doctor;
