# Analytics Implementation Guide

## Overview

VastSilicon website uses Vercel Analytics for performance-optimized tracking with minimal bundle impact. This document describes the implementation architecture, usage patterns, and maintenance procedures.

## Architecture

### Core Components

**Analytics Provider**: `src/app/layout.tsx`
- Vercel Analytics React component
- Automatic pageview tracking
- 1.5KB bundle impact

**Event Interface**: `src/lib/analytics.ts`  
- Standardized event tracking functions
- Type-safe event properties
- Abstraction layer for potential migration

**Performance Monitor**: `src/components/performance/PerformanceOptimizer.tsx`
- Core Web Vitals tracking
- Performance issue detection
- Resource monitoring

## Implementation Details

### Basic Setup

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
```

### Event Tracking

```typescript
// src/lib/analytics.ts
import { track } from '@vercel/analytics'

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, string | number>
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window !== 'undefined') {
    track(event.name, event.properties)
  }
}

// Predefined business events
export function trackAppStoreClick(product: string, platform: 'ios' | 'android'): void {
  trackEvent({
    name: 'app_store_click',
    properties: { product, platform }
  })
}
```

### Performance Monitoring

```typescript
// Automatic Core Web Vitals tracking
import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
  import('@vercel/analytics').then(({ track }) => {
    onLCP(metric => {
      track('Core Web Vital', {
        metric: 'LCP',
        value: metric.value,
        rating: metric.rating
      })
    })
    // ... other vitals
  })
})
```

## Event Schema

### Business Events

**App Store Click**
```json
{
  "name": "app_store_click",
  "properties": {
    "product": "choicecheck|moneytide",
    "platform": "ios|android"
  }
}
```

**Page View** (Automatic)
```json
{
  "name": "pageview",
  "properties": {
    "path": "/products/choicecheck"
  }
}
```

### Performance Events

**Core Web Vital**
```json
{
  "name": "Core Web Vital",
  "properties": {
    "metric": "LCP|CLS|INP|FCP|TTFB",
    "value": 1250.5,
    "rating": "good|needs-improvement|poor"
  }
}
```

**Long Task**
```json
{
  "name": "Long Task",
  "properties": {
    "duration": 85,
    "start_time": 1500
  }
}
```

**Slow Resource**
```json
{
  "name": "Slow Resource",
  "properties": {
    "resource_name": "image.jpg",
    "duration": 1250,
    "resource_type": "img"
  }
}
```

## Usage Guidelines

### Adding New Events

1. **Define event in analytics.ts**
```typescript
export function trackCustomEvent(action: string, category: string): void {
  trackEvent({
    name: 'custom_action',
    properties: { action, category }
  })
}
```

2. **Use in components**
```typescript
import { trackCustomEvent } from '@/lib/analytics'

function MyComponent() {
  const handleClick = () => {
    trackCustomEvent('button_click', 'hero_section')
  }
  
  return <button onClick={handleClick}>Track Me</button>
}
```

### Development Guidelines

**Do Not Track**
- Development environment (automatic)
- Users with Do Not Track enabled
- Personal identifying information

**Track Sparingly**
- Focus on business-critical events
- Avoid tracking every interaction
- Consider free tier limits (2,500 events/month)

## Performance Considerations

### Bundle Impact
- **Vercel Analytics**: +1.5KB
- **Web Vitals**: +15KB (dynamic import)
- **Total addition**: ~16.5KB to vendor bundle

### Optimization Techniques
- Dynamic imports for non-critical tracking
- Conditional loading based on environment
- Async event processing

### Performance Monitoring
Monitor these metrics:
- Bundle size impact on First Load JS
- Analytics script loading time
- Event processing performance

## Free Tier Management

### Limits
- **Free Tier**: 2,500 events/month
- **Automatic Events**: Pageviews
- **Custom Events**: Business and performance tracking

### Optimization Strategies
1. **Prioritize Business Events**
   - App store clicks (high value)
   - Key user actions (medium value)
   - Performance monitoring (low value if over limit)

2. **Conditional Tracking**
   - Disable non-critical events when approaching limits
   - Sample performance events (e.g., track 10% of visitors)

3. **Event Batching**
   - Group related events when possible
   - Use properties instead of separate events

## Dashboard Access

### Vercel Dashboard
- Navigate to project → Analytics tab
- Real-time and historical data
- Event breakdown and properties
- Performance insights

### Key Metrics to Monitor
- **Traffic**: Pageviews, unique visitors
- **Engagement**: Custom events, session duration  
- **Performance**: Core Web Vitals scores
- **Business**: App store click-through rates

## Troubleshooting

### Common Issues

**Events Not Appearing**
- Check Vercel dashboard (data can lag 5-10 minutes)
- Verify production environment (dev events not tracked)
- Confirm Analytics component in layout.tsx

**Performance Impact**
- Monitor First Load JS size in build output
- Check for duplicate analytics imports
- Verify dynamic imports are working

**Development Testing**
```typescript
// Test events in development
if (process.env.NODE_ENV === 'development') {
  console.log('Would track:', eventName, properties)
} else {
  track(eventName, properties)
}
```

## Migration Strategy

### From Other Analytics

**Event Abstraction**: The `trackEvent` interface allows easy migration
```typescript
// Change implementation without changing usage
export function trackEvent(event: AnalyticsEvent): void {
  // Switch between providers here
  vercelTrack(event.name, event.properties)
  // or: googleAnalytics.track(event)
  // or: plausible(event.name, { props: event.properties })
}
```

**Data Export**: Vercel Analytics data can be exported via API for migration

### To Other Analytics
1. Update `trackEvent` implementation
2. Test event compatibility
3. Monitor data during transition period
4. Remove Vercel Analytics component

## Maintenance

### Regular Tasks
- **Monthly**: Review event volume vs free tier limits
- **Quarterly**: Analyze event usefulness and ROI
- **Annually**: Evaluate analytics solution vs alternatives

### Monitoring Checklist
- [ ] Bundle size within performance budget
- [ ] All critical events tracking correctly
- [ ] Performance monitoring functioning
- [ ] Free tier limits not exceeded
- [ ] Dashboard accessible and useful

## Best Practices

### Event Design
- Use consistent naming conventions
- Include relevant context in properties
- Avoid deeply nested property objects
- Design for queryability and analysis

### Code Organization
- Keep tracking logic in analytics.ts
- Use wrapper functions for common events
- Abstract implementation details from components
- Test tracking in development with console logs

### Privacy Compliance
- No personal identifying information in events
- Respect Do Not Track headers (automatic)
- GDPR compliant by default with Vercel Analytics
- Minimal data collection approach

## Support

### Documentation
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Web Vitals Library](https://web.dev/vitals/)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)

### Internal Resources
- `docs/adrs/003-analytics-solution-selection.md` - Decision rationale
- `docs/arch/analytics-architecture.md` - Architecture diagram
- `src/lib/analytics.ts` - Implementation reference