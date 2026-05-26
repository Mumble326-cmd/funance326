# funance326

A small static finance tracker PWA.

## Developer hygiene

- Git hooks are stored in `.githooks/pre-commit`.
- Activate them with `git config core.hooksPath .githooks`.
- The pre-commit hook auto-bumps the service worker cache version in `sw.js` before every commit.
- `.gitignore` keeps local backups and editor files out of version control.
- `.gitattributes` enforces LF line endings for HTML, JS, JSON, and Markdown files.

## Service worker behavior

- The service worker now only caches same-origin requests for safer offline caching.
- `updateViaCache: 'none'` plus `skipWaiting()`/`clients.claim()` helps new versions activate more reliably.
