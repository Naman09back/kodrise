export type ServiceDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  skills: string[];
  useCases: string[];
  reasons: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "ecommerce",
    eyebrow: "ECOMMERCE",
    title: "eCommerce Developers Who Understand Revenue, Not Just Code",
    lead: "From storefront builds to checkout optimization to peak-season scaling, our eCommerce developers have shipped on live, revenue-generating stores — not just tutorials.",
    skills: [
      "Shopify & Shopify Plus",
      "Magento / Adobe Commerce",
      "WooCommerce",
      "Headless commerce (Next.js + Shopify / Commercetools)",
      "Payment gateway integration",
      "Custom storefront development",
    ],
    useCases: [
      "Migrating a legacy storefront to headless commerce",
      "Building custom checkout or subscription flows",
      "Scaling infrastructure ahead of a sale or seasonal peak",
      "Integrating ERP, inventory, or fulfillment systems",
    ],
    reasons: [
      "Developers pre-vetted specifically on commerce platforms, not generalist full-stack profiles",
      "Familiarity with catalog architecture and conversion-sensitive UX",
      "Fast onboarding so you don’t lose a sales window waiting to hire",
    ],
  },
  {
    slug: "devops-cloud-security",
    eyebrow: "DEVOPS, CLOUD & SECURITY",
    title: "DevOps & Cloud Engineers Who Ship Reliable Infrastructure",
    lead: "Integrate DevOps engineers who streamline CI/CD pipelines, automate infrastructure, and boost deployment efficiency — ensuring faster time to market without compromising security.",
    skills: [
      "AWS · Azure · GCP",
      "Kubernetes & Docker",
      "Terraform / IaC",
      "CI/CD (GitHub Actions, Jenkins, GitLab CI)",
      "Cloud security & compliance hardening",
      "SRE & observability",
    ],
    useCases: [
      "Migrating infrastructure to the cloud or between cloud providers",
      "Building or hardening CI/CD pipelines for faster releases",
      "Standing up monitoring, observability, and incident response",
      "Closing security gaps ahead of an audit or certification",
    ],
    reasons: [
      "Engineers vetted on production infrastructure work, not just certifications",
      "Security-conscious by default for regulated and enterprise clients",
      "Available for short embedded sprints or long-term platform ownership",
    ],
  },
  {
    slug: "agentic-ai-software",
    eyebrow: "AGENTIC AI SOFTWARE",
    title: "Agentic AI Developers for Teams Building AI-Native Products",
    lead: "As AI moves from chatbots to autonomous agents that take real actions, you need developers who have actually shipped agentic systems — not just called an API.",
    skills: [
      "LLM application development (OpenAI, Anthropic, open-source models)",
      "Agent orchestration frameworks",
      "RAG pipeline design",
      "Prompt engineering & evaluation",
      "Vector databases & retrieval systems",
      "Tool-use and function-calling integrations",
    ],
    useCases: [
      "Building an AI agent that takes actions across internal tools",
      "Adding retrieval-augmented generation to an existing product",
      "Prototyping and evaluating LLM-based features",
      "Standing up evaluation and monitoring for AI system reliability",
    ],
    reasons: [
      "Developers matched on real agentic-system experience, not general ML background",
      "Fast to onboard for a fast-moving category",
      "Flexible engagement for a proof-of-concept sprint or dedicated build team",
    ],
  },
  {
    slug: "qa-testing",
    eyebrow: "QA & TESTING",
    title: "QA Engineers Who Catch What Slips Through",
    lead: "Shipping fast shouldn’t mean shipping broken. Our QA and testing developers slot into your release process — manual, automated, or both.",
    skills: [
      "Manual & exploratory testing",
      "Test automation (Selenium, Playwright, Cypress)",
      "Performance & load testing",
      "Security / penetration testing basics",
      "API testing",
      "Mobile app QA",
    ],
    useCases: [
      "Building an automated regression suite",
      "Adding QA coverage before a major launch or migration",
      "Load-testing infrastructure ahead of a traffic spike",
      "Embedding QA into an existing agile sprint cadence",
    ],
    reasons: [
      "QA engineers vetted on process and tooling, not just test-case writing",
      "Integration into existing CI/CD and bug-tracking workflows",
      "Scale QA up for a launch and down after without a full-time hire",
    ],
  },
  {
    slug: "mobile-app-web",
    eyebrow: "MOBILE APP & WEB",
    title: "Mobile & Web Developers Who Ship Production Apps",
    lead: "Hire experienced mobile developers for iOS, Android, or cross-platform apps, and full-stack web developers for consumer and enterprise products.",
    skills: [
      "iOS (Swift)",
      "Android (Kotlin)",
      "Flutter",
      "React Native",
      "React / Next.js",
      "Angular · Vue · Node.js / Django / Spring Boot backends",
    ],
    useCases: [
      "Building a new consumer or enterprise mobile app",
      "Adding a mobile app to an existing web product",
      "Scaling a web platform’s frontend or backend",
      "Maintaining and iterating on an app already in production",
    ],
    reasons: [
      "Developers vetted on shipped, published apps",
      "Coverage across platforms and full-stack web",
      "Flexible scaling as the project moves from build to maintenance",
    ],
  },
  {
    slug: "ai-ml-automation",
    eyebrow: "AI, ML & AUTOMATION",
    title: "AI, ML & Automation Developers to Help You Ship Faster",
    lead: "From predictive models to workflow automation that removes manual work, our AI/ML developers bring practical, production-focused experience.",
    skills: [
      "Data science & predictive modeling",
      "MLOps & model deployment",
      "Workflow & RPA automation",
      "Data pipeline engineering",
      "Python / PyTorch / TensorFlow",
    ],
    useCases: [
      "Deploying a model that’s been stuck in a notebook",
      "Automating a manual, repetitive internal process",
      "Building data pipelines to feed AI/ML features",
      "Standing up MLOps practices for a growing model portfolio",
    ],
    reasons: [
      "Developers vetted on production ML delivery",
      "Practical automation focus with measurable time and cost savings",
      "A specialist add-on to an existing data team or a dedicated build resource",
    ],
  },
];
