#!/bin/bash
set -e

REPO_DIR="${1:-.}"
COMMIT_MSG="${2:-Update}"

cd "$REPO_DIR"

YESTERDAY=$(date -d "yesterday" +"%Y-%m-%dT%H:%M:%S")

git add -A

GIT_AUTHOR_DATE="$YESTERDAY" GIT_COMMITTER_DATE="$YESTERDAY" \
  git commit -m "$COMMIT_MSG"

git push origin HEAD

echo "Committed and pushed with date: $YESTERDAY"
