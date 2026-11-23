"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const services = [
  {name:"Custom Shopify Theme Development",copy:"Build a storefront around your brand and customer journeys, with flexible sections your team can use as the business grows."},
  {name:"Shopify Plus Engineering",copy:"Implement complex catalogs, international storefronts, B2B commerce, and high-volume experiences on Shopify Plus."},
  {name:"Storefront UX Implementation",copy:"Turn user journeys and approved designs into fast, intuitive product discovery and shopping experiences."},
  {name:"Store Redesign & Rebuild",copy:"Modernize your storefront while planning for content, search visibility, customer journeys, and the systems already in use."},
  {name:"Commerce Integrations",copy:"Connect Shopify with the CRM, ERP, inventory, fulfillment, analytics, and marketing tools your business depends on."},
  {name:"Mobile-First Storefronts",copy:"Build responsive storefronts with interaction patterns that feel natural on phones, tablets, and desktops."},
  {name:"B2B Commerce Development",copy:"Support company accounts, custom pricing, catalogs, and ordering flows for wholesale customers."},
  {name:"Headless Shopify Development",copy:"Create a custom storefront with Shopify commerce services behind it when your experience needs more control."},
  {name:"Ongoing Development Support",copy:"Keep your storefront moving with new features, landing pages, integrations, and iterative improvements."},
];

const approaches = [
  {name:"Extend a Shopify theme",copy:"Start with a proven theme and extend the parts that make your store distinct."},
  {name:"Build a custom theme",copy:"Create a tailored Shopify theme with components shaped around your brand and operations."},
  {name:"Develop headless commerce",copy:"Pair Shopify commerce capabilities with a separate front end for specialized experiences."},
];

const principles = [
  {title:"Protect search equity",copy:"Plan redirects, metadata, canonical URLs, and content structure before changing the live storefront."},
  {title:"Preserve useful journeys",copy:"Use analytics and stakeholder input to understand which customer paths to keep or improve."},
  {title:"Plan system connections",copy:"Map the apps and business systems that need to keep working through release."},
  {title:"Make updates manageable",copy:"Build reusable sections and clear editing patterns so routine content changes stay simple."},
];

const delivery = [
  {title:"Understand the store",copy:"Review your brand, catalog, customers, goals, and current Shopify setup."},
  {title:"Plan the experience",copy:"Agree on journeys, integrations, architecture, priorities, and milestones."},
  {title:"Design and build",copy:"Shape the experience and implement storefront components in reviewable steps."},
  {title:"Integrate and refine",copy:"Connect required systems and refine the store across devices and content."},
  {title:"Launch and support",copy:"Prepare the release, monitor the storefront, and plan the next improvements."},
];

const faqs = [
  ["What does Shopify website development include?", "Scope can include storefront planning, theme development, custom sections, integrations, quality reviews, launch support, and ongoing improvements."],
  ["Can you build on Shopify Plus?", "Yes. We can develop Shopify Plus storefronts and support needs such as B2B flows, complex catalogs, and multiple markets."],
  ["Should we extend a theme or build a custom one?", "That depends on the experience you need, launch timing, and how much flexibility the storefront requires. We can compare the options against your goals."],
  ["Can we redesign without losing search traffic?", "A careful rebuild plans URL changes, redirects, metadata, and content structure before launch to help protect search equity."],
  ["Will the storefront work well on mobile?", "Responsive behavior is part of implementation from the start, including navigation, product browsing, and key purchase steps."],
  ["Can our team manage content after launch?", "We can develop reusable Shopify sections and templates that help your team handle common storefront updates."],
  ["Do you connect Shopify to other systems?", "We can integrate Shopify with tools such as CRM, ERP, inventory, fulfillment, and analytics platforms, based on your requirements."],
  ["How long does a Shopify build take?", "Timing depends on templates, integrations, custom functionality, and review cycles. We outline a delivery plan after understanding the scope."],
  ["How do you estimate project cost?", "We estimate from the agreed scope, technical complexity, integrations, and delivery needs, then share a clear plan for the work."],
] as const;

