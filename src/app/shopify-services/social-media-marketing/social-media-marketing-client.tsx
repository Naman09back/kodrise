"use client";

import {useState} from "react";
import Image from "../shopify-assets";
import Link from "next/link";
import base from "../marketing/shopify-marketing.module.css";
import styles from "./social-media-marketing.module.css";
import OtherMarketingChannels from "../other-marketing-channels";

const services = [
  {title:"Social Media Strategy",copy:"Strategic roadmaps designed for your success."},
  {title:"Social Media Advertising",copy:"Reach your audience where they spend their time."},
  {title:"Social Media Management",copy:"From planning to posting, we handle it all."},
  {title:"Content Creation",copy:"Engaging visuals and compelling copy that captivate."},
  {title:"Engage, Don't Just Post",copy:"Build real relationships with your audience."},
  {title:"Brand Building",copy:"Create a social identity that stands out."},
];

const strengths = [
  {title:"Customized Strategies",copy:"No cookie-cutter solution. Only tailored strategies. Because your store deserves personalization!"},
  {title:"Data-Driven Insights",copy:"We use analytics to guide every decision."},
  {title:"Creative Excellence",copy:"Memorable campaigns that resonate with your audience."},
  {title:"Proven Results",copy:"Increased engagement, conversions, and loyalty."},
];

const faqs = [
  ["What social media services do you offer?", "Our services include platform strategy, social media advertising, account management, content creation, audience engagement, and brand building."],
  ["Which social platforms can you support?", "We can plan social media activity across platforms such as Instagram, Facebook, TikTok, Pinterest, and other channels that fit your audience and goals."],
  ["Do you create social media content?", "Yes. We create social content, campaign concepts, copy, and platform-specific assets based on your brand voice and marketing objectives."],
  ["Can you manage paid and organic social media?", "Yes. We can support organic publishing and paid campaigns, coordinating the two around your audience, offers, and business goals."],
  ["How do you measure social media performance?", "We use relevant analytics to review reach, engagement, traffic, and conversions, then apply those insights to ongoing strategy and creative testing."],
] as const;

export default function SocialMediaMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return <main className={`${base.page} ${styles.page}`} id="main">
    <section className={base.hero} aria-labelledby="social-title">
      <Image className={base.heroImage} src="/site-assets/shopify-social-marketing/hero.webp" alt="Social media marketing team creating a campaign for an ecommerce brand" fill sizes="100vw" preload />
      <div className={base.heroInner}><div className={base.heroCopy}>
        <span className={base.eyebrow}>SHOPIFY SOCIAL MEDIA MARKETING</span>
        <h1 id="social-title">Shopify Social Media Marketing<span>That Builds Demand</span></h1>
        <p>Everything social media, tailored for your brand. Our social media expertise covers everything; paid and organic. With strategies tailored for each platform and form of social media marketing, we are SMM experts you can trust with your ecommerce store.</p>
        <Link href="/contact?service=Shopify%20Social%20Media%20Marketing" className={base.textLink}>Let's Get Started <span aria-hidden="true">{"\u2197"}</span></Link>
      </div></div>
    </section>

    <nav className={base.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><Link href="/shopify-services/marketing">Marketing</Link><span>/</span><span aria-current="page">Social Media Marketing</span></div></nav>

    <section className={`${base.solutions} ${base.charcoalCards}`} id="social-services">
      <div className={base.sectionHead}><span className={base.kicker}>SOCIAL MEDIA SERVICES</span><h2>Everything Social Media, Tailored for Your Brand</h2><p>With strategies tailored for each platform and form of social media marketing, we make sure your business can get the most from social.</p></div>
      <div className={base.solutionGrid}>{services.map((service,index)=><article className={base.solutionCard} key={service.title}><span className={base.cardNumber}>0{index+1}</span><span className={base.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div>
    </section>

    <section className={`${base.why} ${styles.approach}`} id="social-approach"><div className={base.whyHead}><span className={base.kicker}>WHY OUR SOCIAL MEDIA STRATEGIES WORK</span><h2>Why Our Social Media Strategies Actually Work</h2><p>In a world where attention spans are shrinking, we know how to make your brand stand out:</p><Link href="/contact?service=Shopify%20Social%20Media%20Marketing" className={styles.approachLink}>Amplify Your Brand's Performance <span aria-hidden="true">{"\u2197"}</span></Link><p className={styles.approachNote}>Your next level of growth starts here.</p></div>
      <div className={`${base.whyGrid} ${styles.strengthGrid}`}>{strengths.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={base.ctaBanner} id="social-contact"><div><span>READY WHEN YOU ARE</span><h2>Let's Turn Your Ad Budget Into Business Growth</h2><p>Time to turn your social media into a growth engine.</p></div><Link href="/contact?service=Shopify%20Social%20Media%20Marketing">Get a Quote <b aria-hidden="true">{"\u2197"}</b></Link><div className={base.ctaDecoration} aria-hidden="true">SOCIAL</div></section>

    <section className={base.faq} id="faqs"><div className={base.faqIntro}><span className={base.kicker}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions About Social Media Marketing</h2><p>Find out how a thoughtful social strategy can build relationships and support ecommerce growth.</p><Link href="/contact?service=Shopify%20Social%20Media%20Marketing">Still wondering? Talk to an expert <b aria-hidden="true">{"\u2197"}</b></Link></div><div className={base.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?base.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`social-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"\u2212":"+"}</b></button></h3>{openFaq===index&&<p id={`social-faq-${index}`}>{answer}</p>}</article>)}</div></section>

    <OtherMarketingChannels current="Social Media Marketing" />
  </main>;
}
