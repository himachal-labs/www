# Performance Requirements

Performance targets and optimization strategies for the VastSilicon website.

## Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### Additional Metrics
- **TTFB (Time to First Byte)**: < 200ms globally
- **FCP (First Contentful Paint)**: < 1.0s
- **TTI (Time to Interactive)**: < 1.5s

### Lighthouse Scores
- **Performance**: 100/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 100/100

## Performance Budget

### Bundle Sizes
```
Initial Load Budget:
├── HTML: < 50KB
├── CSS: < 20KB (critical path)
├── JavaScript: < 100KB  
├── Fonts: < 100KB
└── Images: < 200KB (above fold)
Total: < 470KB initial load
```

### Resource Limits
- **Total requests**: < 50 for initial page load
- **Third-party scripts**: Minimize or eliminate
- **Font files**: Max 2 font families, 4 weights total

## Optimization Strategies

### Image Optimization
```typescript
// Next.js Image component with automatic optimization
import Image from 'next/image'

<Image 
  src="/images/hero.jpg"
  alt="Description"
  width={800}
  height={400}
  quality={85}
  priority={false} // true for above-fold images
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>
```

**Checklist**:
- [ ] Use Next.js Image component (automatic WebP conversion)
- [ ] Appropriate dimensions (not oversized)
- [ ] Priority loading for above-fold images
- [ ] Lazy loading for below-fold images (automatic)
- [ ] Alt text for accessibility
- [ ] Responsive sizes attribute

### CSS Optimization
```typescript
// Next.js with Tailwind CSS
// Critical CSS automatically extracted and inlined
// Unused Tailwind classes purged in production

// Component-specific styles (minimal)
import styles from './Component.module.css'

export default function Component() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Use Tailwind utilities primarily */}
      <div className={styles.customPattern}>
        {/* Custom styles only when necessary */}
      </div>
    </div>
  )
}
```

**Strategies**:
- Use Tailwind utilities in templates
- Minimal custom CSS
- Critical CSS automatically inlined
- Unused styles purged in production

### JavaScript Optimization
```typescript
// Next.js static export - minimal JavaScript by default
// Interactive components only when needed

// Static component (no JavaScript)
export default function StaticComponent() {
  return <div>Static content renders fast</div>
}

// Interactive component with code splitting
import dynamic from 'next/dynamic'

const InteractiveComponent = dynamic(() => import('./InteractiveComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: true // Server-side render for SEO
})
```

**Guidelines**:
- Keep JavaScript minimal (static export approach)
- Use dynamic imports for heavy components
- Prefer CSS for animations and interactions
- Server-side render for SEO when possible

### Font Optimization
```typescript
// Next.js 13+ with automatic font optimization
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevents invisible text during font load
  variable: '--font-inter'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}

// Or for local fonts
import localFont from 'next/font/local'

const customFont = localFont({
  src: '../fonts/custom-font.woff2',
  display: 'swap'
})
```

## Measuring Performance

### Local Testing
```bash
# Build and preview production version
npm run build
npm run start

# Open Chrome DevTools
# 1. Go to Lighthouse tab
# 2. Select "Desktop" or "Mobile"
# 3. Run "Performance" audit
# 4. Check all scores are 90+
```

### Automated Testing
```bash
# Lighthouse CI (if configured)
npm run lighthouse

# Bundle size analysis
npm run build
# Check .next/static folder size and Next.js bundle analyzer

# Bundle analysis (if configured)
npm run analyze
```

### Manual Testing
1. **Test on slow network**: Throttle to "Slow 3G" in DevTools
2. **Test on mobile device**: Real device testing
3. **Test with cache disabled**: Hard refresh (Cmd+Shift+R)

## Common Performance Issues

### Large Images
**Problem**: Unoptimized images slow page load
```typescript
// ❌ Bad: Large unoptimized image
<img src="/hero.jpg" alt="Hero" />

// ✅ Good: Optimized with Next.js Image
import Image from 'next/image'

<Image 
  src="/hero.jpg" 
  alt="Hero" 
  width={800} 
  height={400} 
  priority // For above-fold images
  quality={85}
/>
```

### Render-Blocking Resources
**Problem**: CSS/JS blocks page rendering
```html
<!-- ❌ Bad: Blocking external script -->
<script src="https://external-script.com/widget.js"></script>

<!-- ✅ Good: Deferred loading -->
<script async src="https://external-script.com/widget.js"></script>
```

### Layout Shift
**Problem**: Content moves after images load
```typescript
// ❌ Bad: No dimensions specified
<img src="/photo.jpg" alt="Photo" />

// ✅ Good: Dimensions prevent shift
import Image from 'next/image'

<Image 
  src="/photo.jpg" 
  width={400} 
  height={300} 
  alt="Photo"
  placeholder="blur" // Prevents shift during load
/>
```

### Too Much JavaScript
**Problem**: Heavy client-side JavaScript
```typescript
// ❌ Bad: Unnecessary client-side bundle
import HeavyLibrary from 'heavy-library'

// ✅ Good: Dynamic import when needed
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false, // Only load on client when needed
  loading: () => <div>Loading...</div>
})
```

## Performance Checklist

### Before Deployment
- [ ] Lighthouse performance score > 90
- [ ] All Core Web Vitals in green
- [ ] Bundle size within budget
- [ ] Images optimized and properly sized
- [ ] Fonts preloaded and using font-display: swap
- [ ] No render-blocking resources
- [ ] Tested on slow network/mobile device

### Regular Monitoring
- [ ] Weekly Lighthouse audits
- [ ] Bundle size tracking
- [ ] Real user metrics (when available)
- [ ] Performance regression testing

## Tools and Resources

### Testing Tools
- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: https://webpagetest.org
- **GTmetrix**: https://gtmetrix.com
- **Chrome DevTools**: Performance and Network tabs

### Optimization Tools
- **Astro Image**: Built-in image optimization
- **Tailwind CSS**: Automatic purging of unused styles
- **Vite**: Fast bundling and optimization
- **Squoosh**: Image compression (https://squoosh.app)

### Monitoring (Future)
- **Core Web Vitals**: Google Search Console
- **Real User Monitoring**: Consider tools like SpeedCurve
- **Performance Budgets**: CI integration to prevent regressions

## Emergency Performance Fixes

If performance suddenly degrades:

1. **Check recent changes**: What was deployed recently?
2. **Run Lighthouse audit**: Identify specific issues
3. **Check bundle size**: `npm run build` and inspect .next/static/
4. **Test images**: Are any images unoptimized?
5. **Check third-party scripts**: Any new external resources?

### Quick Wins
- Optimize largest images first
- Remove unused JavaScript
- Enable compression (usually automatic on Vercel)
- Lazy load below-fold content
- Preload critical resources

## Performance Culture

### Development Habits
- Always test performance locally before deploying
- Consider performance impact of every change
- Use browser DevTools regularly
- Question necessity of new dependencies

### Code Review Focus
- Check for performance-impacting changes
- Verify image optimization
- Look for unnecessary client-side JavaScript
- Ensure accessibility doesn't compromise performance