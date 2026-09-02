<!-- DO: Rewrite freely. Keep under 30 lines. Current truth only. -->
<!-- DON'T: Add history, rationale, or speculation. No "we used to..." -->

# State

## Current Objective
Maintain a custom fork of Telegram Web A (telegram-t) focused on a single "Main" folder, kept in sync with upstream, with Fetch media extraction and Windows-compatible production serving.

## Active Work
- Main-only mode live: chat navigation, folder UI, and notifications (foreground + service worker) restricted to the "Main" Telegram folder, fail-closed if it's missing
- Weekly automated upstream sync (`sync-upstream.yml`) merges Ajaxy/telegram-tt, validates (check+test+build), and pushes only on success
- `.gitignore` excludes `docs/sys/lookup.json` and `.chinvex-status.json`, so the chinvex index no longer dirties `git status`
- `serve.cjs` restarts continuing but slower — 1 since the 2026-09-01 burst of 15, at 2026-09-02 02:17; `logs/` at 670 files / 1.3 MB, counter 461 → 470
- Live on port 8445 via the strap shim `P:\software\bin\interlink.exe serve.cjs` (PID 76436, started 2026-09-02 02:17:46, log pair `error-470`/`out-470`)

## Blockers
None known

## Next Actions
- [ ] Fix the `CLAUDE.md` symlink corruption at the source - `strap map` appends the lookup hint with no symlink guard (`P:\software\_strap\modules\Commands\map.ps1:423`). It is a closed loop: committing memory triggers the re-index that re-breaks the link, so restoring here can never stick
- [ ] Investigate why `serve.cjs` restarts in bursts (15 on 2026-09-01, 1 on 2026-09-02) — no error content in the logs (all recent pairs are zero-byte), so the trigger is outside the app
- [ ] Clean up stray untracked cruft: `logs/` (670 files), root file `8445`, `serve.js` duplicate, `.worktrees/loop-1783831370776-db43f9`
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
Last memory update: 2026-09-02
Commits covered through: dc31b3bb6ce008d569fa97199528ae908ec1c42b

<!-- chinvex:last-commit:dc31b3bb6ce008d569fa97199528ae908ec1c42b -->
