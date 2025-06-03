/**
 * Central Configuration Export
 * Single entry point for all VastSilicon website configurations
 */

// Import all configuration modules
import urls from './urls.json';
import {
  TEAM_ID,
  BUNDLE_IDS,
  UNIVERSAL_LINK_PATHS,
  AASA_CONFIG,
  SUBDOMAIN_ROUTES,
  ALL_DOMAINS
} from './universalLinks.js';

import {
  MAIN_NAV_ITEMS,
  MONEYTIDE_NAV_ITEMS,
  CHOICECHECK_NAV_ITEMS,
  FOOTER_LINKS,
  BREADCRUMBS
} from './navigation.js';

import {
  MONEYTIDE_CONFIG,
  CHOICECHECK_CONFIG,
  COMPANY_CONFIG
} from './appMetadata.js';

import {
  SOCIAL_PLATFORMS,
  EMAIL_CONTACTS,
  MAILTO_LINKS,
  SOCIAL_SHARING,
  FOOTER_SOCIAL_LINKS
} from './socialMedia.js';

// Re-export all configurations for easy importing
export {
  // URLs and Links
  urls,
  
  // Universal Links & Domains
  TEAM_ID,
  BUNDLE_IDS,
  UNIVERSAL_LINK_PATHS,
  AASA_CONFIG,
  SUBDOMAIN_ROUTES,
  ALL_DOMAINS,
  
  // Navigation
  MAIN_NAV_ITEMS,
  MONEYTIDE_NAV_ITEMS,
  CHOICECHECK_NAV_ITEMS,
  FOOTER_LINKS,
  BREADCRUMBS,
  
  // App Metadata
  MONEYTIDE_CONFIG,
  CHOICECHECK_CONFIG,
  COMPANY_CONFIG,
  
  // Social Media
  SOCIAL_PLATFORMS,
  EMAIL_CONTACTS,
  MAILTO_LINKS,
  SOCIAL_SHARING,
  FOOTER_SOCIAL_LINKS
};

// Default export with all configurations grouped
export default {
  urls,
  universalLinks: {
    TEAM_ID,
    BUNDLE_IDS,
    UNIVERSAL_LINK_PATHS,
    AASA_CONFIG,
    SUBDOMAIN_ROUTES,
    ALL_DOMAINS
  },
  navigation: {
    MAIN_NAV_ITEMS,
    MONEYTIDE_NAV_ITEMS,
    CHOICECHECK_NAV_ITEMS,
    FOOTER_LINKS,
    BREADCRUMBS
  },
  apps: {
    MONEYTIDE_CONFIG,
    CHOICECHECK_CONFIG
  },
  company: COMPANY_CONFIG,
  social: {
    SOCIAL_PLATFORMS,
    EMAIL_CONTACTS,
    MAILTO_LINKS,
    SOCIAL_SHARING,
    FOOTER_SOCIAL_LINKS
  }
};