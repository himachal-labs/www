# Performance Philosophy

## Performance as Trust Currency
Every millisecond is a promise kept or broken. Performance demonstrates competence.

**The agency principle**: We promise "the cost of informed choice approaches zero." That cost includes time. Every millisecond of delay increases the cognitive burden we claim to eliminate.

## The Performance Paradox
We claim to manage AI complexity elegantly. A slow website contradicts this claim fundamentally.

**The deeper truth**: If we can't deliver a simple website instantly, why believe we can translate complex AI insights at the speed of thought? Performance IS the first demonstration of our philosophy.

## Research-Driven Performance Standards

### Industry Context
- **70% abandonment** from performance issues (Google research)
- **Linear's philosophy**: "Speed is a core feature"
- **Conversion impact**: 100ms delay = 7% conversion drop
- **SEO impact**: Core Web Vitals now ranking factors

### Our Performance Commitments
- **<1s** full page load globally
- **<200ms** interaction response
- **0** layout shifts after load
- **100/100** Lighthouse scores

## Performance Budget Philosophy

### Every Byte Must Justify Itself
```
Initial Load Budget:
- HTML: <50KB
- Critical CSS: <20KB  
- JavaScript: <100KB
- Fonts: <100KB
- Images: <200KB (above fold)
Total: <470KB initial load
```

### Trade-off Priorities
1. Speed over features (cognitive cost reduction > feature count)
2. Perceived over actual (feeling fast = feeling augmented)
3. Core experience over enhancements (agency before augmentation)
4. Global performance over local optimization (universal human right)

## Loading Strategy

### Critical Path Optimization
**Phase 1: Instant (0-100ms)**
- DNS prefetch for known domains
- Preconnect to required origins
- Critical CSS inlined
- HTML structure visible

**Phase 2: Fast (100-500ms)**
- First meaningful paint
- Core interactivity enabled
- Web fonts loaded
- Above-fold images rendered

**Phase 3: Complete (500-1000ms)**
- Full interactivity
- Below-fold content ready
- Enhancement JavaScript loaded
- Prefetch likely next pages

**Phase 4: Enhanced (1000ms+)**
- Analytics loaded
- Service worker installed
- Additional features activated
- Background optimizations

## Asset Optimization Requirements

### Images
- **Modern formats**: WebP/AVIF with fallbacks
- **Responsive sizing**: Serve smallest effective size
- **Lazy loading**: Native browser lazy loading
- **Blur-up placeholders**: Perceived performance
- **CDN delivery**: Global edge caching

### JavaScript
- **Code splitting**: Load only what's needed
- **Tree shaking**: Remove unused code
- **Minification**: Every byte counts
- **Compression**: Brotli preferred over gzip
- **Defer/async**: Never block rendering

### CSS
- **Critical inlining**: Above-fold styles inline
- **Purging**: Remove unused styles
- **Minification**: Compressed delivery
- **Modern features**: Use native instead of JavaScript
- **Logical properties**: Reduce complexity

### Fonts
- **Subsetting**: Only characters needed
- **Preloading**: Critical fonts immediate
- **Font display**: Swap for perceived performance
- **Variable fonts**: One file, many weights
- **System fonts**: Consider for body text

## Caching Strategy

### Static Assets
- **Immutable**: Hash filenames, cache forever
- **CDN**: Global edge caching
- **Service worker**: Offline capability
- **Preload**: Critical resources
- **Prefetch**: Likely next resources

### Content Strategy
- **Static generation**: Build time, not request time
- **Edge caching**: Close to users globally
- **Stale-while-revalidate**: Instant serving
- **Incremental regeneration**: Update without full rebuild

## Network Optimization

### Connection Management
- **HTTP/3**: When available
- **Multiplexing**: Efficient resource loading
- **Early hints**: 103 status for preloading
- **Connection reuse**: Persistent connections
- **Domain sharding**: Avoided (HTTP/2 makes unnecessary)

### Global Performance
- **CDN strategy**: Content near every user
- **Regional optimization**: Adapt to connection quality
- **Offline first**: Work without connection
- **Progressive enhancement**: Better for better connections

## Perceived Performance

### Psychological Optimizations
- **Skeleton screens**: Structure before content
- **Progressive rendering**: Show as available
- **Optimistic updates**: Assume success
- **Smooth transitions**: Hide loading time
- **Instant feedback**: Every click acknowledged

### Loading Psychology
- **0-100ms**: Feels instant (augmentation at thought speed)
- **100-300ms**: Noticeable but acceptable (still within flow)
- **300-1000ms**: Machine is working (cognitive pause)
- **1000ms+**: Mental context switch (agency interrupted)
- **10000ms+**: User is gone (trust broken)

## Monitoring Philosophy

### Real User Metrics (RUM)
- **Actual experience**: Not synthetic tests
- **Global coverage**: Performance everywhere
- **Device diversity**: All user contexts
- **Connection variety**: 3G to fiber
- **Continuous**: Not just launch testing

### Key Metrics
- **Web Vitals**: LCP, FID/INP, CLS
- **Business metrics**: Conversion correlation
- **Error rates**: JavaScript, resource loading
- **Geographic**: Performance by region
- **Device**: Mobile vs desktop reality

## Performance Culture

### Development Practices
- **Performance budgets**: Automated enforcement
- **CI/CD checks**: Block slow changes
- **Regular audits**: Prevent degradation
- **Team education**: Everyone owns performance
- **Celebrate wins**: Make speed visible

### Design Considerations
- **Performance in mockups**: Design with budgets
- **Motion performance**: 60fps or remove
- **Image requirements**: Define maximum sizes
- **Interaction cost**: Every feature weighted
- **Simplicity bias**: Less is faster

## Anti-Patterns to Avoid

### Technical Anti-Patterns
- Render-blocking resources (gates content = gates agency)
- Synchronous third-party scripts (complexity we don't control)
- Unoptimized images (visual complexity without translation)
- Web font FOIT/FOUT (jarring = breaks trust)
- Memory leaks in SPAs (degrading performance = degrading augmentation)

### Process Anti-Patterns
- "We'll optimize later"
- Feature creep without budgets
- Testing only on fast connections
- Ignoring real user data
- Local-only performance testing

## The Performance Mindset

### Every Decision Asks:
1. What's the performance cost? (cognitive burden added?)
2. Is this worth the bytes? (does it serve agency?)
3. Can this be deferred? (progressive disclosure principle)
4. What's the simpler solution? (complexity serves users, not developers)
5. How does this scale globally? (cognitive augmentation as human right)

## Remember
Performance is a feature, not an optimization. It's the foundation that enables every other experience.

Users don't praise fast sites—they abandon slow ones. Our goal is invisible excellence: so fast it's not noticed, so reliable it's assumed.

We're building cognitive infrastructure. If we can't make a website fast, why trust us with thought?

**The north star**: Every performance optimization brings us closer to the promise—making the cost of informed choice approach zero. Speed isn't about technology; it's about returning time to humans so they can focus on what matters: their values, goals, and choices.

**The test**: Does using our website feel like having a "trusted companion for thought"? Instant, reliable, invisible in its excellence.