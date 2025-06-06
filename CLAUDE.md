# CLAUDE.md - VastSilicon Website

## Performance Requirements (Non-negotiable)
- **<1s load time** globally
- **WCAG AAA** compliance
- Progressive enhancement (works without JS)
- Performance budget: <500KB initial bundle

## Prohibited Actions
- NEVER write timelines or time estimates
- NEVER include Claude/AI attribution in commits
- NEVER use undefined business jargon
- NEVER create custom solutions without explicit approval

## Technology Evaluation Criteria
1. Meets <1s performance requirement?
2. WCAG AAA accessible?
3. Scales globally?
4. Long-term maintainable?

## Implementation Standards
- **Static-first**: Pre-render at build time
- **Progressive Enhancement**: Core functionality without JS
- **Proven Technology**: Stable, well-supported solutions only
- **Single Responsibility**: Components do one thing well
- **Self-documenting**: Clear naming over comments

## Performance Targets
- TTFB: <200ms globally
- FCP: <1s
- TTI: <1.5s  
- Lighthouse: 100/100

## UI Patterns
- Status badges ("Available on iOS", "Coming Soon")
- Progressive reveal (expandable sections, carousels)
- Card layouts for content organization
- Clear visual hierarchy

## Technical Patterns
- Offline-first PWA capabilities
- Edge delivery via CDN
- Build-time optimization
- Graceful degradation

## Products
- **ChoiceCheck**: iOS nutrition analysis
- **MoneyTide**: iOS personal finance

## Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run test` - Test suite
- `npm run lighthouse` - Performance check

