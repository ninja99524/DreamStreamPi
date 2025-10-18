#!/usr/bin/env bash
# savepush.sh - safe version
# Commits only staged changes with a default message and pushes to current branch.

set -euo pipefail

# Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check if anything is staged
if git diff --cached --quiet; then
  echo "No staged changes to commit. Stage your files first."
  exit 1
fi

# Default commit message
MSG="${1:-fix: update staged files}"

# Commit
git commit -m "$MSG"

# Push to the current branch
git push origin "$BRANCH"

echo "Committed and pushed staged changes to $BRANCH"
