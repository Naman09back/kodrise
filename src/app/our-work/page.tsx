import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {defineQuery} from "next-sanity";
import {sanityClient} from "@/sanity/lib/client";
import styles from "./our-work.module.css";

export const metadata: Metadata = {
  title: "Our Work | Kodrise",
  description: "Real teams. Real timelines. Real results. Explore work delivered across analytics, AI, automation, ecommerce, and digital products.",
  alternates: {canonical: "/our-work"},
};

export const dynamic = "force-dynamic";

const OUR_WORK_ASSETS_QUERY = defineQuery(`
  *[_type == "siteAsset" && slot match "our-work-*"]{
    slot,
    alt,
    "src": image.asset->url
  }
`);

type OurWorkAsset = {slot: string; alt?: string; src?: string};

const projects = [
  {
    client: "Acuity Analytics",
    title: "Real-Time Financial Analytics Platform",
    description: "Built scalable analytics pipelines with automated reporting and real-time dashboards.",
    stack: ["Python", "AWS", "Snowflake", "Power BI", "Airflow"],
    challenge: "Fragmented financial datasets and delayed insights impacting decision-making speed.",
    solution: "Built scalable analytics pipelines with automated reporting, real-time KPI dashboards, and high-performance ETL reducing reporting latency.",
    outcome: "Centralized reporting with faster financial decisions and predictive revenue insights.",
    image: "acuity.png",
    imageSlot: "our-work-acuity-analytics",
  },
  {
    client: "Agility Insights",
    title: "Centralized Business Intelligence Platform",
    description: "Implemented centralized BI dashboards with real-time data syncing across enterprise sources.",
    stack: ["Tableau", "SQL", "Python", "AWS Redshift"],
    challenge: "Lack of unified analytics causing slow business intelligence reporting.",
    solution: "Implemented centralized BI dashboards with real-time data syncing, interactive drill-down reporting, and data governance controls.",
    outcome: "Consistent real-time insights with less manual reporting.",
    image: "agility-insights.png",
    imageSlot: "our-work-agility-insights",
  },
  {
    client: "AstraZeneca",
    title: "Secure Data & Analytics Platform",
    description: "Developed secure data platforms with advanced analytics capabilities across research systems.",
    stack: ["Python", "AWS", "Azure", "SQL"],
    challenge: "Data silos affecting research and operational efficiency.",
    solution: "Developed secure data platforms integrating clinical and research data with workflow automation and scalable analytics infrastructure.",
    outcome: "Improved secure research access with advanced analytics dashboards.",
    image: "astrazeneca.png",
    imageSlot: "our-work-astrazeneca",
  },
  {
    client: "Bath Fitter",
    title: "Workflow & Scheduling Automation",
    description: "Digitized operations with automated workflows and a customer management system.",
    stack: ["React", "Node.js", "AWS", "PostgreSQL"],
    challenge: "Manual scheduling and order tracking slowed customer service operations.",
    solution: "Digitized operations with automated appointment scheduling, end-to-end order tracking, and CRM-integrated customer lifecycle management.",
    outcome: "Streamlined workflows with real-time status updates for field teams.",
    image: "bath-fitter.png",
    imageSlot: "our-work-bath-fitter",
  },
  {
    client: "HDFC Bank",
    title: "Digital Auto Loan Workflows",
    description: "AEM Forms–based digital workflows to streamline auto loan applications, validation, and approvals.",
    stack: ["Adobe AEM", "Java", "Spring Boot", "AWS"],
    challenge: "Manual and fragmented auto loan application processes led to slower approvals, poor user experience, and high drop-off rates.",
    solution: "Implemented Adobe Experience Manager Forms workflows with dynamic applications, backend loan processing integration, and real-time application tracking.",
    outcome: "End-to-end digital onboarding with reduced manual intervention.",
    image: "hdfc-bank.png",
    imageSlot: "our-work-hdfc-bank",
  },
  {
    client: "Propic",
    title: "AI Lead Scoring & Automation",
    description: "Developed AI-driven lead scoring and an automated engagement platform.",
    stack: ["React", "Node.js", "TensorFlow", "AWS", "MongoDB"],
    challenge: "Low conversion rates due to inefficient lead qualification in real estate workflows.",
    solution: "Developed AI-driven lead scoring, smart property recommendations, and automated follow-up sequences synced with CRM in real time.",
    outcome: "Improved qualification accuracy and conversion funnel optimization.",
    image: "propic.png",
    imageSlot: "our-work-propic",
  },
  {
    client: "Rocket Learning",
    title: "Scalable EdTech Platform",
    description: "Built a scalable learning platform with analytics-driven insights for diverse learners.",
    stack: ["React Native", "Node.js", "Firebase", "AWS"],
    challenge: "Scaling early education delivery across a large, diverse user base.",
    solution: "Built scalable mobile-first content delivery with engagement tracking, multilingual support, and analytics for learning outcomes.",
    outcome: "Improved accessibility and stronger learner engagement at scale.",
    image: "rocket-learning.png",
    imageSlot: "our-work-rocket-learning",
  },
  {
    client: "Salesforce",
    title: "CRM Automation & Customization",
    description: "Custom CRM workflows, LWC components, and integrations for enterprise operations.",
    stack: ["Salesforce", "Apex", "LWC", "Flows", "REST APIs"],
    challenge: "Complex CRM workflows and lack of automation in enterprise processes.",
    solution: "Optimized CRM data models across core objects, built scalable LWC components, implemented Flows and validations, and integrated external systems via REST APIs.",
    outcome: "More efficient CRM processes with automated workflows and accurate reporting.",
    image: "salesforce.png",
    imageSlot: "our-work-salesforce",
  },
  {
    client: "Tailored Brands",
    title: "Omnichannel Retail & Personalization",
    description: "Built a scalable e-commerce backend with personalized recommendation engines.",
    stack: ["Java", "Spring Boot", "AWS", "Elasticsearch"],
    challenge: "Inefficient inventory and personalization across omnichannel retail systems.",
    solution: "Built scalable e-commerce services with real-time inventory sync, AI-based recommendations, and performance optimization for high-traffic events.",
    outcome: "Faster product discovery and improved inventory consistency.",
    image: "tailored-brands.png",
    imageSlot: "our-work-tailored-brands",
  },
  {
    client: "Telus",
    title: "Scalable Fintech Infrastructure",
    description: "Built resilient backend systems with optimized data processing pipelines.",
    stack: ["Node.js", "Kafka", "AWS", "PostgreSQL"],
    challenge: "Scaling fintech infrastructure for faster and reliable transactions.",
    solution: "Built resilient backend systems with distributed transaction processing, event-driven architecture, and low-latency data pipelines.",
    outcome: "Resilient real-time financial transaction processing.",
    image: "telus.png",
    imageSlot: "our-work-telus",
  },
  {
    client: "Uplevyl",
    title: "AI-Driven Coaching Experience",
    description: "Enhanced the platform with AI-driven user journeys and analytics tracking.",
    stack: ["React", "Firebase", "Node.js", "AWS"],
    challenge: "Low engagement in the digital coaching platform due to lack of personalization.",
    solution: "Enhanced the platform with personalized coaching journeys, engagement analytics, and scalable backend systems for a growing user base.",
    outcome: "Higher engagement and real-time visibility into user behavior.",
    image: "uplevyl.png",
    imageSlot: "our-work-uplevyl",
  },
];

