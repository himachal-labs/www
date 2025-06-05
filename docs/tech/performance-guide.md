# Performance Guide

Performance targets, optimization strategies, and monitoring for the VastSilicon website.

## Performance Targets

### Core Web Vitals
| Metric | Target | Current |
|--------|--------|---------|
| **LCP** (Largest Contentful Paint) | <2.5s | <1.0s ✅ |
| **FID** (First Input Delay) | <100ms | <50ms ✅ |
| **CLS** (Cumulative Layout Shift) | <0.1 | <0.05 ✅ |

### Additional Metrics
| Metric | Target | Current |
|--------|--------|---------|
| **TTFB** (Time to First Byte) | <200ms | <200ms ✅ |
| **FCP** (First Contentful Paint) | <1.0s | <1.0s ✅ |
| **TTI** (Time to Interactive) | <1.5s | <1.5s ✅ |

### Lighthouse Scores
- **Performance**: 100/100
- **Accessibility**: 100/100  
- **Best Practices**: 100/100
- **SEO**: 100/100

## Performance Budget

### Bundle Size Limits
```
Initial Load Budget:
├── JavaScript: <100KB
├── CSS: <50KB
├── Images: <200KB (above-fold)
├── Fonts: <100KB
└── HTML: <50KB
Total: <500KB initial load
```

### Resource Limits
- **HTTP requests**: <50 for initial page load
- **Third-party scripts**: Minimal (only essential analytics)
- **Font families**: Max 2 families, 4 weights total

## Optimization Strategies

### Image Optimization

**Using LazyImage Component**:
```typescript
import { LazyImage } from '@/components/performance'

<LazyImage 
  src="/images/product/screenshot.png"
  alt="Product screenshot"
  width={400}
  height={300}
  priority={false}  // true for above-fold images
/>
```

**Best Practices**:
- Use WebP format with JPEG fallback
- Appropriate dimensions (not oversized)
- Priority loading for hero images
- Lazy loading for below-fold content
- Responsive image sizes
- Proper alt text for accessibility

### CSS Optimization

**Tailwind Configuration**:
```javascript
// tailwind.config.js - Optimized for performance
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],  // Precise content paths
  theme: {
    extend: {
      // Custom tokens only when needed
    }
  },
  plugins: []  // Minimal plugins
}
```

**Optimization Features**:
- Critical CSS automatically inlined
- Unused Tailwind classes purged in production
- JIT compilation for fast development
- Minimal custom CSS modules

### JavaScript Optimization

**Bundle Splitting**:
```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})

// Conditional loading
const AnalyticsComponent = dynamic(() => import('./Analytics'), {
  ssr: false  // Client-side only
})
```

**Code Splitting Strategy**:
- Route-based splitting (automatic via Next.js)
- Component-based splitting for heavy components
- Vendor chunk separation for caching
- Tree shaking for unused code elimination

### Font Optimization

**Current Setup**:
```typescript
// Font optimization with next/font
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'  // Optimize font loading
})
```

**Optimization Features**:
- Self-hosted Google Fonts
- Font display: swap for better UX
- Preload critical font files
- Variable fonts when possible

## Performance Monitoring

### Automated Monitoring

**Vercel Analytics Integration**:
```typescript
// Core Web Vitals automatically tracked
import { PerformanceOptimizer } from '@/components/performance'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PerformanceOptimizer />  {/* Tracks Core Web Vitals */}
        {children}
      </body>
    </html>
  )
}
```

**Metrics Tracked**:
- Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- Long tasks (>50ms)
- Slow resources (>1s load time)
- Bundle size regression

### Manual Performance Testing

**Local Testing**:
```bash
# Build and test performance
npm run build
npm run start

# Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Bundle analysis
npx @next/bundle-analyzer
```

**CI/CD Performance Checks**:
```bash
# Performance budget enforcement
npm run build
# Check bundle sizes in build output
# Fail build if targets exceeded
```

## Performance Optimization Checklist

### Development
- [ ] Use LazyImage component for all images
- [ ] Implement lazy loading for non-critical components
- [ ] Minimize custom CSS, prefer Tailwind utilities
- [ ] Use dynamic imports for heavy components
- [ ] Optimize component re-renders with React.memo

### Build Process
- [ ] Enable Tailwind CSS purging
- [ ] Configure Next.js bundle optimization
- [ ] Minimize third-party dependencies
- [ ] Use production builds for testing

### Deployment
- [ ] Enable Vercel Analytics
- [ ] Configure CDN caching headers
- [ ] Test Core Web Vitals in production
- [ ] Monitor bundle size regression

## Performance Debugging

### Identifying Performance Issues

**Core Web Vitals Problems**:
```bash
# Check specific metrics
npm run build && npm run start
# Open DevTools → Lighthouse → Performance audit
# Focus on failed Core Web Vitals
```

**Bundle Size Issues**:
```bash
# Analyze bundle composition
npx @next/bundle-analyzer

# Check individual dependencies
npx bundle-phobia [package-name]
```

**Runtime Performance**:
```bash
# Use React DevTools Profiler
# Monitor component render times
# Identify unnecessary re-renders
```

### Common Performance Problems

**Large Images**:
```typescript
// Problem: Oversized images
<img src="/huge-image.jpg" width="200" />

// Solution: Proper image optimization
<LazyImage 
  src="/optimized-image.webp"
  width={200}
  height={150}
  sizes="200px"
/>
```

**Heavy JavaScript**:
```typescript
// Problem: Heavy imports in critical path
import { heavyUtilityLibrary } from 'heavy-library'

// Solution: Dynamic import
const heavyFunction = dynamic(() => import('heavy-library'))
```

**CSS Bloat**:
```css
/* Problem: Large custom CSS files */
.component { /* hundreds of lines */ }

/* Solution: Tailwind utilities */
<div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
```

## Performance Budget Enforcement

### Build-Time Checks
```bash
# Check bundle sizes during build
npm run build
# Output shows bundle sizes
# Alert if sizes exceed targets
```

### Runtime Monitoring
```bash
# Real User Monitoring with Vercel Analytics
# Automatic Core Web Vitals tracking
# Performance regression alerts
```

### Performance CI/CD
```yaml
# Example GitHub Actions performance check
- name: Performance Audit
  run: |
    npm run build
    npx lighthouse-ci autorun
```

## Performance Best Practices

### Component Design
- **Lazy load non-critical components**
- **Use React.memo for expensive renders**
- **Minimize prop drilling**
- **Implement proper loading states**

### Asset Management
- **Optimize images before adding to repository**
- **Use appropriate image formats (WebP with fallbacks)**
- **Implement progressive image loading**
- **Minimize font variations**

### Code Organization
- **Keep bundles focused and small**
- **Avoid importing entire libraries**
- **Use tree shaking effectively**
- **Implement proper caching strategies**

For performance troubleshooting, see [Troubleshooting Guide](troubleshooting.md).
For monitoring setup, see [Monitoring Guide](monitoring.md).