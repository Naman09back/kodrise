"use client";

import Image from "./migration-images";
import Link from "next/link";
import {useState} from "react";
import styles from "./migration-detail.module.css";
import theme from "./migration-detail-theme.module.css";

const asset = "/site-assets/shopify-migration/magento/";
const caseAsset = "/site-assets/shopify-migration/adobe-commerce/";
const cn = (name: string) => `${styles[name]} ${theme[name] || ""}`;

const reasons = [
  ["Reduce Commerce Complexity and Costs", "Magento hosting, extensions, development, and maintenance add operational costs. We evaluate your setup to identify dependencies and simplify your commerce architecture with Shopify."],
  ["Accelerate Innovation and Launches", "Shopify's native features, APIs, and app ecosystem help teams introduce new capabilities faster. We identify what to build, integrate, or simplify to reduce development overhead and support growth."],
  ["Empower Teams to Manage Commerce", "Shopify's centralized admin helps teams manage products, orders, and campaigns with less developer dependency. We align your migration with existing workflows and business needs."],
  ["Scale with Less Infrastructure Overhead", "Shopify manages core infrastructure, reducing server maintenance as your business grows. We plan your migration around traffic, catalog complexity, integrations, and growth goals."],
  ["Unify DTC, B2B, and Other Channels", "Shopify supports DTC, B2B, retail, and international commerce through flexible integrations. We map your ERP, CRM, PIM, OMS, and fulfillment systems for connected operations."],
];

const migrationItems = [
  ["Product Catalogs, Attributes, and Variants", "We map product data, configurable products, variants, pricing, and categories to Shopify while maintaining catalog accuracy.", "involve-catalog-magento-f-960w.webp"],
  ["Customer Accounts and Order History", "We plan the migration of supported customer profiles and order history, accounting for data mapping and platform limitations.", "involve-customers-magento-d-960w.webp"],
  ["Content, Categories, and URL Structures", "We migrate relevant content, categories, and URLs, implementing redirects to preserve navigation and SEO visibility.", "involve-content-magento-d-960w.webp"],
  ["Custom Functionality and Business Logic", "We assess Magento modules, extensions, and workflows to determine what Shopify supports natively, through apps, integrations, or custom development.", "involve-custom-magento-f-960w.webp"],
  ["Third-Party Systems and Integrations", "We plan ERP, CRM, PIM, OMS, payment, and fulfillment integrations to maintain reliable data flows and operations.", "involve-systems-magento-d-960w.webp"],
  ["Storefront Design and Customer Experience", "We align your Shopify storefront with your brand, navigation, merchandising, mobile experience, and conversion goals.", "involve-storefront-magento-d-960w.webp"],
];

const customizations = [
  ["Assessing Existing Magento Extensions and Custom Modules", "We audit Magento extensions and custom modules to identify dependencies, overlapping features, and Shopify migration requirements.", "rebuild-magento-1-a-960w.webp"],
  ["Recreating Business-Critical Workflows", "We map pricing, promotions, and order workflows to Shopify features, apps, integrations, or custom development.", "rebuild-magento-2-a-960w.webp"],
  ["Integrating ERP, CRM, PIM, OMS, and Fulfillment Systems", "We plan Shopify integrations across product, customer, inventory, order, and fulfillment systems.", "rebuild-magento-3-a-960w.webp"],
  ["Deciding What to Rebuild, Replace, or Simplify", "We determine which Magento customizations to rebuild, replace with Shopify apps, integrate, or simplify using native features.", "rebuild-magento-4-a-960w.webp"],
];

const seoItems = [
  ["Mapping URLs and Redirects", "We map Magento URLs to relevant Shopify pages and implement permanent redirects to preserve links and SEO value.", "seo-redirects-b.webp"],
  ["Preserving Metadata and Canonicals", "We migrate and validate titles, meta descriptions, canonical tags, and indexable content to retain key SEO signals.", "seo-metadata-a.webp"],
  ["Migrating Product and Category Structures", "We map product catalogs, categories, and collections to maintain logical navigation and important search landing pages.", "seo-structure-a.webp"],
  ["Validating Internal Links and Sitemaps", "We check internal links, structured data, and XML sitemaps to support crawling and indexing.", "seo-links-a.webp"],
  ["Monitoring SEO After Launch", "We monitor indexing, redirects, crawl issues, and organic performance to identify and resolve migration-related SEO issues.", "seo-monitor-a.webp"],
];

