# VastSilicon Website

Content-driven product portfolio website built with Next.js. Showcases VastSilicon company and products (MoneyTide, ChoiceCheck, future apps) with template-based expandability.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Content-Driven Architecture

This site is designed for easy product additions:

1. **Add product content**: Create MDX file in `content/products/`
2. **Add assets**: Images/videos in `public/images/[product]/` 
3. **Deploy**: New product page automatically generated

Example product addition:
```typescript
// content/products/new-app.mdx
export const metadata = {
  name: "NewApp",
  tagline: "Clear value proposition",
  status: "coming-soon",
  platforms: ["ios", "android"],
  primaryColor: "#1E40AF"
}

# Product Vision
Your product description here...
```

## Documentation

Read these docs in order based on what you need:

| Document | When to read | Purpose |
|----------|--------------|---------|
| [DECISIONS.md](DECISIONS.md) | Before starting work | Understand technology choices |
| [SETUP.md](SETUP.md) | Setting up dev environment | Get development running |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Building features | Day-to-day development workflow |
| [PERFORMANCE.md](PERFORMANCE.md) | During development | Performance requirements reference |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Shipping to production | Release process |

## Project Goals

- **<1s load time globally** - Demonstrate infrastructure competence
- **100/100 Lighthouse scores** - Prove attention to detail  
- **Universal accessibility** - WCAG AA compliance minimum
- **Multi-app architecture** - Support MoneyTide + ChoiceCheck + future apps

## Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Code linting
npm run deploy       # Deploy to production
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage  
│   ├── products/[slug]/   # Dynamic product pages
│   └── about/             # Company pages
├── components/
│   ├── product/           # Product page templates
│   ├── ui/               # Shared UI components
│   └── layout/           # Layout components
├── content/
│   ├── products/         # Product MDX files
│   └── pages/            # Page content
└── lib/                  # Utilities and content processing

public/
├── images/[product]/     # Product assets
└── ...                   # Static files
```

## Need Help?

1. Check if your question is answered in the docs above
2. Look for similar issues in the codebase
3. Ask the team in chat/meetings