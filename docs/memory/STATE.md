<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code changes since 2026-08-24 — the last ten commits are gitignore and memory updates
- `serve.cjs` restarted again, unlogged: PID 53604 held port 8445 ~27.8h (2026-09-13 04:18:03 → 2026-09-14 08:06:29), current owner is PID 30532 (started 2026-09-14 08:06:29). `logs/` unchanged at 718 files / 1,378,555 bytes, newest pair still `error-7`/`out-7` at 2026-09-12 11:17:19 (both zero-byte)

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts (15 on 2026-09-01, 13 on 2026-09-02, 4 on 2026-09-03, 2 on 2026-09-05, 2 on 2026-09-06, 4 on 2026-09-07, 3 on 2026-09-08, ≥1 unlogged 09-09..09-11, ≥2 on 2026-09-12, ≥1 unlogged by 09-13 04:18, ≥1 unlogged on 09-14 08:06) — every pair is zero-byte, so the trigger is outside the app
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
Last memory update: 2026-09-14
Commits covered through: bd392dd1fb1bca30c20c9e49372d98e5786b9f52

<!-- chinvex:last-commit:bd392dd1fb1bca30c20c9e49372d98e5786b9f52 -->
