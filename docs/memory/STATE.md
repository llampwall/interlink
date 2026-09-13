<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code changes since 2026-08-24 — the last ten commits are gitignore and memory updates
- `serve.cjs` restarted at least twice on 2026-09-12; current PID 67948 owns port 8445 (started 2026-09-12 15:16:26). The ~3-day pair-writing silence ended — `logs/` now 718 files / 1,378,555 bytes, newest pair `error-7`/`out-7` at 2026-09-12 11:17:19 (counter reset 23 → 7, both files zero-byte)

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts (15 on 2026-09-01, 13 on 2026-09-02, 4 on 2026-09-03, 2 on 2026-09-05, 2 on 2026-09-06, 4 on 2026-09-07, 3 on 2026-09-08, ≥1 unlogged 09-09..09-11, ≥2 on 2026-09-12) — every pair is zero-byte, so the trigger is outside the app
- [ ] Make the restart trigger observable — capture stdout/stderr somewhere non-empty; pair writing is intermittent, so process start time on port 8445 is the only reliable signal
- [ ] Clean up stray untracked cruft: `logs/` (718 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
- [ ] Re-confirm Fetch extraction end-to-end through cloudflared tunnel post-Vite-migration

## Quick Reference
- Dev: `npm run dev`
- Build: `npm run build:production` (Vite; then `node serve.cjs` to serve)
- Test: `npm test` (Vitest)
- Entry point: `src/index.tsx`

## Out of Scope (for now)
- Tauri desktop build (scripts present but not active focus)
- Expo/React Native WebView wrapper (`app/`, untracked since 2026-04) loading https://interlink.unkndlabs.com

---
Last memory update: 2026-09-12
Commits covered through: 93d607dee1e7c0e7f41dbdcfc102838bf9c1346e

<!-- chinvex:last-commit:93d607dee1e7c0e7f41dbdcfc102838bf9c1346e -->
