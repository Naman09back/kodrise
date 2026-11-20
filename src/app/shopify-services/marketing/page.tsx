import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./shopify-marketing.module.css";

export const metadata: Metadata = {
  title: "Shopify Marketing Services",
  description: "Grow your Shopify store with connected paid acquisition, search visibility, content, social, and retention marketing.",
  alternates: {canonical: "/shopify-services/marketing"},
};

const marketingServices = [
  {
    id: "ppc",
    name: "PPC",
    copy: "We build paid acquisition campaigns around commercial intent, customer segments, products, markets, and growth goals, with a focus on what happens after the click, not just how cheaply we can get one.",
  },
  {
    id: "search-visibility",
    name: "Search Visibility",
    copy: "We help brands build visibility across traditional search and emerging discovery surfaces, combining SEO with strategies for LLM visibility, GEO, AEO, and the changing ways customers find information and products online.",
  },
  {
    id: "content-marketing",
    name: "Content Marketing",
    copy: "We build content strategies around the questions your customers ask, the problems they need solved, the products you sell, and the search opportunities that can bring the right people to your brand.",
  },
  {
    id: "social-media-marketing",
    name: "Social Media Marketing",
    copy: "From strategy and content to distribution and engagement, we help ecommerce brands use social media to build awareness, create demand, strengthen their brand, and stay connected to their customers.",
  },
];

const lifecycle = [
  {number: "01", name: "Acquire", copy: "Bring the right customers into your ecosystem through PPC, search visibility, content, and social media."},
  {number: "02", name: "Engage", copy: "Turn attention into interest through content, social experiences, email, and relevant customer journeys."},
  {number: "03", name: "Retain", copy: "Keep customers coming back through email, remarketing, and retention-focused campaigns."},
];

