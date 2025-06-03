# VastSilicon Static Content Migration Package

This directory contains all the actual static content, assets, configurations, and code needed to rebuild the VastSilicon website from scratch using the new approach outlined in `@docs/new_web/`.

## Directory Structure

```
migration_static/
├── assets/                           # All static assets (images, icons, screenshots)
│   ├── app_store_badge.svg          # Apple App Store download badge  
│   ├── favicon.ico                  # Website favicon
│   ├── vast_silicon_logo.png        # Main VastSilicon logo
│   ├── file.svg                     # Generic file icon
│   ├── globe.svg                    # Globe/web icon
│   └── assets/                      # Screenshot directories
│       └── screenshots/
│           ├── moneytide/
│           │   ├── actual/          # Current MoneyTide screenshots
│           │   └── *.PNG            # Legacy screenshots
│           └── choicecheck/         # ChoiceCheck screenshots
├── config/                          # Configuration files and constants
│   ├── index.js                     # Central export file
│   ├── urls.json                    # All URLs and links
│   ├── universalLinks.js            # Apple Universal Links config
│   ├── navigation.js                # Navigation structures
│   ├── appMetadata.js              # App content and metadata
│   ├── emails.js              # Social media configurations
│   ├── emailConfiguration.js       # Email and contact configs
│   ├── supportConfiguration.js     # FAQ and support data
│   ├── contactFormConfig.js        # Contact form configurations
│   ├── businessConfiguration.js    # Business and legal info
│   └── types.ts                    # TypeScript type definitions
├── content/
│   └── extracted_content.json      # All text content and copy
├── emails/
│   └── email_config.json          # Email addresses and templates
├── routes/
│   ├── route.ts                    # Apple App Site Association handler
│   ├── middleware.ts               # Subdomain routing middleware
│   └── app_store_links.json       # App Store URLs and routing
└── README.md                       # This file
```

## Total Assets: ~9.1MB

### Critical Assets
- **App Store Badge**: Essential for download CTAs
- **Current Screenshots**: Product demonstrations (use `/actual/` for MoneyTide)
- **Logo Assets**: Brand identity
- **Universal Links**: Apple App Site Association configuration
- **Email Configuration**: All contact endpoints

## Key Files for New Implementation

### 1. **Assets** (`/assets/`)
All image assets ready to use:
- Logo: `vast_silicon_logo.png` (1.1MB)
- Favicon: `favicon.ico` (156KB) 
- App Store Badge: `app_store_badge.svg` (11KB)
- MoneyTide Screenshots: `assets/screenshots/moneytide/actual/` (10 files)
- ChoiceCheck Screenshots: `assets/screenshots/choicecheck/` (7 files)

### 2. **Configuration** (`/config/`)
Ready-to-import JavaScript/JSON configuration files:

```javascript
import { urls, MONEYTIDE_CONFIG, emailConfig } from './config';

// Use App Store URLs
const moneyTideUrl = urls.appStore.moneytide;

// Use app metadata
const appFeatures = MONEYTIDE_CONFIG.features.personal;

// Use email configuration
const supportEmail = emailConfig.emails.support;
```

### 3. **Content** (`/content/extracted_content.json`)
All text content organized by:
- Company information and philosophy
- Product descriptions and features
- Support content and FAQ data
- Marketing copy and CTAs
- Legal and privacy content

### 4. **Routes & Universal Links** (`/routes/`)
- `route.ts`: Apple App Site Association handler
- `middleware.ts`: Subdomain routing logic
- `app_store_links.json`: All external URLs

### 5. **Email Configuration** (`/emails/email_config.json`)
- All email addresses with purposes
- Contact form configurations
- Email templates
- Auto-response settings

## Usage Examples

### Import App Store Links
```javascript
import appStoreLinks from './routes/app_store_links.json';
const moneyTideUrl = appStoreLinks.appStore.moneytide;
```

### Import Content
```javascript
import content from './content/extracted_content.json';
const companyTagline = content.company.tagline; // "Stop guessing. Start knowing."
```

### Import Email Config
```javascript
import emailConfig from './emails/email_config.json';
const supportEmail = emailConfig.emails.support; // "support@vastsilicon.com"
```

### Import Configurations
```javascript
import { emailConfig, supportConfig, businessConfig } from './config';
```

## Critical Dependencies to Preserve

1. **Apple Universal Links** - AASA configuration for MoneyTide invitations
2. **App Store Links** - Direct download flows for both iOS apps  
3. **Email Addresses** - 6 specific contact emails with defined purposes
4. **Subdomain Routing** - Current architecture supporting app-specific domains
5. **Screenshot Assets** - Product demonstration images

## New Interface Requirements (from docs/new_web/)

- **Core Philosophy**: "Complexity isn't the problem—it's potential waiting for translation"
- **Performance**: <1s load time globally, 100/100 Lighthouse scores
- **Accessibility**: WCAG AAA as baseline
- **Architecture**: Static-first with progressive enhancement
- **Message**: "Stop guessing. Start knowing."

## Ready for Implementation

This migration package contains everything needed to implement the new VastSilicon web interface while maintaining all current functionality. All files are organized and ready for import into the new architecture.

No documentation - just the actual assets, configurations, and content needed to rebuild from scratch.