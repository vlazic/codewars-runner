# codewars-runner

## Project
Node.js project using npm. Lock file: `package-lock.json`. Default branch: `master`.

## Security patching (last patched: 2026-08-07)
- `axios` is a **direct** dependency — update in `package.json` with `npm install axios@<version>`.
  Note: axios is declared but **not imported anywhere** in the source (`new.js` scrapes with
  playwright). It carries a large advisory surface for zero benefit — consider removing it.
- `minimatch` is **transitive** (via jest, glob, npm-run-all) — resolved by `npm audit fix`
- `shell-quote` is **transitive** via `npm-run-all` 4.1.5, which has been unpublished and
  unmaintained since 2018 and pins a vulnerable range. It is held safe by an `overrides` entry.

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
  "vulnerable-pkg": "^<safe-version>"
}
```
Then run `npm install` and confirm with `npm ls <pkg>` that it reports `overridden`.

Use a **range** (`^1.9.0`), never an exact pin — exact pins go stale and silently become
vulnerable themselves.

### Verification (there is no build or lint script)
Do **not** run `npm test`: it wraps `jest --verbose --watch`, an interactive watch mode that
never exits. Verify with these instead:
```bash
npx jest --ci tests.spec.js   # single non-watch run
node --check new.js && node --check work.js
npx run-s test:create         # smoke-tests that npm-run-all still parses/spawns
```
`tests.spec.js` and `work.js` are **generated kata scratch files**. `work.js` is currently an
unimplemented stub, so all 8 tests fail with `undefined`. That is the expected baseline, not a
regression — always run the suite *before* changing deps so you can tell the two apart.

### Accepted risks
- None currently. `npm audit` reports 0 vulnerabilities.

Previously accepted and now resolved: `@tootallnate/once` 1.1.2 came in via jest 27 -> jsdom 16
-> http-proxy-agent 4. Upgrading to jest 29 dropped that whole chain (jest 29 defaults to the
`node` test environment and no longer pulls `jest-environment-jsdom`). The upgrade installed
without peer conflicts and left the test baseline unchanged.
