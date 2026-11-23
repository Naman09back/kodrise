"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const readinessGaps = [
  {title:"Product information is incomplete",copy:"Titles, descriptions, variants, attributes, and categories may not give AI systems enough context to match products to shopper needs."},
  {title:"Policies and brand answers are hard to find",copy:"Shipping, returns, warranties, and product guidance should be clear and consistent wherever customers look."},
  {title:"Store features may not fit every channel",copy:"Subscriptions, bundles, custom checkout behavior, and apps can have different support across commerce surfaces."},
  {title:"Prices and inventory need coordination",copy:"Connected systems should provide dependable product availability and pricing information."},
  {title:"Content needs structure and context",copy:"Clear page structure and accurate product information help systems interpret and present your brand."},
  {title:"Measurement needs a plan",copy:"Define how you'll monitor discovery, referral traffic, customer activity, and commerce outcomes."},
];

const services = [
  {name:"AI Commerce Readiness Review",copy:"Review product data, policies, store setup, integrations, and channel requirements to identify useful next steps."},
  {name:"Storefront and Channel Setup",copy:"Prepare store information and commerce settings for relevant AI-assisted shopping experiences."},
  {name:"Product Data Improvement",copy:"Improve product titles, descriptions, attributes, and structured data to make catalog information clearer."},
  {name:"Brand Knowledge and Policies",copy:"Organize answers about products, delivery, returns, and brand policies for consistent customer information."},
  {name:"Commerce System Integration",copy:"Coordinate catalog, pricing, inventory, and order data across the systems that support your operation."},
  {name:"AI Discovery and Content",copy:"Improve how useful product and brand information is structured for search and AI-mediated discovery."},
  {name:"Custom Shopping Experiences",copy:"Explore AI-enabled shopping assistance connected to relevant product and service information."},
  {name:"Measurement and Iteration",copy:"Define useful signals to monitor and improve the experience as AI shopping channels evolve."},
];

const routes = [
  {name:"Already selling on Shopify",items:["Review store and channel eligibility","Improve catalog and policy information","Check checkout and app compatibility","Align existing system connections"]},
  {name:"Selling on another platform",items:["Assess available selling options","Review catalog and content readiness","Plan product and system connections","Keep current operations in view"]},
];

const delivery = [
  {title:"Assess",copy:"Review your catalog, policies, store setup, integrations, and current discovery experience."},
  {title:"Prepare",copy:"Prioritize product information, brand answers, and the technical changes that matter first."},
  {title:"Connect",copy:"Coordinate inventory, pricing, and order processes across the systems involved."},
  {title:"Enable",copy:"Configure the agreed commerce experiences and validate key customer and operational flows."},
  {title:"Measure and improve",copy:"Review channel activity and continue refining the catalog and customer experience."},
];

const faqs = [
  ["What is agentic commerce?", "Agentic commerce describes shopping experiences where AI systems help people discover, compare, and sometimes purchase products. The exact capabilities vary across platforms and continue to change."],
  ["How can a Shopify store prepare for AI shopping?", "Start with accurate product information, clear policies, reliable pricing and inventory, compatible checkout experiences, and a way to measure customer activity."],
  ["Does being on Shopify automatically make a store ready?", "No. Platform setup is only one part of readiness. Product data, store configuration, integrations, content, and channel-specific requirements also matter."],
  ["Can a brand on another platform participate?", "Options depend on the channels available, your commerce setup, and how products and orders can be connected. We can assess those requirements before recommending an approach."],
  ["Can AI systems provide accurate answers about our brand?", "Clear, structured product details and up-to-date policies can help systems present more useful information, although the final experience depends on each channel."],
  ["Will subscriptions, bundles, and custom checkout work in AI channels?", "Support varies. Review your apps and checkout customizations against the channels you want to use, then plan alternatives for any gaps."],
  ["How does AI commerce relate to SEO?", "Both benefit from useful content, clear product information, and sound technical foundations. AI discovery adds additional channel requirements to consider."],
  ["How do we measure AI-driven commerce?", "Measurement may combine available channel reporting, referral traffic, product engagement, and order data. Tracking options vary by channel."],
  ["How long does readiness work take?", "Timing depends on catalog quality, store configuration, integrations, and the channels involved. An initial review can help define a practical roadmap."],
] as const;

