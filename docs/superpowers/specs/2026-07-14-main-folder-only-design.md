# Main-Folder-Only Interlink Design

## Goal

Make Interlink a focused view of the Telegram folder named `main`. Chats outside that folder remain available in normal Telegram clients but never appear or notify in Interlink.

## Behavior

- Resolve `main` case-insensitively from Telegram's existing chat folders.
- Show only that folder's chat list. Do not show `All`, `Unread`, `Personal`, `other`, or any other folder tab.
- Apply the same single-folder view in both top-tab and sidebar folder layouts.
- Suppress foreground sounds, desktop notifications, and background web-push notifications for chats outside `main`.
- Keep all incoming updates in Telegram's normal client state. Interlink does not block users, leave chats, delete messages, or change Telegram account notification settings.
- If no `main` folder exists, show `Main folder not found` and suppress all message notifications. Never fall back to `All`.
- Folder editing and adding chats to `main` from Interlink are outside this change.

## Implementation

Add one shared selector for locating the `main` folder. Feed only its ID into the existing folder-list components so Telegram's current folder manager remains the source of membership and ordering.

Guard the shared foreground notification function with the folder manager's membership data. Sync the current `main` chat IDs to the service worker, persist them in a dedicated Cache Storage entry, and require membership before displaying a background push. Until the folder and allowlist are available, notifications fail closed.

## Verification

- Unit-test case-insensitive `main` folder selection and missing-folder behavior.
- Run TypeScript and lint checks.
- Run the Vitest suite.
- Run a production build to compile both the application and service worker paths.
- Inspect the Fetch composer wiring after the change to ensure this focused UI change did not disturb it.

