# Product Addition Guide

**Target**: Adding new products with consistency and minimal effort  
**Result**: <4 hours from concept to deployment  
**Audience**: Developers, Product Managers

## Overview

This guide covers adding new products to VastSilicon's website using the unified design system and growth optimization infrastructure.

## Quick Start

1. Create product MDX file
2. Add product assets (screenshots, icons)
3. Deploy (automatic template application)

**Estimated time**: 2-4 hours for complete product page

## Detailed Process

### Step 1: Product Content File

Create `/src/content/products/[product-name].mdx`:

```mdx
---
metadata:
  name: "ProductName"
  slug: "productname"
  tagline: "Clear, specific value proposition"
  status: "available" | "coming-soon" | "in-development"
  platforms: ["ios", "android", "web"]
  primaryColor: "#1E40AF"
  launchDate: "2025-01-15"
  lastUpdated: "2025-01-06"

content:
  problemStatement: "Specific problem this product solves"
  solutionApproach: "How we solve it"
  
  features:
    - title: "Feature Name"
      description: "What it does and why it matters"
      icon: "optional-icon-name"
      image: "/images/productname/feature1.png"
      category: "core"
    - title: "Second Feature"
      description: "Another key capability"
      category: "advanced"
  
  userScenarios:
    - title: "Daily Planning"
      description: "How users integrate this into daily routine"
      userType: "busy-professional"
  
  painPoints:
    - "Specific user frustration #1"
    - "Specific user frustration #2"
  
  benefits:
    - "Concrete benefit users get"
    - "Measurable improvement"
  
  expansionVision: "How this product fits into larger VastSilicon ecosystem"
  
  roadmap:
    - title: "Enhanced AI Analysis"
      description: "More sophisticated data processing"
      timeline: "Q2 2025"
    - title: "Multi-platform Sync"
      description: "Cross-device synchronization"
      timeline: "Q3 2025"

assets:
  heroImage: "/images/productname/hero.png"
  demoVideo: "/videos/productname/demo.mp4"
  appIcon: "/images/productname/icon.png"
  screenshots:
    - "/images/productname/screenshot1.png"
    - "/images/productname/screenshot2.png"
    - "/images/productname/screenshot3.png"
  featureImages:
    feature1: "/images/productname/feature1-detail.png"

links:
  primary:
    label: "Download Now"
    href: "https://apps.apple.com/app/productname"
  secondary:
    label: "Learn More"
    href: "/products/productname/details"
  
  platforms:
    - name: "iOS"
      url: "https://apps.apple.com/app/productname"
      available: true
    - name: "Android"
      url: "https://play.google.com/store/apps/details?id=productname"
      available: false
  
  comingSoon:
    - "Android"
    - "Web"

growth:
  conversionGoals:
    - "app_store_click"
    - "feature_exploration"
    - "video_engagement"
  
  keyMetrics:
    - "page_views"
    - "app_downloads"
    - "user_retention"
  
  trustSignals:
    - type: "transparency"
      data:
        source: "Open Methodology"
        description: "See exactly how ProductName works"
        link: "/products/productname/methodology"
    - type: "performance"
      data:
        value: "<1s"
        metric: "Load Time"
        description: "Instant responsiveness"
  
  seoMetadata:
    title: "ProductName - Solve [Problem] with AI | VastSilicon"
    description: "ProductName helps you [specific benefit]. Available on iOS."
    keywords:
      - "productname"
      - "AI [domain]"
      - "[problem] solution"
      - "[platform] app"
    canonicalUrl: "https://vastsilicon.com/products/productname"
---

# ProductName

Additional content in MDX format if needed for detailed explanations, technical documentation, or other information not covered by the template.

This content appears after the standard template sections.
```

### Step 2: Asset Preparation

Create asset directory structure:

```
/public/images/[product-name]/
├── hero.png          # 1200x630px (OpenGraph compatible)
├── icon.png          # 512x512px (app icon)
├── screenshot1.png   # Mobile: 1170x2532px, Web: 1440x900px
├── screenshot2.png
├── screenshot3.png
├── feature1.png      # Feature illustrations
└── feature2.png

/public/videos/[product-name]/
└── demo.mp4         # Optional: product demo video
```

**Asset Requirements:**
- **Hero Image**: 1200x630px, WebP format preferred
- **Screenshots**: Device-appropriate dimensions, high quality
- **Feature Images**: 800x600px minimum, consistent style
- **Icons**: 512x512px, PNG with transparency
- **Videos**: MP4, <10MB, muted by default

### Step 3: Automatic Template Application

The system automatically:

1. **Validates** product schema on build
2. **Applies** ProductTemplate with design system styling
3. **Generates** SEO metadata and schema markup
4. **Integrates** growth tracking and analytics
5. **Creates** navigation and cross-product links

No additional configuration required.

### Step 4: Testing and Deployment

```bash
# Local development
npm run dev

# Check product page
open http://localhost:3000/products/[product-name]

# Build for production
npm run build

# Deploy (automatic via CI/CD)
git add .
git commit -m "Add [ProductName] product page"
git push
```

