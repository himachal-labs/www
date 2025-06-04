# Deployment Guide

How to deploy the VastSilicon website to production.

## Deployment Overview

**Platform**: Vercel  
**Domain**: vastsilicon.com  
**Build Command**: `npm run build`  
**Output Directory**: `out/` (Next.js static export)

## Pre-Deployment Checklist

### 1. Code Quality
```bash
# Run all checks locally
npm run lint           # No linting errors
npm run type-check     # No TypeScript errors  
npm run build          # Build succeeds
npm run preview        # Production preview works
```

### 2. Performance Validation
```bash
# Test production build
npm run start

# Open Chrome DevTools → Lighthouse
# Verify all scores are 90+ (target: 100)
# Check Core Web Vitals are green
```

### 3. Content Review
- [ ] All text reviewed for accuracy
- [ ] Images optimized and have alt text
- [ ] Links work correctly
- [ ] Contact information up to date
- [ ] Legal pages current

### 4. Cross-Browser Testing
Test in these browsers before deploying:
- [ ] Chrome (latest)
- [ ] Firefox (latest)  
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

## Deployment Process

### Automatic Deployment (Recommended)

**Trigger**: Push to `main` branch
```bash
# Merge your feature branch
git checkout main
git pull origin main
git merge feature/your-feature
git push origin main

# Vercel automatically:
# 1. Detects the push
# 2. Runs npm run build
# 3. Deploys to production
# 4. Updates vastsilicon.com
```

**Deployment Status**: Check at https://vercel.com/dashboard

### Manual Deployment (if needed)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Deployment Environments

### Production
- **URL**: https://vastsilicon.com
- **Branch**: `main`
- **Automatic**: Yes, on push to main

### Preview Deployments
- **URL**: Generated preview URL (e.g., `app-abc123.vercel.app`)
- **Branch**: Any feature branch
- **Automatic**: Yes, on push to any branch

### Local Preview
- **URL**: http://localhost:4173
- **Command**: `npm run preview`
- **Purpose**: Test production build locally

## Environment Configuration

### Environment Variables
Set in Vercel dashboard under Project Settings → Environment Variables:

```bash
# Production environment
NODE_ENV=production

# Analytics (when added)
# ANALYTICS_ID=GA_MEASUREMENT_ID

# Contact form (when added)  
# CONTACT_FORM_API=your_api_endpoint
```

### Build Configuration
Vercel automatically detects Next.js projects. Custom config in `vercel.json` (if needed):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs"
}
```

**Note**: With Next.js static export, the `next.config.js` handles the build configuration:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  }
}
```

## Post-Deployment Verification

### 1. Smoke Test
Immediately after deployment:
- [ ] Site loads at vastsilicon.com
- [ ] Homepage displays correctly
- [ ] Navigation works
- [ ] Product pages load
- [ ] Contact forms work (when added)

### 2. Performance Check
```bash
# Run Lighthouse on production URL
# Target: All scores 90+, Core Web Vitals green
```

### 3. SEO Check
- [ ] Meta titles and descriptions correct
- [ ] Open Graph images display in social shares
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt

## Rollback Process

### Quick Rollback
```bash
# In Vercel dashboard:
# 1. Go to Deployments tab
# 2. Find previous working deployment
# 3. Click "Promote to Production"
```

### Git Rollback
```bash
# If you need to revert code changes
git revert <commit-hash>
git push origin main

# This triggers new deployment with reverted changes
```

## Domain and SSL

### Domain Configuration
- **Domain**: vastsilicon.com
- **SSL**: Automatic via Vercel
- **CDN**: Global edge network included

### DNS Settings
If domain changes are needed, update in domain registrar:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A  
Name: @
Value: 76.76.19.19
```

## Multi-App Deployment Strategy

### Current Setup
- **Main site**: vastsilicon.com
- **Future apps**: Separate deployments
  - moneytide.com
  - choicecheck.com

### Shared Assets
- **Component library**: Published as npm package
- **Design system**: Shared across all deployments
- **CDN**: Shared assets cached globally

## Monitoring and Alerts

### Deployment Monitoring
Vercel provides automatic monitoring for:
- Build success/failure
- Performance metrics
- Error rates
- Uptime

### Setting Up Alerts
1. Go to Vercel dashboard → Project Settings
2. Navigate to Integrations
3. Connect monitoring tools (when needed):
   - Slack for deployment notifications
   - Sentry for error tracking

## Troubleshooting Deployments

### Build Failures

**Common Issue**: TypeScript errors
```bash
# Check locally first
npm run type-check

# Fix errors and redeploy
git add .
git commit -m "Fix TypeScript errors"
git push origin main
```

**Common Issue**: Missing dependencies or Next.js build issues
```bash
# Ensure package-lock.json is committed
git add package-lock.json
git commit -m "Add package-lock.json"
git push origin main

# Check Next.js static export configuration
# Verify next.config.js has output: 'export'
```

### Performance Regressions

**Issue**: Lighthouse scores drop after deployment
1. Compare with previous deployment
2. Check if new images need optimization
3. Verify no new JavaScript was added
4. Use Chrome DevTools to identify bottlenecks

### DNS Issues

**Issue**: Domain not pointing to Vercel
1. Check DNS settings in domain registrar
2. Verify CNAME/A records are correct
3. Wait for DNS propagation (up to 24 hours)
4. Test with DNS checker tools

## Deployment Best Practices

### 1. Deploy During Low Traffic
- Best time: Weekday mornings
- Avoid: Friday afternoons, major announcements

### 2. Test Before Deploying
- Always run local checks
- Use preview deployments for stakeholder review
- Test on multiple devices/browsers

### 3. Monitor After Deployment
- Check site immediately after deployment
- Monitor for 30 minutes after major changes
- Have rollback plan ready

### 4. Communication
- Notify team before major deployments
- Document what was changed
- Share preview URLs for review

## Security Considerations

### HTTPS
- Automatic SSL via Vercel
- HSTS headers enabled
- Secure by default

### Content Security Policy
Implemented via Next.js headers or meta tags:
```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

### Headers
Custom security headers in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {"key": "X-Frame-Options", "value": "DENY"},
        {"key": "X-Content-Type-Options", "value": "nosniff"}
      ]
    }
  ]
}
```

## Emergency Procedures

### Site Down
1. Check Vercel status page
2. Verify DNS settings
3. Rollback to last working deployment
4. Contact Vercel support if needed

### Performance Emergency
1. Identify bottleneck using Lighthouse
2. Quick fixes: optimize largest images
3. Rollback if issue is recent deployment
4. Implement proper fix and redeploy

### Security Issue
1. Immediately rollback if possible
2. Fix security vulnerability
3. Test fix thoroughly
4. Deploy with security patch