"use client";

import TechnologyStrip from "./technology-strip";
import ContactSection from "./contact-section";
import TestimonialsSection from "./testimonials-section";

import { useEffect, useRef, useState, type PointerEvent } from "react";

function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M5 5h14v14" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function CountUp({
  end,
  suffix,
  duration = 1200,
}: {
  end: number;
  suffix: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let frame = 0;
    let started = false;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const start = () => {
      if (started) return;
      started = true;

      if (prefersReducedMotion) {
        setValue(end);
        return;
      }

      const startedAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(end * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [duration, end]);

  return (
    <strong ref={counterRef} aria-label={`${end}${suffix}`}>
      {value}
      {suffix}
    </strong>
  );
}

const technologies = [
  {
    name: "React",
    code: "Re",
    category: "Engineering",
    detail: "Interfaces that move your product forward",
    color: "blue",
  },
  {
    name: "Angular",
    code: "An",
    category: "Engineering",
    detail: "Structured, enterprise-ready applications",
    color: "red",
  },
  {
    name: "Java",
    code: "Ja",
    category: "Engineering",
    detail: "Reliable services, built for scale",
    color: "orange",
  },
  {
    name: "Python",
    code: "Py",
    category: "Engineering",
    detail: "From backend systems to intelligent tools",
    color: "yellow",
  },
  {
    name: "Shopify",
    code: "Sh",
    category: "Commerce & CRM",
    detail: "Commerce experiences built to convert",
    color: "green",
  },
  {
    name: "Salesforce",
    code: "Sf",
    category: "Commerce & CRM",
    detail: "Connected customers, smarter operations",
    color: "blue",
  },
  {
    name: "Agentic AI",
    code: "Ai",
    category: "AI & Data",
    detail: "Intelligent agents. Real-world workflows.",
    color: "purple",
  },
  {
    name: "SQL & Databases",
    code: "Db",
    category: "AI & Data",
    detail: "A stronger foundation for your data",
    color: "yellow",
  },
  {
    name: "Oracle Cloud",
    code: "Oc",
    category: "Cloud & DevOps",
    detail: "Enterprise infrastructure with room to grow",
    color: "red",
  },
  {
    name: "AWS & Azure",
    code: "Cl",
    category: "Cloud & DevOps",
    detail: "Cloud engineering from build to operations",
    color: "orange",
  },
  {
    name: "Node.js & .NET",
    code: "Be",
    category: "Engineering",
    detail: "The systems behind exceptional products",
    color: "green",
  },
  {
    name: "DevOps & QA",
    code: "Op",
    category: "Cloud & DevOps",
    detail: "Ship with confidence. Improve continuously.",
    color: "purple",
  },
];
const categories = [
  "All expertise",
  "Engineering",
  "Commerce & CRM",
  "AI & Data",
  "Cloud & DevOps",
];
const motionSignals = [
  ["01", "Brief", "Your next gap"],
  ["02", "Match", "The right people"],
  ["03", "Embed", "Inside your rhythm"],
  ["04", "Build", "Shared momentum"],
  ["05", "Scale", "When the moment grows"],
];
const services = [
  {
    title: "Staff augmentation",
    label: "Your team, extended.",
    text: "Bring specialist skills into your existing team. Keep your processes, your product ownership, and your momentum — with the people you need alongside you.",
    tags: ["Embedded specialists", "Flexible capacity", "Your ways of working"],
  },
  {
    title: "Dedicated teams",
    label: "A team built around your next chapter.",
    text: "Shape a focused team around your roadmap, from frontend and backend engineering to cloud, data, and quality assurance. Build continuity as your ambitions grow.",
    tags: [
      "Cross-functional teams",
      "Long-term continuity",
      "Aligned to your roadmap",
    ],
  },
  {
    title: "Specialist hiring",
    label: "The right expertise for the right challenge.",
    text: "Find the specialist your next milestone needs. From a Salesforce implementation to agentic AI, start with the skills, experience, and working style that fit your business.",
    tags: [
      "Niche technology skills",
      "Role-specific matching",
      "Business-first approach",
    ],
  },
];
const faqs = [
  [
    "What technologies can you help us hire for?",
    "We work across frontend and backend engineering, commerce, CRM, cloud, data, and AI — including React, Angular, Java, Python, Shopify, Salesforce, SQL, Oracle Cloud, and agentic AI. If your stack isn’t listed, include it in your brief so we can discuss the fit.",
  ],
  [
    "Can talent work within our existing team?",
    "That is the focus of staff augmentation. We start by understanding your team structure, tools, communication preferences, and timezone requirements, then discuss how a specialist can fit into your day-to-day work.",
  ],
  [
    "Can we start with just one specialist?",
    "Yes. Your requirement can be a single specialist, several roles, or a dedicated team. We will use the initial conversation to understand the scope and the engagement that makes sense.",
  ],
  [
    "How does pricing work?",
    "Pricing depends on the role, experience, engagement model, and duration. Share those details in your brief so we can discuss a proposal tailored to your requirements.",
  ],
];

type HomeContent = {
  heroTitle?: string;
  heroAccent?: string;
  heroDescription?: string;
  announcement?: string;
  primaryCta?: string;
  secondaryCta?: string;
};

function TalentDome() {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      event.pointerType === "touch"
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty(
      "--tilt-x",
      `${(event.clientY - bounds.top - bounds.height / 2) / -45}deg`,
    );
    ref.current?.style.setProperty(
      "--tilt-y",
      `${(event.clientX - bounds.left - bounds.width / 2) / 45}deg`,
    );
  }
  return (
    <div
      className="dome-scene"
      onPointerMove={move}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--tilt-x", "0deg");
        ref.current?.style.setProperty("--tilt-y", "0deg");
      }}
      aria-label="An interconnected network of technology skills"
    >
      <div className="dome-coordinates" aria-hidden="true">
        <span>CONNECTED BY EXPERTISE</span>
        <span>01 / ∞</span>
      </div>
      <div className="dome-model" ref={ref}>
        <svg
          className="dome"
          viewBox="0 0 600 530"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="sphere">
              <stop stopColor="#88a9dc" stopOpacity=".2" />
              <stop offset="1" stopColor="#88a9dc" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="line" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#3859b8" stopOpacity=".75" />
              <stop offset="1" stopColor="#3859b8" stopOpacity=".3" />
            </linearGradient>
          </defs>
          <ellipse cx="300" cy="305" rx="250" ry="210" fill="url(#sphere)" />
          <g stroke="url(#line)" strokeWidth=".9">
            <path d="M60 345a240 240 0 0 1 480 0" />
            {[40, 85, 135, 185, 222].map((r) => (
              <path key={r} d={`M${300 - r} 345a${r} 240 0 0 1 ${r * 2} 0`} />
            ))}
            {[-220, -185, -140, -80, 0].map((y) => (
              <ellipse
                key={y}
                cx="300"
                cy={345 + y}
                rx={Math.sqrt(240 * 240 - y * y)}
                ry={Math.sqrt(240 * 240 - y * y) * 0.23}
              />
            ))}
            <path d="M300 105v295" />
            <ellipse cx="300" cy="345" rx="240" ry="55" />
            <ellipse cx="300" cy="345" rx="268" ry="76" strokeDasharray="3 7" />
            <path
              d="m60 345 240 55 240-55M128 306l172 94 172-94M216 293l84 107 84-107"
              strokeOpacity=".35"
            />
          </g>
          <g fill="#3859b8">
            <circle cx="149" cy="159" r="4" />
            <circle cx="493" cy="203" r="4" />
            <circle cx="355" cy="399" r="3" />
            <circle cx="61" cy="318" r="3" />
          </g>
          <path d="m300 215 43 25v50l-43 25-43-25v-50z" fill="#3859b8" />
          <path
            d="M285 244v43m0-20 26-23m-26 23 27 20"
            stroke="#ffffff"
            strokeWidth="7"
          />
          <circle
            cx="300"
            cy="265"
            r="67"
            stroke="#3859b8"
            strokeOpacity=".2"
            strokeDasharray="2 6"
          />
        </svg>
        <span className="orbit-tag orbit-react">
          <span className="orbit-symbol blue">✳</span> React{" "}
          <span className="tiny-dot" />
        </span>
        <span className="orbit-tag orbit-ai">
          <span className="orbit-symbol purple">✧</span> Agentic AI{" "}
          <span className="tiny-dot" />
        </span>
        <span className="orbit-tag orbit-shopify">
          <span className="orbit-symbol green">S</span> Shopify{" "}
          <span className="tiny-dot" />
        </span>
        <span className="orbit-tag orbit-cloud">
          <span className="orbit-symbol orange">⌘</span> Cloud{" "}
          <span className="tiny-dot" />
        </span>
        <span className="orbit-label">HUMAN TALENT. CONNECTED.</span>
      </div>
      <div className="dome-bottom">
        <span>
          <i /> The right skills. In your orbit.
        </span>
        <span aria-hidden="true">↗</span>
      </div>
    </div>
  );
}

