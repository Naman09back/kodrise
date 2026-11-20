"use client";

import {useState} from "react";
import Link from "next/link";
import type {SitePageContent} from "@/sanity/lib/pages";
import defaultsJson from "../../../../content/generative-ai-page.json";
import styles from "./generative-ai-page.module.css";

type Item = {title: string; description: string; image?: string};
type Group = {title: string; items: string[]};
type FAQ = {question: string; answer: string};
type ImageValue = {src: string; alt: string};
type PageDefaults = {
  hero: {eyebrow: string; title: string; accent: string; description: string; cta: string; ctaUrl: string};
  solutions: {heading: string; intro: string; items: Item[]};
  capabilities: {heading: string; intro: string; items: Item[]};
  industries: {intro: string; items: Item[]};
  why: {intro: string; items: Item[]};
  caseStudiesIntro: string;
  creative: {heading: string; intro: string; items: Item[]};
  technology: {intro: string; groups: Group[]};
  faqs: FAQ[];
};
const fallback = defaultsJson as PageDefaults;

function readRows(value: string | undefined, backup: Item[]): Item[] {
  if (!value?.trim()) return backup;
  return value.split(/\r?\n/).map((line, index) => {
    const divider = line.indexOf("::");
    const title = (divider < 0 ? line : line.slice(0, divider)).trim();
    const description = divider < 0 ? "" : line.slice(divider + 2).trim();
    return {title, description, image: backup[index]?.image};
  }).filter((item) => item.title);
}

function readGroups(value: string | undefined, backup: Group[]): Group[] {
  if (!value?.trim()) return backup;
  return value.split(/\r?\n/).map((line) => {
    const divider = line.indexOf("::");
    if (divider < 0) return {title: line.trim(), items: []};
    return {title: line.slice(0, divider).trim(), items: line.slice(divider + 2).split(",").map((item) => item.trim()).filter(Boolean)};
  }).filter((group) => group.title);
}

function readFaqs(value: string | undefined, backup: FAQ[]): FAQ[] {
  if (!value?.trim()) return backup;
  return value.split(/\r?\n/).map((line) => {
    const divider = line.indexOf("::");
    return {question: (divider < 0 ? line : line.slice(0, divider)).trim(), answer: divider < 0 ? "" : line.slice(divider + 2).trim()};
  }).filter((item) => item.question);
}

