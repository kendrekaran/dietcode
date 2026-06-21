// `dietcode license <activate|status>` — manage the Pro license.
const license = require('../lib/license');

async function licenseCmd(sub, key) {
  switch ((sub || '').toLowerCase()) {
    case 'activate':
      try {
        const res = await license.activate(key);
        console.log(`Activated tier "${res.tier || 'pro'}"${res.expiresAt ? ` (expires ${res.expiresAt})` : ''}.`);
        if (res.stub) console.log('(local stub: DIETCODE_LICENSE_API_URL not set)');
        return 0;
      } catch (e) {
        console.error('Activation failed:', e.message);
        return 1;
      }
    case 'status': {
      const lic = license.read();
      console.log(`tier: ${license.tier()}`);
      if (lic) {
        if (lic.expiresAt) console.log(`expires: ${lic.expiresAt}`);
        if (lic.verifiedAt) console.log(`last verified: ${new Date(lic.verifiedAt).toISOString()}`);
      } else {
        console.log('No license on file. Pro: https://dietcode.dev/pro');
      }
      return 0;
    }
    default:
      console.error('usage: dietcode license <activate <key>|status>');
      return 1;
  }
}

module.exports = licenseCmd;
