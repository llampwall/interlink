<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No source commits since 2026-07-14 (bc9f1a6ce/9d63b6e4a, then the ca107f210 dist refresh); the sixty-two commits since are all memory anchor-advances. Cadence: 2026-08-20 (09:11), 2026-08-20 (23:12), 2026-08-21 (09:10), then this run
- `serve.cjs` restarted five times on 2026-08-21 evening (19:13, 19:16, 19:21, 20:05, 22:05) - `logs/` now 548 files, newest pair `error-571`/`out-571`

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Commit or gitignore the untracked chinvex index (`docs/sys/lookup.json`, current as of 2026-08-21 09:10) - `AGENTS.md` tells agents to read it; it is regenerated on every commit
- [ ] Clean up stray untracked cruft: `logs/` (548 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
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
Last memory update: 2026-08-21
Commits covered through: d5e263e43fb055c7a77808c0d12ef9c39dcdf8fe

<!-- chinvex:last-commit:d5e263e43fb055c7a77808c0d12ef9c39dcdf8fe -->
