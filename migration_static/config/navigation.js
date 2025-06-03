/**
 * Navigation Configuration for VastSilicon Multi-App Website
 * Centralized navigation structure for all apps and pages
 */

// Main VastSilicon navigation items
export const MAIN_NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

// MoneyTide app navigation
export const MONEYTIDE_NAV_ITEMS = [
  { label: 'Features', href: '/moneytide#features' },
  { label: 'Screenshots', href: '/moneytide#screenshots' },
  { label: 'Support', href: '/moneytide/support' },
  { label: 'Privacy', href: '/moneytide/privacy' }
];

// ChoiceCheck app navigation  
export const CHOICECHECK_NAV_ITEMS = [
  { label: 'Features', href: '/choicecheck#features' },
  { label: 'How It Works', href: '/choicecheck#how-it-works' },
  { label: 'Support', href: '/choicecheck/support' },
  { label: 'Privacy', href: '/choicecheck/privacy' }
];

// Footer link groups structure
export const FOOTER_LINKS = [
  {
    title: 'Products',
    links: [
      { label: 'MoneyTide', href: '/moneytide' },
      { label: 'ChoiceCheck', href: '/choicecheck' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { 
        label: 'Contact', 
        href: 'mailto:hello@vastsilicon.com?subject=Website%20Inquiry',
        isExternal: true
      }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' }
    ]
  },
  {
    title: 'Support',
    links: [
      { 
        label: 'General Inquiries', 
        href: 'mailto:hello@vastsilicon.com?subject=General%20Inquiry', 
        isExternal: true 
      },
      { 
        label: 'Technical Support', 
        href: 'mailto:support@vastsilicon.com?subject=Technical%20Support', 
        isExternal: true 
      }
    ]
  }
];

// Breadcrumb configurations for different sections
export const BREADCRUMBS = {
  moneytide: {
    base: { label: 'MoneyTide', href: '/moneytide' },
    pages: {
      privacy: { label: 'Privacy Policy', href: '/moneytide/privacy' },
      support: { label: 'Support', href: '/moneytide/support' },
      terms: { label: 'Terms of Service', href: '/moneytide/terms' }
    }
  },
  choicecheck: {
    base: { label: 'ChoiceCheck', href: '/choicecheck' },
    pages: {
      privacy: { label: 'Privacy Policy', href: '/choicecheck/privacy' },
      support: { label: 'Support', href: '/choicecheck/support' },
      terms: { label: 'Terms of Service', href: '/choicecheck/terms' }
    }
  }
};