import type { Metadata } from "next";
import Link from "next/link";
import InteriorHero from "../interior-hero";
import { getSitePage } from "../../sanity/lib/pages";

export const metadata: Metadata = {
  title: "About Us — Kodrise",
  description:
    "Get to know Kodrise’s people-first approach to technology staffing and team augmentation.",
};
export default async function AboutPage() {
  const page = await getSitePage("about");
  return (
    <main id="main">
      <InteriorHero
        label="About Us"
        title={page?.heroTitle || "Technology moves forward."}
        accent={page?.heroAccent || "People make it happen."}
        description={page?.heroDescription || "Kodrise is a technology staff augmentation firm connecting businesses with the expertise they need to build what comes next."}
      />
      <section className="container interior-story">
        <span className="interior-eyebrow">OUR POINT OF VIEW</span>
        <div>
          <h2>
            Good teams are built
            <br />
            on more than a skill set.
          </h2>
          <p>
            The right experience matters. So does how people communicate,
            collaborate, and understand the work in front of them. Our approach
            starts with that whole picture.
          </p>
          <p>
            We work across established platforms and emerging technologies —
            from Shopify and Salesforce to Java, React, Python, cloud,
            databases, and agentic AI. The common thread is people who can
            contribute to your goals.
          </p>
          <p>
            We see staff augmentation as an extension of your team: aligned with
            your direction, connected to your processes, and focused on the work
            you want to accomplish.
          </p>
        </div>
      </section>
      <section className="container values-grid">
        {[
          {
            icon: "◎",
            title: "Context before a shortlist",
            text: "We start with your goals, team structure, and technical environment to understand what a good fit looks like.",
          },
          {
            icon: "⊞",
            title: "Collaboration at the centre",
            text: "The work belongs to a team. Communication and working style deserve the same attention as technical skills.",
          },
          {
            icon: "↗",
            title: "Built for what’s next",
            text: "Your requirements will evolve. We keep the conversation connected to your next milestone and longer-term direction.",
          },
        ].map((value) => (
          <article key={value.title}>
            <span aria-hidden="true">{value.icon}</span>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </article>
        ))}
      </section>
      <section className="interior-cta container">
        <div>
          <span className="interior-eyebrow">PEOPLE POWER POSSIBILITIES</span>
          <h2>
            Let’s get to know
            <br />
            <span className="muted">what you’re building.</span>
          </h2>
        </div>
        <Link href="/contact" className="button primary">
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
