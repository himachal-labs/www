# ADR-001: Technology Stack for Product Portfolio Website

**Date**: 2025-01-06  
**Status**: Proposed  
**Deciders**: Development Team  

## Context

VastSilicon needs a company website that serves as a portfolio for multiple products (MoneyTide, ChoiceCheck, future apps). Key requirements:

### Primary Requirements
- **Content-driven**: Easy to add new products with vision docs, images, specs
- **Template-based expandability**: New product websites launch via simple configuration
- **Developer-friendly**: Easy maintenance and onboarding
- **Performance**: <1s load time, excellent Core Web Vitals
- **Static nature**: Company front with product showcases (not web apps)

### Expandability Pattern
Product teams should be able to:
1. Provide vision document, images, feature list
2. Use predefined templates to generate product pages
3. Launch new product sites with minimal developer effort
4. Maintain consistent design system across all properties

## Decision

**Choose Next.js with Static Export over Astro**

## Rationale

### Next.js Advantages for This Use Case

#### 1. Content Management Superiority
```typescript
// Easy product configuration approach
// content/products/moneytide.mdx
export const metadata = {
  name: "MoneyTide",
  tagline: "Financial clarity for everyone",
  status: "available",
  platforms: ["ios", "android"],
  primaryColor: "#1E40AF",
  hero: {
    image: "/images/moneytide/hero.png",
    video: "/videos/moneytide-demo.mp4"
  }
}

# MoneyTide Vision
Financial decisions shouldn't be guesswork...
```

#### 2. Template-Based Product Pages
```typescript
// app/products/[slug]/page.tsx
import { getProductData } from '@/lib/products'
import ProductTemplate from '@/components/ProductTemplate'

export default function ProductPage({ params }) {
  const product = getProductData(params.slug)
  return <ProductTemplate {...product} />
}

// Single template handles all products
```

#### 3. Developer Familiarity & Maintenance
- **React ecosystem**: Most developers know React
- **Rich tooling**: Excellent VS Code support, debugging
- **Large community**: More Stack Overflow answers, tutorials
- **Hiring**: Easier to find Next.js developers

#### 4. Component Reusability
```typescript
// Shared component library
import { ProductHero, FeatureGrid, AppStoreLinks } from '@/components/product'

export default function ProductTemplate({ name, features, hero, platforms }) {
  return (
    <>
      <ProductHero {...hero} />
      <FeatureGrid features={features} />
      <AppStoreLinks platforms={platforms} />
    </>
  )
}
```

#### 5. Content Workflow
```bash
# Adding new product (simple process)
1. Add product MDX file in content/products/
2. Add images to public/images/[product]/
3. Deploy - new product page automatically generated
```

### Astro Disadvantages for This Use Case

#### 1. Overkill Complexity
- **Islands architecture**: Unnecessary for mostly static content
- **Framework agnostic**: Not needed when React works fine
- **Learning curve**: Additional tool to learn for content workflow

#### 2. Content Management
- Less mature content handling compared to Next.js ecosystem
- Fewer examples of content-driven sites
- Less flexible templating for product pages

#### 3. Developer Ecosystem
- Smaller community
- Fewer resources for troubleshooting
- Less familiar to most developers

### Performance Comparison

Both achieve excellent performance for static sites:

| Metric | Next.js Static | Astro |
|--------|---------------|-------|
| Bundle size | ~100KB (minimal React) | ~50KB (no framework) |
| Build time | Fast | Faster |
| Developer experience | Excellent | Good |
| Content handling | Excellent | Good |

**Verdict**: 50KB difference negligible vs. developer experience gains

## Implementation Approach

### Project Structure
```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── products/[slug]/page.tsx    # Dynamic product pages
│   └── about/page.tsx              # Company pages
├── components/
│   ├── product/                    # Product page templates
│   ├── ui/                         # Shared UI components
│   └── layout/                     # Layout components
├── content/
│   ├── products/                   # Product MDX files
│   └── pages/                      # Page content
└── lib/
    ├── products.ts                 # Product data utilities
    └── content.ts                  # Content processing
```

### Product Addition Workflow
1. **Content team**: Creates product vision document
2. **Developer**: Adds single MDX file with metadata
3. **Assets**: Images added to public folder
4. **Deploy**: Automatic page generation via templates

### Multi-Site Strategy
```typescript
// Shared component library (published to npm)
@vastsilicon/ui-components

// Individual sites consume shared components
// moneytide.com uses ProductTemplate
// choicecheck.com uses ProductTemplate  
// vastsilicon.com uses PortfolioGrid
```

## Configuration

### Next.js Config for Static Export
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // For static export
  },
  experimental: {
    mdxRs: true, // Fast MDX processing
  }
}
```

### Performance Optimizations
- **Static export**: Pre-rendered HTML
- **Image optimization**: Next.js built-in tools
- **Bundle splitting**: Automatic code splitting
- **Critical CSS**: Automatic extraction

## Consequences

### Positive
- ✅ **Faster development**: Familiar tools and patterns
- ✅ **Easy maintenance**: Large community support
- ✅ **Content workflow**: Simple MDX-based product addition
- ✅ **Template system**: Reusable product page templates
- ✅ **Developer onboarding**: Most developers know React
- ✅ **Excellent performance**: Static export achieves all targets

### Negative
- ❌ **Slightly larger bundle**: ~50KB more than Astro
- ❌ **React dependency**: Tied to React ecosystem
- ❌ **Build complexity**: More configuration than simpler SSGs

### Mitigations
- Bundle size difference negligible for business value gained
- React ecosystem provides more value than constraint
- Next.js abstracts most build complexity

## Monitoring

Success metrics for this decision:
- **Developer velocity**: Time to add new product pages
- **Maintenance overhead**: Time spent on tooling vs. features
- **Performance**: Core Web Vitals remain green
- **Team satisfaction**: Developer experience feedback

## Alternatives Considered

### 11ty (Eleventy)
**Pros**: Very simple, great for content
**Cons**: Limited component reusability, less familiar templating
**Verdict**: Too simple for component-driven design system needs

### Gatsby
**Pros**: Great for content sites, GraphQL data layer
**Cons**: Complex setup, build performance issues, overkill for simple content
**Verdict**: Unnecessary complexity for static content

### Astro (original choice)
**Pros**: Excellent performance, islands architecture
**Cons**: Less familiar, content workflow more complex, smaller ecosystem
**Verdict**: Technical excellence but worse developer experience for this use case

## Implementation Plan

### Phase 1: Foundation
1. Set up Next.js with static export
2. Create base component library
3. Implement ProductTemplate component
4. Set up MDX content processing

### Phase 2: Content Migration
1. Convert existing content to MDX format
2. Create product page templates
3. Implement shared design system
4. Test product addition workflow

### Phase 3: Multi-Site Setup
1. Extract shared components to npm package
2. Set up individual product sites
3. Implement cross-site navigation
4. Deploy and test full workflow

## Conclusion

Next.js with static export better serves VastSilicon's needs for a content-driven, template-based product portfolio site. The slight performance trade-off is outweighed by significantly better developer experience, content management, and expandability for product-focused use case.