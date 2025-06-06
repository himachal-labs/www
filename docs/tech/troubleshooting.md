# Troubleshooting

Common issues and solutions for development, build, and deployment problems.

## Development Issues

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

**Alternative**: Find and kill the process manually
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)
```

### TypeScript Errors

**Problem**: TypeScript compilation errors during development

**Solutions**:

1. **Check for type errors**:
   ```bash
   npm run type-check
   ```

2. **Common fixes**:
   ```typescript
   // Missing type imports
   import type { Product } from '@/lib/schemas'
   
   // Strict null checks
   const product = getProduct(slug)
   if (!product) return notFound()
   
   // Component prop types
   interface Props {
     title: string
     description?: string  // Optional props
   }
   ```

3. **Clear TypeScript cache**:
   ```bash
   rm -rf .next/cache
   npm run dev
   ```

### Module Resolution Errors

**Problem**: `Module not found: Can't resolve '@/components/...'`

**Solution**: Check `tsconfig.json` path mapping:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### CSS/Tailwind Issues

**Problem**: Styles not applying or missing Tailwind classes

**Solutions**:

1. **Restart development server**:
   ```bash
   # Tailwind JIT compilation sometimes needs restart
   npm run dev
   ```

2. **Check Tailwind configuration**:
   ```javascript
   // tailwind.config.js
   module.exports = {
     content: [
       './src/**/*.{js,ts,jsx,tsx,mdx}',  // Ensure all files included
     ],
   }
   ```

3. **Clear build cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

## Build Issues

### Build Failures

**Problem**: `npm run build` fails with errors

**Common solutions**:

1. **Clear cache and rebuild**:
   ```bash
   rm -rf .next out node_modules
   npm install
   npm run build
   ```

2. **Check for TypeScript errors**:
   ```bash
   npm run type-check
   # Fix all reported errors before building
   ```

3. **Verify content schemas**:
   ```bash
   # Check MDX files for valid frontmatter
   # Ensure all required fields are present
   ```

### Image Optimization Errors

**Problem**: Image optimization failures in build

**Solution**: Verify image paths and formats
```javascript
// next.config.js - Already configured for static export
const nextConfig = {
  images: {
    unoptimized: true  // Required for static export
  }
}
```

**Check image usage**:
```typescript
// Use Next.js Image component correctly
import Image from 'next/image'

<Image
  src="/images/product/screenshot.png"
  alt="Product screenshot"
  width={300}
  height={200}
  unoptimized  // For static export
/>
```

### MDX Processing Errors

**Problem**: MDX files failing to process

**Common issues**:

1. **Invalid frontmatter**:
   ```yaml
   ---
   # Ensure proper YAML syntax
   metadata:
     name: "Product Name"  # Quoted strings
     status: "available"   # Use valid enum values
   ---
   ```

2. **Missing required fields**:
   ```typescript
   // Check schema requirements in api-reference.md
   // Ensure all required metadata fields are present
   ```

3. **Component usage in MDX**:
   ```mdx
   # Import components at top of MDX file
   import { Button } from '@/components/ui'
   
   <Button variant="primary">Click me</Button>
   ```

## Platform Integration Issues

### Apple App Site Association (AASA) Problems

**Problem**: Universal Links not working

**Common issues**:

1. **AASA file not found (404)**:
   ```bash
   # Verify files exist in public directory
   ls -la public/.well-known/apple-app-site-association
   ls -la public/apple-app-site-association
   ```

2. **Invalid JSON structure**:
   ```bash
   # Validate JSON syntax
   jq . public/.well-known/apple-app-site-association
   ```

3. **Wrong Content-Type header**:
   - Expected: `application/json`
   - Check server configuration
   - Verify no redirects on AASA paths

4. **Apple validation failing**:
   - Test: https://search.developer.apple.com/appsearch-validation-tool/
   - Enter domain: `vastsilicon.com`
   - Ensure HTTPS certificate is valid

**Debug steps**:
1. Clear Safari cache and test again
2. Verify app installed with correct Team ID
3. Check iOS device logs for Universal Link errors
4. Ensure domain matches exactly (no www vs non-www issues)

## Performance Issues

### Bundle Size Too Large

**Problem**: Bundle exceeds size limits

**Diagnosis**:
```bash
npm run build
npx @next/bundle-analyzer
```

**Solutions**:

1. **Identify large dependencies**:
   ```bash
   npx bundle-phobia [package-name]
   ```

2. **Use dynamic imports**:
   ```typescript
   // Lazy load heavy components
   const HeavyComponent = dynamic(() => import('./HeavyComponent'))
   ```

3. **Tree shake unused code**:
   ```typescript
   // Import only what you need
   import { trackEvent } from '@/lib/analytics'  // Good
   import * as analytics from '@/lib/analytics'  // Avoid
   ```

### Slow Page Load Times

**Problem**: Pages loading slower than performance targets

**Diagnosis**:
```bash
npx lighthouse http://localhost:3000 --view
```

**Solutions**:

