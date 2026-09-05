<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code changes since 2026-08-24 — the last six commits are gitignore and memory updates
- `serve.cjs` restarted once since the last run: PID 130668 started 2026-09-05 07:40:44, HTTP 200 confirmed. It wrote **no** log pair — `logs/` still 704 files / 1.31 MB, newest pair `error-645`/`out-645` frozen at 2026-09-03 09:38

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts (15 on 2026-09-01, 13 on 2026-09-02, 4 on 2026-09-03, 1 on 2026-09-05) — logs are zero-byte or absent, so the trigger is outside the app
- [ ] Decide whether log-pair writing is worth repairing — the 2026-09-05 restart confirms restarts can leave no trace at all, so `logs/` is no longer a usable restart record
- [ ] Clean up stray untracked cruft: `logs/` (704 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
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
Last memory update: 2026-09-05
Commits covered through: ee087e9963b3fb98923e48119fa3228ccd51b6bc

<!-- chinvex:last-commit:ee087e9963b3fb98923e48119fa3228ccd51b6bc -->
