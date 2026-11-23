"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const startingPoints = [
  {name:"Taking wholesale online",copy:"Move phone, email, and spreadsheet orders toward a buyer experience customers can use on their own."},
  {name:"Replatforming B2B",copy:"Bring customers, catalogs, pricing, and order workflows into a Shopify commerce foundation."},
  {name:"Adding B2B to DTC",copy:"Give wholesale buyers their own account experience while coordinating with your direct-to-consumer store."},
];

const challenges = [
  {name:"Account-specific catalogs",copy:"Buyers may need their own assortment, contract prices, and purchasing terms."},
  {name:"Ordering controls",copy:"Minimums, increments, case packs, approvals, and purchase orders shape the order flow."},
  {name:"Connected business data",copy:"Catalog, pricing, customer, inventory, and order data may live across several systems."},
  {name:"Sales team workflows",copy:"Representatives may need to manage accounts and place orders with buyers."},
  {name:"Large repeat orders",copy:"Wholesale buyers need efficient ways to search, reorder, and purchase many line items."},
  {name:"Tax and compliance",copy:"Exemptions, invoicing, and regional rules can vary by buyer and market."},
];

const platformFeatures = [
  {name:"Company accounts",copy:"Organize buyers, locations, permissions, and account relationships."},
  {name:"Custom catalogs and pricing",copy:"Present assortments and price structures that reflect customer agreements."},
  {name:"Quantity rules",copy:"Support purchasing requirements such as minimum quantities and pack sizes."},
  {name:"Payment terms",copy:"Configure payment options around the policies your business supports."},
  {name:"Sales representative workflows",copy:"Give sales teams a clear way to support their assigned accounts."},
  {name:"Self-serve buyer portal",copy:"Help buyers manage accounts, view orders, and return to products they need."},
  {name:"Bulk ordering",copy:"Make it easier to build large orders across products and variants."},
  {name:"Tax settings",copy:"Configure tax handling to fit your customers and target markets."},
];

const models = [
  {name:"Combined DTC + B2B",items:["Wholesale buyers use your existing store","A shared storefront with account-based experiences","One central store to manage","Can suit shared products and lean teams"]},
  {name:"Dedicated B2B store",items:["A separate storefront for wholesale buyers","Experience tailored to business purchasing","Separate merchandising to maintain","Can suit distinct B2B and DTC operations"]},
];

const b2bServices = [
  {name:"B2B Strategy & Architecture",copy:"Define your store model, account structure, pricing, integrations, and rollout approach."},
  {name:"Shopify B2B Implementation",copy:"Configure companies, catalogs, price lists, terms, quantity rules, and buyer workflows."},
  {name:"B2B Replatforming",copy:"Plan how customers, catalogs, pricing, and order information move to Shopify."},
  {name:"ERP & Systems Integration",copy:"Connect Shopify with ERP, PIM, CRM, and accounting systems around agreed data ownership."},
  {name:"Checkout & Approval Workflows",copy:"Shape purchasing steps around quotes, purchase orders, approvals, and account policies."},
  {name:"B2B Storefront & Portal Design",copy:"Design buyer journeys for search, bulk ordering, repeat purchases, and account management."},
  {name:"Headless B2B Experiences",copy:"Explore custom buyer portals and product experiences for complex requirements."},
  {name:"Ongoing B2B Support",copy:"Support new buyer onboarding, catalog changes, pricing updates, and integration improvements."},
];

const risks = [
  {title:"Pricing rules don't reflect real agreements",copy:"Document customer-specific prices, discounts, volume breaks, and terms before configuration begins."},
  {title:"Business data drifts between systems",copy:"Decide which system owns each data type and define sync behavior, exceptions, and monitoring."},
  {title:"Buyers are disrupted during launch",copy:"Plan staged releases and clear fallback steps around customer groups and order cycles."},
  {title:"Sales teams lose visibility",copy:"Include representative needs and account workflows in the solution design."},
  {title:"Buyers don't adopt the new portal",copy:"Review the experience with customers and plan onboarding before broad rollout."},
  {title:"Search visibility changes unexpectedly",copy:"Plan redirects, URLs, and page metadata as part of a replatforming or storefront redesign."},
];

const systems = [
  {name:"ERP",items:["Products","Pricing","Inventory","Orders"]},
  {name:"PIM",items:["Product data","Attributes","Media"]},
  {name:"CRM",items:["Companies","Contacts","Sales accounts"]},
  {name:"Accounting & fulfillment",items:["Invoices","Tax","Shipping"]},
];

