"use client";

import {useState} from "react";
import Image from "../shopify-assets";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const expertise = [
  {title:"Shopify Development",copy:"Build, customize, and evolve your Shopify store with engineers who understand the platform and the needs of a growing commerce operation."},
  {title:"Shopify Plus Engineering",copy:"Take on enterprise requirements, complex builds, custom functionality, and integrations with Shopify Plus experience."},
  {title:"Storefront & Theme Development",copy:"Create responsive storefront experiences with custom themes, new features, and focused improvements."},
  {title:"Integrations & Custom Solutions",copy:"Connect Shopify to the ERP, CRM, PIM, fulfillment, payment, and other systems your business relies on."},
  {title:"Migration Engineering",copy:"Plan and deliver a move to Shopify with attention to data, search visibility, integrations, and day-to-day operations."},
  {title:"Ongoing Development & Support",copy:"Keep your store moving with continuous development, optimization, maintenance, and technical support."},
];
const models = [
  {title:"Bring in an Expert",copy:"Get specialist Shopify expertise for a defined project or technical challenge, without adding a permanent role to your team.",best:"Specific projects · Specialist requirements · Defined scope",image:"/site-assets/services-web.webp",alt:"A team planning website development work"},
  {title:"Extend Your Team",copy:"Add engineering capacity alongside your in-house team. Our developers work within your tools, workflows, and existing processes.",best:"Growing backlogs · Extra capacity · Ongoing development",image:"/site-assets/services-teams.webp",alt:"Commerce professionals collaborating as a team"},
  {title:"Build a Dedicated Commerce Team",copy:"Bring together the skills your roadmap needs across development, integrations, optimization, and ongoing technical work.",best:"Complex roadmaps · Shopify Plus · Long-term partnership",image:"/site-assets/services-custom.webp",alt:"A custom commerce project in progress"},
];
const proof = [
  {title:"Shopify Expertise",copy:"Development experience across Shopify and Shopify Plus stores."},
  {title:"Commerce Architecture",copy:"Technical decisions that account for your storefront and wider systems."},
  {title:"Cross-Functional Skills",copy:"Development, integrations, migrations, and optimization working together."},
  {title:"Long-Term Context",copy:"A team able to stay involved as your commerce needs evolve."},
];
const steps = [
  {title:"Share Your Roadmap",copy:"Tell us about your store, priorities, technical challenges, and work waiting in the backlog."},
  {title:"Define the Right Team",copy:"We map your needs to the expertise, skills, and capacity required to move work forward."},
  {title:"Set Up the Engagement",copy:"Agree on the specialists, communication, tools, and workflows that fit your operation."},
  {title:"Start Building",copy:"Your team joins the agreed workflow and begins work against shared priorities."},
];
const faqs = [
  ["Can I hire Shopify experts for an ongoing project?", "Yes. Kodrise can provide ongoing Shopify development and technical support alongside your existing team or through a dedicated commerce team."],
  ["Can you work with Shopify Plus?", "Yes. We support Shopify Plus development, complex integrations, migrations, and enterprise commerce requirements."],
  ["Can your developers work with our existing team?", "Yes. We can align with your current workflows, tools, communication channels, and development processes."],
  ["What can Shopify experts help us with?", "Support can include store and theme development, custom functionality, integrations, migrations, maintenance, and optimization."],
  ["Can I bring in an expert for one specific project?", "Yes. We can scope specialist support around a defined technical requirement or project."],
  ["How is a commerce team different from a freelancer?", "A team can bring complementary skills across development, integrations, and commerce operations as your requirements change."],
  ["How much does it cost to hire Shopify experts?", "Cost depends on scope, expertise, team structure, and engagement length. We can recommend an approach after reviewing your requirements."],
];

function ContactLink({children,service="Shopify Experts"}:{children:React.ReactNode;service?:string}) {
  return <Link href={`/contact?service=${encodeURIComponent(service)}`} className={styles.textLink}>{children}<span aria-hidden="true">{"\u2197"}</span></Link>;
}

