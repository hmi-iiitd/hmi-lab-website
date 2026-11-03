# Security posture (public)

- No production secrets, deploy credentials, or private keys belong in this repository.
- Content collections distinguish **draft** vs **publishable**; CI must reject incomplete `published: true` research records.
- Staging builds use `noindex,nofollow` (not access control).
- Pre-public audit (2026-11-03): no API tokens or credentials found; operational hosting fingerprints were removed from public docs before visibility change.
- Report suspected leaks via the lab maintainers; rotate any exposed credentials immediately.
