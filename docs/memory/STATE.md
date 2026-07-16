<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- Merged upstream through v12.0.32 (bundler moved to Vite, tests moved to Vitest); custom integrations (Fetch extraction, serve.cjs) re-verified after merge

## Blockers
None known

## Next Actions
- [ ] Verify `sync-upstream.yml` runs cleanly on its first scheduled Monday run
- [ ] Confirm the SW notification allowlist (`setAllowedNotificationChatIds`) is posted correctly from `ChatFolders.tsx` on folder changes
- [ ] Re-confirm Fetch extraction end-to-end through cloudflared tunnel post-Vite-migration

## Quick Reference
- Dev: `npm run dev`
- Build: `npm run build:production` (Vite; then `node serve.cjs` to serve)
- Test: `npm test` (Vitest)
- Entry point: `src/index.tsx`

## Out of Scope (for now)
- Tauri desktop build (scripts present but not active focus)

---
Last memory update: 2026-07-15
Commits covered through: ca107f2101fd62a37ec5d66989013d2d7612bc5d

<!-- chinvex:last-commit:ca107f2101fd62a37ec5d66989013d2d7612bc5d -->
