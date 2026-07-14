# Automated Upstream Sync Design

## Goal

Bring Interlink current with Telegram Web A and keep it synchronized automatically without requiring pull-request review.

## Upstream

- Repository: `https://github.com/Ajaxy/telegram-tt.git`
- Branch: `master`
- Fork branch: `master`
- Schedule: weekly, on Monday

## Initial Update

1. Preserve the current dirty worktree and perform the update in an isolated worktree or clean branch.
2. Add the official repository as the `upstream` remote.
3. Merge `upstream/master` into the fork's `master` without rewriting history.
4. Resolve conflicts while preserving the custom Fetch media extraction, WebView compatibility patch, relative API URLs, and production server.
5. Run dependency installation, static checks, tests, and the production build.
6. Verify the Fetch integration still compiles and remains connected to the composer send path.
7. Merge and push the verified update to `origin/master`.

## Weekly Automation

Add one GitHub Actions workflow that runs weekly and supports manual dispatch.

2. Configure the official Telegram Web A repository as `upstream`.
3. Fetch `upstream/master`.
4. Exit successfully when no update exists.
5. Merge upstream into the checked-out branch without rebasing or force-pushing.
6. Install dependencies with `npm ci`.
7. Run the repository's static checks and tests.
8. Run the production build if it can be treated as validation without committing generated output.
9. Push directly to `origin/master` only after every validation step passes.

The workflow needs `contents: write`. It should use the standard `GITHUB_TOKEN` and add no secrets or third-party synchronization.

## Failure Behavior

Merge conflicts, failing checks, failing tests, and failing builds must stop the workflow before it pushes. The failed GitHub Actions run is the notification and recovery record. The workflow must not create a pull request, rewrite history, discard custom commits, or push a partially validated merge.

## Verification

Automated gates:

- Upstream commits are ancestors of the resulting `master`.
- The custom Interlink commits remain in history.
- Static checks pass.

Manual verification after the initial update:

- Log in and load existing chats.
- Send and receive a text message.
- Send ordinary media.
- Send a supported social URL and confirm Fetch converts it to native media.
- Confirm the hosted WebView loads through the cloudflared route.

## Recovery

Because updates use merge commits, a bad synchronization can be reversed with a normal revert of the sync merge. The official Telegram client remains the operational fallback if a clean upstream change causes a behavioral regression not detected by CI.

## Deliberate Simplifications

- No review pull requests, by owner preference.
- No rebase or force-push automation.
- No custom synchronization service.
- No automatic deployment.
- No live end-to-end Telegram credentials in CI.
