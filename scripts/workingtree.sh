#!/bin/bash

set -e

BRANCH_NAME=$1

if [ -z "$BRANCH_NAME" ]; then
    echo "Usage: $0 <branch-name>"
    echo "Example: $0 feature/user-auth"
    exit 1
fi

WORKTREE_PATH="./worktrees/$BRANCH_NAME"

if [ -d "$WORKTREE_PATH" ]; then
    echo "Error: Worktree already exists at $WORKTREE_PATH"
    exit 1
fi

echo "Creating worktree for branch: $BRANCH_NAME"

# Ensure we're in the main branch and up to date
git checkout main
git pull origin main

# Create worktree with new branch
git worktree add -b "$BRANCH_NAME" "$WORKTREE_PATH"

# Copy CLAUDE.md to worktree if it exists
if [ -f "CLAUDE.md" ]; then
    cp "CLAUDE.md" "$WORKTREE_PATH/"
fi

echo "✅ Worktree created successfully!"
echo "📁 Path: $WORKTREE_PATH"
echo "🌿 Branch: $BRANCH_NAME"
echo ""
echo "To start working with Claude:"
echo "  cd $WORKTREE_PATH && claude"
echo ""
echo "To clean up when done:"
echo "  ./scripts/clean_worktree.sh $BRANCH_NAME"

