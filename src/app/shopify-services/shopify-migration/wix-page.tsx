"use client";

import Image from "./migration-images";
import Link from "next/link";
import {useState} from "react";
import styles from "./migration-detail.module.css";
import theme from "./migration-detail-theme.module.css";

const asset = "/site-assets/shopify-migration/wix/";
const caseAsset = "/site-assets/shopify-migration/adobe-commerce/";
const cn = (name: string) => `${styles[name]} ${theme[name] || ""}`;

const reasons = [
  ["Move to a Platform Built Around Ecommerce", "Shopify brings products, inventory, orders, payments, and sales channels together. Kodrise builds storefronts around your catalog, customer journeys, and business requirements."],
  ["Scale Commerce Operations with Greater Flexibility", "Shopify offers advanced checkout, integrations, automation, and Shopify Plus capabilities. We build scalable commerce architecture for evolving business requirements."],
  ["Expand Store Functionality and Integrations", "Shopify offers apps, APIs, and custom development. We identify the right integrations and tools to support operations without unnecessary complexity."],
  ["Build More Flexible Storefront Experiences", "Shopify allows merchants to switch themes without rebuilding their stores. We create storefronts that support evolving branding, merchandising, and customer experiences."],
  ["Support Omnichannel and International Selling", "Shopify centralizes sales channels, inventory, and orders. We configure your commerce setup around regional requirements and operational workflows."],
];

const migrationItems = [
  ["Product Catalogs, Options, and Variants", "We migrate products, options, variants, pricing, inventory, and images while maintaining catalog accuracy.", "involve-catalog-wix-a-960w.webp"],
  ["Customer Accounts and Order History", "We migrate supported customer profiles, addresses, and order history while accounting for export options and platform limitations.", "involve-customers-wix-a-960w.webp"],
  ["Website Content, Categories, and URL Structures", "We migrate website pages, blogs, products, and categories, mapping URLs and implementing redirects where required.", "involve-content-wix-a-960w.webp"],
  ["Custom Functionality and Business Logic", "We assess Wix apps, Velo customizations, and workflows to identify native features, apps, or custom development requirements.", "involve-custom-wix-a-960w.webp"],
  ["Third-Party Systems and Integrations", "We connect payment, shipping, marketing, CRM, ERP, inventory, and fulfillment systems to maintain reliable data flows.", "involve-systems-wix-a-960w.webp"],
  ["Storefront Design and Customer Experience", "We recreate your storefront around brand identity, navigation, merchandising, mobile experience, and conversion goals.", "involve-storefront-wix-a-960w.webp"],
];

const customizations = [
  ["Assessing Existing Wix Apps and Custom Functionality", "We audit Wix apps, Velo custom code, and existing website configurations to identify dependencies, overlapping features, and Shopify migration requirements.", "rebuild-wix-1-a-960w.webp"],
  ["Recreating Business-Critical Workflows", "We map Wix product configurations, pricing, discounts, subscriptions, and order workflows to Shopify features, apps, integrations, or custom development.", "rebuild-wix-2-a-960w.webp"],
  ["Integrating ERP, CRM, PIM, OMS, and Fulfillment Systems", "We plan Shopify integrations across product, customer, inventory, order, payment, and fulfillment systems to maintain reliable data exchange.", "rebuild-wix-3-a-960w.webp"],
  ["Deciding What to Rebuild, Replace, or Simplify", "We determine which Wix features and customizations to rebuild, replace with Shopify apps, implement through integrations, or simplify using native platform features.", "rebuild-wix-4-a-960w.webp"],
];

