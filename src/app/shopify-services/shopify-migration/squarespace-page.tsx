"use client";

import Image from "./migration-images";
import Link from "next/link";
import {useState} from "react";
import styles from "./migration-detail.module.css";
import theme from "./migration-detail-theme.module.css";

const asset = "/site-assets/shopify-migration/squarespace/";
const caseAsset = "/site-assets/shopify-migration/adobe-commerce/";
const cn = (name: string) => `${styles[name]} ${theme[name] || ""}`;

const reasons = [
  ["Move to a Platform Built Around Ecommerce", "Shopify brings products, inventory, orders, payments, and sales channels together. Kodrise builds storefronts around your catalog, customer journeys, and business requirements."],
  ["Scale Commerce Operations with Greater Flexibility", "Shopify offers advanced inventory management, checkout, automation, and Shopify Plus capabilities. We build scalable commerce architecture for evolving business requirements."],
  ["Expand Store Functionality and Integrations", "Shopify offers apps, APIs, and custom development. We identify the right tools and integrations to support specialized business workflows."],
  ["Build More Flexible Storefront Experiences", "Shopify offers customizable themes and storefront development. We create storefronts that support evolving branding, merchandising, product discovery, and customer experiences."],
  ["Expand Across Sales Channels and Markets", "Shopify centralizes sales channels, inventory, and orders. We configure your commerce setup around regional requirements and operational workflows."],
];

const migrationItems = [
  ["Product Catalogs, Options, and Variants", "We migrate products, options, variants, pricing, inventory, and images while maintaining catalog accuracy.", "involve-catalog-squarespace-a-960w.webp"],
  ["Customer Accounts and Order History", "We migrate supported customer profiles, addresses, and order history while accounting for export options and platform limitations.", "involve-customers-squarespace-a-960w.webp"],
  ["Website Content, Blogs, and URL Structures", "We migrate website pages, blogs, products, and URLs, implementing redirects and adapting content for Shopify.", "involve-content-squarespace-a-960w.webp"],
  ["Custom Functionality and Business Logic", "We assess extensions, custom code, subscriptions, scheduling, and workflows to identify native features, apps, or custom development requirements.", "involve-custom-squarespace-a-960w.webp"],
  ["Third-Party Systems and Integrations", "We connect payment, shipping, marketing, CRM, ERP, inventory, and fulfillment systems to maintain reliable data flows.", "involve-systems-squarespace-a-960w.webp"],
  ["Storefront Design and Customer Experience", "We recreate your storefront around brand identity, navigation, merchandising, mobile experience, and conversion goals.", "involve-storefront-squarespace-a-960w.webp"],
];

const customizations = [
  ["Assessing Existing Extensions and Custom Functionality", "We audit Squarespace extensions, custom code, and embedded tools to identify dependencies and migration requirements.", "rebuild-squarespace-1-a-960w.webp"],
  ["Rebuilding Business-Critical Workflows", "We map products, discounts, subscriptions, scheduling, and order workflows to Shopify features, apps, or custom development.", "rebuild-squarespace-2-a-960w.webp"],
  ["Integrating ERP, CRM, PIM, OMS, and Fulfillment Systems", "We connect product, customer, inventory, order, payment, and fulfillment systems for reliable data exchange.", "rebuild-squarespace-3-a-960w.webp"],
  ["Deciding What to Rebuild, Replace, or Simplify", "We identify what to rebuild, replace with Shopify apps, integrate, or simplify using native features.", "rebuild-squarespace-4-a-960w.webp"],
];

const seoItems = [
  ["Mapping URLs and Redirects", "We map Squarespace URLs to Shopify pages and implement permanent redirects to preserve SEO value.", "seo-squarespace-1-a.webp"],
  ["Preserving Metadata and Canonicals", "We migrate titles, meta descriptions, canonical tags, and indexable content to retain SEO signals.", "seo-squarespace-2-a.webp"],
  ["Migrating Products and Categories", "We map products, variants, and categories to Shopify structures while preserving key landing pages.", "seo-squarespace-3-a.webp"],
  ["Validating Links and Sitemaps", "We check internal links, structured data, and XML sitemaps to support crawling and indexing.", "seo-squarespace-4-a.webp"],
  ["Monitoring SEO After Launch", "We monitor indexing, redirects, crawl issues, and organic performance to catch migration-related issues.", "seo-squarespace-5-a.webp"],
];

