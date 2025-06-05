# Deployment Guide

Production deployment procedures for the VastSilicon website.

## Deployment Overview

| Setting | Value |
|---------|-------|
| **Platform** | Vercel |
| **Domain** | vastsilicon.com |
| **Build Command** | `npm run build` |
| **Output Directory** | `out/` |
| **Node Version** | 18.17+ |

## Pre-Deployment Checklist

### Code Quality
```bash
npm run lint           # Fix all linting errors
npm run type-check     # Fix all TypeScript errors  
npm run build          # Ensure build succeeds
```

### Performance Validation
```bash
# Test production build locally
npm run build && npm run start

# Run Lighthouse audit
npx lighthouse http://localhost:3000 --view
# Target: All scores 90+, Core Web Vitals green
```

### Content Review
- [ ] All content reviewed and accurate
- [ ] Images optimized with proper alt text
- [ ] All links functional
- [ ] Contact information current

## Deployment Process

### Automatic Deployment (Default)

**Trigger**: Push to `main` branch
```bash
git checkout main
git pull origin main
git merge feature/your-feature
git push origin main
```

**Vercel automatically**:
1. Detects push to main
2. Runs `npm run build`
3. Deploys static files to production
4. Updates vastsilicon.com

**Status**: Monitor at [Vercel Dashboard](https://vercel.com/dashboard)

### Manual Deployment (If Needed)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

## Deployment Environments

### Production
- **URL**: https://vastsilicon.com
- **Branch**: `main`
- **Auto-deploy**: Yes
- **Analytics**: Enabled

### Preview Deployments
- **URL**: Auto-generated (`app-[hash].vercel.app`)
- **Branch**: Any feature branch
- **Auto-deploy**: Yes
- **Analytics**: Disabled

### Local Preview
```bash
npm run build         # Build production files
npm run start         # Preview at localhost:3000
```

## Environment Variables

### Required (Production)
- `VERCEL_ANALYTICS_ID`: Auto-detected by Vercel
- `VERCEL_ENV`: Auto-set to "production"

### Optional
```bash
# .env.local (local development only)
GOOGLE_SITE_VERIFICATION=your_verification_code
```

### Setting Variables in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project → Settings → Environment Variables
3. Add variables for Production, Preview, Development

## Build Configuration

### Next.js Configuration
```javascript
// next.config.js
const nextConfig = {
  output: 'export',              // Static site generation
  trailingSlash: true,           // URL structure
  images: { unoptimized: true }, // For static hosting
  webpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',           // Bundle optimization
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

### Build Output
```
out/
├── index.html              # Homepage
├── products/
│   ├── choicecheck.html   # Product pages
│   └── moneytide.html
├── blog/                  # Blog pages
├── _next/                 # Next.js assets
│   ├── static/chunks/     # JavaScript bundles
│   └── static/css/        # CSS files
└── images/               # Static images
```

## Performance Monitoring

### Build Performance
- **Build time**: Target <3 minutes
- **Bundle size**: Monitor in Vercel deployment logs
- **Dependencies**: Regular audit with `npm audit`

### Runtime Performance
- **Core Web Vitals**: Monitored in Vercel Analytics
- **Error tracking**: Built-in Vercel error monitoring
- **Uptime**: 99.99% SLA with Vercel Pro

## Rollback Procedures

### Quick Rollback
1. **Vercel Dashboard**: Go to Deployments
2. **Find last good deployment**
3. **Click "Promote to Production"**

### Git Rollback
```bash
# Identify bad commit
git log --oneline

# Revert bad commit
git revert [bad-commit-hash]
git push origin main
# Vercel auto-deploys the revert
```

### Emergency Maintenance
```bash
# Create maintenance branch
git checkout -b maintenance
# Edit maintenance page
git commit -m "Add maintenance page"
git push origin maintenance

# Temporarily deploy maintenance branch
vercel --prod
```

## Domain Configuration

### DNS Settings
- **Type**: CNAME
- **Name**: vastsilicon.com
- **Value**: cname.vercel-dns.com
- **TTL**: Auto

### SSL/TLS
- **Certificate**: Auto-managed by Vercel
- **Renewal**: Automatic
- **HTTPS**: Enforced (redirects HTTP)

## Monitoring & Alerts

### Built-in Monitoring
- **Deployment status**: Vercel dashboard
- **Error tracking**: Automatic error reporting
- **Performance**: Core Web Vitals in Analytics
- **Uptime**: Vercel infrastructure monitoring

### Custom Monitoring
```bash
# Manual performance check
npm run build
npx lighthouse-ci autorun

# Bundle size analysis
npx @next/bundle-analyzer
```

## Troubleshooting

### Build Failures
```bash
# Check build locally
npm run build
# Fix any errors before redeploying
```

### Performance Issues
```bash
# Analyze bundle size
npx @next/bundle-analyzer

# Check Core Web Vitals
# Vercel Analytics → Performance tab
```

### DNS Issues
- **Check DNS propagation**: Use online DNS checker tools
- **Verify CNAME**: Should point to `cname.vercel-dns.com`
- **Clear DNS cache**: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### SSL Certificate Issues
- **Check certificate**: Browser developer tools → Security tab
- **Force renewal**: Contact Vercel support if needed

## Security Considerations

### Deployment Security
- **Environment variables**: Secure storage in Vercel
- **Build logs**: Private by default
- **Dependencies**: Regular security audits

### Runtime Security
- **HTTPS**: Enforced on all requests
- **Headers**: Security headers configured
- **Content**: Static files only, no server vulnerabilities

## Post-Deployment Checklist

### Immediate (Within 5 minutes)
- [ ] Site loads at vastsilicon.com
- [ ] All major pages accessible
- [ ] Navigation works correctly
- [ ] Images loading properly

### Within 24 hours
- [ ] Analytics tracking functional
- [ ] Core Web Vitals scores green
- [ ] Search Console indexing
- [ ] Mobile responsiveness verified

### Weekly
- [ ] Performance metrics review
- [ ] Error logs check
- [ ] Security updates applied

For troubleshooting deployment issues, see [Troubleshooting Guide](troubleshooting.md).
For performance optimization, see [Performance Guide](performance.md).