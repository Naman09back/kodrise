"use client";

import {useState} from "react";
import Image from "../shopify-assets";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const designServices = [
  {name:"Custom Shopify Theme Design",copy:"Shape a storefront around your brand, products, and the way your customers shop."},
  {name:"Shopify Plus Design",copy:"Create considered experiences for large catalogs, multiple markets, B2B, and expanding teams."},
  {name:"UX & UI Design",copy:"Plan customer journeys, navigation, and interfaces that make discovery and shopping easier."},
  {name:"Shopify Store Redesign",copy:"Refresh your store while considering search visibility, conversion journeys, and connected systems."},
  {name:"Design Systems",copy:"Create reusable components and visual guidelines that help your storefront stay consistent."},
  {name:"Mobile-First Design",copy:"Design for the small screen from the start, then extend the experience to larger devices."},
  {name:"B2B Storefront Design",copy:"Make wholesale browsing and repeat ordering clearer for business buyers."},
  {name:"Headless Storefront Design",copy:"Explore custom front-end experiences for content-rich and multi-channel commerce."},
  {name:"Ongoing Design Support",copy:"Plan new campaigns, landing pages, features, and iterative storefront improvements."},
];

const approaches = [
  {name:"Theme customization",items:["A Shopify theme tailored to your brand","Flexibility within theme structure","A focused route to launch","A quick refresh or a new store"]},
  {name:"Custom theme",items:["A storefront designed around your business","More control over Shopify experience","A planned design and build","Distinctive, growing brands"]},
  {name:"Headless storefront",items:["A custom front end connected to Shopify","Extensive front-end flexibility","More involved planning and delivery","Content-rich or multi-channel needs"]},
];

const protect = [
  {title:"Search visibility",copy:"Plan URL structure, redirects, metadata, and page hierarchy before a redesigned store goes live."},
  {title:"Customer journeys",copy:"Use store data and customer behavior to understand what is working and where the experience can improve."},
  {title:"Integrations",copy:"Account for the apps and business systems your storefront depends on as the design takes shape."},
  {title:"Team workflows",copy:"Design flexible sections that help your team update products, content, and campaigns with confidence."},
  {title:"Launch readiness",copy:"Coordinate the handoff and rollout so the updated storefront is prepared for customers."},
];

const principles = [
  {title:"Performance-minded",copy:"Consider loading, responsive media, and Core Web Vitals as part of the design direction."},
  {title:"Search-aware",copy:"Plan clear content hierarchy, page structure, and templates to support discovery."},
  {title:"Accessible by design",copy:"Make key journeys easier to use with readable content and accessible interaction patterns."},
  {title:"Informed by data",copy:"Use customer behavior, analytics, and research to guide important design decisions."},
  {title:"Ready to implement",copy:"Work closely with engineers so design intent carries through to the storefront build."},
  {title:"Made for your team",copy:"Use repeatable components that support ongoing updates after launch."},
];

const process = [
  {title:"Discover",copy:"Learn about your brand, customers, goals, and current store experience."},
  {title:"Map the experience",copy:"Set out customer journeys, page structure, and wireframes for key storefront moments."},
  {title:"Design and prototype",copy:"Explore the visual direction and review interactive prototypes together."},
  {title:"Build and refine",copy:"Bring the approved direction to life and refine it across content and devices."},
  {title:"Launch and improve",copy:"Release with a clear plan and use real feedback to guide future improvements."},
];

const faqs = [
  ["What is included in Shopify website design?", "A project may include discovery, journey mapping, information architecture, wireframes, visual design, and prototypes. We can also work alongside the Shopify engineering team through implementation."],
  ["Do you design for Shopify Plus?", "Yes. We can design storefronts for Shopify and Shopify Plus, including complex catalogs, multiple markets, and B2B commerce experiences."],
  ["Should we customize a theme or create a custom design?", "The right choice depends on your goals, timing, and required flexibility. We can help you weigh a theme-based approach against a custom storefront."],
  ["Can a redesign affect our search visibility?", "It can. Planning URLs, redirects, metadata, and page structure early helps reduce avoidable search disruption during a redesign."],
  ["Do you design for mobile first?", "Yes. We consider mobile journeys early and adapt the experience for tablet and desktop screens."],
  ["Can our team update the site after launch?", "We can design flexible page sections and reusable components so common content and campaign updates are easier to manage."],
  ["Do you create prototypes before development?", "Yes. Prototypes make key journeys easier to review and discuss before the storefront is implemented."],
  ["What tools do you use for design?", "We can work with your design tool preferences and commonly use Figma for collaborative storefront design and prototypes."],
  ["How long does a Shopify design project take?", "Timing depends on the number of templates, project scope, and whether the work extends an existing theme or starts with a custom direction."],
  ["How much does Shopify website design cost?", "Project cost depends on scope, complexity, and design approach. We shape a recommendation around your actual requirements."],
  ["Can design be part of a Shopify migration?", "Yes. Store design can be planned alongside a migration, including the experience, content, integrations, and search considerations."],
  ["Do you provide ongoing design support?", "We can continue to support new campaigns, landing pages, features, and experience improvements after launch."],
] as const;

