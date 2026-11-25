"use client";

import {useState} from "react";
import Image from "../shopify-assets";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const workarounds = [
  {title:"Too many separate tools",copy:"A new app for each need can leave the team managing overlapping features and subscriptions."},
  {title:"Manual data handoffs",copy:"People re-entering orders and customer data between systems can slow work and introduce mistakes."},
  {title:"Processes held in spreadsheets",copy:"Important operating steps may depend on manual lists that are hard to keep current."},
  {title:"Tools that almost fit",copy:"Standard apps may cover most of a process but leave the business to handle the gaps."},
  {title:"Systems that don't share context",copy:"Disconnected product, customer, and order data can make it difficult to get a current view."},
];

const buildVsBuy = [
  {name:"Fit",buy:"Designed for common use cases",build:"Can match specific business workflows"},
  {name:"Ongoing cost",buy:"Subscriptions may scale with usage or seats",build:"Build and maintenance costs to plan for"},
  {name:"Manual work",buy:"May leave steps for staff to bridge",build:"Can automate agreed end-to-end workflows"},
  {name:"Integrations",buy:"Depends on vendor-supported connections",build:"Can connect with selected business systems"},
  {name:"Change requests",buy:"Often tied to the vendor roadmap",build:"Can evolve alongside your requirements"},
  {name:"Ownership",buy:"Vendor-managed product and data model",build:"Custom code can be documented for your team"},
];

const solutionTypes = [
  {name:"Custom app development",copy:"Build focused applications around business processes that don't fit a standard commerce tool."},
  {name:"API integration",copy:"Connect Shopify and other systems so information can move between them with clear rules."},
  {name:"Commerce workflow automation",copy:"Reduce repeated manual tasks with workflows shaped around the way your team operates."},
];

const examples = [
  {name:"Inventory coordination",copy:"Coordinate stock signals across locations, sales channels, and fulfillment workflows."},
  {name:"Order routing",copy:"Validate incoming orders and route them according to agreed business rules."},
  {name:"Customer-specific experiences",copy:"Shape product information or offers around customer context and account requirements."},
  {name:"Workflow automation",copy:"Automate routine tagging, notifications, approvals, and internal handoffs."},
  {name:"Loyalty and rewards",copy:"Connect customer benefits and reward logic with the storefront and relevant customer systems."},
  {name:"Operational reporting",copy:"Bring selected sales, product, and operations data into a useful internal view."},
  {name:"Customer or partner portals",copy:"Create self-service tools for customers, wholesalers, or suppliers to manage shared tasks."},
  {name:"Shipping and fulfillment logic",copy:"Apply rates, carrier selection, and delivery rules around your business requirements."},
  {name:"Purpose-built app replacements",copy:"Assess whether a custom tool makes sense when existing products no longer fit the workflow."},
];

const foundations = [
  {name:"Clear ownership",copy:"Document who owns the code, data, and operational responsibilities."},
  {name:"Security planned in",copy:"Consider authentication, access, and data protection across each system connection."},
  {name:"Resilient integrations",copy:"Plan for errors, retries, monitoring, and the cases where systems disagree."},
  {name:"Supported platform patterns",copy:"Use supported APIs and platform capabilities where they fit the solution."},
  {name:"Documented for maintenance",copy:"Keep implementation notes and handover information useful for future changes."},
  {name:"Designed to evolve",copy:"Shape the solution so it can respond to new workflows and business needs."},
];

const process = [
  {title:"Map the workflow",copy:"Understand the tools, manual work, edge cases, and business impact involved today."},
  {title:"Recommend the right path",copy:"Decide what to use, build, or connect, then scope the solution and delivery plan."},
  {title:"Design the architecture",copy:"Define data flows, integration boundaries, permissions, and system responsibilities."},
  {title:"Build and validate",copy:"Develop in reviewable stages and validate with realistic data and business scenarios."},
  {title:"Launch and monitor",copy:"Release with monitoring and practical steps to handle issues and operational changes."},
  {title:"Support and extend",copy:"Maintain the solution and improve it as workflows and requirements change."},
];

const faqs = [
  ["When does a custom solution make more sense than an app?", "Consider custom development when no suitable app fits the workflow, important steps remain manual, or the business needs integrations and behavior existing tools cannot provide. If an existing app is a good fit, it may be the simpler choice."],
  ["Can a custom solution cost less over time?", "It depends on build scope, maintenance, and the current cost of software and manual work. We can compare those factors before recommending an approach."],
  ["Which systems can you connect to Shopify?", "Possible connections include ERP, CRM, inventory, payments, fulfillment, and other business systems. The integration method depends on the systems and data requirements."],
  ["Does data sync in real time?", "Some integrations can use event-based or near-real-time updates; others are better suited to scheduled sync. The design should match how quickly each workflow needs current data."],
  ["Will our team own the code?", "Ownership, access, documentation, and future maintenance responsibilities should be agreed as part of the project scope."],
  ["What happens when Shopify or another platform changes?", "Using supported interfaces and planning for maintenance helps manage platform changes. Ongoing support can be included where your solution needs it."],
  ["How long does a custom ecommerce solution take?", "Timing depends on the workflows, integrations, and edge cases involved. Mapping the process first helps define a realistic scope and timeline."],
  ["Can you work with our existing developers or vendors?", "Yes. Integration boundaries, responsibilities, and handoff expectations can be planned with the people already supporting your systems."],
] as const;

