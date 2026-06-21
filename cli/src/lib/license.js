// License handling for the dietcode Pro gate.
//
// Verify flow: POST { key, machineId } to DIETCODE_LICENSE_API_URL, cache the
// successful response in ~/.config/dietcode/license.json with a 7-day offline
// grace window. No API URL set? activation is stubbed locally so the OSS build
// still works end-to-end (any ts_live_/ts_team_ key activates a dev license).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const { configDir } = require('./config');

const GRACE_MS = 7 * 24 * 60 * 60 * 1000;

function licensePath() {
  return path.join(configDir(), 'license.json');
}

// Stable, non-identifying machine fingerprint for the verify call.
function machineId() {
  return crypto.createHash('sha256').update(os.hostname() + os.platform() + os.arch()).digest('hex');
}

function read() {
  try {
    return JSON.parse(fs.readFileSync(licensePath(), 'utf8'));
  } catch (e) {
    return null;
  }
}

function save(payload) {
  fs.mkdirSync(configDir(), { recursive: true });
  fs.writeFileSync(licensePath(), JSON.stringify(payload, null, 2) + '\n', 'utf8');
}

function verifyRemote(key) {
  const url = process.env.DIETCODE_LICENSE_API_URL;
  if (!url) {
    // No backend configured — accept well-formed keys locally so the gate is testable.
    if (!/^ts_(live|team)_/.test(key)) throw new Error('invalid key format (expected ts_live_… or ts_team_…)');
    return Promise.resolve({ valid: true, tier: key.startsWith('ts_team_') ? 'team' : 'pro', expiresAt: null, stub: true });
  }
  const body = JSON.stringify({ key, machineId: machineId() });
  return fetch(url.replace(/\/$/, '') + '/v1/license/verify', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  }).then((r) => {
    if (!r.ok) throw new Error(`license server returned ${r.status}`);
    return r.json();
  });
}

async function activate(key) {
  if (!key) throw new Error('usage: dietcode license activate <key>');
  const res = await verifyRemote(key.trim());
  if (!res || !res.valid) throw new Error('license rejected by server');
  save({ key: key.trim(), tier: res.tier || 'pro', expiresAt: res.expiresAt || null, verifiedAt: Date.now() });
  return res;
}

// Current tier, honoring the offline grace window. Returns 'free' when no valid Pro license.
function tier() {
  const lic = read();
  if (!lic || !lic.tier || lic.tier === 'free') return 'free';
  if (lic.expiresAt && Date.parse(lic.expiresAt) < Date.now()) return 'free';
  if (lic.verifiedAt && Date.now() - lic.verifiedAt > GRACE_MS && !lic.stub) return 'free';
  return lic.tier;
}

function isPro() {
  return tier() !== 'free';
}

module.exports = { licensePath, machineId, read, activate, tier, isPro };
