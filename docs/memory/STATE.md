<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No code commits since 2026-07-14 (bc9f1a6ce/9d63b6e4a); the last seven commits are all memory anchor-advances

## Blockers
None known

## Next Actions
- [ ] Revert the `CLAUDE.md` working-tree edit — the file is a git symlink (mode 120000) to `AGENTS.md`; the added lookup.json prose corrupts the link target. Put that guidance in `AGENTS.md` instead
- [ ] Commit or discard the local-only chinvex lookup index (`docs/sys/lookup.json`)
- [ ] Clean up stray untracked cruft: `logs/` (428 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
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
Last memory update: 2026-07-24
Commits covered through: 8a769af5eed9394cfecc1bb3e954b54919046d6f

<!-- chinvex:last-commit:8a769af5eed9394cfecc1bb3e954b54919046d6f -->
