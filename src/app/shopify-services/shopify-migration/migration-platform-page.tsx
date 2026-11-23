"use client";

import {useState} from "react";
import Link from "next/link";
import base from "../marketing/shopify-marketing.module.css";
import RelatedPlatforms from "./related-platforms";
import type {MigrationPlatform} from "./migration-platform-data";

export default function MigrationPlatformPage({platform}: {platform: MigrationPlatform}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return <main className={base.page} id="main">
    <section className={base.hero} aria-labelledby="migration-title">
      <div className={base.heroInner}><div className={base.heroCopy}>
        <span className={base.eyebrow}>SHOPIFY MIGRATION FROM {platform.name.toUpperCase()}</span>
        <h1 id="migration-title">{platform.title}<span>{platform.accent}</span></h1>
        <p>{platform.intro}</p>
        <Link href={`/contact?service=${encodeURIComponent(`${platform.name} to Shopify Migration`)}`} className={base.textLink}>Plan Your Migration <span aria-hidden="true">{"\u2197"}</span></Link>
      </div></div>
    </section>

    <nav className={base.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><Link href="/shopify-services/shopify-migration">Shopify Migration</Link><span>/</span><span aria-current="page">{platform.name}</span></div></nav>

    <section className={`${base.solutions} ${base.charcoalCards}`} id="migration-services">
      <div className={base.sectionHead}><span className={base.kicker}>MIGRATE FROM {platform.name.toUpperCase()}</span><h2>{platform.serviceHeading}</h2><p>{platform.serviceIntro}</p></div>
      <div className={base.solutionGrid}>{platform.services.map((item,index)=><article className={base.solutionCard} key={item.title}><span className={base.cardNumber}>0{index+1}</span><span className={base.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={base.why} id="migration-approach"><div className={base.whyHead}><span className={base.kicker}>A CLEAR PATH TO SHOPIFY</span><h2>{platform.approachHeading}</h2><p>{platform.approachIntro}</p></div>
      <div className={base.whyGrid}>{platform.approach.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
    </section>

    <section className={base.ctaBanner} id="migration-contact"><div><span>READY WHEN YOU ARE</span><h2>Plan your move from {platform.name} to Shopify</h2><p>Talk with our commerce team about your catalog, integrations, customer experience, and migration goals.</p></div><Link href={`/contact?service=${encodeURIComponent(`${platform.name} to Shopify Migration`)}`}>Talk to our migration team <b aria-hidden="true">{"\u2197"}</b></Link><div className={base.ctaDecoration} aria-hidden="true">MOVE</div></section>

    <section className={base.faq} id="faqs"><div className={base.faqIntro}><span className={base.kicker}>QUESTIONS, ANSWERED</span><h2>{platform.name} to Shopify Migration FAQs</h2><p>Get answers about planning and moving your store to Shopify.</p><Link href={`/contact?service=${encodeURIComponent(`${platform.name} to Shopify Migration`)}`}>Still wondering? Talk to an expert <b aria-hidden="true">{"\u2197"}</b></Link></div><div className={base.faqList}>{platform.faqs.map((item,index)=><article className={openFaq===index?base.faqOpen:""} key={item.question}><h3><button type="button" aria-expanded={openFaq===index} aria-controls={`migration-faq-${index}`} onClick={()=>setOpenFaq(openFaq===index?null:index)}><span>{item.question}</span><b aria-hidden="true">{openFaq===index?"\u2212":"+"}</b></button></h3>{openFaq===index&&<p id={`migration-faq-${index}`}>{item.answer}</p>}</article>)}</div></section>

    <RelatedPlatforms current={platform.slug} />
  </main>;
}
