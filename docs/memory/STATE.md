<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code changes since 2026-08-24; the last twenty commits are gitignore and memory updates
- `serve.cjs` owner on 8445 is PID 89832 (`P:\software\bin\interlink.exe`, started 2026-10-04 03:44:13, no log pair written); PID 12876 started 10-03 22:55:08
- `logs/`: 736 files, 1,378,555 bytes; newest restart pairs are zero-byte `*-161.log` (10-03 17:05:53) and `*-169.log` (10-03 17:25:29), numbered below the older `*-252.log`, so suffixes are not monotonic. Midnight rotation (09-24, 09-27, 09-28, 10-02) hits stale files and says nothing about restarts

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts (15 on 2026-09-01, 13 on 2026-09-02, 4 on 2026-09-03, 2 on 2026-09-05, 2 on 2026-09-06, 4 on 2026-09-07, 3 on 2026-09-08, ≥1 unlogged 09-09..09-11, ≥2 on 2026-09-12, ≥1 unlogged by 09-13 04:18, ≥3 on 2026-09-14, ≥1 unlogged on 2026-09-15 17:53, 2 on 2026-09-19, ≥1 unlogged on 2026-09-20 23:47, ≥1 unlogged on 2026-09-21 16:14, ≥3 unlogged on 2026-09-23 at 08:33, 20:13 and 23:27, ≥1 unlogged on 2026-09-26 17:24, ≥1 unlogged on 2026-09-27 21:00, 2 on 2026-09-29 at 01:23 and 11:41, ≥1 unlogged on 2026-10-01 18:57, ≥1 unlogged on 2026-10-03 06:42, 2 on 2026-10-03 at 17:05 and 17:25, ≥1 unlogged on 2026-10-03 22:55, ≥1 unlogged on 2026-10-04 03:44) — every pair is zero-byte, so the trigger is outside the app
- [ ] Identify the midnight log rotator (fired 2026-09-24 00:00:05, 2026-09-27 00:00:07, 2026-09-28 00:00:05 and 2026-10-02 00:00:00, on stale months-old files); mtime remains unreliable for restart detection in both directions
- [ ] Clean up stray untracked cruft: `logs/` (736 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
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
Last memory update: 2026-10-04
Commits covered through: f0f0ea47cd27076a3aae9e5f3a82785f477b1e00

<!-- chinvex:last-commit:f0f0ea47cd27076a3aae9e5f3a82785f477b1e00 -->