const seoItems = [
  ["Mapping URLs and Redirects", "We map Wix URLs to Shopify pages and implement permanent redirects to preserve SEO value.", "seo-wix-1-a.webp"],
  ["Preserving Metadata and Canonicals", "We migrate titles, meta descriptions, canonical tags, and indexable content to retain SEO signals.", "seo-wix-2-a.webp"],
  ["Migrating Products and Categories", "We map product catalogs and collections to Shopify structures while preserving key search landing pages.", "seo-wix-3-a.webp"],
  ["Validating Links and Sitemaps", "We check internal links, structured data, and XML sitemaps to support crawling and indexing.", "seo-wix-4-a.webp"],
  ["Monitoring SEO After Launch", "We monitor indexing, redirects, crawl issues, and organic performance to catch migration-related issues.", "seo-wix-5-a.webp"],
];

const comparisons = [
  ["Platform focus", "Wix combines website building, content management, and ecommerce functionality within one platform.", "Shopify is built around ecommerce operations, with dedicated tools for products, inventory, orders, payments, and selling channels."],
  ["Day-to-day store management", "Wix provides a centralized dashboard for managing website content, products, orders, and store operations.", "Shopify's centralized commerce admin supports product, inventory, order, customer, and sales channel management."],
  ["Storefront design and customization", "Wix offers a visual website editor and customizable templates. Switching templates on an existing site requires a different setup approach.", "Shopify offers customizable themes that can be changed without rebuilding the entire store, alongside custom storefront development options."],
  ["Customization and extensibility", "Wix supports additional functionality through Wix apps and Velo, its development platform for custom web applications.", "Shopify supports customization through themes, apps, APIs, Shopify Functions, and custom development within its platform architecture."],
  ["Integrations and connected systems", "Wix connects with external services through the Wix App Market, built-in integrations, and custom development.", "Shopify supports connections through apps, APIs, and custom integrations, depending on system compatibility and business requirements."],
  ["Selling channels and payments", "Wix supports online selling, social and marketplace integrations, and Wix POS in supported regions.", "Shopify supports social media, marketplaces, and in-person selling through Shopify POS, with additional capabilities depending on the plan."],
  ["Operating costs and resource requirements", "Wix costs may include a qualifying ecommerce plan, apps, payment processing, and additional development requirements.", "Shopify costs may include the Shopify or Shopify Plus plan, apps, integrations, applicable transaction-related fees, and development resources."],
  ["Flexibility for future commerce needs", "Wix provides a combined website and ecommerce ecosystem suited to businesses managing their website and store together.", "Shopify provides a dedicated commerce ecosystem for evolving DTC, B2B, and omnichannel needs, subject to platform capabilities and plan features."],
];

const chooseReasons = [
  ["We Start With Your Business Model, Not Just Your Platform", "We align migration with your business goals, catalog, sales channels, and workflows."],
  ["We Account for Your Data, Workflows, and Integrations", "We assess Wix data, apps, and integrations to preserve critical operations."],
  ["We Plan for SEO and Customer Experience Before Launch", "We protect search visibility, content, navigation, and customer journeys."],
  ["We Build for Your Next Stage of Commerce", "We create a scalable Shopify foundation for evolving business needs and growth."],
];

const faqs = [
  ["Which is better for ecommerce, Shopify or Wix?", "Both support online selling. Shopify is built specifically for commerce, with dedicated store management, extensive integrations, and selling channels. Wix combines website building and ecommerce functionality."],
  ["Is Wix cheaper than Shopify?", "Pricing depends on your region, subscription, payment processing, and additional apps. Compare the total cost of ownership, including transaction fees and the functionality your business requires."],
  ["What is the difference between Wix and Shopify?", "Wix combines website building and ecommerce, while Shopify focuses on commerce operations. Shopify offers dedicated tools for managing products, inventory, orders, payments, and selling channels."],
  ["What does Shopify have that Wix doesn't?", "Shopify offers a commerce-focused ecosystem, extensive app integrations, and flexible theme publishing. Its platform also provides dedicated capabilities for growing and managing more complex online stores."],
  ["Which has lower payment fees, Wix or Shopify?", "Payment fees vary by country, payment provider, and subscription plan. Compare local processing rates, third-party transaction fees, and available payment methods before choosing a platform."],
  ["Can I use Shopify with my Wix website?", "Yes. Shopify's Buy Button lets you embed products and checkout into an existing Wix website while managing products and orders through Shopify."],
  ["How do I transfer my domain from Wix to Shopify?", "You can transfer an eligible domain by unlocking it in Wix, obtaining its authorization code, and initiating the transfer through Shopify. You can also connect it without transferring."],
  ["How do I migrate my Wix store to Shopify?", "Products and customers can be exported from Wix as CSV files. Migration apps or a Shopify Partner can help transfer additional data, including supported order history."],
  ["Can I use my Wix domain with Shopify without transferring it?", "Yes. Connect your Wix domain to Shopify by updating its DNS records. You can continue managing and renewing the domain through Wix."],
];

