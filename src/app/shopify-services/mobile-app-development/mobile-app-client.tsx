"use client";

import {useState} from "react";
import Image from "../shopify-assets";
import Link from "next/link";
import styles from "../marketing/shopify-marketing.module.css";

const benefits = [
  {name:"A direct customer channel",copy:"Share launches, restocks, and relevant updates with customers who choose to hear from your brand."},
  {name:"A smoother repeat purchase",copy:"Make returning to products, accounts, and checkout feel more straightforward for repeat shoppers."},
  {name:"Loyalty in the experience",copy:"Bring points, member benefits, and rewards closer to the shopping journey."},
  {name:"Personalized discovery",copy:"Use preferences and shopping activity to make product discovery more relevant."},
  {name:"App-specific moments",copy:"Create early access, member events, or app-focused launches when they suit your brand."},
  {name:"A stronger retention mix",copy:"Give customers another way to reconnect with your store alongside email and other channels."},
];

const appServices = [
  {name:"iOS App Development",copy:"Create iPhone and iPad experiences shaped around your product, audience, and commerce needs."},
  {name:"Android App Development",copy:"Build Android shopping experiences designed to work across a wide range of devices."},
  {name:"Cross-Platform App Development",copy:"Consider a shared codebase for iOS and Android when it fits your feature set and roadmap."},
  {name:"Shopify Integration",copy:"Connect product, inventory, customer, and order experiences to your Shopify store."},
  {name:"App UX & UI Design",copy:"Design mobile journeys around your brand, shoppers, and the tasks they need to complete."},
  {name:"Progressive Web Apps",copy:"Explore app-like browser experiences when an app-store release is not the right starting point."},
  {name:"App Store Release",copy:"Prepare store listings, submission materials, and release steps for Apple App Store and Google Play."},
  {name:"Ongoing Support",copy:"Plan maintenance, platform updates, new features, and continued product improvements."},
];

const comparisons = [
  {name:"Main role",website:"Discovery and first purchases",app:"Retention and repeat shopping"},
  {name:"How people arrive",website:"Search, social, referrals, and ads",app:"A saved icon on a customer's device"},
  {name:"Returning to buy",website:"Often revisit through a browser",app:"Can offer saved preferences and account access"},
  {name:"Re-engagement",website:"Email and paid campaigns",app:"Opt-in push and in-app messages"},
  {name:"Experience",website:"Flexible reach through the browser",app:"Device-focused interactions and native features"},
];

const buildApproaches = [
  {name:"App builder",items:["Preconfigured app with brand styling","Feature set depends on the platform","Quickest way to explore demand","Can include recurring platform fees"]},
  {name:"Cross-platform app",items:["Shared codebase for iOS and Android","Customizable customer journeys","One coordinated product roadmap","Fits many growing commerce brands"]},
  {name:"Native apps",items:["Separate implementations for each OS","Most control over platform-specific features","More involved development effort","Can suit specialized functionality"]},
];

const process = [
  {title:"Discover",copy:"Understand your customers, business goals, mobile performance, and what the app needs to make easier."},
  {title:"Design",copy:"Map core journeys and shape the screens around your brand and customer needs."},
  {title:"Build and integrate",copy:"Develop the app and connect it to Shopify and the systems it needs."},
  {title:"Test and release",copy:"Review device behavior, key flows, integrations, and app-store requirements before launch."},
  {title:"Learn and improve",copy:"Use app feedback and performance signals to plan new features and refinements."},
];

