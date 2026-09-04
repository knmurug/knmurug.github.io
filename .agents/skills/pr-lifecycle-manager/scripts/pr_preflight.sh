#!/usr/bin/env bash
# pr_preflight.sh
# Performs local sanity checks before opening a pull request

set -euo pipefail

echo "=== 🚀 Running PR Pre-Flight Checks ==="

# Safe git helper for sandbox environments
safe_git() {
  GIT_CONFIG_GLOBAL="${GIT_CONFIG_GLOBAL:-/dev/null}" git "$@"
}

if ! safe_git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "⚠️ Not inside a Git repository. Skipping git checks."
  exit 0
fi

# Check for unstaged changes
UNSTAGED_COUNT=$(safe_git status --porcelain | grep -c '^.[M|D|?]' || true)
if [[ "$UNSTAGED_COUNT" -gt 0 ]]; then
  echo "⚠️ Notice: You have $UNSTAGED_COUNT unstaged / untracked file(s):"
  safe_git status --short
else
  echo "✅ Working tree is clean."
fi

# Check branch name
BRANCH=$(safe_git rev-parse --abbrev-ref HEAD)
echo "🌿 Current branch: $BRANCH"
if [[ "$BRANCH" == "main" || "$BRANCH" == "master" ]]; then
  echo "⚠️ Warning: You are currently on '$BRANCH'. PRs should usually come from feature/fix branches."
fi

# Check diff stats against base branch if origin/main or master exists
if safe_git rev-parse --verify master >/dev/null 2>&1; then
  COMMITS_AHEAD=$(safe_git rev-list --count master..HEAD || true)
  echo "📊 Commits ahead of master: $COMMITS_AHEAD"
fi

echo "=== ✅ Pre-Flight Checks Completed ==="
