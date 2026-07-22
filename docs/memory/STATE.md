<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- No new code commits since last update — only uncommitted working-tree changes: `CLAUDE.md` modified to point at `docs/sys/lookup.json`, plus untracked chinvex/session artifacts (`.chinvex-status.json`, `.claude/`, `docs/sys/`)

## Blockers
None known

## Next Actions
- [ ] Commit or discard the local-only chinvex lookup index (`docs/sys/lookup.json`) and the `CLAUDE.md` pointer edit
- [ ] Resolve stray untracked `serve.js` — an incomplete duplicate of `serve.cjs` missing the Fetch proxy and dist-copy logic; delete or clarify its purpose
- [ ] Clean up stray untracked cruft: `logs/` (428 files, growing), root file `8445`, stale worktree `.worktrees/loop-1783831370776-db43f9`
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
Last memory update: 2026-07-22
Commits covered through: 1e61b9b83052368a37eca3d719226140723c8f07

<!-- chinvex:last-commit:1e61b9b83052368a37eca3d719226140723c8f07 -->
