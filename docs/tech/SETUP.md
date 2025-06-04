# Development Setup

Step-by-step guide to get the VastSilicon website running locally with Next.js.

## Prerequisites

### Required Software
- **Node.js**: Version 18+ (LTS recommended)
- **npm**: Version 8+ (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Check Your Versions
```bash
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 8.0.0 or higher
git --version     # Any recent version
```

### Install Node.js (if needed)
1. Go to [nodejs.org](https://nodejs.org)
2. Download and install the LTS version
3. Restart your terminal after installation

## Project Setup

### 1. Clone the Repository
```bash
git clone [repository-url]
cd vastsilicon-website
```

### 2. Install Dependencies
```bash
npm install
```

**What this does**: Downloads Next.js, React, Tailwind CSS, MDX processing, and development tools.

### 3. Start Development Server
```bash
npm run dev
```

**Expected output**:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

### 4. Verify Setup
1. Open http://localhost:3000 in your browser
2. You should see the VastSilicon homepage
3. Try editing a file in `src/app/` - changes should appear instantly (hot reload)

## Development Tools Setup

### VS Code Extensions (Recommended)
Install these extensions for the best development experience:

```bash
# Next.js and React support
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-react-next

# Tailwind CSS IntelliSense
code --install-extension bradlc.vscode-tailwindcss

# MDX support
code --install-extension silvenon.mdx

# Prettier formatting
code --install-extension esbenp.prettier-vscode
```

### VS Code Settings
Create `.vscode/settings.json` in project root:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

## Environment Configuration

### Environment Variables
Create `.env.local` file in project root:
```bash
# Development environment
NODE_ENV=development

# Content processing
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Add any future API keys here
# ANALYTICS_ID=your-analytics-id
```

**Note**: Never commit `.env.local` to Git. It's already in `.gitignore`.

### Next.js Configuration
The project includes `next.config.js` with optimal settings:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Static site generation
  images: {
    unoptimized: true,     // For static export
  },
  experimental: {
    mdxRs: true,          // Fast MDX processing
  }
}
```

## Verify Everything Works

### 1. Test Build Process
```bash
npm run build
```

**Expected**: Build completes without errors, creates `out/` folder (static export).

### 2. Test Production Preview
```bash
npm run start
```

**Expected**: Production version runs at http://localhost:3000

### 3. Test Linting
```bash
npm run lint
```

**Expected**: No linting errors (warnings are okay for now).

### 4. Test Type Checking
```bash
npm run type-check
```

**Expected**: No TypeScript errors.

### 5. Test Content Processing
Check that product pages work:
1. Navigate to http://localhost:3000/products/moneytide
2. Should display MoneyTide product page
3. Content should be processed from MDX files

## Content Development Setup

### Understanding the Content Structure
```
content/
├── products/
│   ├── moneytide.mdx       # MoneyTide product page
│   ├── choicecheck.mdx     # ChoiceCheck product page
│   └── [future-app].mdx    # Template for new products
└── pages/
    ├── about.mdx           # About page content
    └── privacy.mdx         # Legal pages
```

### Adding a Test Product
Create `content/products/test-app.mdx`:
```typescript
---
metadata:
  name: "TestApp"
  tagline: "A test application"
  status: "coming-soon"
  platforms: ["ios", "android"]
  primaryColor: "#10B981"
---

# TestApp Vision

This is a test product to verify the content system works.

## Key Features
- Feature 1
- Feature 2
- Feature 3
```

Then visit http://localhost:3000/products/test-app to see it rendered.

## Common Setup Issues

### Port Already in Use
If port 3000 is busy:
```bash
# Next.js will suggest alternative port
# Or specify different port:
npm run dev -- -p 3001
```

### Permission Errors (Mac/Linux)
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### Node Version Issues
```bash
# Check if you have multiple Node versions
which node

# Use Node Version Manager if needed
nvm install 18
nvm use 18
```

### Clean Install (if having issues)
```bash
# Remove dependencies and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

### MDX Processing Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Next Steps

After setup is complete:

1. **Read [DEVELOPMENT.md](DEVELOPMENT.md)** - Learn the Next.js development workflow
2. **Explore the content system** - Look at `content/products/` and try editing
3. **Test product templates** - Create a test product page
4. **Check [PERFORMANCE.md](PERFORMANCE.md)** - Understand optimization requirements

## Getting Help

### Common Commands Reference
```bash
npm run dev          # Start development server
npm run build        # Build static export for production
npm run start        # Preview production build locally
npm run lint         # Check code quality
npm run type-check   # Check TypeScript
npm run clean        # Clean build artifacts
```

### Content Workflow Commands
```bash
# Test content changes
npm run dev          # Auto-reloads on content changes

# Validate content structure
npm run lint         # Includes content validation

# Build with content
npm run build        # Processes all MDX content
```

### If You're Stuck
1. Check this setup guide again
2. Verify Node.js version is 18+
3. Clear cache: `rm -rf .next node_modules && npm install`
4. Ask the team for help

### Useful Links
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [VS Code React Extensions](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-react-next)