function ContactLink({children,service="Shopify Website Development"}:{children:React.ReactNode;service?:string}) {
  return <Link href={`/contact?service=${encodeURIComponent(service)}`} className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function ShopifyWebsiteDevelopmentPage() {
  const [openPrinciple,setOpenPrinciple]=useState(0);
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="development-title">
      <Image className={styles.heroImage} src="/site-assets/shopify-marketing/hero-marketing-b.webp" alt="Ecommerce team reviewing a storefront experience" fill sizes="100vw" priority />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>SHOPIFY WEBSITE DEVELOPMENT</span>
        <h1 id="development-title">Shopify Development<span>Built for What Comes Next</span></h1>
        <p>We build storefronts that feel true to your brand, make shopping simple, and give your business room to grow—from a custom theme to connected commerce systems.</p>
        <ContactLink>Talk to Our Shopify Team</ContactLink>
      </div></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Website Development</span></div></nav>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="development-overview">
      <div className={styles.sectionHead}><span className={styles.kicker}>SHOPIFY DEVELOPMENT SERVICES</span><h2>Storefront Development for Every Stage</h2><p>Build the commerce foundation your business needs today, with room for tomorrow's products, customers, and markets.</p></div>
      <div className={styles.solutionGrid}>{services.map((service,index)=><article className={styles.solutionCard} key={service.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{service.name}</h3><p>{service.copy}</p></article>)}</div>
    </section>

    <section className={styles.retention} id="development-approaches">
      <div className={styles.retentionHeading}><div><span className={styles.kicker}>CHOOSE THE RIGHT FOUNDATION</span><h2>Three Ways to Build Your Shopify Store</h2></div><p>Some stores need a focused theme extension; others need a fully custom storefront. We help weigh flexibility, delivery timing, and scope before development starts.</p></div>
      <div className={styles.emailCard}><div className={styles.emailIcon} aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M7 22h50l-5 34H12L7 22Z"/><path d="M20 25V16a12 12 0 0 1 24 0v9M18 34h28M18 43h20"/></svg></div><div><span className={styles.cardIndex}>SHOPIFY IMPLEMENTATION OPTIONS</span><h3>Choose a build that fits your store</h3><p>{approaches.map((item)=>`${item.name}: ${item.copy}`).join(" ")}</p></div><ContactLink>Compare Approaches</ContactLink></div>
    </section>

    <section className={styles.capabilities} aria-labelledby="delivery-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>HOW WE DELIVER</span><h2 id="delivery-title">From a Clear Plan to a Store Ready for Customers</h2><p>Bring customer experience, commerce operations, and technical decisions together through a collaborative delivery process.</p></div>
        <div className={styles.stageGrid}>{delivery.slice(0,3).map((step,index)=><article className={styles.stageCard} key={step.title}><div className={styles.stageImage}><span>{`0${index+1}`}</span><b>STEP {`0${index+1}`}</b></div><div className={styles.stageCopy}><span>SHOPIFY DELIVERY</span><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.industries} aria-labelledby="engineering-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>CHANGE WITH CARE</span><h2 id="engineering-title">Improve the Store While Protecting Its Foundations</h2><p>A rebuild is a chance to improve the experience while planning for the content, customer journeys, and systems already supporting your business.</p><div className={styles.industryImage}><Image src="/site-assets/homepage/industry-ecommerce.webp" width={900} height={620} alt="Ecommerce storefront experience" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="Development considerations">{principles.map((item,index)=><article className={`${styles.industryItem} ${openPrinciple===index?styles.industryOpen:""}`} key={item.title}><h3><button type="button" aria-expanded={openPrinciple===index} onClick={()=>setOpenPrinciple(openPrinciple===index?-1:index)}><span>{item.title}</span><b aria-hidden="true">{openPrinciple===index?"−":"+"}</b></button></h3>{openPrinciple===index&&<p>{item.copy}</p>}</article>)}</div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>Shopify Development Connected to Your Business</h2><p>Your online store sits at the center of products, people, operations, and growth. We build with those connections in mind.</p></div>
      <div className={styles.whyGrid}>{[["Commerce context","Development choices shaped by your products, customers, and operations."],["Design + engineering","A connected team from storefront planning through implementation."],["Practical integrations","Technical decisions account for the tools your team already uses."],["Room to evolve","A maintainable foundation for the campaigns and features ahead."]].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="development-contact"><div><span>READY WHEN YOU ARE</span><h2>Ready to Build More With Shopify?</h2><p>Tell us what you're creating, improving, or connecting. We'll help you find a practical next step for your storefront.</p></div><ContactLink>Talk to Our Shopify Team</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">BUILD</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Shopify Website Development FAQs</h2><p>Learn more about building, updating, and supporting a Shopify storefront.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`development-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`development-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
