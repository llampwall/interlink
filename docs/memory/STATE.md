<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code changes since 2026-08-24; the last fifteen commits are gitignore and memory updates
- `serve.cjs` owner on 8445 is PID 106028 (`P:\software\bin\interlink.exe`, started 2026-09-29 11:41:50, ~35.5h at 09-30 23:10 with no new log pairs or rotation); PID 80288 held ~28.4h to 09-29 01:23, then an intermediate owner held ~10.3h
- `logs/` rotated a third time at 2026-09-28 00:00:05: `out-228.log` (entries only from 2026-05-16) moved to `out-228__2026-09-28_00-00-05.log` (114 bytes). Now 731 files, 1,378,555 bytes. Rotation hits stale files on some midnights (09-24, 09-27, 09-28) and says nothing about restarts. Two genuine zero-byte restart pairs on 2026-09-29: `*-244.log` 01:23:31 and `*-252.log` 11:41:49, the first logged pairs since 09-19

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts (15 on 2026-09-01, 13 on 2026-09-02, 4 on 2026-09-03, 2 on 2026-09-05, 2 on 2026-09-06, 4 on 2026-09-07, 3 on 2026-09-08, ≥1 unlogged 09-09..09-11, ≥2 on 2026-09-12, ≥1 unlogged by 09-13 04:18, ≥3 on 2026-09-14, ≥1 unlogged on 2026-09-15 17:53, 2 on 2026-09-19, ≥1 unlogged on 2026-09-20 23:47, ≥1 unlogged on 2026-09-21 16:14, ≥3 unlogged on 2026-09-23 at 08:33, 20:13 and 23:27, ≥1 unlogged on 2026-09-26 17:24, ≥1 unlogged on 2026-09-27 21:00, 2 on 2026-09-29 at 01:23 and 11:41) — every pair is zero-byte, so the trigger is outside the app
- [ ] Identify the midnight log rotator (fired 2026-09-24 00:00:05, 2026-09-27 00:00:07 and 2026-09-28 00:00:05, on stale months-old files); mtime remains unreliable for restart detection in both directions
- [ ] Clean up stray untracked cruft: `logs/` (731 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
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
Last memory update: 2026-09-30
Commits covered through: 658f72615983b257a31b6dd23f4edda27de3637e

<!-- chinvex:last-commit:658f72615983b257a31b6dd23f4edda27de3637e -->