const comparisons = [
  ["Platform focus", "Squarespace combines website building, content management, and ecommerce features for selling products, services, and experiences.", "Shopify is built around ecommerce operations, with dedicated tools for products, inventory, orders, payments, and selling channels."],
  ["Day-to-day store management", "Squarespace provides a centralized dashboard for managing website content, products, orders, customers, and store operations.", "Shopify's centralized commerce admin supports product, inventory, order, customer, and sales channel management."],
  ["Storefront design and customization", "Squarespace offers design-focused templates, visual editing, and customizable layouts for websites and online stores.", "Shopify offers customizable themes, a theme editor, and custom storefront development options for commerce-focused experiences."],
  ["Customization and extensibility", "Squarespace supports additional functionality through built-in features, third-party extensions, integrations, and custom code.", "Shopify supports customization through themes, apps, APIs, Shopify Functions, and custom development within its platform architecture."],
  ["Integrations and connected systems", "Squarespace connects with external services through Squarespace extensions, built-in integrations, and third-party tools.", "Shopify supports connections through apps, APIs, and custom integrations, depending on system compatibility and business requirements."],
  ["Selling channels and payments", "Squarespace supports online selling, social commerce integrations, and in-person selling through available POS capabilities and supported regions.", "Shopify supports social media, marketplaces, and in-person selling through Shopify POS, with additional capabilities depending on the plan."],
  ["Operating costs and resource requirements", "Squarespace costs may include a qualifying website or commerce plan, extensions, payment processing, and additional development requirements.", "Shopify costs may include the Shopify or Shopify Plus plan, apps, integrations, applicable transaction-related fees, and development resources."],
  ["Flexibility for future commerce needs", "Squarespace provides an all-in-one website and commerce ecosystem suited to businesses selling products, services, and digital offerings.", "Shopify provides a dedicated commerce ecosystem for evolving DTC, B2B, and omnichannel needs, subject to platform capabilities and plan features."],
];

const chooseReasons = [
  ["We Start With Your Business Model", "We align migration with your business goals, catalog, sales channels, and workflows."],
  ["We Account for Data and Integrations", "We assess Squarespace data, extensions, and customizations to preserve critical operations."],
  ["We Prioritize SEO and Customer Experience", "We protect search visibility, content, navigation, and customer journeys."],
  ["We Build for Future Growth", "We create a scalable Shopify foundation for evolving business needs."],
];

const faqs = [
  ["How do you choose between Shopify and Squarespace?", "Squarespace suits businesses prioritizing website design, services, and content. Shopify specializes in online and offline selling, with extensive commerce features, apps, and integrations."],
  ["How can I embed Shopify into a Squarespace website?", "You can use Shopify's Buy Button to embed products into your existing Squarespace website. This lets you manage products and orders through Shopify without fully migrating."],
  ["What's the biggest difference between Squarespace and Shopify?", "Squarespace combines website building and ecommerce, while Shopify focuses on commerce operations. Shopify offers greater flexibility through its app ecosystem, integrations, and dedicated selling capabilities."],
  ["How can I migrate my products from Squarespace to Shopify?", "You can export Squarespace products as CSV files and import them into Shopify. Images, variants, and other details may require additional handling during migration."],
  ["How do fees differ between Squarespace and Shopify?", "Fees depend on your subscription, payment provider, and region. Compare plan costs, payment processing rates, third-party transaction fees, and additional app expenses before choosing."],
  ["Is Shopify or Squarespace better for beginners?", "Both platforms offer accessible setup tools. Squarespace simplifies website creation, while Shopify provides dedicated ecommerce tools and resources for businesses starting and scaling online stores."],
  ["How are Squarespace and Shopify different for ecommerce?", "Squarespace combines ecommerce with website and content tools. Shopify specializes in ecommerce, offering dedicated inventory management, checkout, selling channels, and integrations for growing stores."],
  ["How do I transfer my domain from Squarespace to Shopify?", "Unlock your Squarespace domain, obtain its transfer authorization code, and initiate the transfer through Shopify. Alternatively, connect your domain by updating its DNS records."],
  ["Which is more affordable, Shopify or Squarespace?", "Squarespace may have lower upfront costs for some website requirements. Shopify's value depends on the commerce features, integrations, and operational capabilities your business needs as it grows."],
];

