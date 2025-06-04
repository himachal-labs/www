# VastSilicon Website

Company web front - cognitive infrastructure for the next century.

## Getting Started

Install dependencies and start development:

```sh
npm install
npm run dev
```

## Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Working with Claude on Multiple Features

This project uses git worktrees to enable parallel feature development with Claude. This approach allows you to work on multiple features simultaneously without context switching.

### Creating a New Feature Worktree

```sh
./scripts/workingtree.sh feature/feature-name
```

This will:
- Create a new branch from `main`
- Set up an isolated worktree in `./worktrees/feature/feature-name`
- Copy `CLAUDE.md` for consistent Claude behavior
- Provide instructions for starting Claude in that context

### Working in a Worktree

```sh
cd ./worktrees/feature/feature-name
claude
```

Each worktree is a complete copy of the repository on its own branch, allowing you to:
- Work on different features simultaneously
- Keep each Claude session focused on a single feature
- Avoid conflicts between different development streams

### Cleaning Up When Done

```sh
./scripts/clean_worktree.sh feature/feature-name
```

This will safely:
- Remove the worktree directory
- Delete the local branch
- Delete the remote branch (if it exists)
- Clean up git references

### Example Workflow

```sh
# Start working on authentication
./scripts/workingtree.sh feature/user-auth
cd ./worktrees/feature/user-auth
claude
# Work with Claude on auth implementation...

# In another terminal, start working on UI components
./scripts/workingtree.sh feature/ui-components
cd ./worktrees/feature/ui-components
claude
# Work with Claude on UI components...

# When auth is complete
./scripts/clean_worktree.sh feature/user-auth

# Continue working on UI components...
```

### Benefits

- **Isolation**: Each feature development is completely isolated
- **Parallel Development**: Work on multiple features without switching contexts
- **Claude Optimization**: Each Claude session maintains focus on a single feature
- **Clean History**: Each feature gets its own clean commit history
- **Easy Cleanup**: Simple script-based cleanup when features are complete
