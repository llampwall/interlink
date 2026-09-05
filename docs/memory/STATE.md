<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code changes since 2026-08-24 — the last five commits are gitignore and memory updates
- Restart bursts still stopped: PID 107656 (started 2026-09-03 17:18:17) has owned port 8445 for ~30h, HTTP 200 confirmed. `logs/` unchanged at 704 files / 1.31 MB, newest pair `error-645`/`out-645` still 2026-09-03 09:38

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts in bursts (15 on 2026-09-01, 13 on 2026-09-02, 4 on 2026-09-03, 0 since) — all recent pairs are zero-byte, so the trigger is outside the app
- [ ] Confirm whether log-pair writing still works by checking `logs/` after the next real restart — the missing pairs since 2026-09-03 09:38 are explained by there being no restarts, not necessarily by logging being off
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
Last memory update: 2026-09-04
Commits covered through: 20a33f2f449a8358c4454df6029955e05044390b

<!-- chinvex:last-commit:20a33f2f449a8358c4454df6029955e05044390b -->
