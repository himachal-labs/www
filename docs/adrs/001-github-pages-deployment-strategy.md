# ADR-001: GitHub Pages Deployment Strategy for VastSilicon.com

## Status
Proposed

## Context

VastSilicon operates a production website at vastsilicon.com. This codebase represents a complete rebuild/redesign from scratch. We need a staging deployment strategy that allows development and testing of the new site before replacing the production version.

### Current State
- Production: vastsilicon.com (existing production site, separate from this codebase)
- Development: This repository contains complete rebuild of VastSilicon website
- Stack: Next.js with static export capability
- Staging domain: isntfar.com (verified and attached to himachal-labs GitHub Enterprise)
- DNS Provider: Cloudflare (manages all domains including vastsilicon.com and isntfar.com)
- Enterprise GitHub license with himachal-labs organization

### Business Requirements
- Staging environment for complete website rebuild testing
- Sub-1 second global load times (core performance requirement)
- Cost optimization for staging deployment
- Maximize GitHub Enterprise investment
- Eventual seamless transition to vastsilicon.com (future phase)
- Support our "cognitive infrastructure" philosophy through infrastructure choices

## Decision

Deploy VastSilicon website rebuild to **GitHub Pages with GitHub Actions** using **isntfar.com** as staging domain, with future migration path to vastsilicon.com once rebuild is complete and tested.

## Rationale

### Strategic Advantages
1. **Safe Staging Environment**: Test complete rebuild without affecting production vastsilicon.com
2. **Enterprise Investment Utilization**: Maximizes value from existing GitHub Enterprise license
3. **Infrastructure Philosophy Alignment**: Demonstrates "complexity translation" through simplified deployment
4. **Cost Optimization**: $0 staging hosting costs
5. **Global Performance**: GitHub's CDN + Cloudflare provides sub-1s load times globally for testing
6. **Developer Experience**: Zero DevOps overhead, automatic deployments
7. **Domain Verification Complete**: isntfar.com already verified in GitHub Enterprise

### Technical Benefits
1. **Reliability**: 99.9% uptime backed by GitHub infrastructure
2. **Scalability**: Automatic traffic handling for staging testing
3. **Security**: Managed SSL certificates and DDoS protection
4. **Version Control**: All deployments tracked in git history
5. **Branch Previews**: Test features before staging deployment
6. **Production Safety**: Zero risk to existing vastsilicon.com during development

### GitHub Enterprise Capabilities
- Custom domain support with full white-labeling (isntfar.com verified ✓)
- Private repository deployment options
- GitHub Actions for custom build workflows
- Enterprise-grade security and compliance
- Team collaboration features
- Domain verification via TXT records (completed for isntfar.com)

## Implementation Plan

### Phase 1: Staging Deployment ✓ READY
1. ✓ Configure GitHub Pages in himachal-labs organization
2. ✓ Set up custom domain configuration (isntfar.com verified)
3. Create GitHub Actions workflow for Next.js static export
4. Deploy and test website rebuild on isntfar.com

### Phase 2: Development and Testing
1. Verify SSL certificate provisioning for isntfar.com
2. Test global performance metrics on staging
3. Iterate on website rebuild using GitHub Pages deployment
4. Set up branch-based preview deployments for features

### Phase 3: Production Migration Planning
1. Document lessons learned from staging deployment
2. Plan vastsilicon.com migration strategy
3. Prepare DNS cutover procedures
4. Establish rollback procedures

### Phase 4: Production Cutover (Future)
1. Update vastsilicon.com DNS to point to GitHub Pages
2. Monitor performance and availability
3. Decommission staging deployment or repurpose for future development

## Known Issues and Limitations

### GitHub Pages Constraints
1. **Repository Size**: 1GB soft limit (current site well under this)
2. **Bandwidth**: 100GB/month soft limit (typical startup traffic fits)
3. **Build Time**: 10-minute timeout (Next.js builds complete in ~2 minutes)
4. **File Size**: Individual files limited to 100MB (not applicable to web assets)