function ContactLink({children}:{children:React.ReactNode}) {
  return <Link href="/contact?service=AI%20Agentic%20Commerce" className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function AgenticCommercePage() {
  const [openGap,setOpenGap]=useState(0);
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="agentic-commerce-title">
      <Image className={styles.heroImage} src="/site-assets/services-ai.webp" alt="Abstract AI-inspired visual for digital commerce" fill sizes="100vw" priority />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>AI & AGENTIC COMMERCE</span>
        <h1 id="agentic-commerce-title">Prepare Your Store for AI Shopping<span>Make Your Commerce Data Ready</span></h1>
        <p>Help AI-assisted shopping experiences understand your products, policies, and availability with a commerce foundation built on clear data and connected systems.</p>
        <ContactLink>Talk to Our Commerce Team</ContactLink>
      </div></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">AI &amp; Agentic Commerce</span></div></nav>

    <section className={styles.industries} id="agentic-commerce-overview" aria-labelledby="agentic-overview-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>SHOPPING IS EXPANDING INTO AI</span><h2 id="agentic-overview-title">Make Your Store Easier for AI Experiences to Understand</h2><p>As customers explore products through AI-assisted tools, your catalog and brand information need to be clear, consistent, and connected to the systems that keep commerce accurate.</p><div className={styles.industryImage}><Image src="/site-assets/homepage/industry-ecommerce.webp" width={900} height={620} alt="Ecommerce catalog and customer experience" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="Common AI commerce readiness gaps">{readinessGaps.map((item,index)=><article className={`${styles.industryItem} ${openGap===index?styles.industryOpen:""}`} key={item.title}><h3><button type="button" aria-expanded={openGap===index} onClick={()=>setOpenGap(openGap===index?-1:index)}><span>{item.title}</span><b aria-hidden="true">{openGap===index?"−":"+"}</b></button></h3>{openGap===index&&<p>{item.copy}</p>}</article>)}</div>
    </section>

    <section className={styles.retention} id="agentic-commerce-routes">
      <div className={styles.retentionHeading}><div><span className={styles.kicker}>TWO ROUTES INTO AI CHANNELS</span><h2>Start From the Commerce Setup You Have</h2></div><p>Whether you're already on Shopify or using another platform, map your catalog, systems, and channel requirements before choosing an implementation path.</p></div>
      <div className={styles.techGroups}>{routes.map((route,index)=><article className={styles.techGroup} key={route.name}><h3><span>0{index+1}</span>{route.name}</h3><div>{route.items.map((item)=><span key={item}>{item}</span>)}</div></article>)}</div>
    </section>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="agentic-commerce-services">
      <div className={styles.sectionHead}><span className={styles.kicker}>FROM READINESS TO IMPROVEMENT</span><h2>Commerce Services for AI-Assisted Shopping</h2><p>Connect product information, store configuration, system integrations, and ongoing measurement.</p></div>
      <div className={styles.solutionGrid}>{services.map((item,index)=><article className={styles.solutionCard} key={item.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={styles.capabilities} aria-labelledby="agentic-process-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>A STAGED APPROACH</span><h2 id="agentic-process-title">From Technical Readiness to Ongoing Learning</h2><p>Build a useful foundation first, then refine the experience as channels and customer behavior develop.</p></div>
        <div className={styles.stageGrid}>{delivery.map((step,index)=><article className={styles.stageCard} key={step.title}><div className={styles.stageImage}><span>0{index+1}</span><b>COMMERCE READINESS</b></div><div className={styles.stageCopy}><span>DELIVERY STEP</span><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>Connect AI Discovery to the Commerce Infrastructure Behind It</h2><p>Prepare the catalog and customer information while keeping store operations, integrations, and checkout requirements in view.</p></div>
      <div className={styles.whyGrid}>{[["Commerce-aware planning","Consider catalog structure, store configuration, and buyer journeys together."],["Product data and content","Improve the information systems use to understand products and brand policies."],["Integration experience","Keep pricing, inventory, and order flows aligned across connected platforms."],["Ongoing optimization","Review what is working and adapt as channel capabilities continue to change."]].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="agentic-commerce-contact"><div><span>READY WHEN YOU ARE</span><h2>Find Out What Your Store Needs for AI Commerce</h2><p>Tell us about your catalog, current platform, and commerce systems. We'll help identify where to start.</p></div><ContactLink>Discuss Your Readiness</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">AI</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>AI &amp; Agentic Commerce FAQs</h2><p>Understand the foundations, technical requirements, and ways to measure AI-assisted commerce.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`agentic-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`agentic-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