const comparisons = [
  ["Infrastructure and platform maintenance", "Infrastructure, hosting, security, and performance management depend on your Magento deployment and implementation.", "Shopify manages core platform infrastructure and updates, reducing the need to manage servers and platform-level maintenance."],
  ["Day-to-day store management", "Store management may involve platform configurations, extensions, custom modules, and developer support.", "A centralized commerce admin supports everyday store management, with additional capabilities available through apps."],
  ["Customization and extensibility", "Magento offers extensive customization through modules, extensions, and access to the underlying code, depending on the implementation.", "Shopify supports customization through themes, apps, APIs, and custom development within its platform architecture."],
  ["Integrations and connected systems", "Magento connects with ERP, CRM, PIM, OMS, and other systems through extensions, APIs, and custom integrations.", "Shopify supports connections through apps, APIs, and custom integrations, depending on system compatibility and business requirements."],
  ["Upgrades and ongoing development", "Updates, extensions, customizations, and compatibility requirements can create ongoing development and maintenance work.", "Shopify manages core platform updates, while custom apps, integrations, and storefront enhancements still require maintenance."],
  ["Operating costs and resource requirements", "Costs may include hosting, development, extensions, infrastructure, security, and ongoing maintenance.", "Costs may include the Shopify plan, apps, integrations, applicable transaction-related fees, and development resources."],
  ["Flexibility for future commerce needs", "Magento provides extensive control over the implementation, with flexibility shaped by architecture, customizations, and technical resources.", "Shopify provides a managed commerce ecosystem for evolving DTC, B2B, and omnichannel needs, subject to platform capabilities and plan features."],
];

const reasonsToChoose = [
  ["We Start With Your Business Model, Not Just Your Platform", "We align your Shopify migration with your business goals, workflows, sales channels, and operational needs."],
  ["We Account for Your Data, Workflows, and Integrations", "We assess your data, extensions, and integrations to determine what to migrate, adapt, or rebuild while preserving critical operations."],
  ["We Plan for SEO and Customer Experience Before Launch", "We account for redirects, search visibility, navigation, and customer journeys throughout migration."],
  ["We Build for Your Next Stage of Commerce", "We create a scalable Shopify foundation that supports evolving business needs, integrations, and long-term growth."],
];

const faqs = [
  ["How much does a Magento to Shopify migration cost?", "Costs depend on catalog size, data complexity, custom modules, integrations, storefront requirements, and SEO scope. A discovery assessment helps define migration requirements and budget."],
  ["How long does a Magento to Shopify migration take?", "Timelines vary based on store complexity, data volume, customizations, integrations, and approvals. A migration roadmap establishes realistic milestones and launch expectations for your business."],
  ["Can we migrate our products, customers, and order history?", "Yes, supported product, customer, and order data can be migrated. The scope depends on data structures, platform limitations, mapping requirements, and historical record needs."],
  ["What happens to our custom Magento functionality?", "Existing modules and extensions are assessed individually. Functionality may be rebuilt, replaced with Shopify apps, implemented through integrations, or simplified based on business requirements."],
  ["How do we protect SEO rankings during migration?", "SEO protection involves URL mapping, relevant redirects, metadata and canonical reviews, content preservation, and post-launch monitoring. Careful planning reduces avoidable risks, although rankings cannot be guaranteed."],
];

