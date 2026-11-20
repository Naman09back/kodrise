import Link from "next/link";
import { Fragment } from "react";
import type { SitePageContent } from "@/sanity/lib/pages";
import styles from "./process-page.module.css";

type ProcessImage = { src: string; alt: string };
type Props = { page: SitePageContent | null; images: Record<string, ProcessImage> };

const executionPhases = [
  { title: "BD Phase", icon: "▤", points: ["Understand the business goals and users", "Review the existing product and constraints", "Agree on scope, priorities, and success measures", "Share the discovery summary for review"] },
  { title: "Consolidation Phase", icon: "⌘", points: ["Consolidate requirements and user stories", "Map important journeys and information flows", "Confirm assumptions, priorities, and acceptance criteria", "Align on the technical approach"] },
  { title: "Design Phase", icon: "◇", points: ["Prepare user flows and interface concepts", "Review wireframes and prototypes together", "Refine the experience from your feedback", "Approve the design direction before build"] },
  { title: "Development Sprints", icon: "▣", points: ["Plan focused work in short increments", "Build and review working product features", "Share regular demos and progress updates", "Adjust priorities as the product evolves"] },
  { title: "Documentation", icon: "▤", points: ["Prepare project and technical notes", "Record key implementation decisions", "Share the agreed delivery documentation", "Get handover materials ready for your team"] },
  { title: "Project Closure", icon: "✓", points: ["Test features against agreed requirements", "Review the product with your team", "Coordinate launch and deployment", "Discuss support and future improvements"] },
];

const deliverables = [
  ["Requirements & Approval", "A clear record of project goals, features, assumptions, priorities, and acceptance criteria before implementation begins."],
  ["Product Specification", "A practical reference for the scope, key user journeys, technical direction, and delivery plan."],
  ["Scope Confirmation", "A shared understanding of what will be delivered, how it will be reviewed, and what comes next."],
  ["Project Coordination", "A clear point of contact keeps decisions, updates, and feedback moving throughout the engagement."],
  ["Wireframes & Design", "User flows and interface designs help you review the product experience before development."],
  ["Development", "Working features are implemented in reviewable increments against the agreed priorities."],
  ["Testing", "We check key journeys, fix identified issues, and support your user acceptance review."],
  ["Final Review & Approval", "We review the agreed scope with your team and address release-blocking feedback."],
  ["Launch & Handover", "We coordinate deployment and hand over the agreed project and technical documentation."],
];

const toolRows = [
  ["Design", ["Figma", "Illustrator", "Adobe XD", "After Effects", "Sketch", "InVision"]],
  ["Mobile", ["Java", "Kotlin", "Swift", "SQLite", "React Native", "Flutter", "Objective-C"]],
  ["Web", ["Angular", "Node.js", "React", "PHP", "Magento"]],
  ["Platform", ["AWS", "Azure", "Google Cloud"]],
  ["Technologies", ["PHP", "C++", "Ruby on Rails", "Ruby", "Java"]],
  ["Server Side", ["MongoDB", "Cassandra", "PostgreSQL", "SQL Server", "Oracle", "SQLite", "Apache"]],
];

const models = [
  { icon: "$", title: "Fixed Price Model", copy: "A good fit for a clearly defined scope, agreed requirements, and a delivery plan with milestones." },
  { icon: "⌛", title: "Time and Material Model", copy: "For evolving requirements and ongoing work, this model lets you adjust priorities as the project progresses." },
  { icon: "⌘", title: "Dedicated Development Team", copy: "Add a committed engineering team that works alongside yours on a continuing product roadmap." },
];

const safeguards = [
  ["Confidentiality Agreements", "We can agree confidentiality terms, including an NDA, before sharing sensitive project information."],
  ["Careful Project Access", "We plan access to project materials and systems around the people and work involved."],
  ["Clear Working Boundaries", "Roles, responsibilities, and communication are agreed with you at the start of the engagement."],
  ["Structured Handover", "We provide agreed project documentation and handover information when work is delivered."],
];

