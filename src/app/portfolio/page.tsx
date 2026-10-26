import type { Metadata } from "next";
import Link from "next/link";
import InteriorHero from "../interior-hero";
import { caseStudies } from "../ap-data";
import { sanityClient } from "../../sanity/lib/client";
import { caseStudiesQuery } from "../../sanity/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case Studies — Kodrise",
  description:
    "Real teams, real timelines, and technology work across the Kodrise portfolio.",
};
export default function PortfolioPage() {
  return <PortfolioContent />;
}

async function PortfolioContent() {
  let studies: Array<readonly [string, string, string, string]> = caseStudies.map(
    ([client, title, stack, outcome]) => [client, title, stack, outcome] as const,
  );
  try {
    const remoteStudies = await sanityClient.fetch<
      Array<{ client: string; title: string; stack?: string; outcome?: string }>
    >(caseStudiesQuery);
    if (remoteStudies.length) {
      studies = remoteStudies.map((study) => [
        study.client,
        study.title,
        study.stack || "",
        study.outcome || "",
      ] as const);
    }
  } catch {
    // Keep the bundled content available while Sanity is unavailable.
  }
  return (
    <main id="main">
      <InteriorHero
        label="Case Studies"
        title="Real teams."
        accent="Real timelines. Real results."
        description="A look at how technology teams have used specialist expertise to move ambitious work forward."
      />
      <section className="container case-grid">
        {studies.map(([client, title, stack, outcome], index) => (
          <article className="case-card" key={client}>
            <span className="case-index">
              {String(index + 1).padStart(2, "0")} / {client}
            </span>
            <h2>{title}</h2>
            <p className="case-stack">{stack}</p>
            <div>
              <span>OUTCOME</span>
              <p>{outcome}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="interior-cta container">
        <div>
          <span className="interior-eyebrow">YOUR NEXT CASE STUDY</span>
          <h2>
            Build something
            <br />
            <span className="muted">worth sharing.</span>
          </h2>
        </div>
        <Link href="/contact" className="button primary">
          Talk to our team <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
