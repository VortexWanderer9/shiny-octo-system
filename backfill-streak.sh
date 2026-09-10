#!/bin/bash
set -e

REPO_DIR="${1:-.}"
cd "$REPO_DIR"

DATES=(
  "2026-09-06T12:00:00+05:45"
  "2026-09-07T12:00:00+05:45"
  "2026-09-08T12:00:00+05:45"
  "2026-09-09T12:00:00+05:45"
  "2026-09-10T12:00:00+05:45"
)

for D in "${DATES[@]}"; do
  GIT_AUTHOR_DATE="$D" GIT_COMMITTER_DATE="$D" \
    git commit --allow-empty -m "chore: update ($D)"
  echo "Committed for $D"
done

git push origin HEAD
echo "All commits pushed."
