# Development Guide

Day-to-day development workflows for the VastSilicon website.

## Quick Start

```bash
git checkout -b feature/my-feature
npm run dev                    # Start development server
# Make changes
npm run lint && npm run type-check && npm run build
git commit -m "feat: add feature"
```

## Development Workflow

### 1. Branch Strategy

```bash
# Feature development
git checkout -b feature/feature-name
git checkout -b fix/bug-description
git checkout -b docs/update-readme

# Always pull latest before creating branch
git pull origin main
```

### 2. Development Commands

```bash
npm run dev          # Development server with hot reload
npm run build        # Production build test
npm run lint         # ESLint validation
npm run type-check   # TypeScript validation
npm run start        # Test production build locally
```

### 3. Code Quality Checks

Before committing, run:
```bash
npm run lint         # Fix linting errors
npm run type-check   # Fix TypeScript errors  
npm run build        # Ensure build succeeds
```

## Content Management

### Adding New Products

**1. Create product file**: `src/content/products/product-name.mdx`

```yaml
---
metadata:
  name: "Product Name"
  tagline: "Brief value proposition"
  description: "SEO description"
  status: "available" | "coming-soon" | "in-development"
  platforms: ["ios", "android", "web"]
  primaryColor: "#3b82f6"
features:
  - title: "Feature Name"
    description: "Feature description"
    icon: "icon-name"
screenshots:
  - "/images/product-name/screenshot1.png"
appStore:
  ios: "https://apps.apple.com/app/product"
---

# Product content in Markdown
Write product description and details here.
```

**2. Add product assets**: `public/images/product-name/`
- Screenshots (PNG/JPG)
- Hero images
- Product icons
- Demo videos (optional)

**3. Test and deploy**:
```bash
npm run dev  # Verify at /products/product-name
npm run build && git commit -m "feat: add Product Name"
```

### Adding Blog Posts

**1. Create post file**: `src/content/blog/category/post-name.mdx`

```yaml
---
metadata:
  title: "Post Title"
  description: "Meta description"
  publishDate: "2024-01-15"
  author: "Author Name"
  category: "case-studies" | "philosophy" | "insights"
  tags: ["tag1", "tag2"]
  readTime: 5
---

# Post content in Markdown
```

**2. Test**: Post automatically appears in blog listing

## Component Development

### Component Structure

```typescript
// src/components/ui/ComponentName.tsx
interface ComponentProps {
  required: string
  optional?: boolean
  children?: React.ReactNode
}

export default function ComponentName({ 
  required, 
  optional = false, 
  children 
}: ComponentProps) {
  return (
    <div className="base-classes">
      {children}
    </div>
  )
}
```

### Component Guidelines

- **TypeScript**: Always use interfaces for props
- **Tailwind**: Use utility classes for styling
- **Accessibility**: Include ARIA attributes
- **Responsive**: Mobile-first design
- **Export**: Use default exports for components

### Component Organization

```
src/components/
├── ui/              # Base components (Button, Card, Badge)
├── layout/          # Layout components (Header, Footer)
├── product/         # Product-specific components
├── trust/           # Trust signal components
└── performance/     # Performance optimization components
```

### Creating New Components

1. **Create component file** in appropriate directory
2. **Export from index.ts** for clean imports:
   ```typescript
   // src/components/ui/index.ts
   export { default as Button } from './Button'
   export { default as Card } from './Card'
   ```
3. **Use in other components**:
   ```typescript
   import { Button, Card } from '@/components/ui'
   ```

## Styling Guidelines

### Tailwind Usage

```typescript
// Use semantic class names
className="bg-vast-primary text-white hover:bg-vast-primary/90"

// Responsive design
className="text-sm md:text-base lg:text-lg"

// Component variants
const variants = {
  primary: 'bg-vast-primary text-white',
  secondary: 'bg-vast-secondary text-vast-primary'
}
```

### Custom Design Tokens

```javascript
// Available in tailwind.config.js
colors.vast.primary      // Brand primary color
colors.vast.secondary    // Brand secondary color
spacing.section          // Section spacing
fontSize.hero           // Hero text size
```

## Testing Strategy

### Manual Testing

