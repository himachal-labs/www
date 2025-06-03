/**
 * Universal Links Configuration for VastSilicon Apps
 * This configuration is used for Apple App Site Association (AASA) files
 */

// Apple Developer Team ID
export const TEAM_ID = "D8NYN6GSAF";

// App Bundle IDs
export const BUNDLE_IDS = {
  moneytide: "com.vastsilicon.FinanceManager", // Kept same bundle ID through rebranding from FinanceManager to MoneyTide
  choicecheck: "com.vastsilicon.ChoiceCheck" // Placeholder - update with actual bundle ID when available
};

// Universal Link Path Patterns
export const UNIVERSAL_LINK_PATHS = {
  moneytide: [
    "/invite/friend/*",
    "/invite/group/*", 
    "/process-receipt/*"
  ],
  choicecheck: [
    // Add ChoiceCheck specific universal link patterns here when needed
  ]
};

// Complete AASA Configuration
export const AASA_CONFIG = {
  applinks: {
    apps: [],
    details: [
      {
        appID: `${TEAM_ID}.${BUNDLE_IDS.moneytide}`,
        paths: UNIVERSAL_LINK_PATHS.moneytide
      }
      // Add ChoiceCheck when universal links are implemented
      // {
      //   appID: `${TEAM_ID}.${BUNDLE_IDS.choicecheck}`,
      //   paths: UNIVERSAL_LINK_PATHS.choicecheck
      // }
    ]
  }
};

// Domain Configuration for Middleware
export const SUBDOMAIN_ROUTES = {
  'moneytide': '/moneytide',
  'choicecheck': '/choicecheck'
};

// All supported domains
export const ALL_DOMAINS = [
  'vastsilicon.com',
  'moneytide.vastsilicon.com',
  'choicecheck.vastsilicon.com'
];