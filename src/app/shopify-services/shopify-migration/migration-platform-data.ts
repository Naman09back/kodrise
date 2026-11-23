export type MigrationFaq = {question: string; answer: string};
export type MigrationPoint = {title: string; copy: string};
export type MigrationPlatform = {
  slug: string;
  name: string;
  title: string;
  accent: string;
  intro: string;
  serviceHeading: string;
  serviceIntro: string;
  services: MigrationPoint[];
  approachHeading: string;
  approachIntro: string;
  approach: MigrationPoint[];
  faqs: MigrationFaq[];
};

export const migrationPlatforms: Record<string, MigrationPlatform> = {
  "adobe-commerce": {
    slug: "adobe-commerce", name: "Adobe Commerce", title: "Adobe Commerce to Shopify Migration", accent: "Planned around complex commerce", intro: "Move a feature-rich Adobe Commerce store to Shopify with a migration plan built around your catalog, customer journeys, B2B workflows, and connected systems.",
    serviceHeading: "A migration plan for your Adobe Commerce ecosystem", serviceIntro: "We map the storefront and operations you rely on, then plan how each important part should move into Shopify.",
    services: [
      {title:"Catalog and product models",copy:"Review configurable products, attributes, categories, and pricing, then map the information to Shopify products, options, collections, and metafields."},
      {title:"B2B and customer workflows",copy:"Document company accounts, customer groups, catalogs, and purchasing rules so the destination setup reflects the workflows your teams need."},
      {title:"Custom features and extensions",copy:"Assess custom modules and extensions, identify what should be replaced or rebuilt, and plan the work around Shopify's app and platform capabilities."},
      {title:"Commerce integrations",copy:"Plan the connections between Shopify and the ERP, CRM, payment, fulfillment, tax, and analytics systems your operation depends on."},
      {title:"Content, SEO, and redirects",copy:"Inventory key pages and landing routes, preserve valuable content, and prepare URL redirects and metadata for launch."},
    ],
    approachHeading:"Move the platform without losing sight of the business", approachIntro:"An Adobe Commerce migration affects more than the storefront. We align data, user experience, integrations, and launch readiness around your operating needs.",
    approach: [
      {title:"Start with discovery",copy:"Review the current store, extensions, integrations, data, and business workflows before setting migration scope."},
      {title:"Map before moving",copy:"Define how products, customers, content, and URLs will map to Shopify and identify gaps early."},
      {title:"Rebuild with purpose",copy:"Recreate required functionality using Shopify features, apps, or custom development based on fit and maintainability."},
      {title:"Validate the launch",copy:"Check catalog data, checkout journeys, integrations, redirects, and analytics before the new storefront goes live."},
    ],
    faqs: [
      {question:"Can Adobe Commerce stores migrate to Shopify Plus?",answer:"Yes. We plan Adobe Commerce to Shopify or Shopify Plus migrations around the current storefront, operating model, required functionality, and integration landscape."},
      {question:"What happens to custom Adobe Commerce modules?",answer:"We review each module and decide whether the business need can be met with Shopify features, an app, a system integration, or custom development."},
      {question:"Can B2B workflows move with the store?",answer:"B2B requirements are assessed during discovery, including company accounts, customer access, catalogs, pricing rules, and approval workflows."},
      {question:"Will SEO URLs and content be preserved?",answer:"We inventory important pages and URLs, map the destination structure, and prepare redirects and metadata as part of launch planning."},
    ],
  },
  bigcommerce: {
    slug: "bigcommerce", name: "BigCommerce", title: "BigCommerce to Shopify Migration", accent: "Built for your next stage", intro: "Bring your BigCommerce storefront, catalog, and customer experience to Shopify with a migration planned around the way your ecommerce business runs.",
    serviceHeading: "Move your BigCommerce store with a clear plan", serviceIntro: "We account for the product catalog, storefront content, data, and connections that support daily commerce.",
    services: [
      {title:"Products and variants",copy:"Map product details, options, variants, categories, and custom fields into a Shopify catalog that is easier to manage."},
      {title:"Storefront content",copy:"Plan how pages, navigation, blog content, and brand elements will be recreated in the new Shopify experience."},
      {title:"Customers and order history",copy:"Scope customer records and historical order data for migration, then define validation checks for the transferred information."},
      {title:"Apps and integrations",copy:"Review BigCommerce apps and connected services, confirm Shopify equivalents where available, and plan replacements or custom connections where needed."},
      {title:"SEO and launch readiness",copy:"Prepare URL mappings, redirects, metadata, analytics, and a launch checklist to help protect discoverability and customer journeys."},
    ],
    approachHeading:"Make the move fit your business", approachIntro:"A successful BigCommerce migration starts with a shared view of what must carry over, what can improve, and what needs to connect on Shopify.",
    approach: [
      {title:"Audit the storefront",copy:"Review the catalog, theme, apps, content, integrations, and store operations before planning scope."},
      {title:"Structure the new catalog",copy:"Map products, categories, options, and custom fields into Shopify's information model."},
      {title:"Rebuild key journeys",copy:"Recreate navigation, landing pages, and purchase flows around your brand and customer needs."},
      {title:"Test before launch",copy:"Validate data, checkout, integrations, redirects, and reporting with your team before switching platforms."},
    ],
    faqs: [
      {question:"Can I move my BigCommerce store to Shopify?",answer:"Yes. We can plan and implement a BigCommerce to Shopify migration, including storefront structure, products, customer data, content, and integrations within the agreed scope."},
      {question:"Can product options and variants be migrated?",answer:"We review your catalog structure and map product options and variants to Shopify's product model, identifying any data that needs restructuring."},
      {question:"Will BigCommerce apps transfer to Shopify?",answer:"Apps do not transfer directly. We review what each app does and select a Shopify app, integration, native feature, or custom solution for the same business need."},
      {question:"How do you help protect search rankings during migration?",answer:"We plan URL mapping, redirects, page metadata, and launch checks so important search routes continue to resolve after the platform change."},
    ],
  },
  woocommerce: {
    slug: "woocommerce", name: "WooCommerce", title: "WooCommerce to Shopify Migration", accent: "A cleaner commerce foundation", intro: "Move from WooCommerce to Shopify with a practical plan for your products, orders, customer data, WordPress content, and the plugins your store depends on.",
    serviceHeading: "Migrate WooCommerce without leaving the details behind", serviceIntro: "We look at the full WordPress and WooCommerce setup so the new store supports both customer-facing and operational needs.",
    services: [
      {title:"Products and categories",copy:"Map products, variations, attributes, categories, and product media into Shopify's catalog structure."},
      {title:"Orders and customers",copy:"Define the customer and order history required for the new store and create checks to validate migrated records."},
      {title:"WordPress content",copy:"Plan the transfer or recreation of important landing pages, editorial content, navigation, and brand assets."},
      {title:"Plugin functionality",copy:"Review plugins for subscriptions, promotions, shipping, payments, and other workflows, then plan Shopify-compatible replacements."},
      {title:"URLs and store launch",copy:"Map existing WordPress routes, prepare redirects, and test checkout, analytics, and essential store journeys before launch."},
    ],
    approachHeading:"Replace plugin complexity with a considered Shopify setup", approachIntro:"WooCommerce stores can rely on a large plugin ecosystem. We identify what your business uses and create a clear plan for each requirement.",
    approach: [
      {title:"Review WordPress and WooCommerce",copy:"Inventory themes, plugins, content, products, custom fields, and integrations."},
      {title:"Set migration priorities",copy:"Separate essential business workflows from features that can be simplified or retired."},
      {title:"Configure Shopify",copy:"Set up the catalog, storefront, apps, and integrations around the agreed requirements."},
      {title:"Rehearse and validate",copy:"Review migrated data and test the store with real user journeys before launch."},
    ],
    faqs: [
      {question:"Can WooCommerce products and variations move to Shopify?",answer:"We map WooCommerce products, variations, attributes, and media into Shopify's catalog and identify any records that need cleanup or restructuring."},
      {question:"What happens to my WordPress website content?",answer:"Important pages and editorial content are inventoried and then migrated or recreated in a structure that supports the new storefront."},
      {question:"Can WooCommerce plugins be replaced?",answer:"We review plugin functionality and plan Shopify-native features, apps, integrations, or custom development for the requirements that matter."},
      {question:"Will my old website links still work?",answer:"We create a URL mapping and redirect plan for important routes, then test the redirects before launch."},
    ],
  },
  salesforce: {
    slug: "salesforce", name: "Salesforce Commerce Cloud", title: "Salesforce Commerce Cloud to Shopify Migration", accent: "Connected to your commerce operations", intro: "Plan a move from Salesforce Commerce Cloud to Shopify around your storefront, customer data, commerce integrations, and the workflows teams rely on.",
    serviceHeading:"Move from Salesforce Commerce Cloud to Shopify", serviceIntro:"We assess storefront functionality and connected Salesforce services together, then define a migration path for your specific operating model.",
    services: [
      {title:"Catalog and merchandising",copy:"Map product catalogs, categories, attributes, promotions, and merchandising rules to the Shopify setup."},
      {title:"Customers and commerce data",copy:"Define which customer, account, and order records need to move and how the data will be checked after import."},
      {title:"Storefront capabilities",copy:"Review custom storefront features and plan their Shopify equivalents using themes, apps, APIs, or custom development."},
      {title:"Salesforce and business systems",copy:"Assess Salesforce CRM and other connected systems to plan reliable data flows, ownership, and integration responsibilities."},
      {title:"SEO and launch planning",copy:"Prepare URL redirects, metadata, analytics, testing, and cutover coordination for a controlled launch."},
    ],
    approachHeading:"Plan the storefront and systems as one migration", approachIntro:"A Salesforce Commerce Cloud move often touches other Salesforce services and business systems. We map those connections alongside the storefront work.",
    approach: [
      {title:"Map the commerce landscape",copy:"Document storefront features, Salesforce products, data flows, integrations, and team responsibilities."},
      {title:"Define the Shopify model",copy:"Plan the catalog, customer structure, storefront, and platform connections around the target operating model."},
      {title:"Implement in stages",copy:"Build and configure the destination, then validate data and business workflows incrementally."},
      {title:"Coordinate cutover",copy:"Prepare owners, data checks, redirect validation, monitoring, and support for launch day."},
    ],
    faqs: [
      {question:"Can Salesforce Commerce Cloud migrate to Shopify Plus?",answer:"Yes. We can plan a move to Shopify or Shopify Plus after reviewing storefront requirements, Salesforce integrations, data, and operational workflows."},
      {question:"Can Shopify remain connected to Salesforce CRM?",answer:"The target integration depends on your Salesforce setup and data flows. We assess the connection requirements and plan the appropriate integration approach."},
      {question:"Can custom Commerce Cloud features be recreated?",answer:"We review custom features individually and determine whether Shopify functionality, apps, APIs, or custom development best meets each requirement."},
      {question:"How do you handle a large platform cutover?",answer:"We plan migration steps, validation ownership, redirect testing, launch timing, and post-launch monitoring with your stakeholders."},
    ],
  },
  magento: {
    slug: "magento", name: "Magento", title: "Magento to Shopify Migration", accent: "Modernize without guesswork", intro: "Move your Magento store to Shopify with a migration plan that accounts for your catalog, extensions, customer experience, and business-critical integrations.",
    serviceHeading:"A thoughtful Magento migration to Shopify", serviceIntro:"We assess the current Magento setup and plan a destination that keeps the important workflows clear and maintainable.",
    services: [
      {title:"Catalog and attributes",copy:"Review product types, attributes, categories, and media, then map the catalog to Shopify products, options, collections, and metafields."},
      {title:"Extensions and custom code",copy:"Identify the business purpose of extensions and customizations, and plan what should be replaced, rebuilt, or retired."},
      {title:"Customers and order data",copy:"Set the scope for customer records and order history and define how migrated records will be validated."},
      {title:"Connected systems",copy:"Plan Shopify connections to fulfillment, accounting, ERP, CRM, payment, and analytics systems."},
      {title:"Content, URLs, and SEO",copy:"Preserve important landing pages and routes with a content plan, URL mapping, redirects, and metadata checks."},
    ],
    approachHeading:"Keep the business requirements. Simplify the platform path.", approachIntro:"Magento implementations often include years of custom work. We make those requirements visible and plan a Shopify setup that fits what your business needs now.",
    approach: [
      {title:"Inventory what exists",copy:"Review Magento version, extensions, customizations, catalog, data, and integrations."},
      {title:"Choose what carries forward",copy:"Prioritize the capabilities that support customers and operations, and identify obsolete complexity."},
      {title:"Build and connect",copy:"Configure Shopify and implement the apps, integrations, or custom elements in the migration scope."},
      {title:"Validate the new experience",copy:"Test product data, customer journeys, checkout, links, and connected workflows before cutover."},
    ],
    faqs: [
      {question:"Is Magento to Shopify migration possible for a customized store?",answer:"Yes. Customizations are reviewed during discovery so each business need can be mapped to a Shopify feature, app, integration, or scoped custom implementation."},
      {question:"Can Magento product attributes move to Shopify?",answer:"We review the attribute model and map relevant fields to Shopify product options, metafields, or other suitable catalog structures."},
      {question:"What happens to Magento extensions?",answer:"Extensions do not transfer directly. We identify their purpose and plan a replacement or alternative for the requirements you still need."},
      {question:"Can I keep my store's existing domain?",answer:"Your domain can be connected to Shopify as part of launch planning. We also prepare and test redirects for important legacy URLs."},
    ],
  },
  squarespace: {
    slug: "squarespace", name: "Squarespace", title: "Squarespace to Shopify Migration", accent: "Commerce with room to grow", intro: "Move a Squarespace storefront to Shopify while planning for your products, website content, customer records, and the brand experience your customers know.",
    serviceHeading:"Bring your Squarespace store to Shopify", serviceIntro:"We plan the store and content move together so the new site can support your brand, catalog, and next stage of commerce.",
    services: [
      {title:"Products and collections",copy:"Map products, variants, pricing, categories, and media into a catalog structure that is straightforward to maintain."},
      {title:"Website pages and brand",copy:"Plan how key pages, navigation, visual design, and brand elements will be recreated in the Shopify storefront."},
      {title:"Customers and orders",copy:"Review customer and order records to scope what should move and how to validate it in the destination."},
      {title:"Commerce functionality",copy:"Identify the current checkout, promotions, shipping, payments, and marketing needs and configure suitable Shopify capabilities."},
      {title:"SEO and redirects",copy:"Map important Squarespace URLs and metadata to the new site and prepare redirects for launch."},
    ],
    approachHeading:"Carry your brand into a commerce-first storefront", approachIntro:"A Squarespace migration is an opportunity to retain the visual identity customers recognize while building on a storefront designed for ecommerce operations.",
    approach: [
      {title:"Review your site and store",copy:"Inventory products, pages, navigation, media, customer records, and current commerce tools."},
      {title:"Plan the new storefront",copy:"Define the Shopify theme, page structure, catalog, and customer journeys before rebuilding."},
      {title:"Move the content and catalog",copy:"Transfer or recreate the agreed content and map products and data into Shopify."},
      {title:"Prepare for launch",copy:"Test the store, connect the domain, validate redirects, and review checkout on desktop and mobile."},
    ],
    faqs: [
      {question:"Can I move my Squarespace store to Shopify?",answer:"Yes. We can migrate the storefront and commerce data in scope, then rebuild the site experience and configure the Shopify store."},
      {question:"Will my Squarespace design look the same on Shopify?",answer:"We can use your current brand and site as a design reference while rebuilding the experience with a Shopify theme and its supported customization options."},
      {question:"Can I move my products and customer data?",answer:"Products and selected customer or order records can be scoped for migration. We review the available data and validate the destination records."},
      {question:"What happens to Squarespace page URLs?",answer:"We map important pages to their new Shopify destinations and prepare redirects to help visitors and search engines reach the right content."},
    ],
  },
  wix: {
    slug: "wix", name: "Wix", title: "Wix to Shopify Migration", accent: "A store built for what's next", intro: "Move your Wix store to Shopify with a clear plan for products, customer and order data, site content, and the commerce tools your business needs.",
    serviceHeading:"Move your Wix store with the right details in place", serviceIntro:"We plan your catalog, storefront, and business tools together so you know what is moving and how the new experience will work.",
    services: [
      {title:"Products and categories",copy:"Map products, variants, options, pricing, and categories into Shopify's catalog structure."},
      {title:"Customers and order history",copy:"Scope the customer and order information you need in Shopify and validate records after migration."},
      {title:"Pages and site content",copy:"Plan how key Wix pages, navigation, brand assets, and other content will be recreated in the new storefront."},
      {title:"Apps and store workflows",copy:"Review the tools behind payments, shipping, promotions, inventory, and marketing, then plan Shopify-compatible alternatives."},
      {title:"URLs and launch checks",copy:"Prepare route mapping, redirects, checkout testing, analytics, and domain cutover for launch."},
    ],
    approachHeading:"A guided move from Wix to Shopify", approachIntro:"We organize the migration into clear stages, from reviewing the current store through validating the new customer experience.",
    approach: [
      {title:"Review your Wix setup",copy:"Assess the catalog, pages, apps, payments, shipping settings, and connected business systems."},
      {title:"Map products and content",copy:"Define how store data and important site content will be structured on Shopify."},
      {title:"Build and configure",copy:"Create the Shopify storefront, transfer scoped data, and set up agreed integrations."},
      {title:"Test the full journey",copy:"Validate products, checkout, order processing, redirects, and analytics before launch."},
    ],
    faqs: [
      {question:"Can I migrate my Wix store to Shopify?",answer:"Yes. We can plan a Wix to Shopify migration covering your storefront, catalog, selected customer and order data, integrations, and launch requirements."},
      {question:"Can Wix products and variants be transferred?",answer:"We review the current product structure and map products, options, variants, and media into Shopify's catalog."},
      {question:"Will my Wix website pages be moved?",answer:"Important pages and brand content are identified and migrated or recreated in the Shopify storefront structure."},
      {question:"Do you help with domain and redirects?",answer:"Yes. Domain connection, URL mapping, redirect setup, and validation can be included in the migration launch plan."},
    ],
  },
};

export const migrationPlatformList = Object.values(migrationPlatforms);