const technologyStack = ["Python", "AWS", "Salesforce", "Snowflake", "Power BI", "Adobe AEM", "Tableau", "React", "Node.js", "Java", "Kafka", "TensorFlow", "PostgreSQL", "MongoDB", "Azure", "AI/ML"];

const heroImages = [
  {slot: "our-work-hero-salesforce", file: "hero-salesforce.png", alt: "Salesforce"},
  {slot: "our-work-hero-uplevyl", file: "hero-uplevyl.png", alt: "Uplevyl"},
  {slot: "our-work-hero-agility-insights", file: "hero-agility.png", alt: "Agility Insights"},
  {slot: "our-work-hero-astrazeneca", file: "hero-astrazeneca.png", alt: "AstraZeneca"},
];

export default async function OurWorkPage() {
  const records = await sanityClient.fetch<OurWorkAsset[]>(OUR_WORK_ASSETS_QUERY).catch((error: unknown) => {
    const message = error instanceof Error
      ? `${error.message}${error.cause instanceof Error ? ` (${error.cause.message})` : ""}`
      : error;
    console.error("Could not fetch Our Work images from Sanity:", message);
    return [];
  });
  const assets = Object.fromEntries(records.filter((record) => record.src).map((record) => [record.slot, record]));
  const trustedBrands = assets["our-work-trusted-brands"] as OurWorkAsset | undefined;

  return <main id="main" className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <div className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><span>Our Work</span></div>
          <span className={styles.eyebrow}>CASE STUDIES</span>
          <h1>Real Teams. Real Timelines. Real Results.</h1>
          <p>A look at how companies used AP Consultancy to scale their engineering capacity — without the hiring bottleneck.</p>
        </div>
        <div className={styles.heroVisual} aria-label="Projects delivered for Salesforce, Uplevyl, Agility Insights, and AstraZeneca">
          {heroImages.map((image, index) => <div className={`${styles.heroImage} ${styles[`heroImage${index + 1}`]}`} key={image.alt}>
            <Image src={assets[image.slot]?.src ?? `/our-work/${image.file}`} alt={assets[image.slot]?.alt ?? image.alt} fill preload={index === 0} unoptimized sizes="(max-width: 700px) 40vw, 22vw" />
          </div>)}
          <span className={styles.heroIndex}>KODRISE / SELECTED WORK</span>
        </div>
      </div>
    </section>

    <section className={styles.trusted} aria-label="Trusted delivery">
      <Image src={trustedBrands?.src ?? "/our-work/trusted-brands.png"} alt={trustedBrands?.alt ?? "Trusted delivery — A view of some of the best brands we have worked with."} width={1600} height={420} unoptimized sizes="(max-width: 800px) 100vw, 1280px" />
    </section>

    <section className={styles.projects} aria-labelledby="projects-title">
      <header className={styles.sectionHead}>
        <div><span className={styles.eyebrow}>OUR WORK</span><h2 id="projects-title">Selected projects</h2></div>
        <p>Explore the goals, decisions, and outcomes behind work delivered by Kodrise.</p>
      </header>
      <div className={styles.projectGrid}>
        {projects.map((project, index) => <article className={styles.projectCard} key={project.client}>
          <div className={styles.projectImage}>
            <Image src={assets[project.imageSlot]?.src ?? `/our-work/${project.image}`} alt={assets[project.imageSlot]?.alt ?? project.client} fill unoptimized sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
            <span>{String(index + 1).padStart(2, "0")} / {project.client}</span>
          </div>
          <div className={styles.projectBody}>
            <h3>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
            <div className={styles.stack} aria-label="Technology stack">{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
            <div className={styles.detail}><h4>Challenge</h4><p>{project.challenge}</p></div>
            <div className={styles.detail}><h4>Solution</h4><p>{project.solution}</p></div>
            <div className={styles.outcome}><span>OUTCOME</span><p>{project.outcome}</p></div>
          </div>
        </article>)}
      </div>
    </section>

    <section className={styles.technology} aria-labelledby="technology-title">
      <div className={styles.technologyHead}><div><span className={styles.eyebrow}>TECHNOLOGY STACK</span><h2 id="technology-title">Built with the tools modern enterprises already trust.</h2></div><p>Cloud infrastructure, data engineering, CRM automation, analytics, and product development come together in one delivery system.</p></div>
      <div className={styles.technologyGrid}>{technologyStack.map((technology) => <article key={technology}><span aria-hidden="true">↗</span><h3>{technology}</h3></article>)}</div>
    </section>
  </main>;
}