## Advanced Configuration

### Custom Sections

Add custom sections after standard template:

```mdx
---
# ... standard metadata
---

# Standard template sections render automatically

## Custom Section

This content appears after the standard ProductTemplate sections.

### Technical Details

Additional technical information specific to this product.

### Integration Guide

How this product works with other VastSilicon products.
```

### Growth Optimization

**A/B Testing Configuration:**
```yaml
growth:
  abTests:
    - name: "hero-message-test"
      variants: ["technical-focus", "user-benefit-focus"]
      component: "ProductHero"
    - name: "pricing-display"
      variants: ["free-emphasis", "value-emphasis"]
      component: "AvailabilitySection"
```

**Trust Signal Customization:**
```yaml
trustSignals:
  - type: "user_count"
    data:
      metric: "10,000+"
      description: "Active users"
  - type: "expert_endorsement"
    data:
      quote: "ProductName changed how I work"
      attribution: "Dr. Jane Smith, Stanford University"
      source: "Stanford Research Review"
      link: "https://stanford.edu/research/productname"
```

## Content Guidelines

### Writing Style

- **Clear Value Props**: "Understand complex nutrition instantly" not "Advanced AI analysis"
- **Specific Benefits**: "Save 15 minutes daily" not "Improve efficiency"
- **Problem-Focused**: Start with user pain, then solution
- **Future-Oriented**: Show product evolution and ecosystem fit

### Technical Requirements

**Performance:**
- Hero images optimized (WebP <200KB)
- Screenshots compressed (<100KB each)
- Demo videos optimized (<10MB)
- Total page assets <500KB

**SEO:**
- Unique meta descriptions (150-160 characters)
- Keyword-optimized titles
- Semantic HTML structure (automatic via templates)
- Schema markup (automatic)

**Accessibility:**
- Alt text for all images
- Descriptive link text
- Proper heading hierarchy (automatic via templates)
- Keyboard navigation support (built into components)

## Validation and QA

### Pre-Launch Checklist

- [ ] **Content**: Product info complete and accurate
- [ ] **Assets**: All images optimized and properly sized
- [ ] **Links**: App store URLs working and correct
- [ ] **Mobile**: Responsive design testing
- [ ] **Performance**: Lighthouse score 100/100
- [ ] **SEO**: Meta tags and schema markup correct
- [ ] **Analytics**: Conversion tracking functional

### Testing Commands

```bash
# Type checking
npm run type-check

# Build validation
npm run build

# Performance audit
npm run lighthouse

# Accessibility test
npm run a11y-test
```

## Troubleshooting

### Common Issues

**Schema Validation Errors:**
```
Error: Invalid product metadata
```
- Check all required fields in metadata section
- Verify status is one of: available, coming-soon, in-development
- Ensure platforms array contains valid values

**Missing Assets:**
```
Error: Hero image not found
```
- Verify file paths in assets section
- Check file exists in /public directory
- Ensure image formats are supported (PNG, JPG, WebP)

**Build Failures:**
```
Error: Product template props invalid
```
- Run schema validation: `npm run validate-products`
- Check productToTemplateProps conversion
- Verify all required ProductTemplate props provided

### Getting Help

1. **Documentation**: Check existing product files for examples
2. **Schema Reference**: See `/src/lib/schemas.ts` for complete interface
3. **Component Docs**: Review component examples in `/src/components/product`

## Examples

### Minimal Product (Coming Soon)

```mdx
---
metadata:
  name: "NewProduct"
  slug: "newproduct"
  tagline: "Simple solution for complex problem"
  status: "coming-soon"
  platforms: ["ios"]
  lastUpdated: "2025-01-06"

content:
  problemStatement: "Users struggle with complex problem X"
  solutionApproach: "NewProduct simplifies problem X"
  features: []
  userScenarios: []
  painPoints: ["Complexity", "Time waste"]
  benefits: ["Simplicity", "Time savings"]
  expansionVision: "Foundation for future products"

assets:
  appIcon: "/images/newproduct/icon.png"
  screenshots: []

links:
  platforms: []
  comingSoon: ["iOS", "Android"]

growth:
  conversionGoals: ["interest_signup"]
  keyMetrics: ["page_views", "email_signups"]
  trustSignals: []
  seoMetadata:
    title: "NewProduct - Coming Soon | VastSilicon"
    description: "Simple solution for complex problem X. Coming soon to iOS."
---
```

### Full Product (Available)

See complete example in `/src/content/products/choicecheck.mdx`

## Future Iterations

**Phase 2 Features:**
- Interactive product demos
- User testimonial integration
- Advanced A/B testing configurations
- Multi-language support

**Phase 3 Scaling:**
- CMS integration for non-technical updates
- Automated asset optimization
- Advanced analytics dashboard
- Cross-product recommendation engine

This system is designed to scale with VastSilicon's product portfolio while maintaining consistency and performance.