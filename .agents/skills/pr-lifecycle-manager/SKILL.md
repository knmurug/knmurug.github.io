---
name: pr-lifecycle-manager
description: >-
  End-to-end pull request management including automated PR description generation, pre-flight review checklists, review comment triage, and release changelog generation. Use when preparing, reviewing, or updating pull requests.
---

# Pull Request Lifecycle Manager Skill

This skill standardizes the preparation, authoring, reviewing, and merging of Pull Requests.

---

## 1. Pre-Flight Verification Checklist

Before opening or requesting a review on a PR:
1. Run preflight checks:
   ```bash
   bash .agents/skills/pr-lifecycle-manager/scripts/pr_preflight.sh
   ```
2. Verify:
   - Branch is up to date with target branch (`main` / `master`).
   - All tests pass locally.
   - Linter and type checker report zero errors.
   - No sensitive files, secrets, or temporary debug logs (`console.log`, `print()`, `.env`) are staged.

---

## 2. PR Structure & Description Generation

When drafting a PR description, use the structured template from [pull_request_template.md](./resources/pull_request_template.md):

### Required Sections:
- **Title**: `type(scope): imperative summary` (matches leading commit message).
- **Summary / Context**: Why is this change necessary? What problem does it solve?
- **Key Changes**: Bulleted list highlighting architectural or behavioral modifications.
- **Verification Plan**: Exact test commands executed and manual verification steps taken.
- **Breaking Changes**: Explicit callout of any API, schema, or configuration breaking changes.

---

## 3. Code Review & Feedback Triage

When reviewing incoming code or addressing feedback from reviewers:

1. Consult the [Code Review Rubric](./references/code_review_rubric.md) to evaluate:
   - **Correctness**: Edge cases, error handling, race conditions.
   - **Performance**: Complexity, I/O bottlenecks, redundant queries.
   - **Security**: Sanitization, authorization checks, secret leakage.
   - **Maintainability**: Clean naming, modularity, comment accuracy.
2. When applying review fixes:
   - Create explicit fix commits (e.g. `fix(auth): handle null token exception per review`).
   - Once approved, squash or rebase according to repository policy.

---

## 4. Release Changelog Generation

When preparing release PRs or tagging releases:
1. Group commits by Conventional Commit type:
   - 🚀 **Features (`feat`)**
   - 🐛 **Bug Fixes (`fix`)**
   - ⚡ **Performance Improvements (`perf`)**
   - ♻️ **Refactoring (`refactor`)**
   - ⚠️ **Breaking Changes (`BREAKING CHANGE`)**
2. Link relevant Issue / PR numbers in each changelog bullet.