```bash
# Test different screen sizes
npm run dev
# Open browser dev tools → responsive mode

# Test build process
npm run build
npm run start

# Test performance
npx lighthouse http://localhost:3000
```

### Automated Checks

```bash
# Type safety
npm run type-check

# Code quality
npm run lint

# Build validation
npm run build
```

## File Organization

### Import Patterns

```typescript
// External libraries first
import React from 'react'
import Image from 'next/image'

// Internal utilities
import { getAllProducts } from '@/lib/products'
import type { Product } from '@/lib/schemas'

// Components (grouped)
import { Button, Card } from '@/components/ui'
import { ProductHero } from '@/components/product'
```

### Naming Conventions

- **Components**: PascalCase (`ProductTemplate.tsx`)
- **Files**: kebab-case (`product-template.tsx` for non-components)
- **Variables**: camelCase (`productList`)
- **Constants**: UPPER_CASE (`API_ENDPOINT`)

## Git Workflow

### Commit Messages

Use conventional commits:
```bash
feat: add new product template component
fix: resolve image loading issue in carousel
docs: update API reference for product schema
style: improve button hover states
refactor: simplify product data processing
test: add validation for product metadata
```

### Pull Request Process

1. **Create feature branch**
2. **Make changes with tests**
3. **Run quality checks**:
   ```bash
   npm run lint && npm run type-check && npm run build
   ```
4. **Create descriptive PR**
5. **Address review feedback**
6. **Merge after approval**

## Performance Considerations

### Bundle Optimization

- **Dynamic imports** for heavy components:
  ```typescript
  const HeavyComponent = dynamic(() => import('./HeavyComponent'))
  ```

- **Image optimization**:
  ```typescript
  import { LazyImage } from '@/components/performance'
  
  <LazyImage 
    src="/images/product/screenshot.png"
    alt="Screenshot"
    width={300}
    height={200}
  />
  ```

### Code Splitting

- **Route-based**: Automatic via Next.js App Router
- **Component-based**: Use `dynamic()` for large components
- **Library-based**: Import only needed functions

## Environment Setup

### Required Tools

- **Node.js**: 18.17+ (use latest LTS)
- **npm**: 9+ (comes with Node.js)
- **VS Code**: Recommended editor
- **Git**: Latest version

### Recommended VS Code Extensions

- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- MDX

### MCP Servers for Website Analysis

```bash
# Install Playwright MCP for webpage analysis
npm install @playwright/mcp

# Add server - choose scope:
claude mcp add -s user playwright npx @playwright/mcp     # User-wide (all projects)
claude mcp add -s local playwright npx @playwright/mcp    # Project-only

# Verify and manage
claude mcp list                    # List all servers
claude mcp get playwright          # Show server details
claude mcp remove playwright -s local  # Remove from specific scope
```

### Environment Variables

```bash
# .env.local (optional)
GOOGLE_SITE_VERIFICATION=your_verification_code
VERCEL_ANALYTICS_ID=your_analytics_id  # Auto-detected in production
```

## Common Tasks

### Update Design System

1. **Edit `tailwind.config.js`** for design tokens
2. **Update component variants** to use new tokens
3. **Test across all components**

### Optimize Performance

1. **Run Lighthouse audit**: `npx lighthouse http://localhost:3000`
2. **Analyze bundle**: `npx @next/bundle-analyzer`
3. **Check Core Web Vitals** in Vercel Analytics

### Debug Issues

1. **Check browser console** for JavaScript errors
2. **Verify TypeScript**: `npm run type-check`
3. **Check build**: `npm run build`
4. **See [Troubleshooting](troubleshooting.md)** for common issues

## UI Component Framework

### Component Architecture

Our component system enables rapid iteration while maintaining consistency:

```
src/components/
├── ui/               # Base design system components
├── layout/           # Page structure components  
├── product/          # Product-specific templates
├── trust/            # Social proof components
├── agency/           # Problem/solution patterns
├── analytics/        # Tracking components
└── performance/      # Optimization components
```

### Rapid Iteration Patterns

#### 1. Variant-Based Components

**Pattern: Multiple UI variants in single component**

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline' | 'cta-green' | 'cta-large'
  size: 'sm' | 'md' | 'lg' | 'xl'
  intent?: 'download' | 'learn-more' | 'contact' | 'navigation'
  testVariant?: string // For A/B testing
}

