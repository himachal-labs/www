# CLAUDE.md - VastSilicon Website Development Guide

This file provides guidance to Claude Code when working on VastSilicon's new website implementation.

## Project Context

You are building VastSilicon's web presence from scratch. The current implementation fails to embody the company's core philosophy: "Complexity isn't the problem—it's potential waiting for translation."

## Philosophy & Mission

### Core Philosophy
We're building cognitive infrastructure for the next century. Every aspect of the website should demonstrate how we restore human agency in domains where complexity has overwhelmed choice.

### Key Principles
- **Translation, Not Simplification**: We don't dumb down the world. We make it comprehensible.
- **Agency Restoration**: Every feature should increase user control, not decrease it.
- **Performance as Trust**: <1s load time demonstrates our ability to manage complexity.
- **Progressive Disclosure**: Reveal complexity only when needed, never force it.
- **Accessibility as Right**: Cognitive augmentation must be universally accessible.

## Documentation Structure

When starting work, read the documentation in `/docs/new_web/` in this order:

1. **00-start-here.md** - Overview and context
2. **01-core-philosophy-objectives.md** - What we're building and why
3. **08-agency-restoration-framework.md** - Central principle guiding everything
4. **02-design-principles.md** - Visual and interaction guidelines
5. **03-technical-architecture-principles.md** - Technical approach
6. **04-content-strategy.md** - Content organization and voice
7. **05-performance-philosophy.md** - Performance requirements
8. **06-implementation-guidelines.md** - Implementation approach
9. **07-multi-app-architecture.md** - Multi-app ecosystem strategy

## Caution: (Visibility in Repeated issues for help)
- Never write timelines or project phases or anything related when creating documentation.
- Never write Create by Claude in git commits.
- NEVER include "🤖 Generated with [Claude Code]" or "Co-Authored-By: Claude" in commit messages.

## Development Approach

### Technology Selection
When choosing technologies, evaluate against:
1. Does it demonstrate complexity translation?
2. Does it preserve and enhance user agency?
3. Does it meet our <1s performance requirement?
4. Is it accessible to everyone?
5. Will it scale globally?

### Implementation Principles
- **Static-first**: Pre-translate complexity at build time
- **Progressive Enhancement**: Core value without JavaScript, enhanced with it
- **Performance Budget**: Every byte must justify itself
- **Boring Technology**: Choose proven solutions, do interesting things with them

### Component Development
Every component should:
- Have single responsibility (clarity)
- Build complex from simple (translation)
- Include accessibility from start (human right)
- Consider performance impact (every ms counts)
- Self-document through clarity

## Key Patterns to Implement

### Content Patterns
- **Problem/Solution Cards**: Pair user pain with clear relief
- **Status Badges**: Set expectations clearly ("Available on iOS", "Coming Soon")
- **Progressive Reveal**: Screenshot carousels, expandable sections
- **User Stories**: Segment-specific benefits

### Design Patterns
- **Quiet Confidence**: Let excellence speak through subtlety
- **Single Direction**: Clear visual flow, no confusion
- **Hierarchy Through Contrast**: Not just size—space, color, position
- **Functional Beauty**: Every element earns its presence

### Technical Patterns
- **Offline-First**: PWA capabilities for resilience
- **Edge Delivery**: Content close to every user
- **Build-Time Optimization**: Translate complexity during build
- **Graceful Degradation**: Works for everyone, better for some

## Testing & Validation

### The Agency Test
For every feature, ask:
1. Does this increase user control?
2. Are we translating complexity or hiding it?
3. Can users understand our reasoning?
4. Is augmentation optional?
5. Does this build capability or dependency?

### Performance Requirements
- Time to First Byte: <200ms globally
- First Contentful Paint: <1s
- Time to Interactive: <1.5s
- Lighthouse scores: 100/100
- Bundle size: <500KB initial

### Success Metrics
- 7-second value understanding
- Zero errors or broken links
- Task completion without confusion
- Works offline after first visit
- Accessible to all users

## Content Guidelines

### Voice Principles
- Clarity over cleverness
- Confidence without arrogance
- Technical accuracy with warmth
- Future-focused but practical
- Assume intelligence, not knowledge

### Key Messages
- "Stop guessing. Start knowing."
- "We don't simplify your world. We make it comprehensible."
- "Complexity isn't the problem—it's potential waiting for translation."
- "Cognitive augmentation as human right."

## Multi-App Architecture

### Current Apps
- **ChoiceCheck**: Restores agency in food/health decisions
- **MoneyTide**: Restores agency in financial decisions

### Future Expansion
The same philosophy applies to:
- Finance: Investment products, insurance, loans
- Health: Treatment options, prescriptions, providers
- Technology: Privacy policies, platform choices
- Environment: Sustainability claims, impact metrics

Each app demonstrates the same core philosophy applied to different domains.

## Remember

You're not building a website. You're building a demonstration that complexity can be translated into clarity. The website itself is the first product—it should feel like using our apps before users even download them.

Every pixel, every millisecond, every word is an opportunity to demonstrate that we can take AI's vast complexity and make it serve human flourishing.

The ultimate test: Someone using our website should feel what it's like to have a "trusted companion for thought."

## Getting Started

1. Review all documentation in `/docs/new_web/`
2. Choose technology stack based on principles (recommend: static-first)
3. Start with highest-impact pages (home, product pages)
4. Implement progressive enhancement throughout
5. Test against all success metrics
6. Iterate based on agency restoration

## Commands

When developing, use these commands:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run lighthouse` - Check performance metrics

## Final Note

We're building cognitive infrastructure for the next century. Make decisions that will still make sense in 100 years. The technology will change; the need for cognitive augmentation will only grow.