function ContactLink({children}:{children:React.ReactNode}) {
  return <Link href="/contact?service=Custom%20Ecommerce%20Solutions" className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function CustomEcommercePage() {
  const [openWorkaround,setOpenWorkaround]=useState(0);
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="custom-ecommerce-title">
      <Image className={styles.heroImage} src="/site-assets/services-custom.webp" alt="Engineer developing a custom digital solution" fill sizes="100vw" preload />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>CUSTOM ECOMMERCE SOLUTIONS</span>
        <h1 id="custom-ecommerce-title">Build What Your Business Needs<span>Connect the Commerce Stack</span></h1>
        <p>When standard tools leave important gaps, custom apps and integrations can help Shopify work more closely with the way your business operates.</p>
        <ContactLink>Talk to Our Solutions Team</ContactLink>
      </div></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Custom Ecommerce Solutions</span></div></nav>

    <section className={styles.industries} id="custom-commerce-overview" aria-labelledby="custom-overview-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>WHEN STANDARD TOOLS LEAVE GAPS</span><h2 id="custom-overview-title">Connect the Store to the Way Your Business Works</h2><p>As commerce grows, businesses often add tools to cover new needs. Custom ecommerce solutions can connect those systems and fill workflow gaps when a standard app isn't the right fit.</p><div className={styles.industryImage}><Image src="/site-assets/homepage/industry-ecommerce.webp" width={900} height={620} alt="Ecommerce business operations" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="Common commerce workflow challenges">{workarounds.map((item,index)=><article className={`${styles.industryItem} ${openWorkaround===index?styles.industryOpen:""}`} key={item.title}><h3><button type="button" aria-expanded={openWorkaround===index} onClick={()=>setOpenWorkaround(openWorkaround===index?-1:index)}><span>{item.title}</span><b aria-hidden="true">{openWorkaround===index?"−":"+"}</b></button></h3>{openWorkaround===index&&<p>{item.copy}</p>}</article>)}</div>
    </section>

    <section className={styles.technology} id="buy-vs-build">
      <div className={styles.sectionHead}><span className={styles.kicker}>BUY WHAT FITS. BUILD WHAT'S MISSING.</span><h2>Make the Build-or-Buy Decision With the Whole Picture</h2><p>A custom solution isn't automatically better. Compare workflow fit, ongoing costs, manual steps, integrations, and who will maintain it.</p></div>
      <div className={styles.techGroups}>{buildVsBuy.map((item,index)=><article className={styles.techGroup} key={item.name}><h3><span>0{index+1}</span>{item.name}</h3><div><span>Existing tools: {item.buy}</span><span>Custom solution: {item.build}</span></div></article>)}</div>
    </section>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="custom-solution-types">
      <div className={styles.sectionHead}><span className={styles.kicker}>THREE WAYS TO CLOSE THE GAP</span><h2>Custom Solutions That Connect and Run Commerce</h2><p>Develop focused applications, connect systems, and streamline workflows around the way your team operates.</p></div>
      <div className={styles.solutionGrid}>{solutionTypes.map((item,index)=><article className={styles.solutionCard} key={item.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={styles.solutions} id="custom-use-cases">
      <div className={styles.sectionHead}><span className={styles.kicker}>CUSTOM COMMERCE IN PRACTICE</span><h2>Use Cases Shaped Around Your Operation</h2><p>Bring specific workflows and customer needs into focus before deciding what to build.</p></div>
      <div className={styles.solutionGrid}>{examples.map((item,index)=><article className={styles.solutionCard} key={item.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={`${styles.capabilities} ${styles.charcoalCards}`} aria-labelledby="solution-foundations-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>BUILT FOR LONG-TERM USE</span><h2 id="solution-foundations-title">A Custom Solution Should Be Ready to Own</h2><p>Plan for security, reliability, documentation, and the people who will support the solution after launch.</p></div>
        <div className={styles.stageGrid}>{foundations.map((item,index)=><article className={styles.stageCard} key={item.name}><div className={styles.stageImage}><span>0{index+1}</span><b>ENGINEERING PRINCIPLE</b></div><div className={styles.stageCopy}><span>BUILT FOR YOUR BUSINESS</span><h3>{item.name}</h3><p>{item.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.creative} id="custom-solution-process">
      <div className={styles.creativeImage}><Image src="/site-assets/services-teams.webp" alt="Team working together on a digital solution" fill sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/><span aria-hidden="true">BUILD</span><div>Start with the workflow.<br /><strong>Then build the right fit.</strong></div></div>
      <div className={styles.creativeContent}><span className={styles.kicker}>OUR DELIVERY PROCESS</span><h2>How We Build Custom Commerce Solutions</h2><p>Begin with how your team works, then decide what should be bought, built, or connected.</p><div className={styles.creativeGrid}>{process.map((step,index)=><article key={step.title}><span>0{index+1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div></div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>Custom Infrastructure for the Way Your Business Works</h2><p>Connect Shopify with your workflows and systems, and make a clear plan for maintaining the solution over time.</p></div>
      <div className={styles.whyGrid}>{[["Practical recommendations","Choose standard tools where they fit and custom work where it solves a real gap."],["Commerce-aware engineering","Keep Shopify workflows and customer experience in view as systems connect."],["Integration planning","Agree on data ownership, error handling, and monitoring for each connection."],["Long-term support","Plan documentation and ongoing ownership as part of the solution."]].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="custom-ecommerce-contact"><div><span>READY WHEN YOU ARE</span><h2>Tell Us What's Slowing Your Business Down</h2><p>Share the workarounds, manual tasks, and tools that aren't quite working. We'll help you assess what to keep, connect, or build.</p></div><ContactLink>Talk to Our Solutions Team</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">BUILD</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Custom Ecommerce Solutions FAQs</h2><p>Learn more about custom apps, system integrations, workflow automation, and ownership.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`custom-ecommerce-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`custom-ecommerce-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
