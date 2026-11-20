import Link from "next/link";
import type { SitePageContent } from "@/sanity/lib/pages";
import styles from "./ai-services-page.module.css";

type ServiceImage = { src: string; alt: string };
type Props = { page: SitePageContent | null; images: Record<string, ServiceImage> };

const groups = [
  {
    title: "AI Product Development",
    description: "Build intelligent products that make complex work easier and create more useful customer experiences.",
    services: [
      { title: "Generative AI Development", description: "Bring generative AI into your products and workflows with solutions tailored to your data, users, and goals.", href: "/services/generative-ai-development-company", image: "services-ai" },
      { title: "AI App Development", description: "Design and develop AI-powered applications that connect useful intelligence with an intuitive product experience.", href: "/services/ai-app-development-company", image: "services-mobile" },
      { title: "AI Chatbot Development", description: "Create conversational experiences that help customers get answers and teams handle routine requests.", href: "/services/ai-chatbot-development-company", image: "services-web" },
      { title: "Machine Learning", description: "Use machine learning to recognize patterns, support predictions, and improve decisions using your business data.", href: "/services/machine-learning", image: "services-custom" },
    ],
  },
  {
    title: "Agents, Language & Knowledge",
    description: "Connect AI to the information and tools your team already uses, with clear controls and useful outcomes.",
    services: [
      { title: "AI Agent Development", description: "Build task-focused AI agents that can reason through steps and work with approved tools and systems.", href: "/services/ai-agents-and-automation-solutions", image: "services-teams" },
      { title: "Natural Language Processing", description: "Help software understand and work with text through language processing and tailored data pipelines.", href: "/services/nlp-development", image: "services-web" },
      { title: "RAG as a Service", description: "Ground AI responses in trusted business information with retrieval-augmented generation solutions.", href: "/services/rag-as-a-service", image: "services-ai" },
    ],
  },
  {
    title: "AI Strategy & Delivery",
    description: "Move from early AI questions to a considered implementation plan and the skills to deliver it.",
    services: [
      { title: "AI Consulting", description: "Identify practical opportunities, assess readiness, and define a roadmap that fits your organization.", href: "/ai-consulting-services", image: "services-devops" },
      { title: "AI Development Teams", description: "Extend your team with AI engineering experience for discovery, implementation, and ongoing product work.", href: "/services/outsourcing-ai-development", image: "services-teams" },
    ],
  },
];

const pillars = [
  { icon: "AI", title: "Build useful AI products", copy: "From generative AI applications to machine learning features, create software around real user needs." },
  { icon: ">", title: "Automate with intelligence", copy: "Connect agents and language tools to workflows where they can reduce repeated work and help teams move faster." },
  { icon: "OK", title: "Plan for responsible growth", copy: "Start with a clear use case, make thoughtful technology choices, and scale with an approach your team can maintain." },
];

export default function AiServicesExperience({ page, images }: Props) {
  const banner = images["services-banner"];
  const heroBackground = banner
    ? `linear-gradient(90deg,rgba(13,15,22,.88) 0%,rgba(13,15,22,.62) 43%,rgba(13,15,22,.08) 100%),url("${banner.src}")`
    : "linear-gradient(110deg,#15161d,#22252e 60%,#4d5673)";

  return <main className={styles.page}>
    <section className={styles.hero} style={{ backgroundImage: heroBackground }}>
      <div className={styles.heroInner}>
        <span className={styles.heroEyebrow}>{page?.announcement || "OUR AI SERVICES"}</span>
        <h1><strong>{page?.heroTitle || "Build with intelligence"}</strong><br />{page?.heroAccent || "Create what comes next"}</h1>
        <p>{page?.heroDescription || "Turn promising AI ideas into useful products and workflows. Kodrise brings product thinking and engineering together to help your business move forward."}</p>
        <Link className={styles.heroButton} href={page?.primaryCtaUrl || "/contact"}>{page?.primaryCta || "Talk to our AI team"}<span aria-hidden="true">↗</span></Link>
      </div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><div><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">AI Services</span></div></nav>

    <section className={styles.pillars}>
      <div className={styles.pillarsInner}>
        <h2>Innovative AI. Built for Real Growth.</h2>
        <p className={styles.pillarsIntro}>Explore AI capabilities designed to solve meaningful problems, support your teams, and create lasting value.</p>
        <div className={styles.pillarGrid}>{pillars.map((pillar) => <article key={pillar.title}><span className={styles.pillarIcon} aria-hidden="true">{pillar.icon}</span><h3>{pillar.title}</h3><p>{pillar.copy}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.catalog} id="ai-capabilities">
      <div className={styles.catalogInner}>
        {groups.map((group, groupIndex) => <section className={styles.group} key={group.title}>
          <div className={styles.groupHeading}><span className={styles.groupIndex}>0{groupIndex + 1}</span><div><h2>{group.title}</h2><p>{group.description}</p></div></div>
          <div className={styles.serviceGrid}>{group.services.map((service) => {
            const image = images[service.image];
            return <article className={styles.serviceCard} key={service.title}>
              <div className={styles.serviceImage}>{image ? <img src={image.src} alt={image.alt || service.title} loading="lazy" /> : <span aria-hidden="true">AI</span>}</div>
              <div className={styles.serviceCopy}><span className={styles.serviceEyebrow}>KODRISE AI SERVICES</span><h3><Link href={service.href}>{service.title}</Link></h3><p>{service.description}</p><Link className={styles.learnMore} href={service.href}>Explore service <span aria-hidden="true">↗</span></Link></div>
            </article>;
          })}</div>
        </section>)}
      </div>
    </section>

    <section className={styles.closing}>
      <div><span>LET’S MAKE YOUR NEXT IDEA REAL</span><h2>Have an AI challenge in mind?</h2><p>Talk with our team about your goals, data, and the right next step for your product.</p></div>
      <Link href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
