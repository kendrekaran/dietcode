// `dietcode mode [lite|full|off]` — read or set the default mode.
// const license = require('../lib/license'); // Pro gate, on hold for the free launch.
const config = require('../lib/config');

function mode(level) {
  if (!level) {
    console.log(config.getMode());
    return 0;
  }
  const normalized = level.toLowerCase();
  // Pro gate, on hold for the free launch — ultra is not offered yet.
  // if (normalized === 'ultra' && !license.isPro()) {
  //   console.error('ultra mode is a DietCode Pro feature. lite and full are free.');
  //   console.error('Upgrade: https://dietcode.dev/pro   then: dietcode license activate <key>');
  //   return 1;
  // }
  if (normalized === 'ultra') {
    console.error('ultra mode is not available yet. Use lite or full.');
    return 1;
  }
  try {
    const written = config.writeMode(normalized);
    console.log(`default mode set to ${written} (${config.configPath()})`);
    return 0;
  } catch (e) {
    console.error(e.message);
    return 1;
  }
}

module.exports = mode;
