"use client";

import {useState} from "react";
import Image from "../shopify-assets";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const signals = [
  {name:"A custom brand experience",copy:"Your roadmap calls for interactions and presentation that are difficult to support in a theme."},
  {name:"Several front ends",copy:"You need to serve more than one storefront, market, or customer touchpoint from shared commerce data."},
  {name:"A dedicated content workflow",copy:"Your content team needs a structured publishing system that supports more than standard store pages."},
  {name:"A clear operating plan",copy:"Your team can support the engineering and maintenance needs that come with a custom storefront."},
];

const services = [
  {name:"Headless Strategy & Architecture",copy:"Assess whether a decoupled storefront fits your goals, then plan the framework, CMS, integrations, and delivery path."},
  {name:"Custom Storefront Development",copy:"Create a customer-facing experience connected to Shopify commerce through storefront APIs."},
  {name:"Headless CMS Integration",copy:"Connect a content system to the storefront with publishing workflows that work for your team."},
  {name:"Theme-to-Headless Migration",copy:"Plan a move from a Shopify theme while accounting for content, search, data, and connected apps."},
  {name:"Headless-to-Theme Migration",copy:"Simplify an architecture that no longer fits by planning a transition to a custom Shopify theme."},
  {name:"Commerce Integrations",copy:"Connect the storefront with product, search, personalization, and operational platforms."},
  {name:"Ongoing Support & Optimization",copy:"Maintain and improve the custom storefront with continued engineering and performance work."},
];

const comparisons = [
  {name:"Front-end flexibility",theme:"Work within the theme structure",headless:"Build a custom front end"},
  {name:"Performance",theme:"Strong when the theme and apps are optimized",headless:"More control over rendering and delivery"},
  {name:"Content workflow",theme:"Shopify's built-in content tools",headless:"A separate CMS can support richer publishing"},
  {name:"Multiple channels",theme:"Often centered on one storefront",headless:"Can serve multiple front ends from shared commerce"},
  {name:"Time and investment",theme:"Usually a more focused launch",headless:"More planning, build effort, and infrastructure"},
  {name:"App compatibility",theme:"Many theme apps work directly",headless:"Some features need API-based alternatives"},
  {name:"Ongoing ownership",theme:"Lower engineering overhead",headless:"Requires ongoing technical support"},
];

const risks = [
  {title:"Search performance changes during migration",copy:"Plan URL mappings, redirects, structured data, and rendering behavior as part of the architecture and launch."},
  {title:"Theme apps no longer fit",copy:"Review the current app stack early and identify API integrations or custom replacements where needed."},
  {title:"Content teams depend on developers",copy:"Choose a CMS and content model that lets the right people publish and manage storefront content."},
  {title:"Operating costs are underestimated",copy:"Include hosting, CMS licensing, monitoring, and ongoing development in the ownership plan."},
  {title:"No team owns the storefront after launch",copy:"Define responsibilities for maintenance, updates, and technical support before the project goes live."},
];

const stack = [
  {name:"Commerce",items:["Shopify","Shopify Plus","Storefront API"]},
  {name:"Front end",items:["Hydrogen","Next.js","React"]},
  {name:"Hosting",items:["Oxygen","Vercel","Cloud platforms"]},
  {name:"Content management",items:["Sanity","Contentful","Storyblok","Strapi"]},
  {name:"Search and discovery",items:["Algolia","Shopify Search","Custom services"]},
];

const process = [
  {title:"Assess the fit",copy:"Review your business model, current storefront, content needs, team, and roadmap."},
  {title:"Plan the architecture",copy:"Define the front end, CMS, integrations, hosting, data flows, and key technical decisions."},
  {title:"Design and build",copy:"Shape customer journeys and develop the custom storefront connected to Shopify."},
  {title:"Migrate and launch",copy:"Prepare content, URLs, integrations, and release steps for a considered transition."},
  {title:"Support and evolve",copy:"Monitor the experience and continue improving the storefront as needs change."},
];

