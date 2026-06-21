// `dietcode init <target>` — drop the right rule file into the current project.
const fs = require('fs');
const path = require('path');

const PKG_ROOT = path.join(__dirname, '..', '..');
const BUNDLE_ROOT = path.join(PKG_ROOT, 'bundled');

function copyInto(srcRel, destRel) {
  const src = path.join(BUNDLE_ROOT, srcRel);
  if (!fs.existsSync(src)) {
    console.error(`missing bundled file: ${srcRel} (reinstall @diet-code/cli)`);
    return null;
  }
  const dest = path.join(process.cwd(), destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return dest;
}

function init(target) {
  switch ((target || '').toLowerCase()) {
    case 'cursor': {
      const dest = copyInto('.cursor/rules/dietcode.mdc', '.cursor/rules/dietcode.mdc');
      if (!dest) return 1;
      console.log(`Wrote ${path.relative(process.cwd(), dest)} (alwaysApply: true).`);
      return 0;
    }
    case 'agents': {
      const dest = copyInto('AGENTS.md', 'AGENTS.md');
      if (!dest) return 1;
      console.log(`Wrote ${path.relative(process.cwd(), dest)}.`);
      return 0;
    }
    case 'windsurf': {
      const dest = copyInto('.windsurf/rules/dietcode.md', '.windsurf/rules/dietcode.md');
      if (!dest) return 1;
      console.log(`Wrote ${path.relative(process.cwd(), dest)}.`);
      return 0;
    }
    case 'cline': {
      const dest = copyInto('.clinerules/dietcode.md', '.clinerules/dietcode.md');
      if (!dest) return 1;
      console.log(`Wrote ${path.relative(process.cwd(), dest)}.`);
      return 0;
    }
    case 'claude': {
      console.log('Install the DietCode plugin in Claude Code:');
      console.log('  /plugin marketplace add kendrekaran/dietcode');
      console.log('  /plugin install dietcode');
      console.log('Then reload: /reload-plugins');
      return 0;
    }
    default:
      console.error('usage: dietcode init <cursor|agents|windsurf|cline|claude>');
      return 1;
  }
}

module.exports = init;
