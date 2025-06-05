# Architecture

System design, technology decisions, and architectural patterns for the VastSilicon website.

## System Overview

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 | React framework with App Router |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Content** | MDX | Markdown with JSX components |
| **Language** | TypeScript | Type-safe development |
| **Analytics** | Vercel Analytics | Performance and usage tracking |
| **Deployment** | Vercel | Static site hosting with CDN |

### Architecture Decisions

#### Next.js App Router
**Decision**: Use Next.js 15 with App Router instead of Pages Router

**Rationale**:
- Modern routing with file-system based structure
- Built-in SEO optimization (metadata API)
- Server components for better performance
- Streaming and suspense support

**Trade-offs**:
- ✅ Better performance and SEO
- ✅ Simplified data fetching
- ❌ Learning curve for team
- ❌ Some ecosystem tools lag behind

#### Static Export
**Decision**: Use static site generation instead of server-side rendering

**Rationale**:
- Better performance (CDN caching)
- Lower hosting costs
- Higher availability
- Simpler deployment

**Trade-offs**:
- ✅ Fast page loads
- ✅ Global CDN distribution
- ❌ No server-side dynamic content
- ❌ Build-time content updates only

#### MDX for Content
**Decision**: Use MDX for product and blog content instead of headless CMS

**Rationale**:
- Version control for content
- Developer-friendly workflow
- Component integration in content
- No external dependencies

**Trade-offs**:
- ✅ Git-based content workflow
- ✅ Type-safe content schemas
- ❌ Non-technical editors need training
- ❌ Build required for content updates

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │   Vercel CDN    │    │  Build Process  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Request page       │                       │
         ├──────────────────────▶│                       │
         │                       │                       │
         │ 2. Serve static files │                       │
         │◀──────────────────────┤                       │
         │                       │                       │
         │ 3. Analytics events   │                       │
         ├──────────────────────▶│                       │
         │                       │                       │
                                 │ 4. Deploy trigger     │
                                 ├──────────────────────▶│
                                 │                       │
                                 │ 5. Built static files│
                                 │◀──────────────────────┤
```

## Component Architecture

### Component Hierarchy

```
App
├── Layout (Header + Footer)
├── Pages
│   ├── HomePage
│   ├── ProductPage
│   │   ├── ProductTemplate
│   │   │   ├── ProductHero
│   │   │   ├── FeatureGrid
│   │   │   ├── ScreenshotCarousel
│   │   │   └── AvailabilitySection
│   │   └── ProblemSolutionPair
│   └── BlogPage
│       ├── BlogPost
│       └── BlogListing
└── UI Components
    ├── Button
    ├── Badge
    ├── Card
    └── LazyImage
```

### Design Patterns

#### Composition over Inheritance
```typescript
// Good: Composable components
<ProductTemplate 
  hero={heroProps}
  features={featuresProps}
  screenshots={screenshotsProps}
/>

// Avoid: Large prop interfaces
<ProductPage 
  title="..." 
  description="..." 
  features={[...]} 
  screenshots={[...]}
  // ... 20+ props
/>
```

#### Container/Presenter Pattern
```typescript
// Container: Data fetching and logic
export async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  return <ProductTemplate {...product} />
}

// Presenter: Pure rendering component
export function ProductTemplate({ hero, features }: ProductTemplateProps) {
  return (
    <div>
      <ProductHero {...hero} />
      <FeatureGrid features={features} />
    </div>
  )
}
```

#### Custom Hooks for Logic
```typescript
// Reusable analytics logic
export function useAnalytics() {
  const track = useCallback((event: string, data: any) => {
    trackEvent({ name: event, properties: data })
  }, [])
  
  return { track }
}
```

## Data Flow

### Content Processing Pipeline

```
MDX Files → gray-matter → Frontmatter + Content → Component Props → Rendered UI
```

1. **Content Creation**: Authors create `.mdx` files with frontmatter
2. **Build Process**: `gray-matter` parses frontmatter and content
3. **Static Generation**: Next.js generates static pages
4. **Runtime**: Components receive processed data as props

### Analytics Flow

```
User Interaction → Component Event → Analytics Library → Vercel Analytics → Dashboard
```

1. **User Action**: Click, page view, form submission
2. **Event Tracking**: Component calls `trackEvent()`
3. **Data Collection**: Vercel Analytics receives event
4. **Reporting**: Data appears in Vercel dashboard

## Performance Architecture

### Bundle Strategy

| Bundle | Size Target | Contents |
|--------|-------------|----------|
| **Main** | <100KB | Core application code |
| **Vendor** | <200KB | Third-party dependencies |
| **Route Chunks** | <50KB each | Page-specific code |
| **CSS** | <50KB | Tailwind compiled styles |

### Loading Strategy

1. **Critical Path**: HTML + CSS for above-fold content
2. **Progressive Enhancement**: JavaScript loads after critical rendering
3. **Lazy Loading**: Images and non-critical components load on demand
4. **Code Splitting**: Route-based automatic splitting

### Caching Strategy

```
Browser Cache (1 hour) → CDN Cache (24 hours) → Origin (Build artifacts)
```

- **Static Assets**: Long-term caching with content hashing
- **HTML Pages**: Short-term caching for content updates
- **API Routes**: No caching (not used in static export)

## Security Architecture

### Content Security

- **Input Sanitization**: MDX content is processed at build time
- **XSS Prevention**: React's built-in escaping
- **No User Input**: Static site with no user-generated content

### Deployment Security

- **HTTPS Only**: Enforced by Vercel
- **Headers**: Security headers configured in deployment
- **Dependencies**: Regular security audits with `npm audit`

### Analytics Privacy

- **No PII**: Vercel Analytics doesn't collect personal information
- **Client-side**: No server-side tracking
- **Opt-out**: Users can disable analytics

## Scalability Considerations

### Content Scaling

- **Build Performance**: Incremental builds for large content sets
- **CDN Distribution**: Global edge caching
- **Image Optimization**: Next.js image optimization for production

### Component Scaling

- **Tree Shaking**: Unused code automatically removed
- **Bundle Analysis**: Regular monitoring of bundle sizes
- **Component Lazy Loading**: Non-critical components load on demand

### Development Scaling

- **TypeScript**: Type safety for large teams
- **Component Library**: Reusable UI components
- **Documentation**: Self-documenting code and clear APIs

## Quality Assurance

### Code Quality

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Husky**: Pre-commit hooks

### Performance Standards

- **Core Web Vitals**: All metrics in "Good" range
- **Lighthouse**: Score >90 in all categories
- **Bundle Size**: Monitored in CI/CD pipeline

### Content Quality

- **Schema Validation**: TypeScript interfaces for content
- **Build Validation**: Fail build on invalid content
- **Link Checking**: Automated dead link detection

## Development Environment

### Local Development

```
Developer Machine → Next.js Dev Server → Hot Reload → Browser
```

- **Fast Refresh**: Component-level hot reloading
- **TypeScript**: Real-time type checking
- **Tailwind**: JIT compilation for fast builds

### Build Process

```
Source Code → TypeScript Compilation → Next.js Build → Static Export → Deployment
```

1. **Type Checking**: Validate TypeScript code
2. **Linting**: Check code quality rules
3. **Building**: Compile and bundle application
4. **Testing**: Run automated tests
5. **Export**: Generate static files

For implementation details, see [Development Guide](development.md) and [Performance Guide](performance.md).