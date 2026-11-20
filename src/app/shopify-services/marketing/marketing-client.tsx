"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./shopify-marketing.module.css";
import OtherMarketingChannels from "../other-marketing-channels";

const marketingServices = [
  {id:"ppc",name:"PPC",copy:"We build paid acquisition campaigns around commercial intent, customer segments, products, markets, and growth goals, with a focus on what happens after the click, not just how cheaply we can get one."},
  {id:"search-visibility",name:"Search Visibility",copy:"We help brands build visibility across traditional search and emerging discovery surfaces, combining SEO with strategies for LLM visibility, GEO, AEO, and the changing ways customers find information and products online."},
  {id:"content-marketing",name:"Content Marketing",copy:"We build content strategies around the questions your customers ask, the problems they need solved, the products you sell, and the search opportunities that can bring the right people to your brand."},
  {id:"social-media-marketing",name:"Social Media Marketing",copy:"From strategy and content to distribution and engagement, we help ecommerce brands use social media to build awareness, create demand, strengthen their brand, and stay connected to their customers."},
];
const lifecycle = [
  {number:"01",name:"Acquire",copy:"Bring the right customers into your ecosystem through PPC, search visibility, content, and social media."},
  {number:"02",name:"Engage",copy:"Turn attention into interest through content, social experiences, email, and relevant customer journeys."},
  {number:"03",name:"Retain",copy:"Keep customers coming back through email, remarketing, and retention-focused campaigns."},
];
const commercePillars = [
  {number:"01",title:"Connect Marketing to the Commerce Layer",copy:"Align campaigns, storefront, customer data, integrations, UX, and conversion into one ecosystem."},
  {number:"02",title:"Look Beyond the Click",copy:"Focus on what happens after someone reaches your store and what brings them back."},
  {number:"03",title:"Think Across the Funnel",copy:"Connect acquisition, engagement, and retention into one customer journey."},
  {number:"04",title:"Build for the Business, Not Just the Channel",copy:"Let your products, customers, business model, margins, and growth goals determine where you invest."},
];
const faqs = [
  ["What ecommerce marketing services does Kodrise offer?", "We offer PPC, search visibility, content marketing, social media marketing, and email marketing for ecommerce brands."],
  ["What does Search Visibility include?", "Search Visibility is our broader approach to being discovered across search and emerging discovery platforms. It can include traditional SEO as well as LLM SEO, GEO, AEO, and other evolving search optimization strategies."],
  ["Do you offer PPC for Shopify stores?", "Yes. We help Shopify and ecommerce brands build paid acquisition campaigns around their products, customers, markets, and growth goals."],
  ["What does your content marketing service include?", "Our content marketing focuses on creating strategic content that builds visibility, answers customer questions, supports search, creates demand, and contributes to the broader customer journey."],
  ["Do you manage social media for ecommerce brands?", "Yes. We help brands develop their social strategy, content, distribution, and engagement around their broader business and growth objectives."],
  ["Can you manage multiple marketing channels together?", "Yes. Our approach is designed to connect channels rather than treat them as isolated activities. Depending on your requirements, we can combine acquisition, search visibility, content, social, and retention channels."],
  ["Do you work with Shopify and Shopify Plus brands?", "Yes. Our marketing services are designed to work alongside the broader commerce infrastructure we build and support for Shopify and Shopify Plus brands."],
] as const;

function ContactLink({children, service}: {children: React.ReactNode; service?: string}) {
  const href = service ? `/contact?service=${encodeURIComponent(service)}` : "/contact";
  return <Link href={href} className={styles.textLink}>{children}<span aria-hidden="true">{"\u2197"}</span></Link>;
}

