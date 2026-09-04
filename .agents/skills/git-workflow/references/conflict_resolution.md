# Merge & Rebase Conflict Resolution Guide

This document outlines standard procedures for resolving Git merge and rebase conflicts cleanly.

---

## 1. Anatomy of a Conflict Marker

```text
<<<<<<< HEAD (Current change / target branch)
const apiUrl = process.env.VITE_API_BASE_URL || "https://api.example.com";
=======
const apiUrl = getRuntimeConfig().apiUrl;
>>>>>>> feat/runtime-config (Incoming change)
```

- `<<<<<<< HEAD`: The state of the file in the branch you are on.
- `=======`: Separator between the competing changes.
- `>>>>>>> <branch/commit>`: The incoming change being merged or rebased.

---

## 2. Step-by-Step Resolution Strategy

### Step 1: Understand Intent
Before picking a side or editing lines, understand why both changes occurred:
- View commit log for the incoming branch:
  ```bash
  git log -p -1 <commit-hash>
  ```
- View changes on the target branch:
  ```bash
  git log -p -1 HEAD
  ```

### Step 2: Synthesize or Choose
- **Synthesized resolution**: Integrate both features if they are complementary (e.g. adding new imports and applying formatting).
- **Incoming override**: If the incoming branch deliberately replaces obsolete logic.
- **Current override**: If the current branch already refactored/superseded the incoming logic.

### Step 3: Remove All Conflict Markers
Ensure no lingering `<<<<<<<`, `=======`, or `>>>>>>>` markers remain in the file.

### Step 4: Validate Code
Always run tests and lint checks before continuing:
```bash
npm test || pytest || cargo test || go test ./...
```

### Step 5: Advance Git State
```bash
git add <file>
git rebase --continue
# or git merge --continue
```

---

## 3. Aborting an In-Progress Merge/Rebase
If a conflict is too complex or requires upstream clarification:
```bash
# To abort a rebase:
git rebase --abort

# To abort a merge:
git merge --abort
```