1. **Optimize images**:
   ```typescript
   // Use appropriate image formats and sizes
   <LazyImage 
     src="/images/optimized.webp"
     fallback="/images/fallback.jpg"
   />
   ```

2. **Reduce JavaScript bundle**:
   ```typescript
   // Use server components where possible
   // Minimize client-side JavaScript
   ```

3. **Implement lazy loading**:
   ```typescript
   // Lazy load non-critical components
   const Analytics = dynamic(() => import('./Analytics'), { ssr: false })
   ```

## Deployment Issues

### Vercel Deployment Failures

**Problem**: Deployment fails on Vercel

**Common causes and solutions**:

1. **Build errors**:
   ```bash
   # Test build locally first
   npm run build
   # Fix any errors before deploying
   ```

2. **Environment variables**:
   ```bash
   # Check Vercel dashboard for required env vars
   # Ensure all environment variables are set
   ```

3. **Node.js version mismatch**:
   ```json
   // package.json - specify Node version
   {
     "engines": {
       "node": ">=18.17.0"
     }
   }
   ```

### Static Export Issues

**Problem**: Static export not working correctly

**Solutions**:

1. **Check Next.js configuration**:
   ```javascript
   // next.config.js
   const nextConfig = {
     output: 'export',          // Required for static export
     trailingSlash: true,       // Recommended
     images: { unoptimized: true }
   }
   ```

2. **Avoid server-side features**:
   ```typescript
   // Don't use in static export:
   // - API routes
   // - Server actions
   // - Dynamic routes without generateStaticParams
   ```

### 404 Errors in Production

**Problem**: Pages return 404 in production but work locally

**Solutions**:

1. **Check file naming**:
   ```
   # Ensure correct file structure
   src/app/products/[slug]/page.tsx  # Dynamic route
   src/content/products/choicecheck.mdx  # Content file
   ```

2. **Verify generateStaticParams**:
   ```typescript
   // Required for dynamic routes in static export
   export async function generateStaticParams() {
     const products = getAllProducts()
     return products.map(product => ({ slug: product.slug }))
   }
   ```

## Content Issues

### Product Pages Not Showing

**Problem**: Product pages return 404 or show no content

**Checklist**:

1. **File location**: `/src/content/products/[slug].mdx`
2. **Valid frontmatter**: Check metadata schema
3. **File naming**: Use kebab-case (e.g., `choice-check.mdx`)
4. **Required fields**: Ensure all required metadata present

**Debug steps**:
```typescript
// Check if product is being loaded
const products = getAllProducts()
console.log('Available products:', products.map(p => p.slug))
```

### Images Not Loading

**Problem**: Product screenshots or images not displaying

**Common issues**:

1. **File paths**: Use absolute paths from `/public`
   ```typescript
   // Correct
   src="/images/choicecheck/screenshot.png"
   
   // Incorrect
   src="./images/choicecheck/screenshot.png"
   ```

2. **File extensions**: Check actual file extensions match
3. **Case sensitivity**: File names are case-sensitive in production

### Blog Posts Missing

**Problem**: Blog posts not appearing in listings

**Checklist**:

1. **File structure**: `/src/content/blog/[category]/[post].mdx`
2. **Valid category**: Use existing categories from schema
3. **Publication date**: Check date format (ISO string)
4. **Required metadata**: All required fields present

## Analytics Issues

### Analytics Not Working

**Problem**: No analytics data appearing in Vercel dashboard

**Solutions**:

1. **Check Vercel project settings**:
   - Analytics enabled in project dashboard
   - Deployment successful

2. **Verify analytics code**:
   ```typescript
   // Check if analytics is loaded
   console.log('Vercel Analytics:', typeof window.va)
   ```

3. **Test with debug mode**:
   ```typescript
   <Analytics debug={true} />
   ```

### Performance Metrics Missing

**Problem**: Core Web Vitals not being tracked

**Check browser support**:
```typescript
if ('PerformanceObserver' in window) {
  console.log('Performance monitoring supported')
} else {
  console.log('Performance monitoring not supported in this browser')
}
```

## Emergency Recovery

### Complete Reset

If all else fails, complete project reset:

```bash
# 1. Save any uncommitted changes
git stash

# 2. Reset to last known good state
git reset --hard HEAD

# 3. Clean everything
rm -rf .next out node_modules

# 4. Fresh install
npm install

# 5. Test build
npm run build

# 6. If successful, restore changes
git stash pop
```

### Rollback Deployment

If production is broken:

1. **Vercel Dashboard**: Go to Deployments → Promote previous deployment
2. **Git**: Revert to last known good commit
   ```bash
   git revert [bad-commit-hash]
   git push
   ```

## Getting Help

1. **Check logs**: Vercel deployment logs for detailed errors
2. **Local reproduction**: Always reproduce issues locally first
3. **Documentation**: Reference [API Reference](api-reference.md) for correct schemas
4. **Community**: Next.js and Vercel community forums

For more technical details, see [Development Guide](development.md) and [Architecture](architecture.md).