export default function ProcessExperience({ page, images }: Props) {
  const banner = images["process-methodology-banner"];
  const agile = images["process-methodology-agile"];
  const heroBackground = banner
    ? `linear-gradient(90deg,rgba(13,15,22,.94) 0%,rgba(13,15,22,.78) 42%,rgba(13,15,22,.12) 100%),url("${banner.src}")`
    : "linear-gradient(110deg,#16171e,#242832 60%,#574f67)";

  return <main className={styles.page}>
    <section className={styles.hero} style={{ backgroundImage: heroBackground }}>
      <div className={styles.heroInner}>
        <span className={styles.heroEyebrow}>{page?.announcement || "DISCOVER. IDENTIFY. EXPLORE"}</span>
        <h1>{page?.heroTitle || "Our Process and"}<br /><strong>{page?.heroAccent || "Development Methodology"}</strong></h1>
        <p>{page?.heroDescription || "A walkthrough of our simple, collaborative approach to digital product and software development."}</p>
        <Link className={styles.heroButton} href={page?.primaryCtaUrl || "/contact"}>{page?.primaryCta || "Start Your Project"}<span aria-hidden="true">↗</span></Link>
      </div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Process Methodology</span></div></nav>

    <section className={styles.agile}>
      <div className={styles.agileInner}>
        <div className={styles.agileCopy}>
          <h2>From Agility to Action: Get Instant, Intimate Value at Scale</h2>
          <p>We use an agile way of working to keep communication transparent, collaboration close, and priorities clear. Short delivery cycles help us respond to change, review progress together, and keep creating value as the product takes shape.</p>
        </div>
        {agile && <img className={styles.agileImage} src={agile.src} alt={agile.alt} />}
      </div>
    </section>

    <section className={styles.structure}>
      <div className={styles.structureInner}>
        <h2>Our Project Execution Structure</h2>
        <p className={styles.structureIntro}>Our cross-functional team supports you at every stage. We adapt the process to your needs and keep each step connected to the product vision and agreed outcomes.</p>
        <div className={styles.phaseGrid}>
          {executionPhases.map((phase, index) => <article className={styles.phase} key={phase.title}>
            <h3><span aria-hidden="true">{phase.icon}</span>{phase.title}</h3>
            <ul>{phase.points.map((point) => <li key={point}>{point}</li>)}</ul>
            {index < executionPhases.length - 1 && <span className={styles.flowArrow} aria-hidden="true">{index % 2 === 0 ? "›" : "‹"}</span>}
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.deliverables}>
      <div className={styles.deliverablesInner}>
        <div className={styles.splitHeading}><h2>Our Deliverables</h2><p>We keep you informed about the work, decisions, and outputs at every stage. Together, we confirm the scope and reviews needed to move the project forward with clarity.</p></div>
        <div className={styles.deliverableGrid}>{deliverables.map(([title, copy], index) => <article key={title}><span className={styles.deliverableIcon} aria-hidden="true">{["▢", "✦", "☑", "♙", "⌗", "‹›", "✓", "▣", "↗"][index]}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.tools}>
      <div className={styles.toolsInner}>
        <div className={styles.splitHeading}><h2>Tools &amp; Technologies We Use For Mobile &amp; Web App Development</h2><p>We choose tools and frameworks to suit the product, team, and technical requirements. Here are some of the technologies our team can work with.</p></div>
        <div className={styles.toolRows}>{toolRows.map(([category, names]) => <div className={styles.toolRow} key={category as string}><h3>{category}</h3><ul>{(names as string[]).map((name) => <Fragment key={name}>{category === "Server Side" && name === "Apache" && <li className={styles.wrapBreak} aria-hidden="true" />}<li><span aria-hidden="true">{name.slice(0, 1)}</span>{name}</li></Fragment>)}</ul></div>)}</div>
      </div>
    </section>

    <section className={styles.models}>
      <div className={styles.modelsInner}>
        <div className={styles.splitHeading}><h2>Flexible Working Models to Meet Your Specific Needs</h2><p>We offer different engagement models to fit your requirements, team structure, and preferred way of managing delivery.</p></div>
        <div className={styles.modelGrid}>{models.map((model) => <article key={model.title}><span className={styles.modelIcon} aria-hidden="true">{model.icon}</span><h3>{model.title}</h3><p>{model.copy}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.security}>
      <div className={styles.securityInner}>
        <h2>Your Ideas Are Always Safe With Us</h2>
        <p className={styles.securityIntro}>We treat your project information and intellectual property with care. Confidentiality, access, and handover expectations are agreed as part of the engagement.</p>
        <div className={styles.securityGrid}>{safeguards.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>
  </main>;
}
