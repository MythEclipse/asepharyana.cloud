#!/bin/bash

# Jalankan filter-branch untuk memfilter commit
git filter-branch --force --commit-filter '
if [ "$(git log -1 --pretty=%B $GIT_COMMIT)" = "filtered" ]; then
    skip_commit "$@"
else
    git commit-tree "$@"
fi
' --tag-name-filter cat -- --all

# Memaksa push ke remote
git push origin master --force --all

# Membersihkan reflog
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
