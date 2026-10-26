import type { Metadata } from "next";
import Link from "next/link";
import InteriorHero from "../interior-hero";
import { serviceDetails } from "../ap-data";

export const metadata: Metadata = {
  title: "Services — Kodrise",
  description:
    "Explore staff augmentation, dedicated technology teams, and specialist hiring with Kodrise.",
};
const offerings = [
  {
    title: "Staff augmentation",
    subtitle: "More expertise. The same team spirit.",
    description:
      "Add the skills you need to the team you already have. Our focus is on finding people who fit your technology, your working style, and the challenge ahead.",
    fit: "When you have a team and need extra capability or capacity.",
    points: [
      "Specialists embedded in your existing team",
      "Your tools, delivery process, and product ownership",
      "Scope and duration shaped around your requirements",
    ],
    skills: "React / Angular / Java / Python",
  },
  {
    title: "Dedicated teams",
    subtitle: "A shared direction, from day one.",
    description:
      "Bring together complementary skills around a product, platform, or programme. We help you shape the roles your roadmap needs, from engineering through cloud and quality assurance.",
    fit: "When your roadmap needs a focused group of specialists.",
    points: [
      "A team composition based on your goals",
      "Frontend, backend, cloud, data, and QA expertise",
      "An engagement designed for collaboration and continuity",
    ],
    skills: "Engineering / Cloud / Data / QA",
  },
  {
    title: "Specialist hiring",
    subtitle: "The right person for a specific challenge.",
    description:
      "Some projects need a very particular skill set. Start with the problem you want to solve, and we will discuss the expertise, experience, and engagement that fit.",
    fit: "When a niche platform or new initiative needs dedicated expertise.",
    points: [
      "Role-specific requirements and technical context",
      "Commerce, CRM, AI, and enterprise platform expertise",
      "A conversation about fit before moving forward",
    ],
    skills: "Shopify / Salesforce / Agentic AI / Oracle Cloud",
  },
];
export default function ServicesPage() {
  return (
    <main id="main">
      <InteriorHero
        label="Services"
        title="Specialized developers."
        accent="For every part of your stack."
        description="Staff augmentation only works if the talent fits the project. Explore our specialization areas, then choose the engagement that fits your roadmap."
      />
      <section className="container service-specializations">
        <div className="section-label">
          <span>WHAT WE STAFF / 06 SPECIALIZATIONS</span>
          <span>+</span>
        </div>
        <div className="specialization-grid">
          {serviceDetails.map((service, index) => (
            <Link
              href={`/services/${service.slug}`}
              className="specialization-card"
              key={service.slug}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{service.eyebrow}</h2>
              <p>{service.lead}</p>
              <strong>Explore specialization ↗</strong>
            </Link>
          ))}
        </div>
      </section>
      <div className="container offering-list">
        {offerings.map((service, index) => (
          <article className="offering" key={service.title}>
            <div className="offering-number">0{index + 1} /</div>
            <div className="offering-copy">
              <h2>{service.title}</h2>
              <h3>{service.subtitle}</h3>
              <p>{service.description}</p>
              <span className="offering-skills">{service.skills}</span>
            </div>
            <div className="offering-detail">
              <span>WHEN IT FITS</span>
              <p>{service.fit}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link href="/contact" className="text-link">
                Discuss your requirements <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section className="interior-cta container">
        <div>
          <span className="interior-eyebrow">START WITH THE CHALLENGE</span>
          <h2>
            You don’t need all the answers.
            <br />
            <span className="muted">Just a place to begin.</span>
          </h2>
        </div>
        <Link href="/contact" className="button primary">
          Let’s find your fit <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