export default function ShopifyMarketingPage() {
  const [openPillar, setOpenPillar] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="marketing-title">
      <Image className={styles.heroImage} src="/site-assets/shopify-marketing/hero-marketing-b.webp" alt="Ecommerce marketer reviewing campaign materials at a laptop" fill sizes="100vw" priority />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>SHOPIFY MARKETING</span>
          <h1 id="marketing-title">Commerce Marketing<span>Built to Drive Growth</span></h1>
          <p>We help ecommerce brands build demand, increase visibility, attract the right customers, and turn attention into revenue through paid acquisition, search visibility, content, and social media.</p>
          <ContactLink service="Shopify Marketing">Talk to Our Marketing Experts</ContactLink>
        </div>
      </div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Marketing</span></div></nav>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="marketing-overview">
      <div className={styles.sectionHead}><span className={styles.kicker}>ONE CONNECTED SYSTEM</span><h2>Our Core Marketing Services</h2><p>One customer. One journey. One connected marketing system.</p></div>
      <div className={styles.solutionGrid}>{marketingServices.map((service,index)=><article id={service.id} className={styles.solutionCard} key={service.id}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{service.name}</h3><p>{service.copy}</p><ContactLink service={service.name}>Discuss this service</ContactLink></article>)}</div>
    </section>

    <section className={styles.retention} id="email-marketing">
      <div className={styles.retentionHeading}><div><span className={styles.kicker}>MORE WAYS TO REACH & RETAIN</span><h2>Keep Customers Coming Back</h2></div><p>We also help brands turn attention into ongoing customer relationships through targeted retention and engagement channels.</p></div>
      <article className={styles.emailCard}><div className={styles.emailIcon} aria-hidden="true"><svg viewBox="0 0 64 64"><rect x="7" y="18" width="50" height="37" rx="3"/><path d="m9 21 23 18 23-18M20 18v-7h24v14"/></svg></div><div><span className={styles.cardIndex}>RETENTION MARKETING</span><h3>Email Marketing</h3><p>Turn your customer database into a growth channel with lifecycle campaigns, automations, promotions, and retention-focused email marketing.</p></div><ContactLink service="Email Marketing">Explore Email Marketing</ContactLink></article>
    </section>

    <section className={styles.capabilities} aria-labelledby="lifecycle-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>GROWTH THROUGH THE JOURNEY</span><h2 id="lifecycle-title">Marketing for the Entire Customer Lifecycle</h2><p>Your customer journey doesn’t start with a purchase, and it certainly doesn’t end there. We help you build marketing across the lifecycle, from discovery to repeat business.</p></div>
        <div className={styles.stageGrid}>{lifecycle.map((step,index)=><article className={styles.stageCard} key={step.number}><div className={styles.stageImage}><span>{step.number}</span><b>{step.number}</b></div><div className={styles.stageCopy}><span>CUSTOMER LIFECYCLE 0{index+1}</span><h3>{step.name}</h3><p>{step.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.industries} aria-labelledby="commerce-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>MARKETING + COMMERCE</span><h2 id="commerce-title">Marketing That Knows Where the Customer Goes Next</h2><p>If the marketing is strong but the commerce experience behind it isn’t, you lose people along the way. Because we work across both marketing and commerce infrastructure, we can connect the two seamlessly.</p><div className={styles.industryImage}><Image src="/site-assets/shopify-marketing/mkt-team-a.webp" width={896} height={672} alt="Marketing team reviewing a commerce campaign together" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="Connected marketing and commerce principles">{commercePillars.map((pillar,index)=><article className={`${styles.industryItem} ${openPillar===index?styles.industryOpen:""}`} key={pillar.number}><h3><button type="button" aria-expanded={openPillar===index} onClick={()=>setOpenPillar(openPillar===index?-1:index)}><span>{pillar.title}</span><b aria-hidden="true">{openPillar===index?"\u2212":"+"}</b></button></h3>{openPillar===index&&<p>{pillar.copy}</p>}</article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="marketing-contact"><div><span>READY WHEN YOU ARE</span><h2>Ready to Make Your Marketing Work Harder?</h2><p>You don’t need more marketing activity or bigger ad spend. You need a system that connects the right channels to the right business goals.</p></div><ContactLink service="Shopify Marketing">Talk to Our Marketing Experts</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">GROW</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions About Ecommerce Marketing</h2><p>Learn how connected marketing can support your Shopify store and broader commerce goals.</p><ContactLink service="Shopify Marketing">Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`marketing-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"\u2212":"+"}</b></button></h3>{openFaq===index&&<p id={`marketing-faq-${index}`}>{answer}</p>}</article>)}</div></section>

    <OtherMarketingChannels current="Shopify Marketing" />
  </main>;
}
