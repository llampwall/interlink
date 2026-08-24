<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- `.gitignore` now excludes strap lifecycle artifacts (`.strap/`, `start-*.cmd`, `stop-*.cmd`) — commit 114374540, the first non-memory commit since 2026-07-14
- `serve.cjs` restarted five more times overnight into 2026-08-24 (03:28, 05:31, 06:00, 06:29, 08:28) — `logs/` now 594 files, newest pair `error-804`/`out-804`, all zero-byte

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Commit or gitignore the untracked chinvex index (`docs/sys/lookup.json`) - `AGENTS.md` tells agents to read it; it is regenerated on every commit
- [ ] Clean up stray untracked cruft: `logs/` (594 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
- [ ] Confirm the SW notification allowlist (`setAllowedNotificationChatIds`) is posted correctly from `ChatFolders.tsx` on folder changes
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
Last memory update: 2026-08-24
Commits covered through: f6a0cf7ccc78dc33cb925eb9fe19f8d896c0ab77

<!-- chinvex:last-commit:f6a0cf7ccc78dc33cb925eb9fe19f8d896c0ab77 -->
