# Configuration

DietCode reads its default mode from one place, in this order (first hit wins):

1. **Environment variable** — `DIETCODE_DEFAULT_MODE=ultra`
2. **Config file** — `defaultMode` field (see below)
3. **Built-in default** — `full`

## Config file location

| Platform | Path |
|----------|------|
| `$XDG_CONFIG_HOME` set | `$XDG_CONFIG_HOME/dietcode/config.json` |
| macOS / Linux | `~/.config/dietcode/config.json` |
| Windows | `%APPDATA%\dietcode\config.json` |

```json
{
  "defaultMode": "full",
  "licenseKey": null
}
```

Set it without editing JSON by hand:

```bash
dietcode mode ultra      # writes defaultMode
dietcode mode            # prints the resolved mode
```

## Modes

| Mode | Behavior |
|------|----------|
| `off` | DietCode injects nothing |
| `lite` | Gentle nudge toward YAGNI / stdlib |
| `full` | Default. Full ladder + safety floor |
| `ultra` | Maximum frugality (**Pro**) |

## License

| Variable | Purpose |
|----------|---------|
| `DIETCODE_LICENSE_API_URL` | Base URL of your license server. `license activate` POSTs to `<url>/v1/license/verify`. |

Verify contract:

```
POST /v1/license/verify
Body:     { "key": "ts_live_...", "machineId": "sha256..." }
Response: { "valid": true, "tier": "pro", "expiresAt": "2026-07-01T00:00:00Z" }
```

The CLI caches a successful verify to `~/.config/dietcode/license.json` and honors a 7-day offline grace window. With no `DIETCODE_LICENSE_API_URL` set, well-formed `ts_live_…` / `ts_team_…` keys activate locally so the open-source build works end to end.