### Practical Considerations
1. **Jekyll Limitations**: Bypassed by using `.nojekyll` file with custom GitHub Actions
2. **Build Dependencies**: Node.js environment fully supported in GitHub Actions
3. **Environment Variables**: Secrets management available for build-time configuration
4. **Database Connectivity**: Static-only hosting (acceptable for current marketing site)

### Mitigation Strategies
- Monitor bandwidth usage via GitHub insights
- Implement image optimization to reduce asset sizes
- Use CDN caching strategies for frequently accessed resources
- Maintain Cloudflare DNS for advanced traffic management

## Technical Architecture

### Deployment Workflow
```yaml
Trigger: Push to main branch
Steps:
1. Checkout repository
2. Setup Node.js environment
3. Install dependencies (npm ci)
4. Build static site (npm run build)
5. Deploy to GitHub Pages
6. Verify deployment health
```

### DNS Configuration (Staging - Cloudflare)
```
Current Status: Domain verified ✓
Provider: Cloudflare DNS

Required Records:
Type: CNAME
Name: isntfar.com (or www.isntfar.com)
Target: himachal-labs.github.io

Type: A (if using apex domain)
Targets: GitHub Pages IP addresses:
- 185.199.108.153
- 185.199.109.153  
- 185.199.110.153
- 185.199.111.153

Verification Record (completed):
Type: TXT
Name: _github-pages-challenge-himachal-labs
Value: 7764eecb823343ad38c827fd00aa30
```

### File Structure
```
/
├── .github/workflows/pages.yml
├── public/
├── src/
├── CNAME (containing: isntfar.com)
├── .nojekyll
└── next.config.js (configured for static export)
```

## Success Metrics

### Performance Targets
- Global load time: <1 second (maintained)
- Lighthouse scores: 100/100 (current standard)
- Uptime: >99.9%
- Build time: <5 minutes

### Business Metrics
- Zero staging hosting costs
- Deployment frequency increase for development
- Developer velocity improvement
- Safe website rebuild iteration
- Risk-free production migration preparation

## Risks and Mitigation

### Risk: GitHub Pages Service Disruption
**Probability**: Low
**Impact**: Low (staging only, production vastsilicon.com unaffected)
**Mitigation**: Continue development locally, deploy to alternative staging if needed

### Risk: Bandwidth Limit Exceeded
**Probability**: Low (based on current traffic)
**Impact**: Medium
**Mitigation**: Monitor usage, implement CDN optimization, upgrade to GitHub Enterprise if needed

### Risk: Custom Domain Configuration Issues
**Probability**: Very Low (domain already verified)
**Impact**: Low
**Mitigation**: Domain verification completed, Cloudflare DNS management experience

## Alternatives Considered

### Continue Cloudflare Tunnel
- **Pros**: Current setup, full control
- **Cons**: Single point of failure, maintenance overhead, cost
- **Verdict**: Doesn't maximize enterprise investment

### Traditional Cloud Hosting (AWS/Vercel)
- **Pros**: Full control, advanced features
- **Cons**: Additional cost, complexity, doesn't leverage GitHub investment
- **Verdict**: Over-engineering for current needs

### Hybrid Approach
- **Pros**: Gradual migration, fallback options
- **Cons**: Increased complexity, split infrastructure
- **Verdict**: Considered for migration period only

## Conclusion

GitHub Pages staging deployment aligns with VastSilicon's philosophy of "complexity translation" by simplifying our development infrastructure while maintaining performance standards. This decision maximizes our GitHub Enterprise investment, eliminates staging costs, and provides a safe environment for website rebuild development.

This staging approach supports our core mission of building "cognitive infrastructure for human flourishing" by implementing cognitive infrastructure for our own development operations, while ensuring zero risk to production systems.

## Next Steps

1. **Approval**: Review and approve this ADR
2. **Implementation**: Execute deployment plan (domain verification complete ✓)
3. **GitHub Actions Setup**: Create deployment workflow
4. **DNS Configuration**: Update Cloudflare records to point to GitHub Pages
5. **Testing**: Verify deployment and performance
6. **Documentation**: Update deployment procedures

---

**Decision Date**: 2025-01-05
**Reviewers**: [To be assigned]
**Implementation Target**: [To be determined post-approval]