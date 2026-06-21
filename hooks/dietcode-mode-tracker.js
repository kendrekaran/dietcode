#!/usr/bin/env node
// dietcode — UserPromptSubmit hook to track which dietcode mode is active
// Inspects user input for /dietcode commands and writes mode to flag file

const { getDefaultMode, isDeactivationCommand } = require('./dietcode-config');
const { clearMode, setMode, writeHookOutput } = require('./dietcode-runtime');

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    // Strip UTF-8 BOM some shells prepend when piping (breaks JSON.parse)
    const data = JSON.parse(input.replace(/^\uFEFF/, ''));
    const prompt = (data.prompt || '').trim().toLowerCase();

    // Match /dietcode commands
    if (/^[/@$]dietcode/.test(prompt)) {
      const parts = prompt.split(/\s+/);
      const cmd = parts[0].replace(/^[@$]/, '/');
      const arg = parts[1] || '';

      let mode = null;

      if (cmd === '/dietcode-review' || cmd === '/dietcode:dietcode-review') {
        mode = 'review';
      } else if (cmd === '/dietcode' || cmd === '/dietcode:dietcode') {
        if (arg === 'lite') mode = 'lite';
        else if (arg === 'full') mode = 'full';
        else if (arg === 'ultra') mode = 'ultra';
        else if (arg === 'off') mode = 'off';
        else mode = getDefaultMode();
      }

      if (mode && mode !== 'off') {
        setMode(mode);
        writeHookOutput(
          'UserPromptSubmit',
          mode,
          'DIETCODE MODE CHANGED — level: ' + mode,
        );
      } else if (mode === 'off') {
        clearMode();
        writeHookOutput('UserPromptSubmit', 'off', 'DIETCODE MODE OFF');
      }
    }

    // Detect deactivation
    if (isDeactivationCommand(prompt)) {
      clearMode();
      writeHookOutput('UserPromptSubmit', 'off', 'DIETCODE MODE OFF');
    }
  } catch (e) {
    // Silent fail
  }
});
