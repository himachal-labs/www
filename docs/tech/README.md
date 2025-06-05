# VastSilicon Website - Technical Documentation

## Quick Start

```bash
git clone <repository>
cd www
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Documentation Structure

| Document | Purpose | Audience |
|----------|---------|----------|
| [Getting Started](getting-started.md) | Quick setup and first contribution | New developers |
| [Development Guide](development-guide.md) | Day-to-day development workflows | Active contributors |
| [API Reference](api-reference.md) | Component interfaces and schemas | All developers |
| [Architecture](architecture.md) | System design and decisions | Technical leads |
| [Deployment Guide](deployment-guide.md) | Production deployment procedures | DevOps engineers |
| [Performance Guide](performance-guide.md) | Optimization guidelines and targets | Performance engineers |
| [Monitoring](monitoring.md) | Analytics and performance tracking | Operations team |
| [Troubleshooting](troubleshooting.md) | Common issues and solutions | Support team |

## Project Overview

Next.js static website with:
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Content**: MDX-based product and blog content
- **Deployment**: Static export to Vercel
- **Analytics**: Vercel Analytics with Core Web Vitals tracking

## Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **MDX**: Markdown with JSX for content
- **Vercel Analytics**: Performance and usage tracking

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── content/               # MDX content files
├── lib/                   # Utility functions and schemas
└── public/               # Static assets
```

## Common Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # Code linting
npm run type-check   # TypeScript validation
```

For detailed information, see the specific documentation sections linked above.