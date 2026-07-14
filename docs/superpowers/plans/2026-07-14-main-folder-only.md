# Main-Folder-Only Interlink Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show and notify only chats in Telegram's `main` folder inside Interlink.

**Architecture:** Reuse Telegram Web A's folder manager as the sole membership source. Restrict both folder navigation layouts to the resolved `main` folder, guard the shared foreground notifier, and persist the same chat-ID allowlist for background push filtering.

**Tech Stack:** TypeScript, Teact, Service Worker Cache Storage, Vitest, Vite

---

### Task 1: Resolve the Main folder

**Files:**
- Modify: `src/global/selectors/chats.ts`
- Test: `src/global/selectors/chats.test.ts`

- [ ] **Step 1: Write a failing selector test**

Create a minimal global-state fixture with folders titled `Personal` and `MAIN`. Assert that `selectMainChatFolder` returns `MAIN`, and assert that a fixture without it returns `undefined`.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npm test -- src/global/selectors/chats.test.ts`

Expected: FAIL because `selectMainChatFolder` is not exported.

- [ ] **Step 3: Implement the selector**

Add `selectMainChatFolder(global)` beside `selectChatFolder`. It returns the first folder whose `title.text.trim().toLowerCase()` equals `main`.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- src/global/selectors/chats.test.ts`

Expected: PASS.

### Task 2: Restrict folder navigation and sync notification membership

**Files:**
- Modify: `src/components/left/main/ChatFolders.tsx`
- Modify: `src/components/main/FoldersSidebar.tsx`

- [ ] **Step 1: Restrict both layouts**

Use `selectMainChatFolder` in each `withGlobal` mapper and pass `[mainFolder.id]`, or `[]` when missing, as `orderedFolderIds`. Existing `useFolderTabs` then renders at most one folder.

- [ ] **Step 2: Add the missing-folder state**

In `ChatFolders`, avoid rendering `Transition` when the resolved list has no tab. Render a small `Main folder not found` empty state and never select `All`.

- [ ] **Step 3: Sync the allowlist**

Subscribe to the main folder's existing ordered IDs with `useFolderManagerForOrderedIds`. Post `{ type: 'setAllowedNotificationChatIds', payload: orderedIds }` to the ready service worker whenever membership changes. Post an empty list when `main` is missing.

- [ ] **Step 4: Run the TypeScript check**

Run: `npm run check:ts`

Expected: exit 0, allowing only the repository's established warning output.

### Task 3: Suppress non-Main notifications

**Files:**
- Modify: `src/util/notifications.tsx`
- Modify: `src/serviceWorker/pushNotification.ts`

- [ ] **Step 1: Guard foreground notifications**

In `notifyAboutMessage`, resolve `main`, read its existing folder-manager chat IDs, and return before notification or sound work when the folder is missing, membership is not ready, or the chat ID is absent.

- [ ] **Step 2: Persist the service-worker allowlist**

Handle `setAllowedNotificationChatIds` in `handleClientMessage`. Store the JSON array in a dedicated Cache Storage entry separate from the asset cache.

- [ ] **Step 3: Guard background pushes**

In `handlePush`, resolve the push chat ID and asynchronously require it to be in the persisted allowlist before calling `showNotification`. Missing or unreadable state suppresses the push.

- [ ] **Step 4: Run static checks and tests**

Run: `npm run check`

Expected: exit 0 with only established upstream warnings.

Run: `npm test`

Expected: all tests pass.

### Task 4: Production verification and commit

**Files:**
- Inspect: `src/components/middle/composer/MessageInput.tsx`
- Inspect: `src/components/middle/composer/FetchMediaModal.tsx`

- [ ] **Step 1: Build production assets**

Run: `npm run build:production`

Expected: exit 0 and a compiled service-worker bundle in `dist`.

- [ ] **Step 2: Confirm Fetch remains wired**

Run: `rg -n "FetchMediaModal|openFetchMediaModal|fetchMedia" src/components/middle/composer src/global`

Expected: the composer action and modal remain connected and TypeScript-compiled.

- [ ] **Step 3: Review only task-owned changes**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: only the feature files, plan/spec, and pre-existing generated artifacts are listed.

- [ ] **Step 4: Commit and push**

Stage only the feature source, test, spec, and plan files. Commit with `feat: focus Interlink on main folder`, then push the current branch without rewriting history.

