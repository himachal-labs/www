# API Reference

Technical reference for component interfaces, content schemas, and configuration options.

## Content Schemas

### Product Schema

Product content files located in `src/content/products/`:

```typescript
interface ProductMetadata {
  name: string                    // Product display name
  tagline: string                 // Brief description
  description: string             // Full description
  category: string                // Product category
  status: 'available' | 'coming-soon' | 'in-development'
  platforms: ('ios' | 'android' | 'web')[]
  primaryColor?: string           // Hex color for theming
  icon?: string                   // Path to product icon
}

interface ProductContent {
  metadata: ProductMetadata
  features?: {
    title?: string
    description?: string
    items: Feature[]
    layout?: 'masonry' | '3-column' | 'alternating'
  }
  screenshots?: {
    title?: string
    images: Screenshot[]
    navigation?: 'dots' | 'arrows' | 'both'
  }
  appStore?: {
    ios?: string                  // App Store URL
    android?: string              // Play Store URL
  }
  availability?: {
    platforms: Platform[]
  }
}

interface Feature {
  title: string
  description: string
  icon?: string
  category?: string
}

interface Screenshot {
  src: string                     // Image path
  alt: string                     // Alt text
  caption?: string                // Optional caption
}
```

**Example frontmatter:**
```yaml
---
metadata:
  name: "ChoiceCheck"
  tagline: "AI-powered nutrition analysis"
  status: "available"
  platforms: ["ios"]
  primaryColor: "#3b82f6"
features:
  title: "Key Features"
  items:
    - title: "Instant Analysis"
      description: "Scan nutrition labels in seconds"
      icon: "scan"
screenshots:
  images:
    - src: "/images/choicecheck/analysis.png"
      alt: "Nutrition analysis screen"
appStore:
  ios: "https://apps.apple.com/app/choicecheck"
---
```

### Blog Schema

Blog content files located in `src/content/blog/`:

```typescript
interface BlogMetadata {
  title: string                   // Post title
  description: string             // Meta description
  publishDate: string             // ISO date string
  author: string                  // Author name
  category: 'case-studies' | 'philosophy' | 'insights'
  tags: string[]                  // Content tags
  readTime?: number               // Reading time in minutes
  featured?: boolean              // Featured post
}
```

**Example frontmatter:**
```yaml
---
metadata:
  title: "Building Transparent AI for Nutrition"
  description: "How we built ChoiceCheck's AI analysis system"
  publishDate: "2024-01-15"
  author: "VastSilicon Team"
  category: "case-studies"
  tags: ["AI", "nutrition", "transparency"]
  readTime: 8
---
```

## Component Interfaces

### UI Components

#### Button
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string                   // External link
  onClick?: () => void            // Click handler
  disabled?: boolean
  children: React.ReactNode
  className?: string
}
```

#### Badge
```typescript
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}
```

#### Card
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}
```

### Product Components

#### ProductTemplate
```typescript
interface ProductTemplateProps {
  hero: ProductHeroProps
  problemSolution?: ProblemSolutionProps
  features?: FeaturesProps
  screenshots?: ScreenshotsProps
  availability?: AvailabilityProps
}

interface ProductHeroProps {
  title: string
  tagline: string
  description: string
  primaryAction: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  image?: {
    src: string
    alt: string
  }
  status: string
}
```

#### FeatureGrid
```typescript
interface FeatureGridProps {
  title?: string
  features: Feature[]
  layout?: 'masonry' | '3-column' | 'alternating'
  className?: string
}

interface Feature {
  title: string
  description: string
  icon?: string
  category?: string
}
```

#### ScreenshotCarousel
```typescript
interface ScreenshotCarouselProps {
  images: Screenshot[]
  navigation?: 'dots' | 'arrows' | 'both'
  autoplay?: boolean
  interval?: number
  className?: string
}
```

### Layout Components

#### Header
```typescript
interface HeaderProps {
  showNavigation?: boolean
  className?: string
}
```

#### Footer
```typescript
interface FooterProps {
  showSocial?: boolean
  className?: string
}
```

## Configuration Options

### Tailwind Design Tokens

#### Colors
```javascript
colors: {
  vast: {
    primary: '#1E40AF',          // Brand primary
    secondary: '#64748B',        // Brand secondary
    accent: '#059669',           // Accent color
    gray: {                      // Gray scale
      50: '#f8fafc',
      100: '#f1f5f9',
      // ... 200-900
    }
  },
  semantic: {
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    info: '#2563EB'
  }
}
```

#### Typography
```javascript
fontSize: {
  'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
  'heading-1': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
  'heading-2': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
  'heading-3': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
  'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
  'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }]
}
```

#### Spacing
```javascript
spacing: {
  'micro': '0.25rem',           // 4px
  'small': '1rem',              // 16px
  'medium': '2rem',             // 32px
  'large': '4rem',              // 64px
  'section': '6rem'             // 96px
}
```

### Next.js Configuration

#### Static Export Settings
```javascript
// next.config.js
const nextConfig = {
  output: 'export',              // Static site generation
  images: { unoptimized: true }, // For static hosting
  trailingSlash: true,           // URL structure
  webpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }
}
```

## Library Functions

### Content Processing

#### Product Functions
```typescript
// src/lib/products.ts
export function getAllProducts(): Product[]
export function getProductBySlug(slug: string): Product | undefined
export function getProductSlugs(): string[]
```

#### Blog Functions
```typescript
// src/lib/blog.ts
export function getAllPosts(): BlogPost[]
export function getPostBySlug(slug: string): BlogPost | undefined
export function getPostsByCategory(category: string): BlogPost[]
export function getFeaturedPosts(): BlogPost[]
```

### Analytics Functions
```typescript
// src/lib/analytics.ts
export function trackEvent(event: AnalyticsEvent): void
export function trackAppStoreClick(product: string, platform: string): void
export function trackPageView(path: string): void
```

## Build Outputs

### Static Export Structure
```
out/
├── index.html               # Homepage
├── products/
│   ├── choicecheck.html    # Product pages
│   └── moneytide.html
├── blog/
│   ├── index.html          # Blog listing
│   └── case-studies/       # Category pages
├── _next/                  # Next.js assets
│   ├── static/chunks/      # JavaScript bundles
│   └── static/css/         # CSS files
└── images/                 # Static images
```

### Bundle Analysis
- **Main bundle**: Core application code
- **Vendor bundle**: Third-party dependencies
- **Chunk files**: Route-specific code
- **CSS files**: Compiled Tailwind styles

## Environment Variables

| Variable | Purpose | Required | Default |
|----------|---------|----------|---------|
| `GOOGLE_SITE_VERIFICATION` | Search Console verification | No | - |
| `VERCEL_ANALYTICS_ID` | Vercel Analytics tracking | No | Auto-detected |
| `NODE_ENV` | Environment mode | Yes | `development` |

For implementation examples, see the [Development Guide](development.md).