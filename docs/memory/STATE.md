<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- chinvex file-lookup index (`docs/sys/lookup.json`) and its CLAUDE.md pointer exist locally but are uncommitted

## Blockers
None known

## Next Actions
- [ ] Commit or discard the local-only chinvex lookup index (`docs/sys/lookup.json` + CLAUDE.md pointer)
- [ ] Verify `sync-upstream.yml` runs cleanly on its first scheduled Monday run
- [ ] Confirm the SW notification allowlist (`setAllowedNotificationChatIds`) is posted correctly from `ChatFolders.tsx` on folder changes
- [ ] Clean up untracked `logs/` restart-log cruft and stray root file `8445`
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
Last memory update: 2026-07-17
Commits covered through: 6851da16c58576bbbd20a1ec2d09dcc3449d5b99

<!-- chinvex:last-commit:6851da16c58576bbbd20a1ec2d09dcc3449d5b99 -->