const faqs = [
  ["Do I need a mobile app if my Shopify store works on mobile?", "A responsive site helps customers discover and shop your brand. An app can support repeat customers with a dedicated experience, saved preferences, and opt-in notifications. Whether it makes sense depends on your audience and goals."],
  ["Will the app stay connected to Shopify?", "The app can integrate with Shopify for product, inventory, customer, and order data. The exact data and workflows depend on your requirements and integrations."],
  ["Should we build native or cross-platform?", "It depends on the features, budget, and release plan. Cross-platform development can support both major mobile platforms from a shared codebase; native apps can suit platform-specific requirements."],
  ["How long does it take to build a Shopify mobile app?", "Timing depends on the feature set, integrations, design scope, and release requirements. Discovery helps outline a practical timeline."],
  ["Do you help submit the app to app stores?", "We can plan the release process, prepare app-store materials, and support submission requirements for Apple and Google platforms."],
  ["Can an app support loyalty and subscriptions?", "Loyalty, subscription, and review features can be considered as part of the integration plan, depending on the providers and APIs involved."],
  ["Can we start with a progressive web app?", "A progressive web app can be a useful option when you want app-like web functionality without starting with an app-store release."],
  ["Do you provide support after launch?", "Ongoing support can include OS updates, app maintenance, new functionality, and improvements based on customer feedback."],
] as const;

