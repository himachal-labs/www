/**
 * App Metadata Configuration for VastSilicon Apps
 * Centralized metadata, features, and content for all apps
 */

// MoneyTide App Configuration
export const MONEYTIDE_CONFIG = {
  name: "MoneyTide",
  tagline: "Manage expenses. Split costs. Stay organized.",
  description: "MoneyTide brings clarity to your personal and shared finances with an elegant, intuitive iOS experience.",
  fullDescription: "MoneyTide brings clarity to your personal and shared finances with an elegant, intuitive iOS experience that helps you track expenses and effortlessly split costs with others.",
  appStoreUrl: "https://apps.apple.com/app/moneytide/",
  websiteUrl: "https://moneytide.vastsilicon.com",
  bundleId: "com.vastsilicon.FinanceManager",
  
  features: {
    personal: [
      {
        title: "Smart Category Tracking",
        description: "Understand your spending habits with automatic categorization and visual breakdowns that help identify saving opportunities.",
        icon: "FiPieChart"
      },
      {
        title: "Insightful Dashboard", 
        description: "Get a complete picture of your finances with spending trends, category breakdowns, and balance summaries—all in one view.",
        icon: "FiBarChart2"
      },
      {
        title: "Receipt Documentation",
        description: "Capture and store receipt images directly within the app for complete expense records and easy reference.",
        icon: "FiImage"
      },
      {
        title: "Seamless Sync",
        description: "Your data syncs effortlessly across all your devices, ensuring your financial information is always current and accessible.",
        icon: "FiCloud"
      }
    ],
    shared: [
      {
        title: "Group Expenses",
        description: "Create groups for roommates, trips, or events. Split costs fairly and keep everyone on the same page.",
        icon: "FiUsers"
      },
      {
        title: "Balance Overview",
        description: "See who owes what at a glance with clear, visual balance summaries for every group and individual.",
        icon: "FiActivity"
      },
      {
        title: "Fair Split Calculations",
        description: "Let MoneyTide calculate exactly who owes what based on your group's expenses and splits.",
        icon: "FiDollarSign"
      },
      {
        title: "Privacy-Focused",
        description: "Your financial data stays secure and private with our privacy-first approach and optional encrypted cloud backup.",
        icon: "FiShield"
      }
    ]
  },
  
  screenshots: [
    {
      name: "Dashboard",
      path: "/assets/screenshots/moneytide/actual/Dashboard_PersonalSpending_resized.png",
      alt: "MoneyTide dashboard showing account balances and spending overview"
    },
    {
      name: "Personal Expenses",
      path: "/assets/screenshots/moneytide/actual/MyExpenses_month_resized.png",
      alt: "Personal Expense tracking interface with transaction history and categories"
    },
    {
      name: "Shared Expenses",
      path: "/assets/screenshots/moneytide/actual/SharedExpenses_resized.png",
      alt: "Shared expenses screen showing group expenses and balances"
    },
    {
      name: "Group Details",
      path: "/assets/screenshots/moneytide/actual/GroupDetails_resized.png",
      alt: "Group details screen showing members and expense history"
    },
    {
      name: "Add Expense",
      path: "/assets/screenshots/moneytide/actual/AddPersonalExpense_resized.png",
      alt: "Add personal expense screen with category selection"
    }
  ]
};

// ChoiceCheck App Configuration
export const CHOICECHECK_CONFIG = {
  name: "ChoiceCheck",
  tagline: "Stop guessing. Start knowing.",
  description: "ChoiceCheck uses AI to analyze any product and tell you if it matches YOUR health goals, dietary needs, and preferences.",
  fullDescription: "ChoiceCheck uses AI to analyze any product and tell you if it matches YOUR health goals, dietary needs, and preferences. No more standing in aisles reading labels.",
  appStoreUrl: "https://apps.apple.com/app/id6742806334",
  websiteUrl: "https://choicecheck.vastsilicon.com",
  bundleId: "com.vastsilicon.ChoiceCheck", // Placeholder - update when known
  
  features: {
    howItWorks: [
      {
        step: "1",
        title: "Snap a Photo",
        description: "Point your camera at any product",
        icon: "FiCamera"
      },
      {
        step: "2", 
        title: "AI Analyzes",
        description: "Our AI checks ingredients, nutrition, and your preferences",
        icon: "FiEye"
      },
      {
        step: "3",
        title: "Get Your Answer",
        description: "Clear scores (0-100) with ratings and detailed reasoning",
        icon: "FiCheckCircle"
      }
    ],
    userProblems: [
      {
        problem: "Overwhelmed by choices in the grocery store",
        solution: "Get instant scores and ratings to guide decisions",
        icon: "FiShoppingCart"
      },
      {
        problem: "Falling for misleading health claims",
        solution: "AI cuts through marketing to show facts",
        icon: "FiAlertCircle"
      },
      {
        problem: "No time to research every product",
        solution: "Get expert analysis in seconds",
        icon: "FiClock"
      },
      {
        problem: "Hard to stick to health goals",
        solution: "Personalized guidance for YOUR needs",
        icon: "FiHeart"
      }
    ]
  },
  
  screenshots: [
    {
      name: "Analysis",
      path: "/assets/screenshots/choicecheck/analysis.PNG",
      alt: "Get detailed AI analysis with ChoiceCheck Score"
    },
    {
      name: "Sources",
      path: "/assets/screenshots/choicecheck/analysis_2.PNG", 
      alt: "Scientific citations backing every analysis"
    },
    {
      name: "Nutrition",
      path: "/assets/screenshots/choicecheck/analysis_3.jpg",
      alt: "Detailed nutritional breakdown with visual charts"
    }
  ]
};

// Company-wide metadata
export const COMPANY_CONFIG = {
  name: "VastSilicon",
  tagline: "Transforming Ideas into Digital Realities",
  description: "Vast Silicon is a technology hub dedicated to creating innovative solutions that solve real-world problems.",
  fullDescription: "Vast Silicon is a technology innovation hub showcasing entrepreneurial apps and projects focused on disrupting industries.",
  websiteUrl: "https://vastsilicon.com",
  
  philosophy: {
    core: "Complexity isn't the problem—it's potential waiting for translation.",
    mission: "We're building cognitive infrastructure for the next century.",
    principles: [
      "Translation, Not Simplification: We don't dumb down the world. We make it comprehensible.",
      "Agency Restoration: Every feature should increase user control, not decrease it.",
      "Performance as Trust: <1s load time demonstrates our ability to manage complexity.",
      "Progressive Disclosure: Reveal complexity only when needed, never force it.",
      "Accessibility as Right: Cognitive augmentation must be universally accessible."
    ]
  }
};