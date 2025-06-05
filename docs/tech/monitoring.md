# Monitoring

Analytics, performance tracking, and monitoring setup for the VastSilicon website.

## Analytics Overview

### Vercel Analytics Integration

**Implementation**: Built-in Vercel Analytics with Core Web Vitals tracking

**What we track**:
- Page views and unique visitors
- Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- Custom events (app store clicks, feature interactions)
- Performance metrics and resource loading

**Privacy**: No personal information collected, GDPR compliant

## Performance Monitoring

### Core Web Vitals Tracking

```typescript
// Automatic tracking in PerformanceOptimizer component
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'
import { track } from '@vercel/analytics'

// Core Web Vitals are automatically tracked and sent to Vercel Analytics
onLCP(metric => track('Core Web Vital', {
  metric: 'LCP',
  value: metric.value,
  rating: metric.rating
}))
```

### Performance Targets

| Metric | Target | Current Status |
|--------|--------|----------------|
| **LCP** | <2.5s | ✅ <1.0s |
| **FID** | <100ms | ✅ <50ms |
| **CLS** | <0.1 | ✅ <0.05 |
| **FCP** | <1.8s | ✅ <1.0s |
| **TTFB** | <600ms | ✅ <200ms |

### Bundle Size Monitoring

| Bundle Type | Size Limit | Current |
|-------------|------------|---------|
| **JavaScript** | <100KB | ~85KB |
| **CSS** | <50KB | ~35KB |
| **Total Initial** | <150KB | ~120KB |

## Custom Event Tracking

### App Store Clicks

```typescript
// Track when users click app store links
trackAppStoreClick('choicecheck', 'ios')
trackAppStoreClick('moneytide', 'ios')
```

### Performance Events

```typescript
// Long tasks (>50ms)
track('Long Task', {
  duration: 150,
  start_time: 1000
})

// Slow resources (>1s load time)
track('Slow Resource', {
  resource_name: 'large-image.jpg',
  duration: 1200,
  resource_type: 'image'
})
```

### Feature Interaction Tracking

```typescript
// Feature grid interactions
track('Feature Viewed', {
  product: 'choicecheck',
  feature: 'nutrition-analysis'
})

// Screenshot carousel navigation
track('Screenshot Navigation', {
  product: 'moneytide',
  action: 'next'
})
```

## Analytics Dashboard

### Vercel Analytics Dashboard

Access: [Vercel Dashboard](https://vercel.com/analytics) → Project → Analytics

**Key Metrics**:
- **Visitors**: Unique visitors and page views
- **Performance**: Core Web Vitals scores
- **Popular Pages**: Most visited pages
- **Traffic Sources**: Referrer information

### Custom Dashboard (Growth Dashboard)

Location: `/dashboard` (development only)

**Features**:
- Real-time performance metrics
- A/B testing results (when implemented)
- Conversion tracking
- Content performance

## Monitoring Setup

### Development Environment

```bash
# Start development with analytics
npm run dev

# Analytics events visible in browser console
# Core Web Vitals tracked automatically
```

### Production Environment

```bash
# Analytics automatically enabled on Vercel deployment
# Environment variables auto-detected:
# - VERCEL_ANALYTICS_ID (auto-set)
# - VERCEL_ENV (production)
```

### Manual Analytics Configuration

```typescript
// Optional: Custom analytics configuration
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics 
          mode="production"  // or "development" for testing
          debug={false}      // Enable debug mode
        />
      </body>
    </html>
  )
}
```

## Performance Alerts

### Automated Monitoring

**Vercel Deployment Checks**:
- Bundle size regression detection
- Performance score monitoring
- Build time tracking

**Lighthouse CI** (if configured):
- Automated performance audits
- Core Web Vitals regression detection
- Accessibility score monitoring

### Manual Monitoring

```bash
# Local performance audit
npm run build
npx lighthouse http://localhost:3000 --view

# Bundle analysis
npm run build
npx @next/bundle-analyzer
```

## Troubleshooting Analytics

### Common Issues

**Analytics not appearing**
```typescript
// Check if analytics is properly initialized
console.log('Vercel Analytics:', typeof window.va)

// Verify events are being sent
track('test-event', { test: true })
```

**Performance metrics missing**
```typescript
// Check browser support
if ('PerformanceObserver' in window) {
  console.log('Performance monitoring supported')
} else {
  console.log('Performance monitoring not supported')
}
```

**High bundle size**
```bash
# Analyze bundle composition
npm run build
npx @next/bundle-analyzer

# Check for large dependencies
npx bundle-phobia [package-name]
```

### Debug Mode

Enable analytics debug mode for development:

```typescript
// Add to root layout for debugging
<Analytics debug={true} />

// Or set environment variable
VERCEL_ANALYTICS_DEBUG=1
```

## Privacy Compliance

### Data Collection

**What we collect**:
- Page paths (no personal URLs)
- Performance metrics
- Anonymous interaction events
- Browser and device capabilities

**What we DON'T collect**:
- Personal information
- User identifiers
- Form inputs
- Search queries

### User Control

**Opt-out mechanism**:
```typescript
// Users can disable analytics
if (navigator.doNotTrack === '1') {
  // Skip analytics initialization
}
```

**Cookie-free tracking**:
- No persistent cookies set
- No cross-site tracking
- Local session only

## Monitoring Checklist

### Daily
- [ ] Check Vercel Analytics dashboard
- [ ] Review Core Web Vitals scores
- [ ] Monitor error rates

### Weekly
- [ ] Analyze performance trends
- [ ] Review popular content
- [ ] Check conversion metrics

### Monthly
- [ ] Bundle size regression check
- [ ] Performance audit with Lighthouse
- [ ] Analytics data export for reporting

### On Deployment
- [ ] Verify analytics still working
- [ ] Check Core Web Vitals haven't regressed
- [ ] Confirm bundle size within limits
- [ ] Test custom event tracking

For implementation details, see [Performance Guide](performance.md) and [Development Guide](development.md).