// Easy variant switching for tests
<Button variant={experimentVariant || 'primary'} intent="download">
  {ctaText || 'Download Now'}
</Button>
```

#### 2. Content-Driven Components

**Pattern: Externalized content for rapid copy testing**

```typescript
interface HeroConfig {
  headline: string
  subheadline: string
  cta: { primary: string; secondary?: string }
  variant: 'center' | 'left' | 'split'
}

const heroVariants = {
  'agency-focused': {
    headline: 'Stop guessing. Start knowing.',
    subheadline: 'We restore human agency through AI-augmented decision-making.',
    variant: 'center'
  },
  'product-focused': {
    headline: 'Smart apps for complex decisions',
    subheadline: 'AI-powered tools that translate complexity into clarity.',
    variant: 'split'
  }
}
```

#### 3. Layout Template System

**Pattern: Composable sections with swappable layouts**

```typescript
interface ProductPageConfig {
  hero: HeroConfig
  problemSolution?: ProblemSolutionConfig
  features: FeatureConfig
  screenshots: ScreenshotConfig
  availability: AvailabilityConfig
  layout: 'default' | 'showcase' | 'minimal'
}

const ProductPage = ({ config }: { config: ProductPageConfig }) => {
  const Layout = layoutComponents[config.layout]
  
  return (
    <Layout>
      <ProductHero {...config.hero} />
      {config.problemSolution && <ProblemSolutionPair {...config.problemSolution} />}
      <ScreenshotCarousel {...config.screenshots} />
      <FeatureGrid {...config.features} />
      <AvailabilitySection {...config.availability} />
    </Layout>
  )
}
```

### UI Iteration Strategy

#### Component-Level Iteration (1-2 hours)
- **Strategy**: Atomic component testing
- **Process**: Component → Isolated testing → Deploy → Measure → Iterate
- **Priority**: Header/Navigation, Hero sections, CTA buttons, Product cards

#### Section-Level Iteration (4-8 hours)  
- **Strategy**: Template-based testing
- **Process**: Section template → Content variants → Layout testing → User feedback
- **Priority**: Product introduction, Feature showcase, Company story

#### Page-Level Iteration (1-2 days)
- **Strategy**: Full user journey testing
- **Process**: User flow mapping → Page architecture → Content strategy → Multi-device testing

### A/B Testing Integration

```typescript
// Hook for component-level A/B tests
export const useABTest = (testName: string, variants: string[]) => {
  const [variant, setVariant] = useState<string>()
  
  useEffect(() => {
    const selectedVariant = analytics.getVariant(testName, variants)
    setVariant(selectedVariant)
  }, [testName])
  
  return variant || variants[0]
}

// Usage in components
export const TestableButton = (props: ButtonProps) => {
  const variant = useABTest('cta-button-test', ['primary', 'cta-green', 'cta-large'])
  return <Button {...props} variant={variant} />
}
```

### Performance Optimization Patterns

```typescript
// Lazy load heavy components
const ScreenshotCarousel = lazy(() => import('./ScreenshotCarousel'))
const InteractiveDemo = lazy(() => import('./InteractiveDemo'))

// Usage with loading states
export const ProductPage = () => {
  return (
    <div>
      <ProductHero />
      <Suspense fallback={<ScreenshotPlaceholder />}>
        <ScreenshotCarousel />
      </Suspense>
      <Suspense fallback={<DemoPlaceholder />}>
        <InteractiveDemo />
      </Suspense>
    </div>
  )
}
```

### Implementation Guidelines

#### Component Development Workflow
```bash
# 1. Create component variant
npm run create-component ComponentName

# 2. Add to Storybook for visual testing
npm run storybook

# 3. Implement A/B test variants
npm run test:visual

# 4. Deploy with feature flag
npm run deploy:staged

# 5. Monitor metrics
npm run analytics:component ComponentName
```

#### Configuration Management
```
src/config/
├── components/       # Component configurations
├── pages/           # Page configurations  
├── themes/          # Theme configurations
├── experiments/     # A/B test configurations
└── features/        # Feature flag configurations
```

For technical reference, see [API Reference](api-reference.md).
For deployment, see [Deployment Guide](deployment-guide.md).