export default function WixMigrationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const contact = "/contact?service=Wix%20to%20Shopify%20Migration";

  return <main className={`${styles.page} ${theme.theme}`} id="main">
    <section className={cn("hero")}><div className={cn("heroArt")}><Image src={`${asset}hero-mig-wix-a-960w.webp`} alt="Wix to Shopify migration planning" fill priority sizes="(max-width: 700px) 100vw, 58vw" /></div><div className={cn("heroShade")} /><div className={cn("heroCopy")}><span className={cn("eyebrow")}>SHOPIFY MIGRATION · WIX</span><h1>Wix to <span>Shopify Migration</span></h1><p>Helping brands build what's next on Shopify. Plan a move around your store content, data, integrations, and customer journeys.</p><Link className={cn("cta")} href={contact}>Talk to Our Migration Experts <span aria-hidden="true">↗</span></Link></div></section>
    <nav className={cn("breadcrumb")} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify</Link><span>/</span><Link href="/shopify-services/shopify-migration">Migration</Link><span>/</span><span aria-current="page">Wix</span></div></nav>

    <section className={cn("caseStudies")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>EXPERIENCE THAT TRAVELS</span><h2>Helping Brands Build What's Next on Shopify</h2><p>Kodrise combines commerce strategy and engineering expertise to migrate Wix stores and build scalable Shopify experiences.</p><Link className={cn("textLink")} href="/case-studies">Explore Our Case Studies <b aria-hidden="true">↗</b></Link></header><div className={cn("caseGrid")}>{[["Capelli Sport", "From WordPress to Shopify: a seamless migration for growth", "Sportswear and footwear", "sel-capelli-a.webp"], ["JaniSource", "How JaniSource got to Shopify Plus from BigCommerce without a hitch", "Janitorial and cleaning solutions", "sel-janisource-a.webp"], ["TrailGrid Pro", "How TrailGrid Pro's Shopify Plus migration won the industry's best website award", "Outdoor recreation", "sel-trailgrid-a.webp"]].map(([name, title, industry, image]) => <Link href="/case-studies" className={cn("caseCard")} key={name}><div className={cn("caseImage")}><Image src={`${caseAsset}${image}`} alt={`${name} commerce build`} fill sizes="(max-width: 700px) 90vw, 32vw" /><span>{industry}</span></div><div className={cn("caseCopy")}><span>{name}</span><h3>{title}</h3><b>Read case study <i aria-hidden="true">↗</i></b></div></Link>)}</div></section>

    <section className={cn("why")} id="why-shopify"><div className={cn("whyImage")}><Image src={`${asset}why-bento-wix-a-960w.webp`} alt="Wix and Shopify commerce migration" fill sizes="(max-width: 700px) 100vw, 43vw" loading="lazy" /></div><div className={cn("whyCopy")}><span className={cn("eyebrow")}>WHY MIGRATE</span><h2>Why Migrate from Wix to Shopify?</h2><p>Wix combines website building and ecommerce, while Shopify offers dedicated commerce infrastructure, extensive integrations, and centralized store management to support growing catalogs and evolving business needs.</p><Link className={cn("textLink")} href={contact}>Talk to Our Migration Experts <b aria-hidden="true">↗</b></Link></div><div className={cn("reasonGrid")}>{reasons.map(([title, copy], index) => <article className={cn("reasonCard")} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className={cn("involves")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>WHAT THE MOVE INVOLVES</span><h2>What Does a Wix to Shopify Migration Involve?</h2><p>Migrating from Wix to Shopify involves assessing website content, store data, integrations, and customer journeys to identify what needs migrating, rebuilding, or simplifying.</p></header><div className={cn("involveGrid")}>{migrationItems.map(([title, copy, image], index) => <article className={cn("involveCard")} key={title}><div className={cn("involveImage")}><Image src={`${asset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 32vw" loading="lazy" /><span>0{index + 1} / 06</span></div><div className={cn("involveCopy")}><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("rebuild")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>CUSTOMIZATIONS</span><h2>Rebuilding Wix Customizations and Integrations on Shopify</h2><p>Kodrise evaluates Wix apps and customizations to identify what to retain, rebuild, replace, or simplify while preserving essential business functionality.</p></header><div className={cn("rebuildGrid")}>{customizations.map(([title, copy, image], index) => <article className={cn("rebuildCard")} key={title}><div className={cn("rebuildImage")}><Image src={`${asset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 45vw" loading="lazy" /></div><div className={cn("rebuildCopy")}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("seo")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>SEO MIGRATION PLANNING</span><h2>Protect SEO During Wix to Shopify Migration</h2><p>Kodrise protects search equity through URL mapping, redirects, content migration, and technical SEO, preserving visibility across important pages and product categories.</p></header><div className={cn("seoGrid")}>{seoItems.map(([title, copy, image], index) => <article className={cn("seoCard")} key={title}><div className={cn("seoImage")}><Image src={`${asset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 33vw" loading="lazy" /><span>0{index + 1}</span></div><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("comparison")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>PLATFORM COMPARISON</span><h2>Wix vs. Shopify</h2><p>Wix combines website building and ecommerce, while Shopify focuses on store management, customization, integrations, and scalable commerce operations.</p></header><div className={cn("tableWrap")}><table><thead><tr><th>Area</th><th>Wix</th><th>Shopify / Shopify Plus</th></tr></thead><tbody>{comparisons.map(([area, wix, shopify]) => <tr key={area}><th scope="row">{area}</th><td><span>Wix</span>{wix}</td><td><span>Shopify / Shopify Plus</span>{shopify}</td></tr>)}</tbody></table></div></section>

    <section className={cn("choose")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>WHY KODRISE</span><h2>Why Choose Kodrise for Your Wix to Shopify Migration?</h2></header><div className={cn("chooseGrid")}>{chooseReasons.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><Link href="/about" className={cn("textLink")}>Get to Know Us Better <b aria-hidden="true">↗</b></Link></section>

    <section className={cn("faq")} id="faqs"><header className={cn("sectionHead")}><span className={cn("eyebrow")}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions</h2><p>Still wondering? <Link href="/contact">Talk to an expert ↗</Link></p></header><div className={cn("faqList")}>{faqs.map(([question, answer], index) => <article key={question} className={openFaq === index ? styles.faqOpen : ""}><h3><button type="button" aria-expanded={openFaq === index} aria-controls={`wix-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b aria-hidden="true">{openFaq === index ? "−" : "+"}</b></button></h3>{openFaq === index && <p id={`wix-faq-${index}`}>{answer}</p>}</article>)}</div></section>

    <section className={cn("finalCta")}><span className={cn("eyebrow")}>READY FOR YOUR NEXT STAGE?</span><h2>Ready to Move from Wix to Shopify?</h2><p>Move from Wix to Shopify with a tailored migration strategy that preserves essential functionality, simplifies operations, and supports long-term commerce growth.</p><Link className={cn("cta")} href={contact}>Talk to Our Migration Experts <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
