// Shared config resolution for the dietcode CLI.
// Mirrors hooks/dietcode-config.js: env var > config file > 'full'.
const fs = require('fs');
const path = require('path');
const os = require('os');

const VALID_MODES = ['off', 'lite', 'full', 'ultra'];
const DEFAULT_MODE = 'full';

function configDir() {
  if (process.env.XDG_CONFIG_HOME) return path.join(process.env.XDG_CONFIG_HOME, 'dietcode');
  if (process.platform === 'win32') {
    return path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'dietcode');
  }
  return path.join(os.homedir(), '.config', 'dietcode');
}

function configPath() {
  return path.join(configDir(), 'config.json');
}

function readConfig() {
  try {
    return JSON.parse(fs.readFileSync(configPath(), 'utf8'));
  } catch (e) {
    return {};
  }
}

function getMode() {
  const env = (process.env.DIETCODE_DEFAULT_MODE || '').toLowerCase();
  if (VALID_MODES.includes(env)) return env;
  const cfg = readConfig();
  const fromFile = (cfg.defaultMode || '').toLowerCase();
  if (VALID_MODES.includes(fromFile)) return fromFile;
  return DEFAULT_MODE;
}

function writeMode(mode) {
  const normalized = String(mode || '').toLowerCase();
  if (!VALID_MODES.includes(normalized)) {
    throw new Error(`invalid mode "${mode}" (use ${VALID_MODES.join('|')})`);
  }
  const cfg = readConfig();
  cfg.defaultMode = normalized;
  fs.mkdirSync(configDir(), { recursive: true });
  fs.writeFileSync(configPath(), JSON.stringify(cfg, null, 2) + '\n', 'utf8');
  return normalized;
}

module.exports = { VALID_MODES, DEFAULT_MODE, configDir, configPath, readConfig, getMode, writeMode };
