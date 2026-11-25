"use client";

import {useState} from "react";
import Image from "../shopify-assets";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const supportAreas = [
  {name:"Shopify Development",copy:"Deliver new features, custom storefront functionality, and continuous improvements."},
  {name:"Shopify Plus Support",copy:"Work through complex requirements, multiple stores, and advanced commerce workflows."},
  {name:"Integrations",copy:"Support connections to ERP, CRM, PIM, fulfillment, payment, and marketing systems."},
  {name:"Storefront & UX",copy:"Improve landing pages, merchandising experiences, navigation, and customer journeys."},
  {name:"Performance & Optimization",copy:"Address technical issues and prioritize improvements to the shopping experience."},
  {name:"Technical Support",copy:"Handle troubleshooting, maintenance, bug fixes, and day-to-day technical requests."},
  {name:"Headless & Advanced Commerce",copy:"Support custom storefronts and evolving commerce architectures."},
  {name:"Migration & Transformation",copy:"Add engineering capacity for platform moves and larger commerce changes."},
  {name:"Marketing & Growth Support",copy:"Coordinate technical and growth work when your roadmap spans storefront and marketing needs."},
];

const engagementFit = [
  {title:"A steady development backlog",copy:"There's ongoing work to build, fix, improve, and optimize across your store."},
  {title:"Extra Shopify expertise",copy:"Your internal team needs additional platform-specific engineering capacity."},
  {title:"Proactive store support",copy:"Your commerce operation benefits from a team that already understands its setup."},
  {title:"Changing priorities",copy:"Your roadmap shifts and you want a working model that can adapt with it."},
];

const comparison = [
  {name:"Store knowledge",project:"Revisited at the start of each project",ongoing:"Build context across ongoing work"},
  {name:"Availability",project:"Begins after a scope is agreed",ongoing:"Planned capacity for recurring needs"},
  {name:"Priorities",project:"Focused on defined deliverables",ongoing:"Can follow an evolving roadmap"},
  {name:"Support",project:"Usually ends with project completion",ongoing:"Can continue after each release"},
  {name:"Improvements",project:"Often addressed as separate projects",ongoing:"Can be prioritized continuously"},
  {name:"Team context",project:"Specific to the project",ongoing:"Builds broader business and store context"},
];

const cadence = [
  {title:"Understand",copy:"Review your store, infrastructure, backlog, priorities, and business goals."},
  {title:"Prioritize",copy:"Agree on the work that should be built, fixed, optimized, or explored next."},
  {title:"Deliver",copy:"Work through the roadmap in clear, reviewable increments with your team."},
  {title:"Review",copy:"Look at completed work, current issues, and what needs attention next."},
  {title:"Evolve",copy:"Adjust upcoming priorities as your business and commerce needs change."},
];

const teamBenefits = [
  {title:"Store context",copy:"Keep useful knowledge of your store, systems, and past decisions across projects."},
  {title:"Flexible expertise",copy:"Bring in development, design, QA, and technical skills as the roadmap requires."},
  {title:"Shared workflows",copy:"Coordinate with your existing product, marketing, design, and operations teams."},
  {title:"Continuous improvement",copy:"Use each release and support request to inform the next practical improvement."},
];

const faqs = [
  ["What is a Shopify support retainer?", "It's an ongoing engagement that provides planned access to Shopify expertise for development, support, integrations, optimization, and other agreed work."],
  ["What services can ongoing support include?", "Depending on your priorities, support can include development, storefront UX, integrations, technical troubleshooting, performance improvements, advanced commerce, and related marketing technology work."],
  ["How does an ongoing engagement work?", "We start by understanding your store and roadmap, agree on priorities and a working model, then review progress regularly and update the upcoming work."],
  ["Can support include Shopify Plus work?", "Yes. The engagement can include Shopify Plus development, integrations, and complex commerce requirements, based on the scope and team needs."],
  ["Can design and UX work be included?", "Yes. Design, storefront UX, merchandising, and experience improvements can be part of the agreed roadmap."],
  ["Can you work with our internal team?", "Yes. We can coordinate with your developers, marketers, designers, and operations team using agreed workflows."],
  ["Can ongoing support include urgent technical issues?", "Support arrangements can include troubleshooting and urgent requests. Response expectations should be defined as part of the engagement model."],
  ["How is capacity structured?", "Capacity and team composition depend on the work and expertise you need. We'll outline a model around your roadmap and priorities."],
  ["Can priorities change over time?", "Yes. Regular reviews help adjust upcoming work as business needs and technical priorities change."],
  ["How is a retainer different from maintenance?", "Maintenance usually focuses on keeping a store working. Broader ongoing support can also include development, integrations, optimization, and new roadmap initiatives."],
  ["How long does an ongoing engagement last?", "Duration depends on your needs and chosen working model. We can discuss a practical term and review cadence during scoping."],
] as const;