export default function SquarespaceMigrationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const contact = "/contact?service=Squarespace%20to%20Shopify%20Migration";

  return <main className={`${styles.page} ${theme.theme}`} id="main">
    <section className={cn("hero")}><div className={cn("heroArt")}><Image src={`${asset}hero-mig-squarespace-a-960w.webp`} alt="Squarespace to Shopify migration planning" fill preload sizes="(max-width: 700px) 100vw, 58vw" /></div><div className={cn("heroShade")} /><div className={cn("heroCopy")}><span className={cn("eyebrow")}>SHOPIFY MIGRATION · SQUARESPACE</span><h1>Squarespace to <span>Shopify Migration</span></h1><p>Helping brands build what's next on Shopify. Plan a move around your content, store data, integrations, and customer journeys.</p><Link className={cn("cta")} href={contact}>Talk to Our Migration Experts <span aria-hidden="true">↗</span></Link></div></section>
    <nav className={cn("breadcrumb")} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify</Link><span>/</span><Link href="/shopify-services/shopify-migration">Migration</Link><span>/</span><span aria-current="page">Squarespace</span></div></nav>

    <section className={cn("caseStudies")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>EXPERIENCE THAT TRAVELS</span><h2>Helping Brands Build What's Next on Shopify</h2><p>Kodrise combines commerce strategy and engineering expertise to migrate Squarespace stores and build scalable Shopify experiences aligned with business goals.</p><Link className={cn("textLink")} href="/case-studies">Explore Our Case Studies <b aria-hidden="true">↗</b></Link></header><div className={cn("caseGrid")}>{[["Capelli Sport", "From WordPress to Shopify: a seamless migration for growth", "Sportswear and footwear", "sel-capelli-a.webp"], ["JaniSource", "How JaniSource got to Shopify Plus from BigCommerce without a hitch", "Janitorial and cleaning solutions", "sel-janisource-a.webp"], ["TrailGrid Pro", "How TrailGrid Pro's Shopify Plus migration won the industry's best website award", "Outdoor recreation", "sel-trailgrid-a.webp"]].map(([name, title, industry, image]) => <Link href="/case-studies" className={cn("caseCard")} key={name}><div className={cn("caseImage")}><Image src={`${caseAsset}${image}`} alt={`${name} commerce build`} fill sizes="(max-width: 700px) 90vw, 32vw" /><span>{industry}</span></div><div className={cn("caseCopy")}><span>{name}</span><h3>{title}</h3><b>Read case study <i aria-hidden="true">↗</i></b></div></Link>)}</div></section>

    <section className={cn("why")} id="why-shopify"><div className={cn("whyImage")}><Image src={`${asset}why-bento-squarespace-a-960w.webp`} alt="Squarespace and Shopify commerce migration" fill sizes="(max-width: 700px) 100vw, 43vw" loading="lazy" /></div><div className={cn("whyCopy")}><span className={cn("eyebrow")}>WHY MIGRATE</span><h2>Why Migrate from Squarespace to Shopify?</h2><p>Squarespace combines website building and ecommerce, while Shopify offers dedicated commerce capabilities, advanced inventory management, integrations, and multichannel selling to support growing businesses.</p><Link className={cn("textLink")} href={contact}>Talk to Our Migration Experts <b aria-hidden="true">↗</b></Link></div><div className={cn("reasonGrid")}>{reasons.map(([title, copy], index) => <article className={cn("reasonCard")} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className={cn("involves")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>WHAT THE MOVE INVOLVES</span><h2>What Does a Squarespace to Shopify Migration Involve?</h2><p>Migrating from Squarespace to Shopify involves assessing website content, store data, integrations, and customer journeys to identify what needs migrating, rebuilding, or simplifying.</p></header><div className={cn("involveGrid")}>{migrationItems.map(([title, copy, image], index) => <article className={cn("involveCard")} key={title}><div className={cn("involveImage")}><Image src={`${asset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 32vw" loading="lazy" /><span>0{index + 1} / 06</span></div><div className={cn("involveCopy")}><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("rebuild")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>CUSTOMIZATIONS</span><h2>Rebuilding Squarespace Customizations and Integrations on Shopify</h2><p>Kodrise assesses Squarespace integrations and customizations to identify what to retain, rebuild, replace, or simplify while preserving essential functionality.</p></header><div className={cn("rebuildGrid")}>{customizations.map(([title, copy, image], index) => <article className={cn("rebuildCard")} key={title}><div className={cn("rebuildImage")}><Image src={`${asset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 45vw" loading="lazy" /></div><div className={cn("rebuildCopy")}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("seo")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>SEO MIGRATION PLANNING</span><h2>Protect SEO During Squarespace to Shopify Migration</h2><p>Kodrise protects search equity through URL mapping, redirects, content migration, and technical SEO, preserving visibility across product, category, blog, and website pages.</p></header><div className={cn("seoGrid")}>{seoItems.map(([title, copy, image], index) => <article className={cn("seoCard")} key={title}><div className={cn("seoImage")}><Image src={`${asset}${image}`} alt={title} fill sizes="(max-width: 700px) 90vw, 33vw" loading="lazy" /><span>0{index + 1}</span></div><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={cn("comparison")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>PLATFORM COMPARISON</span><h2>Squarespace vs. Shopify</h2><p>Squarespace combines website building and ecommerce, while Shopify focuses on dedicated commerce operations, inventory management, integrations, and scalable online selling.</p></header><div className={cn("tableWrap")}><table><thead><tr><th>Area</th><th>Squarespace</th><th>Shopify / Shopify Plus</th></tr></thead><tbody>{comparisons.map(([area, squarespace, shopify]) => <tr key={area}><th scope="row">{area}</th><td><span>Squarespace</span>{squarespace}</td><td><span>Shopify / Shopify Plus</span>{shopify}</td></tr>)}</tbody></table></div></section>

    <section className={cn("choose")}><header className={cn("sectionHead")}><span className={cn("eyebrow")}>WHY KODRISE</span><h2>Why Choose Kodrise for Your Squarespace to Shopify Migration?</h2></header><div className={cn("chooseGrid")}>{chooseReasons.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><Link href="/about" className={cn("textLink")}>Get to Know Us Better <b aria-hidden="true">↗</b></Link></section>

    <section className={cn("faq")} id="faqs"><header className={cn("sectionHead")}><span className={cn("eyebrow")}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions</h2><p>Still wondering? <Link href="/contact">Talk to an expert ↗</Link></p></header><div className={cn("faqList")}>{faqs.map(([question, answer], index) => <article key={question} className={openFaq === index ? styles.faqOpen : ""}><h3><button type="button" aria-expanded={openFaq === index} aria-controls={`squarespace-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b aria-hidden="true">{openFaq === index ? "−" : "+"}</b></button></h3>{openFaq === index && <p id={`squarespace-faq-${index}`}>{answer}</p>}</article>)}</div></section>

    <section className={cn("finalCta")}><span className={cn("eyebrow")}>READY FOR YOUR NEXT STAGE?</span><h2>Ready to Move from Squarespace to Shopify?</h2><p>Move from Squarespace to Shopify with a tailored migration strategy that preserves functionality, simplifies operations, and builds a scalable commerce foundation for future growth.</p><Link className={cn("cta")} href={contact}>Talk to Our Migration Experts <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