export default function GenerativeAiExperience({page, images, heroImage}: {
  page: SitePageContent | null;
  images: Record<string, ImageValue>;
  heroImage?: string;
}) {
  const [openIndustry, setOpenIndustry] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const solutions = readRows(page?.detailSolutionsItems, fallback.solutions.items);
  const capabilities = readRows(page?.detailCapabilityItems, fallback.capabilities.items);
  const industries = readRows(page?.detailIndustryItems, fallback.industries.items);
  const reasons = readRows(page?.detailWhyItems, fallback.why.items);
  const creative = readRows(page?.detailCreativeItems, fallback.creative.items);
  const techGroups = readGroups(page?.detailTechnologyItems, fallback.technology.groups);
  const faqs = readFaqs(page?.detailFaqItems, fallback.faqs);
  const hero = heroImage ? {backgroundImage: `linear-gradient(90deg,rgba(12,14,23,.91) 0%,rgba(12,14,23,.76) 42%,rgba(12,14,23,.12) 100%),url("${heroImage}")`} : undefined;
  const cta = page?.primaryCtaUrl || fallback.hero.ctaUrl;

  return <main className={styles.page}>
    <section className={styles.hero} style={hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{page?.announcement || fallback.hero.eyebrow}</span>
          <h1>{page?.heroTitle || fallback.hero.title}<span>{page?.heroAccent || fallback.hero.accent}</span></h1>
          <p>{page?.heroDescription || fallback.hero.description}</p>
          <Link href={cta} className={styles.primaryButton}>{page?.primaryCta || fallback.hero.cta}<span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span>/</span><Link href="/services">AI Services</Link><span>/</span><span aria-current="page">Generative AI</span></div></nav>

    <section className={styles.solutions} id="solutions">
      <div className={styles.sectionHead}>
        <span className={styles.kicker}>WHAT WE BUILD</span>
        <h2>{page?.detailSolutionsHeading || fallback.solutions.heading}</h2>
        <p>{page?.detailSolutionsIntro || fallback.solutions.intro}</p>
      </div>
      <div className={styles.solutionGrid}>{solutions.map((item, index) => <article className={styles.solutionCard} key={`${item.title}-${index}`}>
        <span className={styles.cardNumber}>0{index + 1}</span><span className={styles.cardMark} aria-hidden="true">✳</span>
        <h3>{item.title}</h3><p>{item.description}</p>
      </article>)}</div>
    </section>

    <section className={styles.capabilities} id="capabilities">
      <div className={styles.capabilitiesInner}>
        <div className={styles.sectionHeadLight}>
          <span className={styles.kicker}>FROM IDEA TO IMPACT</span>
          <h2>{page?.detailCapabilitiesHeading || fallback.capabilities.heading}</h2>
          <p>{page?.detailCapabilitiesIntro || fallback.capabilities.intro}</p>
        </div>
        <div className={styles.stageGrid}>{capabilities.map((item, index) => {
          const image = images[item.image || ""];
          return <article className={styles.stageCard} key={`${item.title}-${index}`}>
            <div className={styles.stageImage}>{image ? <img src={image.src} alt={image.alt || item.title} loading="lazy" /> : <span>0{index + 1}</span>}<b>0{index + 1}</b></div>
            <div className={styles.stageCopy}><span>STAGE 0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div>
          </article>;
        })}</div>
      </div>
    </section>

    <section className={styles.industries} id="industries">
      <div className={styles.industryIntro}>
        <span className={styles.kicker}>BUILT AROUND YOUR BUSINESS</span>
        <h2>Industries we transform with Generative AI</h2>
        <p>{page?.detailIndustriesIntro || fallback.industries.intro}</p>
        <div className={styles.industryImage}>{images["generative-ai-applications"] ? <img src={images["generative-ai-applications"].src} alt={images["generative-ai-applications"].alt} loading="lazy" /> : <div className={styles.aiVisual} aria-hidden="true"><span>AI</span><i /><b /></div>}</div>
      </div>
      <div className={styles.industryList} role="list" aria-label="Industries served">
        {industries.map((item, index) => <article className={`${styles.industryItem} ${openIndustry === index ? styles.industryOpen : ""}`} key={`${item.title}-${index}`}>
          <h3><button type="button" aria-expanded={openIndustry === index} onClick={() => setOpenIndustry(openIndustry === index ? -1 : index)}><span>{item.title}</span><b aria-hidden="true">{openIndustry === index ? "−" : "+"}</b></button></h3>
          {openIndustry === index && <p>{item.description}</p>}
        </article>)}
      </div>
    </section>

    <section className={styles.why}>
      <div className={styles.whyHead}><span className={styles.kicker}>WHY KODRISE</span><h2>Make generative AI work for your business.</h2><p>{page?.detailWhyIntro || fallback.why.intro}</p></div>
      <div className={styles.whyGrid}>{reasons.map((item, index) => <article key={`${item.title}-${index}`}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    </section>

    <section className={styles.caseStudies}>
      <div className={styles.caseHead}><div><span className={styles.kicker}>SELECTED WORK</span><h2>AI solutions built for real business challenges</h2></div><p>{page?.detailCaseStudiesIntro || fallback.caseStudiesIntro}</p></div>
      <div className={styles.caseGrid}>
        {[
          {title:"HireGroww", label:"AI-POWERED HIRING PLATFORM", image:images["portfolio-hiregroww"], description:"A skill-based hiring experience designed to make screening, assessment, and candidate evaluation clearer."},
          {title:"CalCounts", label:"AI NUTRITION & FITNESS APP", image:images["portfolio-calcounts"], description:"A nutrition platform that helps people track meals and make informed choices with AI-powered insights."},
          {title:"ScribeFlo", label:"AI MEDICAL SCRIBE", image:images["portfolio-scribeflo"], description:"A clinical documentation workflow that gives care teams more time for patient conversations."},
        ].map((item) => <article className={styles.caseCard} key={item.title}>
          <div className={styles.caseImage}>{item.image ? <img src={item.image.src} alt={item.image.alt || item.title} loading="lazy" /> : <div className={styles.caseFallback}>{item.title}</div>}</div>
          <div className={styles.caseCopy}><span>{item.label}</span><h3>{item.title}</h3><p>{item.description}</p><Link href="/portfolio">View our work <b aria-hidden="true">↗</b></Link></div>
        </article>)}
      </div>
    </section>

    <section className={styles.creative}>
      <div className={styles.creativeImage}>{images["generative-ai-consultation"] ? <img src={images["generative-ai-consultation"].src} alt={images["generative-ai-consultation"].alt} loading="lazy" /> : <span>GenAI</span>}<div>Ideas into<br /><strong>intelligence.</strong></div></div>
      <div className={styles.creativeContent}><span className={styles.kicker}>CREATE MORE WITH AI</span><h2>{page?.detailCreativeHeading || fallback.creative.heading}</h2><p>{page?.detailCreativeIntro || fallback.creative.intro}</p>
        <div className={styles.creativeGrid}>{creative.map((item, index) => <article key={`${item.title}-${index}`}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
      </div>
    </section>

    <section className={styles.ctaBanner}>
      <div><span>LET'S BUILD WHAT'S NEXT</span><h2>Ready to put Generative AI to work?</h2><p>Talk with our team about a use case, a product idea, or an AI workflow you want to improve.</p></div>
      <Link href={cta}>Book a conversation <b aria-hidden="true">↗</b></Link>
      <div className={styles.ctaDecoration} aria-hidden="true">G</div>
    </section>

    <section className={styles.technology} id="technology">
      <div className={styles.sectionHead}><span className={styles.kicker}>TOOLS THAT FIT YOUR GOALS</span><h2>Technology stack for Generative AI</h2><p>{page?.detailTechnologyIntro || fallback.technology.intro}</p></div>
      <div className={styles.techGroups}>{techGroups.map((group, index) => <article className={styles.techGroup} key={`${group.title}-${index}`}><h3><span>0{index + 1}</span>{group.title}</h3><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
    </section>

    <section className={styles.faq} id="faqs">
      <div className={styles.faqIntro}><span className={styles.kicker}>QUESTIONS, ANSWERED</span><h2>Frequently asked questions</h2><p>Learn more about how generative AI services fit your product, data, and business goals.</p><Link href="/contact">Still have a question? Talk to our team <b aria-hidden="true">↗</b></Link></div>
      <div className={styles.faqList}>{faqs.map((item, index) => <article className={openFaq === index ? styles.faqOpen : ""} key={`${item.question}-${index}`}>
        <h3><button type="button" aria-expanded={openFaq === index} aria-controls={`genai-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{item.question}</span><b aria-hidden="true">{openFaq === index ? "−" : "+"}</b></button></h3>
        {openFaq === index && <p id={`genai-faq-${index}`}>{item.answer}</p>}
      </article>)}</div>
    </section>
  </main>;
}