function ContactLink({children}:{children:React.ReactNode}) {
  return <Link href="/contact?service=Shopify%20Ongoing%20Support" className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function ShopifyOngoingSupportPage() {
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="ongoing-support-title">
      <Image className={styles.heroImage} src="/site-assets/shopify-marketing/hero-marketing-b.webp" alt="Commerce team planning ongoing storefront improvements" fill sizes="100vw" preload />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>ONGOING SHOPIFY SUPPORT</span>
        <h1 id="ongoing-support-title">Your Store Keeps Evolving<span>Keep Building With the Right Team</span></h1>
        <p>Get continuing Shopify expertise for development, technical support, integrations, and storefront improvements as your commerce roadmap changes.</p>
        <ContactLink>Talk to Our Shopify Team</ContactLink>
      </div></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Ongoing Support</span></div></nav>

    <section className={styles.industries} id="ongoing-support-fit" aria-labelledby="support-fit-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>COMMERCE DOESN'T STOP AT LAUNCH</span><h2 id="support-fit-title">Keep Your Store Moving as Needs Change</h2><p>New features, integrations, performance needs, and customer expectations keep arriving. Ongoing support gives your team a consistent way to plan and deliver the next improvements.</p><div className={styles.industryImage}><Image src="/site-assets/shopify-marketing/mkt-team-a.webp" width={896} height={672} alt="Commerce team planning ongoing improvements" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="When ongoing support can help">{engagementFit.map((item,index)=><article className={styles.industryItem} key={item.title}><h3><span className={styles.cardIndex}>0{index+1}</span>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="support-coverage">
      <div className={styles.sectionHead}><span className={styles.kicker}>ONE ONGOING COMMERCE PARTNER</span><h2>Support for the Work Your Roadmap Brings</h2><p>Bring technical support, development, integrations, and customer experience improvements into one evolving plan.</p></div>
      <div className={styles.solutionGrid}>{supportAreas.map((item,index)=><article className={styles.solutionCard} key={item.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={styles.technology} id="support-model">
      <div className={styles.sectionHead}><span className={styles.kicker}>ONGOING PARTNERSHIP OR ONE-OFF PROJECT?</span><h2>Choose a Working Model That Fits Your Store</h2><p>One-off projects work well for a defined scope. Ongoing support can suit stores with continuous work and changing priorities.</p></div>
      <div className={styles.techGroups}>{comparison.map((item,index)=><article className={styles.techGroup} key={item.name}><h3><span>0{index+1}</span>{item.name}</h3><div><span>One-off project: {item.project}</span><span>Ongoing support: {item.ongoing}</span></div></article>)}</div>
    </section>

    <section className={styles.capabilities} aria-labelledby="support-cadence-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>BUILT AROUND YOUR COMMERCE ROADMAP</span><h2 id="support-cadence-title">A Regular Rhythm for Priorities and Delivery</h2><p>Keep work moving through clear planning, delivery, and review cycles that adapt as the business changes.</p></div>
        <div className={styles.stageGrid}>{cadence.map((step,index)=><article className={styles.stageCard} key={step.title}><div className={styles.stageImage}><span>0{index+1}</span><b>SUPPORT CYCLE</b></div><div className={styles.stageCopy}><span>ONGOING PARTNERSHIP</span><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.creative} id="ongoing-support-team">
      <div className={styles.creativeImage}><Image src="/site-assets/services-teams.webp" alt="Digital commerce team collaborating" fill sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/><span aria-hidden="true">TEAM</span><div>Keep context.<br /><strong>Keep moving.</strong></div></div>
      <div className={styles.creativeContent}><span className={styles.kicker}>A TEAM THAT STAYS IN CONTEXT</span><h2>Don't Start From Scratch Every Time</h2><p>Build useful knowledge around your storefront and work with a team that can coordinate with the people already supporting your business.</p><div className={styles.creativeGrid}>{teamBenefits.map((item,index)=><article key={item.title}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div></div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>Commerce Expertise That Can Evolve With Your Store</h2><p>Keep development, support, and improvements connected to the business context behind your Shopify operation.</p></div>
      <div className={styles.whyGrid}>{[["Ongoing store context","Build shared understanding of your storefront and technical setup."],["Skills when needed","Bring in engineering, design, QA, and integration support as priorities require."],["Flexible collaboration","Coordinate with existing teams and workflows around agreed responsibilities."],["Continuous improvement","Use regular reviews to keep attention on the next useful changes."]].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="ongoing-support-contact"><div><span>READY WHEN YOU ARE</span><h2>Keep Building. Keep Evolving.</h2><p>Tell us what your store needs now and what your roadmap looks like. We'll help shape an ongoing working model around it.</p></div><ContactLink>Talk to Our Commerce Team</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">KEEP</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Shopify Ongoing Support FAQs</h2><p>Learn more about ongoing development, technical support, team collaboration, and engagement structure.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`support-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`support-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
