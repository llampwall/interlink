<!-- DO: Append new entries to current month. Rewrite Recent rollup. -->
<!-- DON'T: Edit or delete old entries. Don't log trivial changes. -->

# Decisions

## Recent (last 30 days)
- Merged upstream Telegram Web A from v12.0.23 to v12.0.32 (Vite migration, Vitest migration, Settings/Profile/Left Panel redesigns)
- Restored custom integrations (Fetch extraction, `serve.cjs`) after the upstream merge
- Added main-folder-only mode: chat nav, folder UI, and notifications restricted to the "Main" Telegram folder, fail-closed
- Added weekly automated upstream sync CI (`sync-upstream.yml`) that validates before pushing
- Added Fetch media extraction: social URLs auto-converted to native Telegram photos/videos on send
- Added `serve.cjs` production server to replace bash deploy script (Windows-incompatible)

## 2026-07

### 2026-07-14 — Merge upstream Telegram Web A v12.0.23 → v12.0.32

- **Why:** Stay current with upstream fixes/features (bundler migration, redesigns, layer updates) across ~9 upstream releases.
- **Impact:** Bundler moved from webpack to Vite (`vite build`); test suite moved from Jest to Vitest (`npm test`); Settings, Profile, Left Panel/Middle Header, Poll, and Chat Invite Modal redesigns landed; upstream renamed `CLAUDE.md` → `AGENTS.md` (#7012). Merge required manual conflict resolution to preserve Interlink's custom code.
- **Evidence:** e420e1e1f593890b43dfe5c995dac692fec48308

### 2026-07-14 — Preserve custom integrations after upstream merge

- **Why:** The upstream merge touched `serve.cjs`, `fetchExtract.ts`, `useFetchExtract.ts`, and `Composer.tsx`, risking silent loss of Interlink-specific behavior (Fetch media extraction, Windows production server).
- **Impact:** Re-added `serve-handler` as an explicit `package.json` dependency, restored `serve.cjs` proxy/serve behavior, restored `fetchExtract.ts`/`useFetchExtract.ts`/`Composer.tsx` custom logic, added `serve.cjs` to `tsconfig.script.json`'s type-checked scripts.
- **Evidence:** acc1c74a6bb4135010b0ae153d8ec076ea2caf98

### 2026-07-14 — Add main-folder-only mode

- **Why:** Keep spam and unrelated chats out of the focused Interlink client by scoping the app to a single curated Telegram folder.
- **Impact:** Added `src/util/mainFolder.ts` (folder resolution helpers); `openChat` action and `notifyAboutMessage` now no-op for chats outside the "Main" folder (fail-closed if the folder doesn't exist); service worker (`pushNotification.ts`) filters push notifications against a client-synced allowlist of chat IDs (`setAllowedNotificationChatIds` message); `ChatFolders.tsx` and `FoldersSidebar.tsx` restrict folder navigation UI to Main.
- **Evidence:** bc9f1a6cef6a9cfc72c2ae9aa903d495d7a86f52

### 2026-07-14 — Add weekly automated upstream sync CI

- **Why:** Automate staying current with `Ajaxy/telegram-tt` without manual merge babysitting, while guarding against shipping a broken sync.
- **Impact:** Added `.github/workflows/sync-upstream.yml` — runs Mondays 09:00 UTC (or manual dispatch), merges upstream `master` with `--no-ff`, runs `npm run check && npm test && npm run build:production`, and pushes to `master` only if validation passes.
- **Evidence:** 9d63b6e4a96a03db965f0d3737a7376a77bbdc75

## 2026-04

### 2026-04-10 — Add Fetch media extraction feature

- **Why:** Send social media links (Instagram, X, TikTok, YouTube, Reddit) as native Telegram photos/videos instead of bare URLs for a better sharing experience.
- **Impact:** Added `fetchExtract.ts` (API client + URL detection), `useFetchExtract.ts` (signal-aware pre-fetch hook), and modified `Composer.tsx` to consume pre-fetched media on send with thumbnail preview.
- **Evidence:** 16cf87a7c02268a4c49c847edd14457d913baf48

### 2026-04-11 — Add production server; fix WebView compat; use relative API URLs

- **Why:** `deploy/copy_to_dist.sh` is a bash script that doesn't work on Windows; WebView lacks `navigator.locks` causing compat check failures; direct localhost URLs break through cloudflared tunnel.
- **Impact:** `serve.cjs` added as a CJS production static server with Fetch API proxy and `Cache-Control: no-store`; `compatTest.js` patched to always pass; `fetchExtract.ts` switched to relative URLs.
- **Evidence:** 309ed5fbd11c46d7b1c1c364dddeda2ebbf91ecb

### 2026-04-08 — Upstream: text streaming animation (#6834)

- **Why:** Upstream feature for animated typing/streaming text in messages.
- **Impact:** Added `TypingWrapper.tsx`, `TypingWrapper.module.scss`, `Typing.tgs` asset; new performance setting toggle.
- **Evidence:** da590cf02a9abb66bbf0c1ac27f31e99241e41df
