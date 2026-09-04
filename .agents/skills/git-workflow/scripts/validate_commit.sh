#!/usr/bin/env bash
# validate_commit.sh
# Validates a commit message string against Conventional Commits v1.0.0

set -euo pipefail

COMMIT_MSG="${1:-}"

if [[ -z "$COMMIT_MSG" ]]; then
  echo "Error: Commit message argument is required."
  echo "Usage: $0 \"<commit-message>\""
  exit 1
fi

FIRST_LINE=$(echo "$COMMIT_MSG" | head -n 1)

# Regex pattern for Conventional Commits:
# type(scope)!: subject OR type!: subject OR type(scope): subject OR type: subject
PATTERN='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-zA-Z0-9_\.\-]+\))?(!)?: .+'

if [[ ! "$FIRST_LINE" =~ $PATTERN ]]; then
  echo "❌ Invalid commit message format."
  echo "Header: \"$FIRST_LINE\""
  echo ""
  echo "Must follow Conventional Commits format:"
  echo "  <type>(<scope>): <subject>"
  echo "Valid types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert"
  echo "Example: feat(auth): add OAuth2 token refresh support"
  exit 1
fi

if [[ ${#FIRST_LINE} -gt 72 ]]; then
  echo "⚠️ Warning: Commit title is ${#FIRST_LINE} characters (recommended max is 72)."
fi

echo "✅ Commit message header is valid: \"$FIRST_LINE\""
exit 0
