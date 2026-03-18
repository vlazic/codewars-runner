# codewars-runner

## Project
Node.js project using npm. Lock file: `package-lock.json`. Default branch: `master`.

## Security patching (last patched: 2026-03-04)
- `axios` is a **direct** dependency — update in `package.json` with `npm install axios@<version>`
- `minimatch` is **transitive** (via jest, glob, npm-run-all) — resolved by `npm audit fix`

### How to patch future vulnerabilities
```bash
npm audit                        # check for vulnerabilities
npm install <pkg>@<version>      # update direct deps
npm audit fix                    # fix transitive deps
npm audit fix --force            # if peer conflicts block audit fix (review breaking changes first)
npm audit                        # verify 0 vulnerabilities
```

If transitive deps can't be fixed by audit, add `"overrides"` in `package.json`:
```json
"overrides": {
  "vulnerable-pkg": "<safe-version>"
}
```
Then run `npm install` to apply.

### Accepted risks
- `@tootallnate/once` 1.1.2 (Low severity, CVE-2026-3449) — transitive via jest v27 -> jsdom 16 -> http-proxy-agent v4. Fix version 3.0.1 is a breaking major bump incompatible with http-proxy-agent v4. Proper fix requires upgrading jest from v27 to v29. Dev-only dependency.
