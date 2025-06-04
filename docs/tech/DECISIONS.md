# Architecture Decisions

Key technology and architecture choices for the VastSilicon website.

## Technology Stack

### Static Site Generator: Next.js
**Decision**: Use Next.js with static export for the main build tool  
**Reasoning**: 
- Superior content management with MDX for product-driven site
- Template-based expandability for easy product additions
- Developer familiarity (easier maintenance and hiring)
- Excellent component reusability across product sites
- Rich ecosystem for content-driven workflows

**Alternatives considered**: Astro (better performance but worse DX for content), 11ty (too simple), Gatsby (too complex)

**Reference**: See [ADR-001](../adrs/001-tech-stack-for-product-portfolio-site.md) for detailed analysis

### CSS Framework: Tailwind CSS
**Decision**: Use Tailwind for styling  
**Reasoning**:
- Rapid development with utility classes
- Excellent purging reduces bundle size
- Consistent design system built-in
- Great developer experience

**Alternatives considered**: Styled-components (runtime cost), vanilla CSS (slower development)

### Deployment: Vercel
**Decision**: Deploy to Vercel  
**Reasoning**:
- Optimized for static sites and Next.js
- Global CDN with edge caching
- Automatic performance optimizations
- Easy preview deployments
- Excellent developer experience

**Alternatives considered**: Netlify (similar features), Cloudflare Pages (good but newer)

## Architecture Decisions

### Multi-App Strategy: Monorepo with Shared Components
**Decision**: Single repository with shared component library  
**Reasoning**:
- Consistent design system across all properties
- Shared code reduces duplication
- Coordinated releases for design updates
- Single CI/CD pipeline

**Structure**:
```
├── apps/
│   ├── main/          # vastsilicon.com
│   ├── moneytide/     # MoneyTide site  
│   └── choicecheck/   # ChoiceCheck site
└── packages/
    ├── ui/            # Shared components
    └── config/        # Shared configs
```

### URL Strategy: Separate Domains
**Decision**: Use separate domains for each app  
**Reasoning**:
- Clear product separation
- Independent scaling and optimization
- Better for SEO and brand building
- Simpler deployment and caching

**URLs**:
- `vastsilicon.com` - Company hub
- `moneytide.com` - MoneyTide product site
- `choicecheck.com` - ChoiceCheck product site

### Performance Strategy: Static Export
**Decision**: Use Next.js static export for build-time generation  
**Reasoning**:
- Meets <1s load time requirement globally
- Better SEO and accessibility
- Simpler hosting and caching
- Content-driven architecture with MDX

**Implementation**: 
- All pages pre-rendered at build time
- Product pages generated from MDX content
- Automatic image optimization
- Minimal JavaScript bundle

### Content Management: MDX-Based
**Decision**: Store content in Git with MDX files  
**Reasoning**:
- Version control for all content changes
- Rich metadata support for product templates
- Developer-friendly workflow with React components
- Build-time content processing and validation

**Structure**:
```
content/
├── products/    # Product MDX files with metadata
├── pages/       # Page content
└── legal/       # Legal pages
```

## Quality Standards

### Performance Requirements
- **Load time**: <1s globally (99th percentile)
- **Bundle size**: <500KB initial load
- **Core Web Vitals**: All green scores
- **Lighthouse**: 100/100 across all categories

### Accessibility Requirements  
- **WCAG 2.1 AA**: Minimum compliance
- **Keyboard navigation**: Full functionality
- **Screen readers**: Semantic HTML + ARIA
- **Color contrast**: 4.5:1 minimum ratio

### Browser Support
- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome Android
- **Progressive enhancement**: Works on older browsers, better on newer

## Development Principles

### Component Development
- **Single responsibility**: One component, one purpose
- **Accessibility first**: Built-in, not added later
- **Performance conscious**: Consider bundle impact
- **TypeScript**: All components typed

### Code Organization
- **Co-location**: Keep related files together
- **Clear naming**: Descriptive file and component names
- **Minimal abstractions**: Avoid over-engineering
- **Documentation**: Code should be self-documenting

### Testing Strategy
- **Critical paths**: Test key user journeys
- **Component testing**: Test reusable components
- **Performance testing**: Automated Lighthouse checks
- **Accessibility testing**: Automated and manual validation

## Future Considerations

### Scaling Plans
- **New products**: Add to monorepo structure
- **Internationalization**: Plan for multi-language support
- **API integration**: Add when dynamic features needed
- **Analytics**: Privacy-focused tracking implementation

### Technology Evolution
- **Regular updates**: Keep dependencies current
- **Performance monitoring**: Continuous optimization
- **Browser compatibility**: Adapt to new standards
- **Tool evaluation**: Regular assessment of alternatives