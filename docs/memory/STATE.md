<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code changes since 2026-08-24 — the last eleven commits are gitignore and memory updates
- `serve.cjs` restarted unlogged at 2026-09-26 17:24:58: PID 47552 ended after ~65.9h (second-longest hold, short of PID 42612's ~79h record). New owner PID 78892 listening on 8445 as process `interlink`, ~5.8h in
- `logs/` unchanged since the 2026-09-24 00:00:05 rotation: 725 files, 1,378,555 bytes, newest by mtime still the `out-128` pair. The rotator did not fire at 2026-09-25 or 2026-09-26 midnight, so it is not a nightly job. No genuine restart pair since 2026-09-19 02:27 — silent stretch now ~7.9 days (~189h)

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts (15 on 2026-09-01, 13 on 2026-09-02, 4 on 2026-09-03, 2 on 2026-09-05, 2 on 2026-09-06, 4 on 2026-09-07, 3 on 2026-09-08, ≥1 unlogged 09-09..09-11, ≥2 on 2026-09-12, ≥1 unlogged by 09-13 04:18, ≥3 on 2026-09-14, ≥1 unlogged on 2026-09-15 17:53, 2 on 2026-09-19, ≥1 unlogged on 2026-09-20 23:47, ≥1 unlogged on 2026-09-21 16:14, ≥3 unlogged on 2026-09-23 at 08:33, 20:13 and 23:27, ≥1 unlogged on 2026-09-26 17:24) — every pair is zero-byte, so the trigger is outside the app
- [ ] Identify what rotated `logs/` at 2026-09-24 00:00:05 — still a one-off after two more midnights; mtime remains unreliable for restart detection in both directions
- [ ] Clean up stray untracked cruft: `logs/` (725 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
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
Last memory update: 2026-09-26
Commits covered through: f2dbf60c7eaf592785a41eefa3a8f1c0efb98433

<!-- chinvex:last-commit:f2dbf60c7eaf592785a41eefa3a8f1c0efb98433 -->
