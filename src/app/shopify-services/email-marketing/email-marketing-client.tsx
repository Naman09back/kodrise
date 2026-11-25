"use client";

import {useState} from "react";
import Image from "../shopify-assets";
import Link from "next/link";
import base from "../marketing/shopify-marketing.module.css";
import styles from "./email-marketing.module.css";
import OtherMarketingChannels from "../other-marketing-channels";

const benefits = [
  {title:"Personalised Marketing",copy:"Unlike other forms of marketing, email marketing allows you to speak directly to your customers. You can use emails to recommend your products to your customers, offer personalized discounts, and more."},
  {title:"Cost effectiveness",copy:"Email marketing is budget-friendly and powerful. You pay a fixed amount to reach thousands of customers, no extra cost per click. It's a smart way to drive sales without overspending."},
  {title:"Measurable solutions",copy:"Email marketing gives you clear data, no guessing games. You can track who opened, clicked, or made a purchase. This helps you improve results with every send."},
  {title:"Targeted",copy:"Email marketing speaks to the right people at the right time. Whether it's an abandoned cart or a new signup, each message is tailored. That means better chances of turning interest into action."},
  {title:"Re-engage your customer",copy:"Don't let customers slip away. With email marketing, you can remind them of what they left behind or share something new they'll love. It keeps your brand fresh in their minds, and brings them back to buy."},
];

const strengths = [
  {title:"Dedicated expertise",copy:"With a team of over 50+ digital marketing experts, we craft high-performing email campaigns that drive engagement and conversions."},
  {title:"Dynamic content",copy:"We tailor email content based on customer behavior, preferences, or demographics, ensuring every mail resonates with your audience."},
  {title:"Brand-specific strategies",copy:"We devise brand-specific strategies that consider desired audience segments and objectives, including tactics like list segmentation, behavioral triggers, and automation flows."},
  {title:"Adaptability",copy:"We quickly adapt to changing customer needs, preferences, technology, market trends, and conditions."},
  {title:"Communication and Collaboration",copy:"Clear and open communication is essential for a smooth and efficient partnership. We respond and incorporate insights based on your feedback."},
];

const faqs = [
  ["What Makes a Successful E-mail Marketing Campaign?", "A successful email marketing campaign relies on a smart strategy that delivers value to your target audience. Each email needs to be concise, engaging, and informative, offering value without overwhelming the reader. Our in-house marketing specialists will segment your audience, tailor content to their needs and pain points, and ensure every email has a clear purpose and CTA. We focus on maintaining a consistent presence without flooding subscribers' inboxes."],
  ["What metrics should I track for email marketing campaigns?", "Key metrics to track the effectiveness of email marketing campaigns include open rates, click-through rates (CTR), conversion rates, return on investment (ROI), and customer lifetime value (CLTV)."],
  ["What questions should I ask an email marketing agency before hiring them?", "Ask about their process, what's included in the emails, and how they'll segment the contact list. It's also important to note how quickly the agency responds to you during the initial inquiry."],
] as const;

export default function EmailMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return <main className={`${base.page} ${styles.page}`} id="main">
    <section className={base.hero} aria-labelledby="email-title">
      <Image className={base.heroImage} src="/site-assets/shopify-email-marketing/hero.webp" alt="Email marketing campaign being planned for an ecommerce brand" fill sizes="100vw" preload />
      <div className={base.heroInner}><div className={base.heroCopy}>
        <span className={base.eyebrow}>SHOPIFY EMAIL MARKETING</span>
        <h1 id="email-title">Shopify Email Marketing Services<span>That Convert</span></h1>
        <p>Email marketing campaigns significantly impact your business through personalized communication, building credibility, improving sales, strengthening customer relationships, and optimizing time and budget. Email marketing's effectiveness is evident, with 77% of marketers reporting increased engagement.</p>
        <Link href="/contact?service=Shopify%20Email%20Marketing" className={base.textLink}>Get a Quote Now! <span aria-hidden="true">{"\u2197"}</span></Link>
      </div></div>
    </section>

    <nav className={base.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><Link href="/shopify-services/marketing">Marketing</Link><span>/</span><span aria-current="page">Email Marketing</span></div></nav>

    <section className={`${base.solutions} ${base.charcoalCards}`} id="email-benefits">
      <div className={base.sectionHead}><span className={base.kicker}>WHY EMAIL MARKETING</span><h2>Why Email Marketing Is the Key to Ecommerce Success</h2><p>Build customer relationships, improve sales, and make every campaign work harder for your store.</p></div>
      <div className={styles.metrics} aria-label="Email marketing statistics"><article><strong>$18.9B</strong><span>Expected email marketing revenue by 2028</span></article><article><strong>87%</strong><span>Of marketing leaders say email marketing is essential</span></article><article><strong>77%</strong><span>Of marketers report increased engagement</span></article></div>
      <div className={base.solutionGrid}>{benefits.map((item,index)=><article className={base.solutionCard} key={item.title}><span className={base.cardNumber}>0{index+1}</span><span className={base.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={`${base.why} ${styles.approach}`} id="email-approach"><div className={styles.approachIntro}><div><span className={base.kicker}>WHY KODRISE?</span><h2>Make Every Email More Relevant</h2><p>We craft high-performing email campaigns that drive engagement and conversions. Dynamic content, brand-specific strategies, adaptability, and open collaboration help every message speak to your audience.</p></div><div className={styles.teamImage}><Image src="/site-assets/shopify-email-marketing/email-team.webp" alt="Digital marketing team collaborating on an email campaign" width={1000} height={667} sizes="(max-width: 700px) 100vw, 45vw" /></div></div>
      <div className={`${base.whyGrid} ${styles.strengthGrid}`}>{strengths.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={base.ctaBanner} id="email-contact"><div><span>READY WHEN YOU ARE</span><h2>Stand Out in Your Customers' Inbox</h2><p>Let's Make Your Every Mail Count!</p></div><Link href="/contact?service=Shopify%20Email%20Marketing">Get Your Quote Today! <b aria-hidden="true">{"\u2197"}</b></Link><div className={base.ctaDecoration} aria-hidden="true">EMAIL</div></section>

    <section className={base.faq} id="faqs"><div className={base.faqIntro}><span className={base.kicker}>QUESTIONS, ANSWERED</span><h2>Got Questions? We've Got Answers!</h2><p>Learn what makes email a measurable channel for ecommerce growth.</p><Link href="/contact?service=Shopify%20Email%20Marketing">Still wondering? Talk to an expert <b aria-hidden="true">{"\u2197"}</b></Link></div><div className={base.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?base.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`email-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"\u2212":"+"}</b></button></h3>{openFaq===index&&<p id={`email-faq-${index}`}>{answer}</p>}</article>)}</div></section>

    <OtherMarketingChannels current="Email Marketing" />
  </main>;
}