export default function DevelopmentServicesPage() {
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="development-services-title">
      <Image className={styles.heroImage} src="/site-assets/services-teams.webp" alt="Kodrise commerce team supporting a growing online business" fill sizes="100vw" preload />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>DEDICATED COMMERCE TEAMS</span>
        <h1 id="development-services-title">More Shopify Expertise<span>For the Work Ahead</span></h1>
        <p>Add the Shopify engineering capacity your roadmap needs, from a specialist for a defined project to a team working alongside your business.</p>
        <ContactLink>Talk to Our Shopify Experts</ContactLink>
      </div></div>
    </section>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Dedicated Commerce Teams</span></div></nav>

    <section className={`${styles.solutions} ${styles.charcoalCards}`}>
      <div className={styles.sectionHead}><span className={styles.kicker}>SHOPIFY ENGINEERING CAPACITY</span><h2>Expertise for the Work That Keeps Commerce Moving</h2><p>Bring in the Shopify skills you need without building another team from scratch.</p></div>
      <div className={styles.solutionGrid}>{expertise.map((item,index)=><article className={styles.solutionCard} key={item.title}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true">↗</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={styles.capabilities} aria-labelledby="engagement-title"><div className={styles.capabilitiesInner}>
      <div className={styles.sectionHeadLight}><span className={styles.kicker}>FLEXIBLE ENGAGEMENT MODELS</span><h2 id="engagement-title">The Shopify Expertise You Need, When You Need It</h2><p>Choose the model that fits your roadmap today, then adjust as your business changes.</p></div>
      <div className={styles.stageGrid}>{models.map((model,index)=><article className={styles.stageCard} key={model.title}><div className={styles.stageImage}><Image src={model.image} alt={model.alt} fill sizes="(max-width: 700px) 100vw, 33vw" loading="lazy"/><b>ENGAGEMENT 0{index+1}</b></div><div className={styles.stageCopy}><span>ENGAGEMENT MODEL 0{index+1}</span><h3>{model.title}</h3><p>{model.copy}</p><p><strong>Best for:</strong> {model.best}</p></div></article>)}</div>
    </div></section>

    <section className={styles.why}><div className={styles.whyHead}><span className={styles.kicker}>A COMMERCE ENGINEERING PARTNER</span><h2>Extend Your Capabilities as Your Store Grows</h2><p>Commerce projects often need more than one skill set. Bring development, integration, and platform experience into the same working relationship.</p></div><div className={styles.whyGrid}>{proof.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>

    <section className={styles.industries} aria-labelledby="process-title"><div className={styles.industryIntro}><span className={styles.kicker}>A CLEAR STARTING POINT</span><h2 id="process-title">From First Conversation to Your First Sprint</h2><p>We start by understanding what you are building, what is slowing progress, and which expertise can help move the work forward.</p><div className={styles.industryImage}><Image src="/site-assets/services-teams.webp" width={896} height={672} alt="Commerce team discussing project priorities" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div><div className={styles.industryList}>{steps.map((step,index)=><article className={styles.industryItem} key={step.title}><h3><span style={{display:"inline-block",padding:"18px 3px",fontSize:20,fontWeight:500}}><span style={{color:"#ed3f47",marginRight:12}}>0{index+1}</span>{step.title}</span></h3><p style={{padding:"0 35px 19px 3px"}}>{step.copy}</p></article>)}</div></section>

    <section className={styles.ctaBanner}><div><span>READY WHEN YOU ARE</span><h2>Need More Shopify Expertise?</h2><p>Tell us what you are building, what is slowing the team down, and what is next on your commerce roadmap.</p></div><ContactLink>Talk to Our Shopify Experts</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">BUILD</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions About Hiring Shopify Experts</h2><p>Learn how additional Shopify expertise can support your team and commerce roadmap.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`experts-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`experts-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
