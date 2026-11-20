"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import base from "../marketing/shopify-marketing.module.css";
import styles from "./ppc.module.css";
import OtherMarketingChannels from "../other-marketing-channels";

const channels = [
  {title:"Google Ads",copy:"Appear at the top of search results when potential customers are actively looking for products or services like yours. Includes Search, Display, Shopping, and YouTube ads."},
  {title:"Meta Ads (Facebook & Instagram)",copy:"Reach your ideal audience on the world's largest social platforms. Use advanced targeting, dynamic creatives, and retargeting to convert browsers into buyers."},
  {title:"TikTok Ads",copy:"Engage with a younger, highly active audience through short-form video ads. Ideal for brand awareness, viral reach, and direct conversions."},
  {title:"Pinterest Ads",copy:"Capture high-intent shoppers as they browse for inspiration. Perfect for lifestyle, fashion, home decor, and ecommerce brands."},
  {title:"Programmatic Ads",copy:"Automated, AI-driven advertising that buys and places ads in real time across multiple platforms, ensuring optimal reach and performance."},
];

const strengths = [
  {title:"Expertise",copy:"Our project leaders bring over 15 years of hands-on experience in running successful ad campaigns. They've navigated every trend, algorithm change, and market shift, so you don't have to."},
  {title:"Strategy",copy:"We craft a full-funnel ad strategy tailored to your business. Starting from identifying your ideal customer (buyer persona) to optimizing performance through rigorous A/B testing."},
  {title:"In-Depth Understanding",copy:"We don't just run ads; we master them. From selecting the right keywords and audience targeting to bid management and campaign optimization, we ensure maximum ROI."},
  {title:"Budget Planning",copy:"Every dollar you invest is strategically allocated to deliver measurable results. Whether it's lead generation, conversions, or brand awareness. No wasted spend, just real revenue growth."},
  {title:"Continuous Optimization & Tracking",copy:"We don't believe in 'set it and forget it.' Through real-time data analysis, constant performance monitoring, and ongoing adjustments, we keep your campaigns at peak efficiency."},
];

const faqs = [
  ["What does Shopify PPC management include?", "PPC management can include campaign planning, audience and keyword research, ad setup, creative testing, budget pacing, conversion tracking, and ongoing optimization across the agreed channels."],
  ["Which paid advertising platforms do you work with?", "We support Google Ads, Meta Ads for Facebook and Instagram, TikTok Ads, Pinterest Ads, and programmatic campaigns. The right mix depends on your products, audience, and goals."],
  ["Can you manage Google Shopping campaigns?", "Yes. We can help plan and optimize Google Shopping campaigns alongside Search, Display, and YouTube advertising, depending on your catalog and campaign objectives."],
  ["How do you improve return on ad spend?", "We review performance across the full customer journey, then test targeting, keywords, creative, landing pages, and budget allocation. Results depend on the offer, market, store experience, and available data."],
  ["What advertising budget should my Shopify store start with?", "There is no single budget that fits every store. We can recommend a starting range after reviewing your products, margins, target markets, competition, and growth goals."],
  ["How soon can I expect to see PPC results?", "Campaigns can begin collecting data soon after launch, but reliable optimization takes testing and time. The pace depends on traffic, budget, conversion volume, and the buying cycle for your products."],
  ["Can PPC work alongside SEO and other marketing channels?", "Yes. Paid campaigns can complement SEO, content, social, and email by connecting discovery, customer acquisition, and retention efforts."],
] as const;

export default function ShopifyPpcPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <main className={`${base.page} ${styles.page}`} id="main">
    <section className={base.hero} aria-labelledby="ppc-title">
      <Image className={base.heroImage} src="/site-assets/shopify-ppc/hero.webp" alt="Paid media campaign planning for ecommerce growth" fill sizes="100vw" priority />
      <div className={base.heroInner}><div className={base.heroCopy}>
        <span className={base.eyebrow}>SHOPIFY PPC SERVICES</span>
        <h1 id="ppc-title">Shopify PPC Services<span>That Scale ROAS</span></h1>
        <p>Make every penny count; in spend and in returns. We build paid advertising campaigns that put your brand in front of the right people and turn clicks into customers.</p>
        <Link href="/contact?service=Shopify%20PPC" className={base.textLink}>Talk to a PPC expert <span aria-hidden="true">{"\u2197"}</span></Link>
      </div><div className={styles.partnerBadge}><Image src="/site-assets/shopify-ppc/google-partner.png" alt="Google Partner" width={150} height={54} /><span>Google Partner<br/><b>Certified</b></span></div></div>
    </section>

    <nav className={base.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><Link href="/shopify-services/marketing">Marketing</Link><span>/</span><span aria-current="page">PPC</span></div></nav>

    <section className={`${base.solutions} ${styles.intro}`}>
      <div className={base.sectionHead}><span className={base.kicker}>SERVICE: PPC</span><h2>Why Paid Ads Matter?</h2><p>Organic growth is great, but paid ads put your brand in front of the right people, instantly. Get visibility, drive conversions, and stay ahead of the competition.</p></div>
      <div className={styles.promise}><span>PAID MEDIA, BUILT AROUND YOUR STORE</span><p>Every click you pay for should bring you closer to your goals. We maximize search intent, optimize keywords, and polish targeting to ensure your ad spend drives real business impact.</p></div>
    </section>

    <section className={base.capabilities} id="ppc-channels">
      <div className={base.capabilitiesInner}><div className={base.sectionHeadLight}><span className={base.kicker}>PAID MEDIA CHANNELS</span><h2>We Convert Clicks into Customers</h2><p>Reach your audience across the platforms where they search, browse, discover, and shop.</p></div>
        <div className={`${base.stageGrid} ${styles.channelGrid}`}>{channels.map((channel,index)=><article className={`${base.stageCard} ${styles.channelCard}`} key={channel.title}><div className={styles.channelNumber}>0{index+1}</div><div className={`${base.stageCopy} ${styles.channelCopy}`}><span>PAID ADVERTISING 0{index+1}</span><h3>{channel.title}</h3><p>{channel.copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className={base.why} id="ppc-expertise"><div className={base.whyHead}><span className={base.kicker}>THE KODRISE APPROACH</span><h2>We Know Paid Media. And Everything About It.</h2><p>Make a considered plan, understand the customer, and keep improving against business results.</p></div>
      <div className={`${base.whyGrid} ${styles.strengthGrid}`}>{strengths.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={base.ctaBanner} id="ppc-contact"><div><span>READY WHEN YOU ARE</span><h2>Let's Dive Into Your PPC Strategy.</h2><p>Make every penny count; in spend and in returns. Book your strategy session today.</p></div><Link href="/contact?service=Shopify%20PPC">Get a Quote <b aria-hidden="true">{"\u2197"}</b></Link><div className={base.ctaDecoration} aria-hidden="true">PPC</div></section>

    <section className={base.faq} id="faqs"><div className={base.faqIntro}><span className={base.kicker}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions About Shopify PPC</h2><p>Learn how paid media can support your store's customer acquisition and growth goals.</p><Link href="/contact?service=Shopify%20PPC">Still wondering? Talk to an expert <b aria-hidden="true">{"\u2197"}</b></Link></div><div className={base.faqList}>{faqs.map(([question,answer],index)=><article className={openFaq===index?base.faqOpen:""} key={question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`ppc-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{question}</span><b aria-hidden="true">{openFaq===index?"\u2212":"+"}</b></button></h3>{openFaq===index&&<p id={`ppc-faq-${index}`}>{answer}</p>}</article>)}</div></section>

    <OtherMarketingChannels current="PPC" />
  </main>;
}