const process = [
  {title:"Discover operations",copy:"Talk with sales, operations, finance, and technical stakeholders about current workflows."},
  {title:"Map pricing and accounts",copy:"Translate customer relationships, price structures, catalogs, and terms into a clear model."},
  {title:"Plan system connections",copy:"Review existing platforms and define ownership and data movement between systems."},
  {title:"Design and implement",copy:"Build the storefront and workflows around buyer and internal team needs."},
  {title:"Validate with users",copy:"Review critical tasks and account scenarios with representative users before launch."},
  {title:"Roll out and improve",copy:"Coordinate release, onboarding, and follow-up improvements based on adoption."},
];

const faqs = [
  ["What is Shopify B2B?", "Shopify B2B provides wholesale commerce capabilities such as company accounts, customer-specific catalogs and pricing, payment terms, quantity rules, and buyer account features."],
  ["Do I need Shopify Plus for B2B?", "Shopify's native B2B capabilities are available with Shopify Plus. The right plan and implementation approach depend on your requirements."],
  ["Can I run B2B and DTC in one Shopify store?", "Yes. You can combine channels in one store or use separate storefronts. The right model depends on catalog overlap, buyer needs, operations, and how your team wants to manage the experience."],
  ["Can buyers see different pricing?", "Shopify B2B supports customer-specific catalogs and pricing structures. We can help map your current price logic into an appropriate setup."],
  ["Can Shopify connect to our ERP?", "Shopify can connect with ERP and other business systems through native connectors, custom integrations, or middleware, depending on how your operation works."],
  ["Can you migrate our current wholesale store?", "We can plan a migration for customer accounts, catalogs, pricing, orders, and integrations based on your source platform and data structure."],
  ["Can sales representatives place orders for customers?", "Sales-assisted ordering can be part of the solution. We would first map roles, account access, and the process your sales team follows."],
  ["Can B2B orders use approvals or purchase orders?", "These workflows may be supported through Shopify configuration and custom implementation, depending on your checkout and account requirements."],
  ["How long does a B2B implementation take?", "Timing depends on account and pricing complexity, integrations, migration scope, and buyer workflows. Discovery helps establish a realistic plan."],
  ["Do you support the store after launch?", "Yes. Ongoing work can include onboarding support, catalog and pricing changes, integration care, and continued experience improvements."],
] as const;

