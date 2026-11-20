"use client";

import {useState} from "react";
import Link from "next/link";
import type {SitePageContent} from "@/sanity/lib/pages";
import defaultsJson from "../../../../content/shopify-seo-page.json";
import styles from "./shopify-seo.module.css";
import OtherMarketingChannels from "../other-marketing-channels";

type Row = {title: string; description: string};
type FAQ = {question: string; answer: string};
type ImageValue = {src: string; alt: string};
type SeoDefaults = {
  hero: {eyebrow: string; title: string; accent: string; description: string; cta: string; ctaUrl: string};
  intro: {heading: string; copy: string; trustLabel: string};
  services: {heading: string; intro: string; items: Row[]};
  expertise: {heading: string; intro: string; items: Row[]};
  cta: {heading: string; copy: string; label: string; url: string};
  faqs: FAQ[];
  related: {heading: string; items: string[]};
};
type SeoPageContent = SitePageContent & {
  shopifySeoIntroHeading?: string;
  shopifySeoIntroCopy?: string;
  shopifySeoTrustLabel?: string;
  shopifySeoCtaHeading?: string;
  shopifySeoCtaCopy?: string;
  shopifySeoCtaLabel?: string;
  shopifySeoCtaUrl?: string;
  shopifySeoRelatedHeading?: string;
  shopifySeoRelatedItems?: string;
};
const fallback = defaultsJson as SeoDefaults;

function readRows(value: string | undefined, backup: Row[]): Row[] {
  if (!value?.trim()) return backup;
  return value.split(/\r?\n/).map((line) => {
    const divider = line.indexOf("::");
    return {title: (divider < 0 ? line : line.slice(0, divider)).trim(), description: divider < 0 ? "" : line.slice(divider + 2).trim()};
  }).filter((row) => row.title);
}
function readFaqs(value: string | undefined, backup: FAQ[]): FAQ[] {
  if (!value?.trim()) return backup;
  return value.split(/\r?\n/).map((line) => {
    const divider = line.indexOf("::");
    return {question: (divider < 0 ? line : line.slice(0, divider)).trim(), answer: divider < 0 ? "" : line.slice(divider + 2).trim()};
  }).filter((item) => item.question);
}