export default function MagentoMigrationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const contact = "/contact?service=Magento%20to%20Shopify%20Migration";

  return <main className={`${styles.page} ${theme.theme}`} id="main">
    <section className={cn("hero")}>
      <div className={cn("heroArt")}><Image src={`${asset}hero-mig-magento-a-960w.webp`} alt="Magento to Shopify migration planning" fill priority sizes="(max-width: 700px) 100vw, 58vw" /></div><div className={cn("heroShade")} />
      <div className={cn("heroCopy")}><span className={cn("eyebrow")}>SHOPIFY MIGRATION · MAGENTO</span><h1>Magento to <span>Shopify Migration</span></h1><p>Helping brands build what's next on Shopify. Plan a move around your store architecture, business logic, integrations, and customer journeys.</p><Link className={cn("cta")} href={contact}>Talk to Our Migration Experts <span aria-hidden="true">↗</span></Link></div>
    </section>
    <nav className={cn("breadcrumb")} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify</Link><span>/</span><Link href="/shopify-services/shopify-migration">Migration</Link><span>/</span><span aria-current="page">Magento</span></div></nav>

    <section className={cn("caseStudies")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>EXPERIENCE THAT TRAVELS</span><h2>Helping Brands Build What's Next on Shopify</h2><p>Kodrise combines commerce strategy and engineering expertise to help brands migrate from Magento and scale on Shopify. Explore how we solve technical challenges and build around business goals.</p><Link className={cn("textLink")} href="/case-studies">Explore Our Case Studies <b aria-hidden="true">↗</b></Link></header><div className={cn("caseGrid")}>{[["JaniSource", "How JaniSource got to Shopify Plus from BigCommerce without a hitch", "Janitorial and cleaning solutions", "sel-janisource-a.webp"], ["Capelli Sport", "From WordPress to Shopify: a seamless migration for growth", "Sportswear and footwear", "sel-capelli-a.webp"], ["TrailGrid Pro", "How TrailGrid Pro's Shopify Plus migration won the industry's best website award", "Outdoor recreation", "sel-trailgrid-a.webp"]].map(([name, title, industry, image]) => <Link href="/case-studies" className={cn("caseCard")} key={name}><div className={cn("caseImage")}><Image src={`${caseAsset}${image}`} alt={`${name} commerce build`} fill sizes="(max-width: 700px) 90vw, 32vw" /><span>{industry}</span></div><div className={cn("caseCopy")}><span>{name}</span><h3>{title}</h3><b>Read case study <i aria-hidden="true">↗</i></b></div></Link>)}</div></section>

    <section className={cn("why")} id="why-shopify"><div className={cn("whyImage")}><Image src={`${asset}why-bento-magento-a-960w.webp`} alt="Magento and Shopify commerce migration" fill sizes="(max-width: 700px) 100vw, 43vw" loading="lazy" /></div><div className={cn("whyCopy")}><span className={cn("eyebrow")}>WHY MIGRATE</span><h2>Why Migrate from Magento to Shopify?</h2><p>Magento offers extensive customization but can involve complex development and maintenance. Shopify Plus simplifies operations with managed infrastructure and a flexible app ecosystem, helping brands improve agility and scale efficiently.</p><Link className={cn("textLink")} href={contact}>Talk to Our Migration Experts <b aria-hidden="true">↗</b></Link></div><div className={cn("reasonGrid")}>{reasons.map(([title, copy], index) => <article className={cn("reasonCard")} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className={cn("involves")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>WHAT THE MOVE INVOLVES</span><h2>What Does a Magento to Shopify Migration Involve?</h2><p>Migrating from Magento to Shopify or Shopify Plus involves more than transferring data. We assess your store architecture, extensions, integrations, and workflows to determine what to migrate, rebuild, replace, or simplify.</p></header><div className={cn("involveGrid")}>{migrationItems.map(([title, copy, image], index) => <article className={cn("involveCard")} key={title}><div className={cn("involveImage")}><Image src={`${asset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 32vw" loading="lazy" /><span>0{index + 1} / 06</span></div><div className={cn("involveCopy")}><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("rebuild")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>CUSTOMIZATIONS</span><h2>Rebuilding Magento Customizations and Integrations on Shopify</h2><p>Magento customizations and integrations often need reimplementation on Shopify. We evaluate your business requirements to determine what to retain, rebuild, replace, or simplify while preserving critical workflows.</p></header><div className={cn("rebuildGrid")}>{customizations.map(([title, copy, image], index) => <article className={cn("rebuildCard")} key={title}><div className={cn("rebuildImage")}><Image src={`${asset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 45vw" loading="lazy" /></div><div className={cn("rebuildCopy")}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("seo")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>SEO MIGRATION PLANNING</span><h2>Protect SEO During Magento to Shopify Migration</h2><p>Kodrise plans redirects, content mapping, and technical SEO to preserve search equity when you migrate from Magento to Shopify.</p></header><div className={cn("seoGrid")}>{seoItems.map(([title, copy, image], index) => <article className={cn("seoCard")} key={title}><div className={cn("seoImage")}><Image src={`${caseAsset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 33vw" loading="lazy" /><span>0{index + 1}</span></div><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("comparison")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>PLATFORM COMPARISON</span><h2>Magento vs. Shopify</h2><p>Magento offers extensive customization, while Shopify provides managed infrastructure and centralized store management. The right platform depends on your business needs and growth goals.</p></header><div className={cn("tableWrap")}><table><thead><tr><th>Area</th><th>Magento</th><th>Shopify / Shopify Plus</th></tr></thead><tbody>{comparisons.map(([area, magento, shopify]) => <tr key={area}><th scope="row">{area}</th><td><span>Magento</span>{magento}</td><td><span>Shopify / Shopify Plus</span>{shopify}</td></tr>)}</tbody></table></div></section>

    <section className={cn("choose")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>WHY KODRISE</span><h2>Why Choose Kodrise for Your Magento to Shopify Migration?</h2></header><div className={cn("chooseGrid")}>{reasonsToChoose.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><Link href="/about" className={cn("textLink")}>Get to Know Us Better <b aria-hidden="true">↗</b></Link></section>

    <section className={cn("faq")} id="faqs"><header className={cn("sectionHead")}><span className={cn("eyebrow")}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions</h2><p>Still wondering? <Link href="/contact">Talk to an expert ↗</Link></p></header><div className={cn("faqList")}>{faqs.map(([question, answer], index) => <article key={question} className={openFaq === index ? styles.faqOpen : ""}><h3><button type="button" aria-expanded={openFaq === index} aria-controls={`magento-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b aria-hidden="true">{openFaq === index ? "−" : "+"}</b></button></h3>{openFaq === index && <p id={`magento-faq-${index}`}>{answer}</p>}</article>)}</div></section>

    <section className={cn("finalCta")}><span className={cn("eyebrow")}>READY FOR YOUR NEXT STAGE?</span><h2>Ready to Move from Magento to Shopify?</h2><p>Move from Magento to Shopify or Shopify Plus with a migration strategy built around your workflows, custom functionality, integrations, and growth goals. Talk to Kodrise about the right approach for your business.</p><Link className={cn("cta")} href={contact}>Talk to Our Migration Experts <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
