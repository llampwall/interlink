<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code changes since 2026-08-24 — the last seven commits are gitignore and memory updates
- `serve.cjs` restarted again: PID 112712 started 2026-09-05 10:34:23 (replacing PID 130668 from 07:40:44), HTTP 200 confirmed on port 8445. Second consecutive restart writing **no** log pair — `logs/` unchanged at 704 files / 1.31 MB, newest pair frozen at 2026-09-03 09:38

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts (15 on 2026-09-01, 13 on 2026-09-02, 4 on 2026-09-03, 2 on 2026-09-05) — logs are zero-byte or absent, so the trigger is outside the app
- [ ] Decide whether log-pair writing is worth repairing — two 2026-09-05 restarts left no trace, so `logs/` is no longer a usable restart record
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
Last memory update: 2026-09-06
Commits covered through: 77fadbf532c37b322aed3aca55627c0fd85028cf

<!-- chinvex:last-commit:77fadbf532c37b322aed3aca55627c0fd85028cf -->