const teamBlueprints = [
  {
    name: "Build a product",
    icon: "⌘",
    description: "From the first feature to your next release.",
    skills: "React, Java, Python, QA",
    roles: [
      ["FE", "Frontend engineer", "React · Angular"],
      ["BE", "Backend engineer", "Java · Python"],
      ["QA", "QA engineer", "Automation · Testing"],
    ],
  },
  {
    name: "Connect your business",
    icon: "⊞",
    description: "Bring your commerce and customer systems together.",
    skills: "Shopify, Salesforce, SQL",
    roles: [
      ["SH", "Commerce developer", "Shopify · Integrations"],
      ["SF", "CRM specialist", "Salesforce · Automation"],
      ["DB", "Data engineer", "SQL · Data pipelines"],
    ],
  },
  {
    name: "Make AI work for you",
    icon: "✧",
    description: "Turn intelligent ideas into useful everyday tools.",
    skills: "Agentic AI, Python, Oracle Cloud",
    roles: [
      ["AI", "AI engineer", "Agents · Orchestration"],
      ["PY", "Python developer", "APIs · Integrations"],
      ["CL", "Cloud engineer", "Oracle Cloud · Deployment"],
    ],
  },
];

function TeamStudio({ onChoose }: { onChoose: (skills: string) => void }) {
  const [selected, setSelected] = useState(0);
  const blueprint = teamBlueprints[selected];
  return (
    <div className="team-studio" id="team-explorer">
      <div className="studio-toolbar">
        <span>
          <span className="studio-mark">k↗</span> Your next team{" "}
          <span className="toolbar-slash">/</span>{" "}
          <span className="toolbar-muted">A world of possibilities</span>
        </span>
        <span className="studio-label">INTERACTIVE EXPLORER</span>
      </div>
      <div className="studio-body">
        <div className="studio-sidebar">
          <span className="studio-overline">START WITH YOUR AMBITION</span>
          <h2>
            What’s next <br />
            for you?
          </h2>
          <div
            className="blueprint-options"
            role="group"
            aria-label="Choose a team blueprint"
          >
            {teamBlueprints.map((team, index) => (
              <button
                key={team.name}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
                className={selected === index ? "selected" : ""}
              >
                <span>{team.icon}</span>
                {team.name}
                <Arrow />
              </button>
            ))}
          </div>
          <p>
            One specialist or a whole team.
            <br />
            There’s a shape that fits.
          </p>
        </div>
        <div className="studio-dome">
          <TalentDome />
          <span className="studio-dome-caption">
            INDIVIDUAL EXPERTISE. COLLECTIVE POTENTIAL.
          </span>
        </div>
        <div className="blueprint-result" aria-live="polite">
          <div className="blueprint-caption">
            <span>SAMPLE TEAM</span>
            <span>0{selected + 1} / 03</span>
          </div>
          <h3>{blueprint.name}</h3>
          <p>{blueprint.description}</p>
          <div className="role-list" key={selected}>
            {blueprint.roles.map(([initials, title, skills]) => (
              <div className="role-card" key={title}>
                <span className="role-monogram">{initials}</span>
                <div>
                  <strong>{title}</strong>
                  <span>{skills}</span>
                </div>
                <span className="role-plus">+</span>
              </div>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => onChoose(blueprint.skills)}
            className="button secondary blueprint-cta"
          >
            Start with this team <Arrow diagonal />
          </a>
        </div>
      </div>
      <div className="studio-status">
        <span>
          <i /> Built around your goals. Connected by Kodrise.
        </span>
        <span>Illustrative team composition · tailored together</span>
      </div>
    </div>
  );
}

function MotionRail() {
  return (
    <section className="motion-rail" aria-label="How Kodrise works">
      <div className="motion-rail-viewport">
        <div className="motion-rail-track">
          {[0, 1].map((copy) => (
            <div className="motion-rail-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {motionSignals.map(([number, title, detail]) => (
                <div className="motion-signal" key={`${copy}-${number}`}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                  <i aria-hidden="true">↗</i>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [category, setCategory] = useState("All expertise");
  const [activeService, setActiveService] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [homeContent, setHomeContent] = useState<HomeContent>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    fetch("/api/content/home")
      .then((response) => response.json())
      .then((content) => setHomeContent(content))
      .catch(() => undefined);
  }, []);
  const visibleTech = technologies.filter(
    (tech) => category === "All expertise" || tech.category === category,
  );
  return (
    <>
      <main
        id="main"
        className="home-main"
        onPointerMove={(event) => {
          const root = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - root.left}px`);
          event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - root.top}px`);
        }}
      >
        <section className="hero container">
          <div className="hero-copy">
            <a className="hero-announcement" href="#team-explorer">
              <span className="announcement-dot" /> {homeContent.announcement || "Human expertise. A world of possibility."} <Arrow />
            </a>
            <h1>
              {homeContent.heroTitle || "Hire pre-vetted"}
              <br />
              <span className="accent">
                {homeContent.heroAccent || "remote developers."}
              </span>
            </h1>
            <div className="hero-seal" aria-hidden="true"><span>K</span><small>HUMAN-LED · TECH-READY ·</small></div>
            <p>
              {homeContent.heroDescription || "Across every stack you need. Get a qualified shortlist quickly, backed by a staff augmentation partner built around your project."}
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button primary">
                {homeContent.primaryCta || "Build your team"} <Arrow diagonal />
              </a>
              <a href="#team-explorer" className="button secondary">
                {homeContent.secondaryCta || "Explore the possibilities"} <Arrow />
              </a>
            </div>
            <p className="hero-reassurance">
              Pre-vetted talent · flexible engagements · dedicated support.
            </p>
            <div className="hero-metrics" aria-label="How Kodrise works">
              <div><span className="metric-index">01</span><strong>Define</strong><span>Your real gap</span></div>
              <div><span className="metric-index">02</span><strong>Connect</strong><span>The right specialists</span></div>
              <div><span className="metric-index">03</span><strong>Move</strong><span>With shared momentum</span></div>
            </div>
          </div>
          <TeamStudio
            onChoose={(skills) => {
              setSelectedSkill(skills);
            }}
          />
          <div className="hero-footer">
            <span>YOUR NEXT CHAPTER STARTS WITH THE RIGHT PEOPLE</span>
            <a href="#expertise">
              SCROLL TO EXPLORE <span>↓</span>
            </a>
          </div>
        </section>
        <TechnologyStrip />

        <section className="section container approach reveal" id="approach">
          <div className="section-label">
            <span>01 / THE KODRISE APPROACH</span>
            <span className="cross">+</span>
          </div>
          <div className="approach-grid">
            <h2>
              Built to make hiring
              <br />
              <span className="muted">developers simple.</span>
            </h2>
            <div className="approach-copy">
              <p>
                Kodrise exists to remove the friction from technical
                hiring. Get direct access to experienced, pre-screened
                developers without long recruitment cycles or unnecessary
                layers.
              </p>
              <p>
                Every developer is technically vetted, interview-tested, and
                matched against your actual project needs — not just a keyword
                match on a resume.
              </p>
              <a href="#services" className="button secondary inline-cta">
                Learn more about our approach <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="principles">
            <article>
              <span className="principle-icon">↗</span>
              <h3>Speed without shortcuts</h3>
              <p>Fast shortlists, with every candidate fully vetted first.</p>
            </article>
            <article>
              <span className="principle-icon">⊞</span>
              <h3>Transparency</h3>
              <p>Clear rates, clear availability, and no hidden layers.</p>
            </article>
            <article>
              <span className="principle-icon">∞</span>
              <h3>Continuity</h3>
              <p>
                A dedicated point of contact stays with you for the engagement.
              </p>
            </article>
          </div>
          <div className="proof-stats" aria-label="Kodrise service commitments">
            <div>
              <CountUp end={24} suffix="h" />
              <span>to a qualified shortlist</span>
            </div>
            <div>
              <CountUp end={5} suffix="min" />
              <span>to share a requirement</span>
            </div>
            <div>
              <CountUp end={100} suffix="%" />
              <span>of developers pre-vetted</span>
            </div>
            <div>
              <strong>1 POC</strong>
              <span>dedicated account manager</span>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <section className="expertise-section" id="expertise">
          <div className="container section">
            <div className="section-label">
              <span>03 / OUR EXPERTISE</span>
              <span className="cross">+</span>
            </div>
            <div className="section-heading reveal">
              <h2>
                Your technology.
                <br />
                <span className="muted">Our kind of people.</span>
              </h2>
              <p>
                From the platforms you rely on
                <br />
                to the possibilities you’re exploring.
              </p>
            </div>
            <div
              className="filter-tabs"
              role="group"
              aria-label="Filter expertise"
            >
              {categories.map((item) => (
                <button
                  key={item}
                  aria-pressed={category === item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                  {item === "All expertise" && <span>12</span>}
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              Showing {visibleTech.length} technology areas
            </p>
            <div className="technology-grid">
              {visibleTech.map((tech) => (
                <a
                  className="tech-card"
                  href={
                    tech.name === "Shopify"
                      ? "/services/ecommerce"
                      : tech.name === "Agentic AI"
                        ? "/services/agentic-ai-software"
                        : tech.name === "Oracle Cloud" ||
                            tech.name === "AWS & Azure"
                          ? "/services/devops-cloud-security"
                          : tech.name === "DevOps & QA"
                            ? "/services/qa-testing"
                            : "/devresources"
                  }
                  key={tech.name}
                  onClick={() => setSelectedSkill(tech.name)}
                  onPointerMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty("--card-x", `${event.clientX - bounds.left}px`);
                    event.currentTarget.style.setProperty("--card-y", `${event.clientY - bounds.top}px`);
                  }}
                >
                  <div className="tech-top">
                    <span className={`tech-icon ${tech.color}`}>
                      {tech.code}
                    </span>
                    <Arrow diagonal />
                  </div>
                  <div>
                    <span className="tech-category">{tech.category}</span>
                    <h3>{tech.name}</h3>
                    <p>{tech.detail}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="expertise-bottom">
              <p>
                Your stack isn’t on the list?{" "}
                <span>Let’s start a conversation.</span>
              </p>
              <a
                href="#contact"
                className="button secondary inline-cta"
                onClick={() => setSelectedSkill("")}
              >
                Find your specialist <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section className="section container services reveal" id="services">
          <div className="section-label">
            <span>04 / BUILT AROUND YOU</span>
            <span className="cross">+</span>
          </div>
          <div className="services-grid">
            <div>
              <h2>
                A little more expertise.
                <br />A whole new team.
                <br />
                <span className="muted">Your call.</span>
              </h2>
              <p className="services-intro">
                Different ambitions need different approaches.
                <br />
                Let’s find the one that fits yours.
              </p>
              <div className="team-art" aria-hidden="true">
                <span>YOUR TEAM</span>
                <div>
                  <i>+</i>
                  <i>+</i>
                  <i>+</i>
                  <i className="added">↗</i>
                </div>
                <small>GOOD PEOPLE. SHARED DIRECTION.</small>
              </div>
            </div>
            <div className="service-accordion">
              {services.map((service, index) => (
                <article
                  className={
                    activeService === index
                      ? "service-item expanded"
                      : "service-item"
                  }
                  key={service.title}
                >
                  <h3>
                    <button
                      aria-expanded={activeService === index}
                      aria-controls={`service-${index}`}
                      onClick={() =>
                        setActiveService(activeService === index ? -1 : index)
                      }
                    >
                      <span className="service-number">0{index + 1}</span>
                      {service.title}
                      <span className="expand-symbol">
                        {activeService === index ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  {activeService !== index && (
                    <p className="service-preview">
                      {service.label} {service.text}
                    </p>
                  )}
                  <div
                    id={`service-${index}`}
                    hidden={activeService !== index}
                    className="service-content"
                  >
                    <h4>{service.label}</h4>
                    <p>{service.text}</p>
                    <ul>
                      {service.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <a href="#contact" className="button primary inline-cta">
                      Let’s make it happen <Arrow diagonal />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MotionRail />

        <section className="process-section">
          <div className="container section reveal">
            <div className="section-label">
              <span>04 / FROM HELLO TO LET’S GO</span>
              <span className="cross">+</span>
            </div>
            <div className="section-heading">
              <h2>
                Big possibilities.
                <br />
                <span className="muted">Simple beginnings.</span>
              </h2>
              <p>
                A thoughtful process.
                <br />A shared sense of direction.
              </p>
            </div>
            <div className="process-grid">
              {[
                {
                  title: "Tell us what’s next",
                  text: "Your goals, your stack, your gaps. We start by understanding the bigger picture.",
                },
                {
                  title: "Meet your people",
                  text: "Explore talent aligned with your requirements. Get to know the people behind the skills.",
                },
                {
                  title: "Build something great",
                  text: "Align on the engagement, bring your people together, and get your next chapter moving.",
                },
              ].map((step, i) => (
                <article key={step.title}>
                  <div className="step-line">
                    <span>0{i + 1}</span>
                    <Arrow />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container faq-section reveal">
          <div>
            <div className="section-label">A LITTLE MORE CLARITY</div>
            <h2>
              Good questions.
              <br />
              <span className="muted">Straight answers.</span>
            </h2>
            <a href="#contact" className="button secondary inline-cta">
              Have something else in mind? <Arrow diagonal />
            </a>
          </div>
          <div className="faqs">
            {faqs.map(([question, answer], index) => (
              <details
                key={question}
                open={openFaq === index}
                onClick={(event) => {
                  if (!(event.target as HTMLElement).closest("summary")) return;
                  event.preventDefault();
                  setOpenFaq((current) => current === index ? null : index);
                }}
              >
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <ContactSection
          technology={selectedSkill}
          onTechnologyChange={setSelectedSkill}
        />
      </main>
    </>
  );
}