const commercePillars = [
  {number: "01", title: "Connect Marketing to the Commerce Layer", copy: "Align campaigns, storefront, customer data, integrations, UX, and conversion into one ecosystem."},
  {number: "02", title: "Look Beyond the Click", copy: "Focus on what happens after someone reaches your store and what brings them back."},
  {number: "03", title: "Think Across the Funnel", copy: "Connect acquisition, engagement, and retention into one customer journey."},
  {number: "04", title: "Build for the Business, Not Just the Channel", copy: "Let your products, customers, business model, margins, and growth goals determine where you invest."},
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
  return <Link href={href} className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function ShopifyMarketingPage() {
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="marketing-title">
      <Image className={styles.heroImage} src="/site-assets/shopify-marketing/hero-marketing-b.webp" alt="Ecommerce marketer reviewing campaign materials at a laptop" fill sizes="100vw" preload />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroTop}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Marketing</span></nav><Link href="/contact" className={styles.expertCard}><strong>Talk to a Kodrise expert</strong><span>Tell us about your project</span><b aria-hidden="true">↗</b></Link></div>
      <div className={styles.heroCopy}>
        <span className={styles.kicker}>SHOPIFY MARKETING</span>
        <h1 id="marketing-title">Commerce Marketing<br /><span>Built to Drive Growth</span></h1>
        <p>We help ecommerce brands build demand, increase visibility, attract the right customers, and turn attention into revenue through paid acquisition, search visibility, content, and social media.</p>
      </div>
      <ContactLink service="Shopify Marketing">Talk to Our Marketing Experts</ContactLink>
      <a className={styles.scrollCue} href="#marketing-overview" aria-label="Scroll to marketing overview"><span /></a>
    </section>

    <section className={styles.intro} id="marketing-overview">
      <h2>Marketing Should Do More<br />Than Fill Your Calendar</h2>
      <div><p>More traffic doesn’t automatically mean more growth. More content doesn’t either.</p><p>Your marketing needs to connect back to the business — bringing in the right audience, building demand, creating reasons to buy, and keeping customers engaged after they do.</p><p>That’s why we look at marketing as part of your broader commerce operation, not a collection of disconnected channels.</p></div>
    </section>

    <section className={styles.services} aria-labelledby="core-services-title">
      <div className={styles.sectionRail}><span>WHAT WE DO</span><span>01 / 05</span></div>
      <div className={styles.servicesMain}>
        <header className={styles.sectionHeading}><span className={styles.kicker}>ONE CONNECTED SYSTEM</span><h2 id="core-services-title">Our Core Marketing Services</h2><p>One customer. One journey. One connected marketing system.</p></header>
        <div className={styles.serviceGrid}>
          <div className={styles.teamPhoto}><Image src="/site-assets/shopify-marketing/mkt-team-a.webp" width={896} height={672} alt="Marketing team reviewing a commerce campaign together" sizes="(max-width: 760px) 100vw, 32vw" /></div>
          <div className={styles.serviceList}>{marketingServices.map((service, index) => <article id={service.id} className={styles.serviceRow} key={service.id}><span className={styles.serviceNumber}>0{index + 1}</span><h3>{service.name}</h3><p>{service.copy}</p><ContactLink service={service.name}>Discuss this service</ContactLink></article>)}</div>
        </div>
      </div>
    </section>

    <section className={styles.retention} id="email-marketing" aria-labelledby="retention-title">
      <div className={styles.retentionHeading}><h2 id="retention-title">More Ways to Reach &amp; Retain Your Customers</h2><p>We also help brands turn attention into ongoing customer relationships through targeted retention and engagement channels.</p></div>
      <article className={styles.emailCard}>
        <div className={styles.emailIcon} aria-hidden="true"><svg viewBox="0 0 64 64"><rect x="7" y="18" width="50" height="37" rx="3"/><path d="m9 21 23 18 23-18M20 18v-7h24v14"/></svg></div>
        <div><span className={styles.cardIndex}>01 / RETAIN</span><h3>Email Marketing</h3><p>Turn your customer database into a growth channel with lifecycle campaigns, automations, promotions, and retention-focused email marketing.</p></div>
        <ContactLink service="Email Marketing">Explore Email Marketing</ContactLink>
      </article>
    </section>

    <section className={styles.lifecycle} aria-labelledby="lifecycle-title">
      <div className={styles.lifecycleCopy}><span className={styles.kicker}>GROWTH THROUGH THE JOURNEY</span><h2 id="lifecycle-title">Marketing for the Entire Customer Lifecycle</h2><p>Your customer journey doesn’t start with a purchase, and it certainly doesn’t end there.</p><p>We help you build marketing across the entire lifecycle, from getting the right people to discover your brand to giving them reasons to engage, buy, return, and stay.</p><ContactLink service="Customer lifecycle marketing">Plan your customer journey</ContactLink></div>
      <div className={styles.lifecycleVisual} aria-label="Three stages of the customer lifecycle">
        <div className={styles.lifecycleRing} aria-hidden="true" />
        {lifecycle.map((step, index) => <article className={`${styles.lifecycleStep} ${styles[`lifecycleStep${index + 1}`]}`} key={step.number}><span>{step.name}</span><b>{step.number}</b><p>{step.copy}</p></article>)}
        <span className={styles.lifecycleOrbit} aria-hidden="true">↻</span>
      </div>
    </section>

    <section className={styles.commerce} aria-labelledby="commerce-title">
      <div className={styles.commerceIntro}><span className={styles.kicker}>MARKETING + COMMERCE</span><h2 id="commerce-title">Marketing That Knows Where the Customer Goes Next</h2><p>If the marketing is strong but the commerce experience behind it isn’t, you lose people along the way.</p><p>Because we work across both marketing and commerce infrastructure, we can connect the two seamlessly.</p></div>
      <div className={styles.pillarStack} aria-hidden="true"><span>DATA</span><span>EXPERIENCE</span><span>COMMERCE</span><span>GROWTH</span></div>
      <div className={styles.pillarList}>{commercePillars.map((pillar) => <article className={styles.pillar} key={pillar.number}><span>{pillar.number}</span><div><h3>{pillar.title}</h3><p>{pillar.copy}</p></div></article>)}</div>
    </section>

    <section className={styles.ctaBand} id="marketing-contact">
      <span className={styles.kicker}>READY WHEN YOU ARE</span><h2>Ready to Make Your<br /><em>Marketing Work Harder?</em></h2><p>You don’t need more marketing activity or bigger ad spend. You need a system that connects the right channels to the right business goals.</p><ContactLink service="Shopify Marketing">Talk to Our Marketing Experts</ContactLink>
    </section>

    <section className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.faqSide}><span className={styles.kicker}>GOOD QUESTIONS</span><h2 id="faq-title">Frequently Asked Questions About Ecommerce Marketing</h2><Link href="/contact" className={styles.faqContact}><Image src="/site-assets/shopify-marketing/mkt-team-a.webp" width={560} height={420} alt="Kodrise marketing team at work" sizes="(max-width: 760px) 100vw, 28vw" /><span>Still wondering?<strong>Talk to a Kodrise expert <b aria-hidden="true">↗</b></strong></span></Link></div>
      <div className={styles.faqList}>{faqs.map(([question, answer]) => <details className={styles.faqItem} key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
    </section>
  </main>;
}
