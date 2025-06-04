# Technical Documentation - VastSilicon Website

This documentation covers the technical implementation details for developers working with the VastSilicon Next.js website codebase.

## 1. Code Architecture

### Next.js App Router Structure
```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── products/
│   │   └── [slug]/        # Dynamic product pages
│   │       └── page.tsx
│   ├── blog/
│   │   ├── page.tsx       # Blog listing
│   │   └── [...slug]/     # Dynamic blog posts
│   │       └── page.tsx
│   ├── dashboard/         # Analytics dashboard
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/            # React components
├── content/              # MDX content files
├── lib/                  # Utility functions
└── public/              # Static assets
```

### Key Configuration Files
- **next.config.js**: Static export configuration with image optimization
- **tailwind.config.js**: Design system and component styling
- **tsconfig.json**: TypeScript configuration with path aliases
- **package.json**: Dependencies and build scripts

### Static Export Configuration
The app is configured for static export (`output: 'export'`) with:
- Unoptimized images for static hosting
- Webpack bundle optimization
- Compression enabled
- Custom chunk splitting for vendors

## 2. Component System

### Component Organization
```
components/
├── ui/                    # Base UI components
│   ├── Button.tsx
│   ├── Badge.tsx
│   └── Card.tsx
├── layout/               # Layout components
│   ├── Header.tsx
│   └── Footer.tsx
├── product/              # Product-specific components
│   ├── ProductTemplate.tsx
│   ├── ProductHero.tsx
│   ├── FeatureGrid.tsx
│   └── ScreenshotCarousel.tsx
├── trust/                # Trust signal components
├── analytics/            # Analytics components
├── performance/          # Performance optimization
└── agency/              # Problem/solution components
```

### Component Patterns

#### ProductTemplate Component
Main template for product pages that accepts structured data:
```typescript
interface ProductTemplateProps {
  hero: ProductHeroProps
  problemSolution?: {
    problem: { title: string; description: string; painPoints?: string[] }
    solution: { title: string; description: string; benefits?: string[] }
  }
  features?: {
    title?: string
    items: Feature[]
    layout?: 'masonry' | '3-column' | 'alternating'
  }
  screenshots?: {
    images: Screenshot[]
    navigation?: 'dots' | 'arrows' | 'both'
  }
  availability?: {
    platforms: { name: string; url: string; status: string }[]
  }
}
```

#### UI Component Usage
Base components use consistent props:
```typescript
// Button component with variants
<Button variant="primary" size="lg" href="/products/choicecheck">
  Download Now
</Button>

// Badge for status display
<Badge variant="success">Available</Badge>
<Badge variant="warning">Coming Soon</Badge>
```

### Creating New Components
1. Place in appropriate subdirectory under `src/components/`
2. Export from corresponding `index.ts` for clean imports
3. Use TypeScript interfaces for props
4. Follow naming convention: PascalCase for components

## 3. Content Management

### MDX Content Structure
Content is organized in two main directories:

#### Products (`src/content/products/`)
Each product is a `.mdx` file with frontmatter:
```yaml
---
metadata:
  name: "ProductName"
  tagline: "Product description"
  status: "available" | "coming-soon" | "in-development"
  platforms: ["ios", "android", "web"]
  primaryColor: "#3b82f6"
features:
  - title: "Feature Name"
    description: "Feature description"
    icon: "icon-name"
screenshots:
  - "/images/product/screenshot1.png"
appStore:
  ios: "https://apps.apple.com/app/product"
---
```

#### Blog Posts (`src/content/blog/`)
Organized by category with metadata:
```yaml
---
metadata:
  title: "Post Title"
  description: "Post description"
  publishDate: "2024-01-01"
  author: "Author Name"
  category: "case-studies" | "philosophy" | "insights"
  tags: ["tag1", "tag2"]
  readTime: 5
---
```

### Content Processing
- **Products**: Processed by `src/lib/products.ts`
- **Blog**: Processed by `src/lib/blog.ts`
- Both use `gray-matter` for frontmatter parsing
- Automatic excerpt generation for blog posts
- Static generation for all content at build time

### Adding New Content

#### New Product:
1. Create `/src/content/products/product-name.mdx`
2. Add required metadata and features
3. Place screenshots in `/public/images/product-name/`
4. Product automatically appears in routing

#### New Blog Post:
1. Create `/src/content/blog/category/post-name.mdx`
2. Add required metadata
3. Post automatically appears in blog listing

## 4. Styling System

### Tailwind Configuration
Custom design system extends Tailwind with:

#### Color Palette
```javascript
colors: {
  vast: {
    primary: '#1E40AF',
    secondary: '#64748B',
    accent: '#059669',
    gray: { /* 50-900 scale */ }
  },
  semantic: {
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626'
  }
}
```

#### Typography Scale
```javascript
fontSize: {
  'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
  'heading-1': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
  'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }]
}
```

#### Spacing System
```javascript
spacing: {
  'micro': '0.25rem',
  'small': '1rem',
  'medium': '2rem',
  'large': '4rem',
  'section': '6rem'
}
```

### Component Styling Patterns

#### Consistent Class Usage
```typescript
// Section spacing
className="py-section"  // 6rem top/bottom padding

// Container widths
className="max-w-container mx-auto"  // 1200px max width

// Content width
className="max-w-content"  // 65ch optimal reading width

// Card styling
className="bg-white rounded-card shadow-card"
```

#### Status-Based Styling
```typescript
// Dynamic classes based on status
const statusClasses = {
  available: 'bg-green-100 text-green-800',
  'coming-soon': 'bg-yellow-100 text-yellow-800',
  'in-development': 'bg-blue-100 text-blue-800'
}
```

## 5. Build & Development

### Development Commands
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production (static export)
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Build Process
1. **Static Generation**: All pages pre-rendered at build time
2. **Image Optimization**: Disabled for static export, handled at server level
3. **Bundle Optimization**: Vendor chunks separated, tree shaking enabled
4. **Output**: Static files in `/out/` directory

### Development Workflow
1. Start development server: `npm run dev`
2. Edit components in `src/components/`
3. Add content in `src/content/`
4. Build for production: `npm run build`
5. Test static export in `/out/` directory

### Performance Considerations
- **Bundle Size**: Target <500KB initial bundle
- **Image Loading**: LazyImage component for performance
- **Code Splitting**: Automatic via Next.js with custom vendor chunks
- **Progressive Enhancement**: Components work without JavaScript

### Deployment
The app builds to static files that can be deployed to any static hosting:
1. Run `npm run build`
2. Deploy `/out/` directory contents
3. Configure web server for trailing slashes
4. Set up CDN for global performance

### Environment Variables
- `GOOGLE_SITE_VERIFICATION`: For Google Search Console
- `VERCEL_ANALYTICS_ID`: For Vercel Analytics (optional)

### File Import Patterns
Use absolute imports with TypeScript path aliases:
```typescript
import { Button } from '@/components/ui'
import { getAllProducts } from '@/lib/products'
import type { Product } from '@/lib/schemas'
```

### Performance Monitoring
- Built-in Vercel Analytics
- Custom PerformanceOptimizer component
- Web Vitals tracking in production
- Lighthouse CI for build validation

This documentation provides the essential technical details for developers to understand, maintain, and extend the VastSilicon website codebase.