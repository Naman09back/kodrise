"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import base from "../marketing/shopify-marketing.module.css";
import styles from "./content-marketing.module.css";
import OtherMarketingChannels from "../other-marketing-channels";

const services = [
  {title:"Long Form",copy:"Adding the magic of storytelling in blogs, SEO content, whitepapers, case studies, articles, press releases, and more. Whatever it takes to tell your story, build authority, and rank where it matters."},
  {title:"Crisp and Catchy",copy:"Social media, marketing campaigns, brand identity. We craft scroll-stopping, thumb-stopping, and mind-sticking content."},
  {title:"Scripts",copy:"Rule it on YouTube and other video-based platforms such as TikTok, Instagram, and more with scripts that hook the audience from start to end."},
  {title:"Personalized Emails",copy:"We make inboxes impossible to ignore with our email newsletters, announcements, and cold emails. We write everything."},
  {title:"Thought Leadership",copy:"Your expertise, our words. We shape insights into content that sparks conversations and makes an impact."},
];

const strengths = [
  {title:"No Plagiarism",copy:"All copy is 100% unique, crafted to reflect your brand without shortcuts."},
  {title:"SEO & Structure",copy:"We start with detailed outlines to rank higher, engage users, and drive action."},
  {title:"Customer Profile",copy:"We dig deep to understand your audience, ensuring content speaks directly to them."},
  {title:"Authentic & Impactful",copy:"Conversational, brand-aligned, and free from unnecessary jargon. We keep it real."},
  {title:"Human Content",copy:"Content lovers writing for brands that care. Your voice is crafted by those who get it."},
];

const faqs = [
  ["What types of content do you create?", "We craft everything from blogs, SEO content, and case studies to social media posts, marketing campaigns, and thought leadership pieces. Whether it's long-form, short-form, or video scripts, we've got it covered."],
  ["How do you ensure content is unique and plagiarism-free?", "Every piece is written from scratch, backed by research, and checked with plagiarism detection tools to ensure originality."],
  ["Do you optimize content for SEO?", "Yes, we structure content with SEO best practices, including keyword research, meta descriptions, and reader-friendly formatting to boost rankings."],
  ["Can you match our brand's tone and style?", "Absolutely. We take the time to understand your brand's voice, audience, and messaging to ensure consistency across all content."],
  ["How do you approach writing for different industries?", "We dive deep into industry research, analyze competitors, and tailor content to speak directly to your target audience while maintaining authenticity."],
] as const;

export default function ContentMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return <main className={`${base.page} ${styles.page}`} id="main">
    <section className={base.hero} aria-labelledby="content-title">
      <Image className={base.heroImage} src="/site-assets/shopify-content-marketing/hero.webp" alt="Content marketing team planning an ecommerce campaign" fill sizes="100vw" priority />
      <div className={base.heroInner}><div className={base.heroCopy}>
        <span className={base.eyebrow}>SHOPIFY CONTENT MARKETING</span>
        <h1 id="content-title">Ecommerce Content Marketing Services<span>for DTC Brands</span></h1>
        <p>All our content is written by humans and proofread by humans, to be read by humans. We seek originality through interviews and research, creatively applying your tone of voice.</p>
        <Link href="/contact?service=Shopify%20Content%20Marketing" className={base.textLink}>Get in touch with our humans <span aria-hidden="true">{"\u2197"}</span></Link>
      </div><div className={styles.partnerBadge}><Image src="/site-assets/shopify-content-marketing/google-partner.png" alt="Google Partner Certified" width={150} height={54} /><span>Google Partner<br/><b>Certified</b></span></div></div>
    </section>

    <nav className={base.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><Link href="/shopify-services/marketing">Marketing</Link><span>/</span><span aria-current="page">Content Marketing</span></div></nav>

    <section className={`${base.solutions} ${base.charcoalCards}`} id="content-services">
      <div className={base.sectionHead}><span className={base.kicker}>CONTENT THAT WORKS HARDER</span><h2>Our Content Marketing Services That Set the Bar High!</h2><p>With an equal focus on high-quality content creation and strategies for digital growth, we help you stand out, even in competitive markets.</p></div>
      <div className={base.solutionGrid}>{services.map((service,index)=><article className={base.solutionCard} key={service.title}><span className={base.cardNumber}>0{index+1}</span><span className={base.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div>
    </section>

    <section className={styles.approach} id="content-approach">
      <div className={styles.approachIntro}><div><span className={base.kicker}>WHY US?</span><h2>What Makes Our Content Team Super Humans?</h2><p>We are your plus-one in the content creation process, working with your brand to make better marketing decisions. We shape your expertise into original, authentic content with an equal focus on quality and digital growth.</p></div><div className={styles.teamImage}><Image src="/site-assets/shopify-content-marketing/content-team.webp" alt="Content team collaborating on brand storytelling" width={1000} height={667} sizes="(max-width: 700px) 100vw, 45vw" /></div></div>
      <div className={`${base.whyGrid} ${styles.strengthGrid}`}>{strengths.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={base.ctaBanner} id="content-contact"><div><span>READY WHEN YOU ARE</span><h2>Let's Write Something Amazing Together</h2><p>Tell us about your brand and the content you need.</p></div><Link href="/contact?service=Shopify%20Content%20Marketing">Get a Quote Today <b aria-hidden="true">{"\u2197"}</b></Link><div className={base.ctaDecoration} aria-hidden="true">WORDS</div></section>

    <section className={base.faq} id="faqs"><div className={base.faqIntro}><span className={base.kicker}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions</h2><p>Learn how original, strategic content can support your Shopify store and brand growth.</p><Link href="/contact?service=Shopify%20Content%20Marketing">Still wondering? Talk to an expert <b aria-hidden="true">{"\u2197"}</b></Link></div><div className={base.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?base.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`content-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"\u2212":"+"}</b></button></h3>{openFaq===index&&<p id={`content-faq-${index}`}>{answer}</p>}</article>)}</div></section>

    <OtherMarketingChannels current="Content Marketing" />
  </main>;
}