function ContactLink({children}:{children:React.ReactNode}) {
  return <Link href="/contact?service=Shopify%20B2B" className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function B2BEcommercePage() {
  const [openRisk,setOpenRisk]=useState(0);
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="b2b-title">
      <Image className={styles.heroImage} src="/site-assets/shopify-marketing/hero-marketing-b.webp" alt="Ecommerce team planning a business commerce experience" fill sizes="100vw" priority />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>SHOPIFY B2B ECOMMERCE</span>
        <h1 id="b2b-title">Wholesale Commerce<span>Built Around Your Business</span></h1>
        <p>Bring buyer accounts, pricing, ordering, and business systems together in a Shopify B2B experience shaped around how your team sells.</p>
        <ContactLink>Talk to Our Shopify Team</ContactLink>
      </div></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">B2B Ecommerce Solutions</span></div></nav>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="b2b-starting-points">
      <div className={styles.sectionHead}><span className={styles.kicker}>WHEREVER YOUR B2B BUSINESS STARTS</span><h2>Build on the Way Your Wholesale Business Works</h2><p>Start with a new digital channel, bring an existing store forward, or connect wholesale with your DTC business.</p></div>
      <div className={styles.solutionGrid}>{startingPoints.map((item,index)=><article className={styles.solutionCard} key={item.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={styles.technology} id="b2b-complexity">
      <div className={styles.sectionHead}><span className={styles.kicker}>PLAN FOR WHOLESALE REALITIES</span><h2>B2B Complexity Needs More Than a Storefront</h2><p>Build the experience around the different rules, systems, and relationships behind each order.</p></div>
      <div className={styles.techGroups}>{challenges.map((item,index)=><article className={styles.techGroup} key={item.name}><h3><span>0{index+1}</span>{item.name}</h3><div><span>{item.copy}</span></div></article>)}</div>
    </section>

    <section className={`${styles.capabilities} ${styles.charcoalCards}`} aria-labelledby="native-b2b-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>SHOPIFY B2B CAPABILITIES</span><h2 id="native-b2b-title">Connect the Buyer Experience to Your Commerce Setup</h2><p>Use the right combination of Shopify capabilities and custom workflows for how your wholesale business operates.</p></div>
        <div className={styles.stageGrid}>{platformFeatures.map((item,index)=><article className={styles.stageCard} key={item.name}><div className={styles.stageImage}><span>0{index+1}</span><b>B2B CAPABILITY</b></div><div className={styles.stageCopy}><span>SHOPIFY WHOLESALE</span><h3>{item.name}</h3><p>{item.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.retention} id="store-models">
      <div className={styles.retentionHeading}><div><span className={styles.kicker}>THE FIRST ARCHITECTURE DECISION</span><h2>Combined DTC + B2B or a Dedicated Store?</h2></div><p>Both models can work. Choose based on buyer experience, catalog overlap, operations, and how your team wants to manage the storefront.</p></div>
      <div className={styles.techGroups}>{models.map((model,index)=><article className={styles.techGroup} key={model.name}><h3><span>0{index+1}</span>{model.name}</h3><div>{model.items.map((item)=><span key={item}>{item}</span>)}</div></article>)}</div>
      <ContactLink>Discuss Your B2B Architecture</ContactLink>
    </section>

    <section className={styles.solutions} id="b2b-services">
      <div className={styles.sectionHead}><span className={styles.kicker}>FROM SCOPING TO ONGOING GROWTH</span><h2>Shopify B2B Services From One Connected Team</h2><p>Plan the storefront, workflows, integrations, and release together.</p></div>
      <div className={styles.solutionGrid}>{b2bServices.map((item,index)=><article className={styles.solutionCard} key={item.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={styles.industries} id="b2b-risk-planning" aria-labelledby="risk-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>PLAN FOR THE DETAILS</span><h2 id="risk-title">Where B2B Projects Can Get Complicated</h2><p>Wholesale storefronts touch pricing, finance, sales teams, and long-standing buyer relationships. Make those requirements part of the plan early.</p><div className={styles.industryImage}><Image src="/site-assets/homepage/industry-ecommerce.webp" width={900} height={620} alt="Ecommerce operations and customer experience" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="B2B delivery risks and responses">{risks.map((item,index)=><article className={`${styles.industryItem} ${openRisk===index?styles.industryOpen:""}`} key={item.title}><h3><button type="button" aria-expanded={openRisk===index} onClick={()=>setOpenRisk(openRisk===index?-1:index)}><span>{item.title}</span><b aria-hidden="true">{openRisk===index?"−":"+"}</b></button></h3>{openRisk===index&&<p>{item.copy}</p>}</article>)}</div>
    </section>

    <section className={styles.creative} id="b2b-integrations">
      <div className={styles.creativeImage}><Image src="/site-assets/shopify-marketing/mkt-team-a.webp" alt="Team planning connected commerce workflows" fill sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/><span aria-hidden="true">SYSTEMS</span><div>Connected data.<br /><strong>Confident buying.</strong></div></div>
      <div className={styles.creativeContent}><span className={styles.kicker}>CONNECTED TO YOUR OPERATIONS</span><h2>Bring Shopify Into the Systems That Run Your Business</h2><p>Define which platform owns each piece of information, then plan how products, pricing, customers, and orders should move.</p><div className={styles.creativeGrid}>{systems.map((system,index)=><article key={system.name}><span>0{index+1}</span><div><h3>{system.name}</h3><p>{system.items.join(" · ")}</p></div></article>)}</div></div>
    </section>

    <section className={styles.capabilities} aria-labelledby="b2b-process-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>OUR DELIVERY PROCESS</span><h2 id="b2b-process-title">A Process That Accounts for B2B Complexity</h2><p>Bring commercial rules, connected systems, and buyer needs together from discovery through rollout.</p></div>
        <div className={styles.stageGrid}>{process.map((step,index)=><article className={styles.stageCard} key={step.title}><div className={styles.stageImage}><span>0{index+1}</span><b>DELIVERY STEP</b></div><div className={styles.stageCopy}><span>B2B IMPLEMENTATION</span><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>A Wholesale Channel Designed Around Your Operations</h2><p>Connect the platform setup with the people, customer relationships, and business processes that rely on it.</p></div>
      <div className={styles.whyGrid}>{[["Business-first planning","Map how orders, pricing, and accounts work before selecting a solution."],["Commerce + engineering","Coordinate storefront, platform, and integration decisions across one team."],["Systems-aware delivery","Keep data ownership and system connections in view throughout implementation."],["Ongoing evolution","Support new buyer needs, catalogs, and workflows as the channel develops."]].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="b2b-contact"><div><span>READY WHEN YOU ARE</span><h2>Ready to Bring Your Wholesale Business Online?</h2><p>Tell us how your business sells today and what you want buyers to do next. We'll help shape a practical B2B plan.</p></div><ContactLink>Talk to Our B2B Team</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">B2B</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Shopify B2B Ecommerce FAQs</h2><p>Find answers to common questions about wholesale storefronts, integrations, and buyer workflows.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`b2b-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`b2b-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
