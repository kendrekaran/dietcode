// `dietcode doctor` — verify Node, config, bundled rules, and optional monorepo checks.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const config = require('../lib/config');

const PKG_ROOT = path.join(__dirname, '..', '..');
const BUNDLE_ROOT = path.join(PKG_ROOT, 'bundled');
const REPO_ROOT = path.join(PKG_ROOT, '..');

function check(label, ok, detail) {
  console.log(`${ok ? 'ok  ' : 'XX  '}${label}${detail ? '  ' + detail : ''}`);
  return ok ? 0 : 1;
}

function doctor() {
  let failures = 0;

  const major = Number(process.versions.node.split('.')[0]);
  failures += check('node', major >= 18, `v${process.versions.node} (need >= 18)`);

  failures += check('config readable', true, `mode=${config.getMode()} (${config.configPath()})`);

  const bundled = [
    'AGENTS.md',
    '.cursor/rules/dietcode.mdc',
    '.windsurf/rules/dietcode.md',
    '.clinerules/dietcode.md',
  ];
  for (const rel of bundled) {
    failures += check(`bundled ${rel}`, fs.existsSync(path.join(BUNDLE_ROOT, rel)));
  }

  const checker = path.join(REPO_ROOT, 'scripts', 'check-rule-copies.js');
  if (fs.existsSync(checker)) {
    const r = spawnSync(process.execPath, [checker], { encoding: 'utf8' });
    failures += check('rule copies in sync', r.status === 0, (r.stdout || r.stderr || '').trim().split('\n').pop());
  }

  const activate = path.join(REPO_ROOT, 'hooks', 'dietcode-activate.js');
  if (fs.existsSync(activate)) {
    const r = spawnSync(process.execPath, [activate], {
      encoding: 'utf8',
      env: { ...process.env, DIETCODE_DEFAULT_MODE: 'off' },
    });
    failures += check('hooks runnable', r.status === 0);
  }

  console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
  return failures ? 1 : 0;
}

module.exports = doctor;
