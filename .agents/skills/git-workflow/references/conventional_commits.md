# Conventional Commits Reference Guide

This reference provides detailed rules and examples for the Conventional Commits specification.

---

## 1. Commit Types

| Type | Description | SemVer Impact |
| :--- | :--- | :--- |
| `feat` | Introduces a new feature to the codebase | MINOR (`0.X.0`) |
| `fix` | Patches a bug in the codebase | PATCH (`0.0.X`) |
| `docs` | Documentation only changes | None |
| `style` | Formatting, missing semi-colons, whitespace (no code change) | None |
| `refactor` | Code change that neither fixes a bug nor adds a feature | None |
| `perf` | Code change that improves performance | PATCH |
| `test` | Adding missing tests or correcting existing tests | None |
| `build` | Changes that affect the build system or external dependencies | None / PATCH |
| `ci` | Changes to CI configuration files and scripts | None |
| `chore` | Other changes that don't modify src or test files | None |
| `revert` | Reverts a previous commit | Depends |

---

## 2. Breaking Changes

Breaking changes MUST be indicated in one of two ways:
1. An exclamation point `!` after the type/scope: `feat(api)!: remove deprecated v1 endpoints`
2. A `BREAKING CHANGE:` footer at the bottom of the commit message body:

```text
feat(auth): migrate token payload format

BREAKING CHANGE: The user token claims now require `sub` instead of `uid`. Existing JWTs will be rejected.
```

---

## 3. Formatting Examples

### Good Commits
- `feat(cart): add item quantity increment/decrement controls`
- `fix(auth): handle expired refresh tokens gracefully`
- `refactor(parser): extract token lexer into dedicated module`
- `docs(readme): add docker compose local development setup instructions`

### Bad Commits (Avoid)
- `fixed stuff` (Too vague, no type/scope, non-imperative)
- `WIP` (Never commit WIP to shared branches)
- `Update index.js` (Default GitHub commit message, missing context)
- `feat: Added new button and also refactored database queries` (Not atomic, past tense)
