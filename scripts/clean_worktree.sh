#!/bin/bash

set -e

BRANCH_NAME=$1

if [ -z "$BRANCH_NAME" ]; then
    echo "Usage: $0 <branch-name>"
    echo "Example: $0 feature/user-auth"
    exit 1
fi

WORKTREE_PATH="./worktrees/$BRANCH_NAME"

if [ ! -d "$WORKTREE_PATH" ]; then
    echo "Error: Worktree does not exist at $WORKTREE_PATH"
    exit 1
fi

echo "Cleaning up worktree for branch: $BRANCH_NAME"

# Check if branch exists on remote
if git ls-remote --exit-code --heads origin "$BRANCH_NAME" >/dev/null 2>&1; then
    echo "🌐 Deleting remote branch: $BRANCH_NAME"
    git push origin --delete "$BRANCH_NAME" || echo "⚠️  Remote branch may already be deleted"
fi

# Remove worktree
echo "📁 Removing worktree: $WORKTREE_PATH"
git worktree remove "$WORKTREE_PATH" --force

# Delete local branch
if git branch --list "$BRANCH_NAME" | grep -q "$BRANCH_NAME"; then
    echo "🌿 Deleting local branch: $BRANCH_NAME"
    git branch -D "$BRANCH_NAME"
fi

# Prune worktree references
git worktree prune

echo "✅ Cleanup completed for: $BRANCH_NAME"

# List remaining worktrees
echo ""
echo "Remaining worktrees:"
git worktree list