function ContactLink({children}:{children:React.ReactNode}) {
  return <Link href="/contact?service=Shopify%20Mobile%20App" className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export default function ShopifyMobileAppPage() {
  const [openBenefit,setOpenBenefit]=useState(0);
  const [openFaq,setOpenFaq]=useState<number|null>(0);
  return <main className={styles.page} id="main">
    <section className={styles.hero} aria-labelledby="mobile-app-title">
      <Image className={styles.heroImage} src="/site-assets/services-mobile.webp" alt="Customer browsing a mobile commerce experience" fill sizes="100vw" preload />
      <div className={styles.heroInner}><div className={styles.heroCopy}>
        <span className={styles.eyebrow}>SHOPIFY MOBILE APP DEVELOPMENT</span>
        <h1 id="mobile-app-title">A Better Mobile Journey<span>From First Tap to Repeat Order</span></h1>
        <p>Build a mobile app connected to your Shopify store, designed around your customers, products, and the reasons they come back.</p>
        <ContactLink>Talk to Our Mobile App Team</ContactLink>
      </div></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Mobile App Development</span></div></nav>

    <section className={styles.industries} id="mobile-commerce" aria-labelledby="mobile-commerce-title">
      <div className={styles.industryIntro}><span className={styles.kicker}>MOBILE IS A CUSTOMER JOURNEY</span><h2 id="mobile-commerce-title">Make Mobile Shopping Feel Like It Belongs to Your Brand</h2><p>Your mobile site helps new shoppers find you. An app can offer returning customers another way to browse, reconnect, and shop. The right experience starts with what your customers need—not the channel alone.</p><div className={styles.industryImage}><Image src="/site-assets/services-mobile.webp" width={720} height={880} alt="Shopper using a mobile device" sizes="(max-width: 700px) 100vw, 40vw" loading="lazy"/></div></div>
      <div className={styles.industryList} role="list" aria-label="Mobile app opportunities">{benefits.map((item,index)=><article className={`${styles.industryItem} ${openBenefit===index?styles.industryOpen:""}`} key={item.name}><h3><button type="button" aria-expanded={openBenefit===index} onClick={()=>setOpenBenefit(openBenefit===index?-1:index)}><span>{item.name}</span><b aria-hidden="true">{openBenefit===index?"−":"+"}</b></button></h3>{openBenefit===index&&<p>{item.copy}</p>}</article>)}</div>
    </section>

    <section className={styles.technology} id="mobile-site-vs-app">
      <div className={styles.sectionHead}><span className={styles.kicker}>MOBILE WEBSITE + APP</span><h2>Two Experiences That Can Work Together</h2><p>Your website and app serve different moments in the customer relationship. Choose where each one can add value.</p></div>
      <div className={styles.techGroups}>{comparisons.map((item,index)=><article className={styles.techGroup} key={item.name}><h3><span>0{index+1}</span>{item.name}</h3><div><span>Mobile website: {item.website}</span><span>Mobile app: {item.app}</span></div></article>)}</div>
    </section>

    <section className={`${styles.capabilities} ${styles.charcoalCards}`} aria-labelledby="app-benefits-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>WHAT A MOBILE APP CAN SUPPORT</span><h2 id="app-benefits-title">Give Customers More Reasons to Come Back</h2><p>Bring useful shopping, service, and loyalty features into a mobile experience that fits your brand.</p></div>
        <div className={styles.stageGrid}>{benefits.slice(0,3).map((item,index)=><article className={styles.stageCard} key={item.name}><div className={styles.stageImage}><span>0{index+1}</span><b>MOBILE EXPERIENCE</b></div><div className={styles.stageCopy}><span>APP CAPABILITY</span><h3>{item.name}</h3><p>{item.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.solutions} id="mobile-app-services">
      <div className={styles.sectionHead}><span className={styles.kicker}>FROM FIRST SKETCH TO APP RELEASE</span><h2>Mobile App Services for Shopify Brands</h2><p>Plan the customer experience, app development, store integrations, and release support together.</p></div>
      <div className={styles.solutionGrid}>{appServices.map((item,index)=><article className={styles.solutionCard} key={item.name}><span className={styles.cardNumber}>0{index+1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={styles.retention} id="app-build-approaches">
      <div className={styles.retentionHeading}><div><span className={styles.kicker}>PICK THE RIGHT BUILD APPROACH</span><h2>Choose a Way to Bring Your Brand to Mobile</h2></div><p>Compare speed, flexibility, and ownership needs before choosing an app builder, cross-platform product, or native apps.</p></div>
      <div className={styles.techGroups}>{buildApproaches.map((approach,index)=><article className={styles.techGroup} key={approach.name}><h3><span>0{index+1}</span>{approach.name}</h3><div>{approach.items.map((item)=><span key={item}>{item}</span>)}</div></article>)}</div>
      <ContactLink>Discuss Your App Roadmap</ContactLink>
    </section>

    <section className={styles.capabilities} aria-labelledby="app-process-title">
      <div className={styles.capabilitiesInner}><div className={styles.sectionHeadLight}><span className={styles.kicker}>HOW WE BUILD YOUR APP</span><h2 id="app-process-title">A Clear Path From Idea to Release</h2><p>Keep customer needs, Shopify data, and the app experience connected from discovery through launch.</p></div>
        <div className={styles.stageGrid}>{process.map((step,index)=><article className={styles.stageCard} key={step.title}><div className={styles.stageImage}><span>0{index+1}</span><b>APP DEVELOPMENT</b></div><div className={styles.stageCopy}><span>DELIVERY STEP</span><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>Mobile and Commerce Connected in One Product Team</h2><p>An app should work with the storefront, catalog, customer accounts, and systems behind your Shopify business.</p></div>
      <div className={styles.whyGrid}>{[["Commerce-aware planning","Design the app around store data, customer tasks, and commerce flows."],["Mobile product experience","Build journeys with the interaction patterns people expect on their devices."],["Connected integrations","Coordinate the app with Shopify and relevant services your store uses."],["Ongoing product care","Plan updates, new features, and improvements after the first release."]].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.ctaBanner} id="mobile-app-contact"><div><span>READY WHEN YOU ARE</span><h2>Meet Your Customers Where They Shop</h2><p>Tell us about your brand and customers. We'll help you consider whether an app, a stronger mobile site, or both fit your goals.</p></div><ContactLink>Talk to Our Mobile App Team</ContactLink><div className={styles.ctaDecoration} aria-hidden="true">APP</div></section>

    <section className={styles.faq} id="faqs"><div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Shopify Mobile App FAQs</h2><p>Learn more about mobile app planning, Shopify integration, and launch support.</p><ContactLink>Still wondering? Talk to an expert</ContactLink></div><div className={styles.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?styles.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`mobile-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"−":"+"}</b></button></h3>{openFaq===index&&<p id={`mobile-faq-${index}`}>{answer}</p>}</article>)}</div></section>
  </main>;
}
