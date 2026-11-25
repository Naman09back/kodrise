"use client";
import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import styles from "./home-page.module.css";
type ImageValue = { src: string; alt: string };
type Insight = {
  title: string;
  category?: string;
  excerpt?: string;
  url?: string;
  image?: ImageValue;
};
type Industry = {
  title: string;
  description?: string;
  slug?: string;
  image?: ImageValue;
};
type Faq = { question: string; answer: string };
type HomeProps = {
  images?: Record<string, ImageValue>;
  insights?: Insight[];
  industries?: Industry[];
  faqs?: Faq[];
  hero?: {
    heroTitle?: string;
    heroDescription?: string;
    announcement?: string;
  };
};
const serviceCards = [
  [
    "AI Development Solutions",
    "Drive automation through data and intelligence.",
    "homepage-service-ai",
    "/services/generative-ai-development-company",
  ],
  [
    "Mobile App Development",
    "We build mobile apps with immersive user experiences.",
    "homepage-service-mobile",
    "/services/mobile-app-development",
  ],
  [
    "Web Development",
    "We design, develop and maintain websites and web apps.",
    "homepage-service-web",
    "/services/web-development",
  ],
  [
    "Hire Dedicated Developers",
    "Hire full-time dedicated software developers.",
    "homepage-service-teams",
    "/hire-developers",
  ],
  [
    "DevOps Azure AWS & GCP",
    "Streamline delivery using leading cloud platforms.",
    "homepage-service-devops",
    "/services/devops-and-cloud",
  ],
  [
    "Custom Software Development",
    "Your development partner from conception to creation.",
    "homepage-service-custom",
    "/services/custom-software-development",
  ],
  [
    "Digital Transformation",
    "Migrate and modernize your legacy applications.",
    "homepage-service-transformation",
    "/services",
  ],
  [
    "Digital Product Engineering",
    "Build future-ready products around your customers.",
    "homepage-service-product",
    "/services",
  ],
  [
    "UI/UX Development",
    "Design, strategy, and technology in one experience.",
    "homepage-service-ux",
    "/services",
  ],
  [
    "eCommerce Development",
    "Create commerce experiences that scale with your business.",
    "homepage-industry-ecommerce",
    "/shopify-services",
  ],
] as const;
const projects = [
  {
    name: "Calcounts",
    title: "Track Smarter. Eat Better. Live Healthier.",
    description:
      "An AI-powered app to log, analyze, and balance your daily nutrition with total precision.",
    image: "portfolio-calcounts",
    category: "AI · HEALTHCARE",
    href: "/case-studies",
  },
  {
    name: "ScribeFlo",
    title: "Your Partner in Effortless Clinical Documentation",
    description:
      "A smarter workflow for clinicians, built to make documentation feel effortless.",
    image: "portfolio-scribeflo",
    category: "HEALTHCARE · AI",
    href: "/case-studies",
  },
  {
    name: "UCPA",
    title: "Your Gateway to the World’s Best Travel Experiences",
    description:
      "A seamless digital experience connecting travelers with new possibilities.",
    image: "portfolio-ucpa",
    category: "TRAVEL · DIGITAL",
    href: "/case-studies",
  },
];
const technologies = {
  "AI & Automation": [
    "Generative AI",
    "AI Agents",
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "RAG Solutions",
  ],
  "Application Development": [
    "Web Applications",
    "Mobile Applications",
    "Custom Software",
    "Enterprise Platforms",
    "SaaS Products",
    "API Engineering",
  ],
  "Data & Analytics": [
    "Data Engineering",
    "Business Intelligence",
    "Predictive Analytics",
    "Data Warehousing",
    "Big Data",
    "MLOps",
  ],
  "Cloud & Infrastructure": [
    "Amazon Web Services",
    "Microsoft Azure",
    "Google Cloud",
    "Cloud Migration",
    "DevOps",
    "Kubernetes",
  ],
  "UI/UX Services": [
    "Product Strategy",
    "UX Research",
    "Interface Design",
    "Design Systems",
    "Prototyping",
    "Accessibility",
  ],
  "IT Consulting": [
    "Technology Advisory",
    "Product Roadmaps",
    "Architecture Review",
    "Digital Transformation",
    "Team Augmentation",
    "Discovery Workshops",
  ],
  "Quality Assurance & Testing": [
    "Manual QA",
    "Automation Testing",
    "Performance Testing",
    "Security Testing",
    "Mobile QA",
    "Continuous Testing",
  ],
};
type TechnologyGroup = keyof typeof technologies;
const clientQuotes = [
  {
    quote:
      "Kodrise delivered precisely what we needed, a top-notch website with seamless film recollection. Their expertise exceeded our expectations, and we couldn’t be more satisfied with the final result.",
    name: "Gezabel Perroti",
    role: "Co-Founder, DISTRI7",
  },
  {
    quote:
      "They have successfully handled several major projects for us. Their dedication and expertise are phenomenal. We highly recommend the team.",
    name: "Catherine Kleins",
    role: "Co-Founder, Autism West Midlands",
  },
  {
    quote:
      "Kodrise successfully delivered our complex software project. Their expertise and communication made the collaboration a success.",
    name: "Basim Albeladi",
    role: "CEO, Labayh",
  },
];
const fallbackFaqs: Faq[] = [
  {
    question: "What does Kodrise help businesses build?",
    answer: "Kodrise designs and builds digital products, custom software, AI solutions, cloud platforms, and engineering teams for businesses at every stage.",
  },
  {
    question: "Can you work with our existing product or engineering team?",
    answer: "Yes. Our developers and product specialists can join an existing team, extend its capabilities, or take responsibility for a complete project.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "Yes. We help startups validate ideas, build MVPs, and grow their products with engineering support that can scale with the business.",
  },
  {
    question: "What technologies do you use?",
    answer: "We work with modern web and mobile frameworks, cloud platforms, AI and machine learning tools, and the technologies best suited to each product.",
  },
  {
    question: "How do you estimate the cost of a project?",
    answer: "We first review the goals, scope, integrations, and timeline. Then we share a project estimate and a delivery plan tailored to those requirements.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on the features and technical scope. After discovery, we break the work into clear stages and provide a realistic schedule.",
  },
  {
    question: "Can Kodrise add AI to an existing application?",
    answer: "Yes. We can integrate AI capabilities into existing apps and workflows, including generative AI, agents, machine learning, and natural language processing.",
  },
  {
    question: "How do we get started?",
    answer: "Contact our team with a short description of your goals. We’ll arrange a conversation to understand the project and recommend the next steps.",
  },
  {
    question: "Can Kodrise build an MVP or proof of concept?",
    answer: "Yes. We can define the essential features, build a focused first version, and use feedback to guide the next stage of product development.",
  },
  {
    question: "Can I hire dedicated developers for my team?",
    answer: "Yes. We can provide dedicated developers and specialists who work with your team, tools, and delivery process.",
  },
];
function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return <span aria-hidden="true">{direction === "left" ? "←" : "→"}</span>;
}
export default function HomeExperience({
  images = {},
  insights = [],
  industries = [],
  faqs = [],
  hero,
}: HomeProps) {
  const serviceTrack = useRef<HTMLDivElement>(null);
  const projectTrack = useRef<HTMLDivElement>(null);
  const [technologyTab, setTechnologyTab] =
    useState<TechnologyGroup>("AI & Automation");
  const [industryIndex, setIndustryIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const visibleIndustries: Industry[] = industries.length
    ? industries
    : [
        "Healthcare & Lifesciences",
        "E-Commerce Solutions",
        "Transport & Logistics",
        "Real Estate",
        "Education & eLearning",
        "Travel & Hospitality",
        "Media & Entertainment",
        "On Demand Delivery",
      ].map((title) => ({ title }));
  const activeIndustry =
    visibleIndustries[industryIndex % visibleIndustries.length];
  const displayedFaqs = [
    ...faqs,
    ...fallbackFaqs.filter(
      (fallback) => !faqs.some((faq) => faq.question === fallback.question),
    ),
  ].slice(0, 10);
  const visibleTestimonials = [0, 1].map(
    (offset) => clientQuotes[(testimonialIndex + offset) % clientQuotes.length],
  );
  const title =
    hero?.heroTitle ||
    "AI-Driven Digital Engineering & Software Development Partner";
  const titleFirst = "AI-Driven";
  const titleRest = title.replace(/^AI-Driven\s*/i, "");
  const titleLines = (titleRest.length > 8 ? titleRest : "Digital Engineering & Software Development")
    .replace(/\s*Partner\s*$/i, "")
    .split(/(?<=&)\s+/)
    .filter(Boolean);
  return (
    <main className={styles.home} id="main">
      {" "}
      <section className={styles.hero}>
        {" "}
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroOrbit} aria-hidden="true" />
        <div
          className={`${styles.heroOrbit} ${styles.orbitTwo}`}
          aria-hidden="true"
        />{" "}
        <div className={styles.heroInner}>
          {" "}
          <div className={styles.heroBadge}>
            1,500+ PROJECTS <i /> AI-FIRST ENGINEERING <i /> GLOBAL DELIVERY{" "}
            <i /> 19+ YEARS
          </div>{" "}
          <div className={styles.heroContent}>
            {" "}
            <p className={styles.eyebrow}>
              {hero?.announcement || "BUILDING WHAT COMES NEXT"}
            </p>{" "}
            <h1>
              <span className={styles.accent}>{titleFirst}</span>
              <span>{titleLines[0] || "Digital Engineering &"}</span>
              <span>{titleLines.slice(1).join(" ") || "Software Development"}</span>
              <strong>PARTNER</strong>
            </h1>{" "}
            <h2>FOR STARTUPS, ENTERPRISES &amp; GLOBAL BUSINESSES</h2>{" "}
            <p className={styles.heroDescription}>
              {hero?.heroDescription || (
                <>
                  Delivering enterprise software, <b>Generative AI solutions</b>
                  , cloud-native applications, digital products, and{" "}
                  <b>dedicated development teams</b> for businesses worldwide.
                </>
              )}
            </p>{" "}
            <Link className={styles.heroCta} href="/contact">
              BOOK A FREE TECHNOLOGY CONSULTATION <Arrow />
            </Link>{" "}
          </div>{" "}
          <div className={styles.heroTrust}>
            <span>★★★★★</span> Trusted by teams building the future
          </div>{" "}
        </div>{" "}
        <div
          className={styles.brandTicker}
          aria-label="Trusted by global brands"
        >
          <span>BRANDS THAT TRUST KODRISE</span>
          {[
            "JOHN DEERE",
            "CATERPILLAR",
            "IBM",
            "UFO",
            "AIRMOVE",
            "CAB-E",
            "FLYDOCS",
            "TOFFEE",
            "KURD TAXI",
            "VFC",
            "GOOD GUYS",
            "MONAY",
          ].map((brand) => (
            <b key={brand}>{brand}</b>
          ))}
        </div>{" "}
        <div className={styles.heroParticle} aria-hidden="true" />{" "}
      </section>{" "}
      <section className={styles.proof}>
        {" "}
        <div className={styles.proofTop}>
          <div className={styles.stars}>
            ★★★★★ <span>4.5 stars</span>
          </div>
          <p>Trusted by Startups, Enterprises &amp; Global Brands</p>
          <div className={styles.reassurance}>
            <span>✓ Free 30-Min Strategy Session</span>
            <span>✓ Live Video Meeting</span>
            <span>✓ No Obligation</span>
          </div>
          <div className={styles.proofPill}>
            ◆ &nbsp; Discuss your project&nbsp; • &nbsp;Explore AI &amp; Digital
            Solutions&nbsp; • &nbsp;Get Expert Recommendations
          </div>
        </div>{" "}
        <div className={styles.metrics}>
          {[
            ["1500+", "PROJECTS"],
            ["AI-FIRST", "ENGINEERING"],
            ["GLOBAL", "DELIVERY"],
            ["19+", "YEARS"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>{" "}
        <h2>
          End-to-End Mobile App &amp; Web Development Services Powered by AI
        </h2>{" "}
        <div className={styles.sliderShell}>
          <button
            className={styles.sliderButton}
            aria-label="Previous services"
            onClick={() =>
              serviceTrack.current?.scrollBy({ left: -320, behavior: "smooth" })
            }
          >
            <Arrow direction="left" />
          </button>
          <div className={styles.serviceTrack} ref={serviceTrack}>
            {serviceCards.map(([name, description, imageKey, href], index) => {
              const image = images[imageKey];
              return (
                <Link href={href} className={styles.serviceCard} key={name}>
                  <div className={styles.serviceImage}>
                    {image && (
                      <img
                        src={image.src}
                        alt={image.alt || name}
                        loading="lazy"
                      />
                    )}
                    <span>0{index + 1}</span>
                  </div>
                  <div className={styles.serviceCopy}>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <Arrow />
                  </div>
                </Link>
              );
            })}
          </div>
          <button
            className={`${styles.sliderButton} ${styles.sliderNext}`}
            aria-label="Next services"
            onClick={() =>
              serviceTrack.current?.scrollBy({ left: 320, behavior: "smooth" })
            }
          >
            <Arrow />
          </button>
        </div>{" "}
        <div className={styles.serviceAll}>
          <Link href="/services">View All Services <Arrow /></Link>
        </div>
      </section>{" "}
      <section className={styles.work}>
        {" "}
        <div className={styles.sectionIntro}>
          <span className={styles.kicker}>SELECTED WORK</span>
          <h2>Explore Our Recent Work</h2>
          <p>
            Customer experience is everything. We design and create solutions by
            understanding people’s actions, emotions, and unmet needs.
          </p>
        </div>{" "}
        <div className={styles.projectSlider}>
          <button
            className={styles.sliderButton}
            aria-label="Previous projects"
            onClick={() =>
              projectTrack.current?.scrollBy({
                left: -1120,
                behavior: "smooth",
              })
            }
          >
            <Arrow direction="left" />
          </button>
          <div className={styles.projectTrack} ref={projectTrack}>
            {projects.map((project) => {
              const image = images[project.image];
              return (
                <article className={styles.projectCard} key={project.name}>
                  <div className={styles.projectVisual}>
                    {image && (
                      <img
                        src={image.src}
                        alt={image.alt || project.name}
                        loading="lazy"
                      />
                    )}
                    <span className={styles.projectLogo}>{project.name}</span>
                    <div className={styles.projectRings} aria-hidden="true" />
                  </div>
                  <div className={styles.projectCopy}>
                    <small>{project.category}</small>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link href={project.href}>
                      View Project Details <Arrow />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <button
            className={`${styles.sliderButton} ${styles.sliderNext}`}
            aria-label="Next projects"
            onClick={() =>
              projectTrack.current?.scrollBy({ left: 1120, behavior: "smooth" })
            }
          >
            <Arrow />
          </button>
        </div>{" "}
        <div className={styles.centerAction}>
          <Link href="/portfolio">
            View All Projects <Arrow />
          </Link>
        </div>{" "}
      </section>{" "}
      <section className={styles.technology}>
        {" "}
        <div className={styles.sectionIntro}>
          <span className={styles.kicker}>OUR CAPABILITIES</span>
          <h2>We’re the Masters of Next-Gen Technologies</h2>
          <p>
            We combine deep technical expertise with a practical understanding
            of the problems businesses need to solve.
          </p>
        </div>{" "}
        <div
          className={styles.techTabs}
          role="tablist"
          aria-label="Technology services"
        >
          {(Object.keys(technologies) as TechnologyGroup[]).map((group) => (
            <button
              key={group}
              type="button"
              role="tab"
              aria-selected={technologyTab === group}
              onClick={() => setTechnologyTab(group)}
            >
              {group}
            </button>
          ))}
        </div>{" "}
        <div className={styles.techGrid}>
          {technologies[technologyTab].map((technology, index) => (
            <Link href="/services" key={technology}>
              <span>0{index + 1}</span>
              {technology}
              <Arrow />
            </Link>
          ))}
        </div>{" "}
      </section>{" "}
      <section
        className={styles.industries}
        style={
          activeIndustry.image?.src
            ? {
                backgroundImage: `linear-gradient(90deg,#11121bdc,#11121b59),url("${activeIndustry.image.src}")`,
              }
            : undefined
        }
      >
        {" "}
        <div className={styles.industriesHead}>
          <span className={styles.kicker}>INDUSTRY EXPERIENCE</span>
          <h2>Industries We Serve</h2>
          <p>
            We bring deep industry knowledge together with the technology to
            move your business forward.
          </p>
        </div>{" "}
        <div className={styles.industryPanels}>
          <div
            className={styles.industryTrack}
            style={{
              "--industry-index": industryIndex,
            } as CSSProperties}
          >
            {visibleIndustries.map((industry, index) => (
              <div
                className={`${styles.industryPanel} ${index === industryIndex ? styles.industryPanelActive : ""}`}
                key={industry.title}
              >
                <button type="button" onClick={() => setIndustryIndex(index)}>
                  {industry.title}
                </button>
                {index === industryIndex && (
                  <Link
                    href={`/services?industry=${encodeURIComponent(industry.slug || industry.title.toLowerCase().replaceAll(" ", "-"))}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Know More <Arrow />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>{" "}
        <div className={styles.industryControls}>
          <button
            aria-label="Previous industry"
            onClick={() =>
              setIndustryIndex(
                (industryIndex + visibleIndustries.length - 1) %
                  visibleIndustries.length,
              )
            }
          >
            <Arrow direction="left" />
          </button>
          <div>
            {visibleIndustries.map((industry, i) => (
              <button
                key={industry.title}
                aria-label={`Show ${industry.title}`}
                aria-current={i === industryIndex}
                onClick={() => setIndustryIndex(i)}
              />
            ))}
          </div>
          <button
            aria-label="Next industry"
            onClick={() =>
              setIndustryIndex((industryIndex + 1) % visibleIndustries.length)
            }
          >
            <Arrow />
          </button>
        </div>{" "}
      </section>{" "}
      <section className={styles.ctaStrip}>
        <div>
          <span className={styles.kicker}>START YOUR AI JOURNEY</span>
          <h2>Ready to future-proof your organization with AI?</h2>
          <p>Optimize performance, reduce costs, and lead with intelligence.</p>
        </div>
        <Link href="/contact">
          Get Your Free AI Consultation <Arrow />
        </Link>
      </section>{" "}
      <section className={styles.insights}>
        {" "}
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.kicker}>INSIGHTS &amp; UPDATES</span>
            <h2>What’s New At Kodrise?</h2>
            <p>
              View the latest blogs, news, and stories from our development
              teams, with ideas on digital technology and emerging trends.
            </p>
          </div>
          <Link href="/resources">
            View All <Arrow />
          </Link>
        </div>{" "}
        <div className={styles.insightGrid}>
          {insights.slice(0, 3).map((item, index) => (
            <article className={styles.insightCard} key={item.title}>
              <Link
                href={
                  item.url?.startsWith("/")
                    ? item.url
                    : `/resources/${item.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")}`
                }
                className={styles.insightImage}
              >
                {item.image && (
                  <img
                    src={item.image.src}
                    alt={item.image.alt || item.title}
                    loading="lazy"
                  />
                )}
                <span>0{index + 1}</span>
              </Link>
              <div>
                <small>{item.category || "INSIGHT"}</small>
                <h3>
                  <Link
                    href={item.url?.startsWith("/") ? item.url : "/resources"}
                  >
                    {item.title}
                  </Link>
                </h3>
                <p>{item.excerpt}</p>
                <Link className={styles.readMore} href="/resources">
                  Read the story <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </div>{" "}
      </section>{" "}
      <section className={styles.awards}>
        {" "}
        <div className={styles.sectionIntro}>
          <span className={styles.kicker}>TRUSTED EXPERIENCE</span>
          <h2>Chronicles of Our Award-Winning Journey</h2>
          <p>
            Setting higher standards to drive positive change. Here are some
            recognitions that reflect our commitment to excellence.
          </p>
        </div>{" "}
      </section>{" "}
      <section className={styles.testimonials}>
        {" "}
        <div className={styles.sectionHeading}>
          <div>
            <h2>What Our Clients Say</h2>
            <p>
              Read the voices of trust, satisfaction, and motivation helping us
              to navigate our next innovation.
            </p>
          </div>
          <Link href="/portfolio">
            Explore More <Arrow />
          </Link>
        </div>{" "}
        <div className={styles.quoteGrid}>
          {visibleTestimonials.map((review) => {
            return (
              <article key={review.name} className={styles.quoteCard}>
                <p>“{review.quote}”</p>
                <div className={styles.quotePerson}>
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.role}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>{" "}
        <div className={styles.quoteControls}>
          <button
            aria-label="Previous client story"
            onClick={() =>
              setTestimonialIndex(
                (testimonialIndex + clientQuotes.length - 1) %
                  clientQuotes.length,
              )
            }
          >
            <Arrow direction="left" />
          </button>
          <span>
            {clientQuotes.map((item, index) => (
              <button
                key={item.name}
                aria-label={`Show ${item.name} review`}
                aria-current={index === testimonialIndex}
                onClick={() => setTestimonialIndex(index)}
              />
            ))}
          </span>
          <button
            aria-label="Next client story"
            onClick={() =>
              setTestimonialIndex((testimonialIndex + 1) % clientQuotes.length)
            }
          >
            <Arrow />
          </button>
        </div>{" "}
      </section>{" "}
      <section className={styles.faq}>
        {" "}
        <div className={styles.faqIntro}>
          <h2>Frequently Asked Questions</h2>
        </div>{" "}
        <div className={styles.faqList}>
          {displayedFaqs.map((faq, index) => (
            <details key={faq.question} name="kodrise-home-faq" open={index === 0}>
              <summary>
                {faq.question}
                <b>+</b>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>{" "}
      </section>{" "}
    </main>
  );
}