export default function ShopifySeoExperience({page, images}: {page: SeoPageContent | null; images: Record<string, ImageValue>}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const services = readRows(page?.detailSolutionsItems, fallback.services.items);
  const expertise = readRows(page?.detailCapabilityItems, fallback.expertise.items);
  const faqs = readFaqs(page?.detailFaqItems, fallback.faqs);
  const related = page?.shopifySeoRelatedItems?.split(/\r?\n/).map((item) => item.trim()).filter(Boolean) || fallback.related.items;
  const heroImage = images["shopify-seo-hero"]?.src;
  const ctaUrl = page?.shopifySeoCtaUrl || fallback.cta.url;

  return <main className={styles.page} id="main">
    <section className={styles.hero} style={heroImage ? {backgroundImage: `linear-gradient(90deg,rgba(12,14,23,.91) 0%,rgba(12,14,23,.76) 42%,rgba(12,14,23,.22) 100%),url("${heroImage}")`} : undefined}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{page?.announcement || fallback.hero.eyebrow}</span>
          <h1>{page?.heroTitle || fallback.hero.title}<span>{page?.heroAccent || fallback.hero.accent}</span></h1>
          <p>{page?.heroDescription || fallback.hero.description}</p>
          <Link href={page?.primaryCtaUrl || fallback.hero.ctaUrl} className={styles.primaryButton}>{page?.primaryCta || fallback.hero.cta}<span aria-hidden="true">{"\u2197"}</span></Link>
        </div>
        {images["shopify-seo-google-partner"] && <div className={styles.seoBadge}><img src={images["shopify-seo-google-partner"].src} alt={images["shopify-seo-google-partner"].alt}/><span>{page?.shopifySeoTrustLabel || fallback.intro.trustLabel}</span></div>}
      </div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">SEO</span></div></nav>

    <section className={`${styles.solutions} ${styles.charcoalCards}`} id="seo-services">
      <div className={styles.sectionHead}><span className={styles.kicker}>SHOPIFY SEO SERVICES</span><h2>{page?.detailSolutionsHeading || fallback.services.heading}</h2><p>{page?.detailSolutionsIntro || fallback.services.intro}</p></div>
      <div className={styles.solutionGrid}>{services.map((item, index) => <article className={styles.solutionCard} key={`${item.title}-${index}`}><span className={styles.cardNumber}>0{index + 1}</span><span className={styles.cardMark} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg></span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    </section>

    <section className={`${styles.capabilities} ${styles.lightCapabilities}`} id="seo-expertise">
      <div className={styles.capabilitiesInner}>
        <div className={styles.sectionHeadLight}><span className={styles.kicker}>THE KODRISE APPROACH</span><h2>{page?.detailCapabilitiesHeading || fallback.expertise.heading}</h2><p>{page?.detailCapabilitiesIntro || fallback.expertise.intro}</p></div>
        <div className={styles.stageGrid}>{expertise.map((item, index) => <article className={styles.stageCard} key={`${item.title}-${index}`}><div className={styles.stageImage}><span>0{index + 1}</span><b>0{index + 1}</b></div><div className={styles.stageCopy}><span>SEO EXPERTISE 0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.seoIntro}>
      <div className={styles.seoIntroCopy}><span className={styles.kicker}>ORGANIC SEARCH GROWTH</span><h2>{page?.shopifySeoIntroHeading || fallback.intro.heading}</h2><p>{page?.shopifySeoIntroCopy || fallback.intro.copy}</p><Link href="/contact?service=shopify-seo" className={styles.seoTextLink}>Book a Strategy Call <span aria-hidden="true">{"\u2197"}</span></Link>{images["shopify-seo-claude-partner"] && <img className={styles.claudeBadge} src={images["shopify-seo-claude-partner"].src} alt={images["shopify-seo-claude-partner"].alt} loading="lazy"/>}</div>
      {images["shopify-seo-team"] && <div className={styles.seoTeamImage}><img src={images["shopify-seo-team"].src} alt={images["shopify-seo-team"].alt} loading="lazy"/></div>}
    </section>

    <section className={styles.ctaBanner}>
      <div><span>READY WHEN YOU ARE</span><h2>{page?.shopifySeoCtaHeading || fallback.cta.heading}</h2><p>{page?.shopifySeoCtaCopy || fallback.cta.copy}</p></div>
      <Link href={ctaUrl}>{page?.shopifySeoCtaLabel || fallback.cta.label}<b aria-hidden="true">{"\u2197"}</b></Link>
      <div className={styles.ctaDecoration} aria-hidden="true">SEO</div>
    </section>

    <section className={styles.faq} id="faqs">
      <div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Frequently Asked Questions About Shopify SEO</h2><p>Get answers about improving search visibility and growing organic traffic for your Shopify store.</p><Link href="/contact?service=shopify-seo">Still wondering? Talk to an expert <b aria-hidden="true">{"\u2197"}</b></Link></div>
      <div className={styles.faqList}>{faqs.map((item, index) => <article className={openFaq === index ? styles.faqOpen : ""} key={`${item.question}-${index}`}><h3><button type="button" aria-expanded={openFaq === index} aria-controls={`seo-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{item.question}</span><b aria-hidden="true">{openFaq === index ? "\u2212" : "+"}</b></button></h3>{openFaq === index && <p id={`seo-faq-${index}`}>{item.answer}</p>}</article>)}</div>
    </section>

    <OtherMarketingChannels items={related} heading={page?.shopifySeoRelatedHeading || fallback.related.heading} current="SEO" />
  </main>;
}