function ContactLink({children,service="Shopify Website Design"}:{children:React.ReactNode;service?:string}) {
  return <Link href={`/contact?service=${encodeURIComponent(service)}`} className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function ShopifyWebsiteDesignPage() {
  const [openRisk,setOpenRisk]=useState(0);
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="website-design-title">
      <Image className={styles.heroImage} src="/site-assets/shopify-marketing/hero-marketing-b.webp" alt="Ecommerce team discussing a storefront experience" fill sizes="100vw" preload />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>SHOPIFY WEBSITE DESIGN</span>
        <h1 id="website-design-title">Shopify Store Design<span>Made to Grow With You</span></h1>
        <p>Design a memorable storefront that works for your customers today and gives your brand room to grow across products, campaigns, and markets.</p>
        <ContactLink>Talk to Our Design Team</ContactLink>
      </div></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Website Design</span></div></nav>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="design-overview">
      <div className={styles.sectionHead}><span className={styles.kicker}>DESIGN FOR EVERY STAGE</span><h2>A Storefront Is More Than Its First Impression</h2><p>Make design decisions with customer journeys, business operations, and the next stage of growth in view.</p></div>
      <div className={styles.solutionGrid}>{designServices.map((service,index)=><article className={styles.solutionCard} key={service.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{service.name}</h3><p>{service.copy}</p></article>)}</div>
    </section>

    <section className={styles.technology} id="design-approaches">
      <div className={styles.sectionHead}><span className={styles.kicker}>FIND YOUR STARTING POINT</span><h2>Choose a Design Approach That Fits</h2><p>The right storefront direction depends on the experience you need, your timeline, and how much flexibility your brand requires.</p></div>
      <div className={styles.techGroups}>{approaches.map((approach,index)=><article className={styles.techGroup} key={approach.name}><h3><span>0{index+1}</span>{approach.name}</h3><div>{approach.items.map((item)=><span key={item}>{item}</span>)}</div></article>)}</div>
    </section>

    <section className={styles.industries} id="redesign-planning" aria-labelledby="redesign-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>REDESIGN WITH CARE</span><h2 id="redesign-title">Make the Store Better Without Losing What Works</h2><p>Thoughtful redesign starts by understanding the store's strengths, customer paths, and connected systems before the visual changes begin.</p><div className={styles.industryImage}><Image src="/site-assets/homepage/industry-ecommerce.webp" width={900} height={620} alt="Ecommerce brand experience" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="Store redesign considerations">{protect.map((item,index)=><article className={`${styles.industryItem} ${openRisk===index?styles.industryOpen:""}`} key={item.title}><h3><button type="button" aria-expanded={openRisk===index} onClick={()=>setOpenRisk(openRisk===index?-1:index)}><span>{item.title}</span><b aria-hidden="true">{openRisk===index?"−":"+"}</b></button></h3>{openRisk===index&&<p>{item.copy}</p>}</article>)}</div>
    </section>

    <section className={`${styles.capabilities} ${styles.charcoalCards}`} aria-labelledby="design-principles-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>DESIGN + COMMERCE</span><h2 id="design-principles-title">Design Decisions With the Whole Store in View</h2><p>A considered storefront balances brand expression with performance, usability, and the tools that keep your business moving.</p></div>
        <div className={styles.stageGrid}>{principles.map((item,index)=><article className={styles.stageCard} key={item.title}><div className={styles.stageImage}><span>0{index+1}</span><b>DESIGN PRINCIPLE</b></div><div className={styles.stageCopy}><span>SHOPIFY DESIGN</span><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.creative} id="design-process">
      <div className={styles.creativeImage}><Image src="/site-assets/shopify-marketing/mkt-team-a.webp" alt="Team collaborating on a digital commerce experience" fill sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/><span aria-hidden="true">DESIGN</span><div>From first ideas<br /><strong>to better journeys.</strong></div></div>
      <div className={styles.creativeContent}><span className={styles.kicker}>OUR DESIGN PROCESS</span><h2>From the First Brief to a Store That Keeps Improving</h2><p>Connect brand, customer needs, and the technology behind your storefront in a clear collaborative process.</p><div className={styles.creativeGrid}>{process.map((step,index)=><article key={step.title}><span>0{index+1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div></div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>Design Backed by Commerce Engineering</h2><p>Our design and engineering teams work together to carry the storefront experience from the first idea through implementation and future improvements.</p></div>
      <div className={styles.whyGrid}>{[["Shopify knowledge","Design direction shaped around Shopify and Shopify Plus capabilities."],["Design + engineering","Keep the people shaping the store connected to the people building it."],["Customer experience","Consider how shoppers discover products, compare options, and buy."],["Ongoing partnership","Keep improving campaigns, features, and customer journeys after launch."]].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.caseStudies}>
      <div className={styles.caseHead}><div><span className={styles.kicker}>DESIGN THAT CONNECTS</span><h2>Experiences Shaped Around Real Customer Needs</h2></div><p>We bring product design and engineering together to make useful digital experiences clear, consistent, and ready to evolve.</p></div>
      <div className={styles.caseGrid}>{[["Commerce experiences","/site-assets/homepage/industry-ecommerce.webp","Ecommerce experience"],["Connected digital products","/site-assets/services-web.webp","Digital product interface"],["Mobile customer journeys","/site-assets/services-mobile.webp","Mobile experience"]].map(([title,src,alt],index)=><article className={styles.caseCard} key={title}><div className={styles.caseImage}><Image src={src} alt={alt} width={720} height={480} sizes="(max-width: 700px) 100vw, 33vw"/><span className={styles.caseFallback}>0{index+1}</span></div><div className={styles.caseCopy}><span>KODRISE DESIGN</span><h3>{title}</h3><p>Design and engineering aligned around the people who use the experience.</p><Link href="/portfolio">Explore our work <b aria-hidden="true">↗</b></Link></div></article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="design-contact"><div><span>READY WHEN YOU ARE</span><h2>Ready for a Storefront That Feels Like Your Brand?</h2><p>Tell us about your business, current store, and what you'd like to improve. We'll help you shape a design direction that fits.</p></div><ContactLink>Talk to Our Design Team</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">DESIGN</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Shopify Website Design FAQs</h2><p>Find answers to common questions about storefront design and redesign planning.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`design-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`design-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
