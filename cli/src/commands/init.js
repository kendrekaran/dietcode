// `dietcode init <target>` — drop the right rule file into the current project.
const fs = require('fs');
const path = require('path');
// const license = require('../lib/license'); // Pro gate, on hold for the free launch.

// Repo root that ships the rule/adapter files (cli/src/commands -> app/).
const PKG_ROOT = path.join(__dirname, '..', '..', '..');

function copyInto(srcRel, destRel) {
  const src = path.join(PKG_ROOT, srcRel);
  const dest = path.join(process.cwd(), destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return dest;
}

function init(target) {
  switch ((target || '').toLowerCase()) {
    case 'cursor': {
      const dest = copyInto('.cursor/rules/dietcode.mdc', '.cursor/rules/dietcode.mdc');
      console.log(`Wrote ${path.relative(process.cwd(), dest)} (alwaysApply: true).`);
      return 0;
    }
    case 'agents': {
      const dest = copyInto('AGENTS.md', 'AGENTS.md');
      console.log(`Wrote ${path.relative(process.cwd(), dest)}.`);
      return 0;
    }
    case 'windsurf':
      console.log(`Wrote ${path.relative(process.cwd(), copyInto('.windsurf/rules/dietcode.md', '.windsurf/rules/dietcode.md'))}.`);
      return 0;
    case 'cline':
      console.log(`Wrote ${path.relative(process.cwd(), copyInto('.clinerules/dietcode.md', '.clinerules/dietcode.md'))}.`);
      return 0;
    case 'claude': {
      // Full plugin + hooks bundle is a Pro feature, on hold for the free launch.
      // if (!license.isPro()) {
      //   console.error('The Claude Code plugin (hooks + skills bundle) is a DietCode Pro feature.');
      //   console.error('Upgrade: https://dietcode.dev/pro   then: dietcode license activate <key>');
      //   console.error('Free alternative: `dietcode init cursor` or `dietcode init agents`.');
      //   return 1;
      // }
      // console.log('Install the DietCode plugin in Claude Code:');
      // console.log('  /plugin marketplace add kendrekaran/dietcode');
      // console.log('  /plugin install dietcode');
      // console.log('Then reload: /reload-plugins');
      console.error('The Claude Code plugin bundle is not available yet.');
      console.error('Free alternative: `dietcode init cursor` or `dietcode init agents`.');
      return 1;
    }
    default:
      console.error('usage: dietcode init <cursor|agents|windsurf|cline|claude>');
      return 1;
  }
}

module.exports = init;