const faqs = [
  ["What is headless commerce?", "Headless commerce separates the customer-facing storefront from the commerce platform. The two connect through APIs, so a custom front end can use Shopify for commerce operations."],
  ["Is headless Shopify right for every business?", "No. It can suit brands with specific experience, content, or multi-channel requirements. A well-built Shopify theme may be a simpler fit when it meets your needs."],
  ["Does a headless Shopify store still use Shopify checkout?", "Shopify can continue to handle checkout while a custom front end manages product discovery and the shopping experience."],
  ["Does headless cost more than a Shopify theme?", "Headless projects often require more upfront engineering and add platform costs such as hosting or CMS licensing. The total depends on scope and ongoing ownership needs."],
  ["Can headless affect search visibility?", "It can if rendering, URLs, metadata, and redirects are not planned carefully. Search requirements should be part of architecture and migration planning."],
  ["Will our Shopify apps work with a headless storefront?", "Some apps can continue through APIs or embedded experiences, while others may need alternatives. Review the current app stack before selecting an architecture."],
  ["What is Shopify Hydrogen?", "Hydrogen is Shopify's framework for building custom storefronts. It can be considered alongside other front-end frameworks based on your project requirements."],
  ["Which CMS should we use?", "The right CMS depends on content structure, publishing needs, integrations, team comfort, and cost. We can assess options against how your team works."],
  ["Can you migrate an existing Shopify theme to headless?", "Yes. A migration can include storefront development, content planning, integrations, and a release plan for search and customer continuity."],
  ["Can we move from headless back to a theme?", "Yes. If the custom architecture is more complex than your business needs, a transition to a Shopify theme can be planned around content, functionality, and search."],
  ["How long does a headless build take?", "Timing depends on the storefront scope, content model, integrations, and migration needs. Discovery helps establish a realistic delivery plan."],
  ["Do you support headless stores after launch?", "Ongoing work can cover maintenance, monitoring, new features, integration changes, and performance improvements."],
] as const;

