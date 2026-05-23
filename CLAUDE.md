# Funance — project context for Claude Code

## What this is
A personal finance tracker. Single-page web app, installed as a PWA on phones.
No framework, no build step, no bundler. Plain HTML + CSS + JavaScript.

## File structure
- `index.html` — the ENTIRE app. HTML, CSS, and JS all live in this one file. There is no other source file.
- `sw.js` — the service worker. Handles offline support and controls when users get new code.
- `manifest.json` — PWA manifest (app name, icons, home-screen install behaviour).
- `icon-192.png`, `icon-512.png` — app icons.

## How it's deployed
- Hosted on **GitHub Pages** (static hosting, no server, no database).
- Pushing to the repo's main branch auto-rebuilds the live site in ~1 minute.
- Users open a link and "Add to Home Screen" to install it.

## Data model (do not break this)
- All user data lives in the browser's **localStorage** under the key **`ledger_v7`**.
- NEVER rename that key. Renaming it makes every existing user's data disappear.
- Data is per-device, per-browser. It is NOT synced and NOT stored on any server.
- All money is stored internally in **LKR**. Other currencies are converted at display time
  using rates in `state.rates`. When comparing two money values, convert both to LKR first,
  THEN compare, THEN convert the result to the view currency. (A past bug subtracted a
  LKR value from a non-LKR value directly — don't reintroduce that.)

## The service worker update habit (THE TASK IS ABOUT THIS)
- `sw.js` has a cache version string, currently like `funance-v1`.
- Users only receive new code when that version string CHANGES between pushes.
- Right now it's bumped by hand (`funance-v1` -> `funance-v2` -> ...). It's easy to forget,
  and forgetting means users stay stuck on the old cached version.

## THE TASK
Automate the service worker versioning so I never have to bump it by hand again.
I want: every time I push, the service worker cache version is guaranteed to be unique
(e.g. derived from the git commit hash, a timestamp, or a git pre-push hook that bumps it),
so users reliably get the latest code on refresh and the "stale cache" problem becomes
impossible to forget.

Please:
1. Look at how `sw.js` currently defines its version.
2. Recommend the simplest reliable approach for a GitHub Pages + plain-static setup like this
   (no build step currently — flag if your approach adds one).
3. Walk me through it step by step and explain WHAT each part does as you go — I'm learning
   the fundamentals, not just copy-pasting. I want to understand the git hook / versioning
   mechanism, not just have it work.
4. Make the change, show me the diff, and let me review before anything is committed.

## How I work
Explain as you go. I'm new to git hooks and deployment automation but I learn fast and I
want real understanding, not magic. Keep it tight; I'll ask if I want more depth.
