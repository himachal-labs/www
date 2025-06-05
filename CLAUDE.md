# CLAUDE.md - VastSilicon Website Development Guide

This file provides technical guidance for VastSilicon website implementation.

## Technical Requirements

### Performance Requirements
- **<1s load time**: Non-negotiable performance requirement
- **Progressive Enhancement**: Core functionality without JavaScript
- **Accessibility**: WCAG AAA compliance required
- **Progressive Disclosure**: UI pattern for revealing additional information on demand

## Documentation Structure

When starting work, read the documentation in `/docs/new_web/` in this order:

1. **00-start-here.md** - Overview and context
2. **01-core-philosophy-objectives.md** - What we're building and why
4. **02-design-principles.md** - Visual and interaction guidelines
5. **03-technical-architecture-principles.md** - Technical approach
6. **04-content-strategy.md** - Content organization and voice
7. **05-performance-philosophy.md** - Performance requirements
8. **06-implementation-guidelines.md** - Implementation approach
9. **07-multi-app-architecture.md** - Multi-app ecosystem strategy

## Professional Standards

### Prohibited Behaviors
- **NEVER write timelines, project phases, or time estimates** - You have no basis for time speculation
- **NEVER include "Create by Claude" OR "🤖 Generated with [Claude Code]" or "Co-Authored-By: Claude" in commit messages**
- **NEVER use undefined business jargon** like "growth + agency principles" without clear definition

### Expert Contractor Standards
- Provide technical analysis without timeline speculation
- Document architectural decisions clearly without buzzwords
- Focus on what exists, what's missing, and technical trade-offs
- Present options and implications, not predetermined solutions
- Assume client expertise

## Development Approach

### Technology Selection
When choosing technologies, evaluate against:
1. Does it meet <1s performance requirement?
2. Is it accessible (WCAG AAA)?
3. Will it scale globally?
4. Is it maintainable long-term?

### Implementation Principles
- **Static-first**: Pre-render content at build time
- **Progressive Enhancement**: Core functionality without JavaScript, enhanced with it
- **Performance Budget**: Every byte must justify itself
- **Proven Technology**: Choose stable, well-supported solutions
- **Simplicity First**: Use existing tools and standard approaches, never custom solutions without explicit approval

### Component Development
Every component should:
- Have single responsibility
- Be composable from simple parts
- Include accessibility from start (WCAG AAA)
- Consider performance impact
- Be self-documenting through clear naming

## Implementation Patterns

### UI Patterns
- **Status Badges**: Clear state communication ("Available on iOS", "Coming Soon")
- **Progressive Reveal**: Expandable sections, screenshot carousels
- **Card Layouts**: Consistent content organization
- **Clear Visual Hierarchy**: Size, spacing, color contrast

### Technical Patterns
- **Offline-First**: PWA capabilities for resilience
- **Edge Delivery**: CDN optimization for global performance
- **Build-Time Optimization**: Pre-render static content
- **Graceful Degradation**: Progressive enhancement approach

## Testing & Validation

### Performance Requirements
- Time to First Byte: <200ms globally
- First Contentful Paint: <1s
- Time to Interactive: <1.5s
- Lighthouse scores: 100/100
- Bundle size: <500KB initial

### Technical Validation
- Zero errors or broken links
- Works offline after first visit
- Accessible to all users (WCAG AAA)
- All interactive elements keyboard accessible

## Multi-Product Architecture

### Current Products
- **ChoiceCheck**: iOS nutrition analysis app
- **MoneyTide**: iOS personal finance app

### Technical Considerations
- Shared component library for consistent UI
- Common deployment pipeline
- Unified analytics and monitoring
- Cross-product navigation patterns

## Commands

When developing, use these commands:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run lighthouse` - Check performance metrics

## Development Standards

Build for long-term maintainability. Choose technologies and patterns that will remain stable and supportable.

