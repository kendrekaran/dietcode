#!/usr/bin/env node
// @diet-code/cli — install rules, switch modes, run diagnostics.
const pkg = require('../package.json');

const HELP = `dietcode ${pkg.version} — lazy senior dev mode for AI agents

Usage:
  dietcode init <cursor|agents|windsurf|cline>   Drop the rule file into this project
  dietcode mode [lite|full|off]                  Show or set the default mode
  dietcode doctor                                Verify install (node, config, rules, hooks)
  dietcode help                                  This help

Free: AGENTS.md + Cursor rule + lite/full modes.
More: https://dietcode.dev`;

async function main(argv) {
  const [cmd, ...rest] = argv;
  switch (cmd) {
    case 'init':
      return require('./commands/init')(rest[0]);
    case 'mode':
      return require('./commands/mode')(rest[0]);
    case 'doctor':
      return require('./commands/doctor')();
    // Pro license management, on hold for the free launch.
    // case 'license':
    //   return require('./commands/license')(rest[0], rest[1]);
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      console.log(HELP);
      return 0;
    case '--version':
    case '-v':
      console.log(pkg.version);
      return 0;
    default:
      console.error(`unknown command: ${cmd}\n`);
      console.log(HELP);
      return 1;
  }
}

main(process.argv.slice(2))
  .then((code) => process.exit(code || 0))
  .catch((e) => { console.error(e.message); process.exit(1); });