function ContactLink({children}:{children:React.ReactNode}) {
  return <Link href="/contact?service=Headless%20Commerce" className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function HeadlessCommercePage() {
  const [openSignal,setOpenSignal]=useState(0);
  const [openRisk,setOpenRisk]=useState(0);
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="headless-title">
      <Image className={styles.heroImage} src="/site-assets/shopify-marketing/hero-marketing-b.webp" alt="Ecommerce team planning a custom commerce experience" fill sizes="100vw" preload />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>SHOPIFY HEADLESS COMMERCE</span>
        <h1 id="headless-title">Custom Storefronts<span>Connected to Shopify Commerce</span></h1>
        <p>Explore a flexible storefront architecture while keeping Shopify at the center of products, inventory, customers, and checkout.</p>
        <ContactLink>Talk Through Your Architecture</ContactLink>
      </div></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Headless Commerce</span></div></nav>

    <section className={styles.industries} id="headless-overview" aria-labelledby="headless-overview-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>WHEN A THEME ISN'T ENOUGH</span><h2 id="headless-overview-title">Give Your Storefront More Room to Move</h2><p>Headless commerce separates the customer-facing experience from the commerce engine. Shopify can continue to manage commerce while a custom front end supports your brand, content, and channels.</p><div className={styles.industryImage}><Image src="/site-assets/homepage/industry-ecommerce.webp" width={900} height={620} alt="Ecommerce storefront experience" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="Headless commerce fit indicators">{signals.map((item,index)=><article className={`${styles.industryItem} ${openSignal===index?styles.industryOpen:""}`} key={item.name}><h3><button type="button" aria-expanded={openSignal===index} onClick={()=>setOpenSignal(openSignal===index?-1:index)}><span>{item.name}</span><b aria-hidden="true">{openSignal===index?"−":"+"}</b></button></h3>{openSignal===index&&<p>{item.copy}</p>}</article>)}</div>
    </section>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="headless-services">
      <div className={styles.sectionHead}><span className={styles.kicker}>FROM ARCHITECTURE TO SUPPORT</span><h2>Headless Commerce Services for the Full Journey</h2><p>Plan the architecture, build the storefront, connect systems, and support the experience after launch.</p></div>
      <div className={styles.solutionGrid}>{services.map((item,index)=><article className={styles.solutionCard} key={item.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={styles.technology} id="theme-vs-headless">
      <div className={styles.sectionHead}><span className={styles.kicker}>MAKE AN INFORMED ARCHITECTURE CHOICE</span><h2>Shopify Theme or Headless Shopify?</h2><p>Both approaches use Shopify. The right choice depends on how much front-end control you need and what your team can support over time.</p></div>
      <div className={styles.techGroups}>{comparisons.map((item,index)=><article className={styles.techGroup} key={item.name}><h3><span>0{index+1}</span>{item.name}</h3><div><span>Theme: {item.theme}</span><span>Headless: {item.headless}</span></div></article>)}</div>
    </section>

    <section className={`${styles.capabilities} ${styles.charcoalCards}`} aria-labelledby="headless-process-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>A STRUCTURED PATH TO HEADLESS</span><h2 id="headless-process-title">From “Should We?” to a Storefront That Keeps Improving</h2><p>Make architecture, migration, and ownership decisions before the storefront is live.</p></div>
        <div className={styles.stageGrid}>{process.map((step,index)=><article className={styles.stageCard} key={step.title}><div className={styles.stageImage}><span>0{index+1}</span><b>DELIVERY STEP</b></div><div className={styles.stageCopy}><span>HEADLESS DELIVERY</span><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.industries} id="headless-risk-planning" aria-labelledby="headless-risk-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>ENGINEER THE DETAILS EARLY</span><h2 id="headless-risk-title">Plan for the Parts That Can Go Wrong</h2><p>Headless projects depend on decisions about rendering, integrations, content, and ongoing ownership. Surface those dependencies before the build is underway.</p><div className={styles.industryImage}><Image src="/site-assets/shopify-marketing/mkt-team-a.webp" width={896} height={672} alt="Team collaborating on a digital commerce project" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="Headless project risks and planning">{risks.map((item,index)=><article className={`${styles.industryItem} ${openRisk===index?styles.industryOpen:""}`} key={item.title}><h3><button type="button" aria-expanded={openRisk===index} onClick={()=>setOpenRisk(openRisk===index?-1:index)}><span>{item.title}</span><b aria-hidden="true">{openRisk===index?"−":"+"}</b></button></h3>{openRisk===index&&<p>{item.copy}</p>}</article>)}</div>
    </section>

    <section className={styles.retention} id="headless-stack">
      <div className={styles.retentionHeading}><div><span className={styles.kicker}>CHOOSE TO FIT THE REQUIREMENT</span><h2>Build on a Stack That Fits Your Team</h2></div><p>Start with your project needs and content workflow, then choose commerce, front-end, hosting, and search tools accordingly.</p></div>
      <div className={styles.techGroups}>{stack.map((group,index)=><article className={styles.techGroup} key={group.name}><h3><span>0{index+1}</span>{group.name}</h3><div>{group.items.map((item)=><span key={item}>{item}</span>)}</div></article>)}</div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>Architecture Built Around the Business Case</h2><p>A custom front end is only one part of the decision. Plan the commerce platform, integrations, content team, and ongoing ownership together.</p></div>
      <div className={styles.whyGrid}>{[["Shopify commerce depth","Keep product, customer, and checkout needs connected to the storefront."],["Architecture planning","Compare options against the actual experience and operating requirements."],["Integration experience","Include the business systems and content workflows the store depends on."],["Ongoing ownership","Plan how your team will support and evolve the experience after launch."]].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.caseStudies}>
      <div className={styles.caseHead}><div><span className={styles.kicker}>CONNECTED DIGITAL EXPERIENCES</span><h2>Build the Experience Around Your Customers</h2></div><p>Bring storefront, content, and commerce engineering together to create a connected digital experience for the channels you serve.</p></div>
      <div className={styles.caseGrid}>{[["Commerce experiences","/site-assets/homepage/industry-ecommerce.webp","Ecommerce experience"],["Content-rich platforms","/site-assets/services-web.webp","Web platform"],["Connected mobile journeys","/site-assets/services-mobile.webp","Mobile experience"]].map(([title,src,alt],index)=><article className={styles.caseCard} key={title}><div className={styles.caseImage}><Image src={src} alt={alt} width={720} height={480} sizes="(max-width: 700px) 100vw, 33vw"/></div><div className={styles.caseCopy}><span>KODRISE CAPABILITY</span><h3>{title}</h3><p>Plan the digital experience and the technology behind it as one connected system.</p><Link href="/our-work">Explore our work <b aria-hidden="true">↗</b></Link></div></article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="headless-contact"><div><span>READY WHEN YOU ARE</span><h2>Thinking About Going Headless?</h2><p>Tell us what your storefront needs to do and where your current setup is getting in the way. We'll help you assess the right next step.</p></div><ContactLink>Talk to a Headless Commerce Expert</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">API</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Headless Shopify FAQs</h2><p>Understand the architecture, trade-offs, and ongoing needs before deciding whether headless fits your store.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`headless-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`headless-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
