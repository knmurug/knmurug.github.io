---
name: git-workflow
description: >-
  Standardized Git workflows including branch creation, Conventional Commits formatting, safe rebasing, stash management, and merge conflict resolution. Use when creating branches, crafting commits, rebasing, or resolving merge conflicts.
---

# Git Workflow & Commit Hygiene Skill

This skill guides the agent through disciplined, production-grade Git workflows. Follow these instructions whenever preparing branches, structuring commits, or handling Git operations.

---

## 1. Branch Strategy & Naming

When creating or switching branches, use standardized prefix naming:

| Prefix | Use Case | Example |
| :--- | :--- | :--- |
| `feat/` | New features or user-facing enhancements | `feat/auth-oauth-login` |
| `fix/` | Bug fixes or issue patches | `fix/null-pointer-user-profile` |
| `refactor/` | Code restructuring without behavior changes | `refactor/extract-query-parser` |
| `perf/` | Performance optimizations | `perf/cache-session-tokens` |
| `docs/` | Documentation only | `docs/update-api-reference` |
| `chore/` | Maintenance, dependencies, or tooling | `chore/upgrade-typescript-5` |
| `test/` | Adding or fixing test suites | `test/add-checkout-e2e` |

---

## 2. Conventional Commits Standard

Every commit must adhere to the [Conventional Commits v1.0.0](./references/conventional_commits.md) specification:

```text
<type>(<optional scope>): <short description in imperative mood>

[optional longer body explaining *why* the change is made, not just what]

[optional footer(s): BREAKING CHANGE, Closes #123, Refs #456]
```

### Commit Rules
1. **Header limit**: Keep under 72 characters.
2. **Imperative mood**: Use "add", "fix", "refactor", not "added", "fixing", "refactored".
3. **Atomic commits**: One logical change per commit. Separate refactoring from functional changes.
4. **Validation**: Run the commit validation script before committing:
   ```bash
   bash .agents/skills/git-workflow/scripts/validate_commit.sh "<commit message>"
   ```

---

## 3. Safe Rebasing & Stash Management

When synchronizing feature branches with the base branch:

### Interactive / Linear Rebase Workflow
1. Fetch latest upstream changes:
   ```bash
   git fetch origin
   ```
2. Rebase onto base branch (e.g. `main`):
   ```bash
   git rebase origin/main
   ```
3. If conflicts arise, follow the [Conflict Resolution Procedure](./references/conflict_resolution.md).
4. When pushing an updated rebased branch, **never** use raw `--force`. Always use:
   ```bash
   git push --force-with-lease origin <branch-name>
   ```

### Stash Safety
- Always label stashes with a clear message:
  ```bash
  git stash push -m "WIP: work on checkout validator before rebase"
  ```
- Inspect stashes before popping:
  ```bash
  git stash list
  git stash show -p stash@{0}
  ```

---

## 4. Conflict Resolution Procedure

When merge or rebase conflicts occur:

1. Identify conflicting files:
   ```bash
   git status --short
   ```
2. For each conflicted file:
   - Check `<<<<<<< HEAD`, `=======`, and `>>>>>>>` markers.
   - Preserve intended functional logic from both branches.
   - Run linter/build to confirm no syntax or typing errors.
3. Stage resolved files:
   ```bash
   git add <resolved-file>
   ```
4. Continue the operation:
   ```bash
   git rebase --continue
   # or
   git merge --continue
   ```
5. Consult the detailed [Conflict Resolution Guide](./references/conflict_resolution.md) for 3-way merge tactics.
