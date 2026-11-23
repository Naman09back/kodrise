import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InteriorHero from "../../interior-hero";
import { serviceDetails } from "../../ap-data";
import { sanityClient } from "../../../sanity/lib/client";
import { serviceBySlugQuery, serviceSlugsQuery } from "../../../sanity/lib/queries";

export const dynamic = "force-dynamic";

type ServiceContent = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  skills: string[];
  useCases: string[];
  reasons: string[];
};

async function getService(slug: string): Promise<ServiceContent | undefined> {
  try {
    const service = await sanityClient.fetch(serviceBySlugQuery, { slug });
    if (service) {
      return {
        slug,
        eyebrow: service.eyebrow || "KODRISE SPECIALIZATION",
        title: service.title,
        lead: service.lead || service.overview || "",
        skills: service.skills || [],
        useCases: service.useCases || [],
        reasons: service.benefits || [],
      };
    }
  } catch {
    // Keep the local content fallback available while Sanity is configured.
  }
  return serviceDetails.find((item) => item.slug === slug);
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch(serviceSlugsQuery);
    if (slugs.length) return slugs;
  } catch {
    // Use local content while the CMS is unavailable.
  }
  return serviceDetails.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return {
    alternates: {canonical: `/services/${slug}`},
    title: service ? `${service.eyebrow} — Kodrise` : "Service — Kodrise",
    description: service?.lead,
  };
}
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  return (
    <main id="main">
      <InteriorHero
        label={service.eyebrow}
        title={service.title}
        accent="People who know the work."
        description={service.lead}
      />
      <div className="container service-detail-grid">
        <section>
          <span className="interior-eyebrow">WHAT WE STAFF</span>
          <h2>Skills &amp; platforms</h2>
          <div className="detail-tags">
            {service.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>
        <section>
          <span className="interior-eyebrow">COMMON USE CASES</span>
          <h2>When teams hire us</h2>
          <ul className="detail-list">
            {service.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className="container detail-why">
        <div>
          <span className="interior-eyebrow">WHY KODRISE</span>
          <h2>
            A specialist who
            <br />
            <span className="muted">understands the context.</span>
          </h2>
        </div>
        <div className="reason-list">
            {service.reasons.map((reason, index) => (
            <article key={reason}>
              <span>0{index + 1}</span>
              <p>{reason}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="interior-cta container">
        <div>
          <span className="interior-eyebrow">READY TO SCALE YOUR TEAM?</span>
          <h2>
            Get a shortlist
            <br />
            <span className="muted">within 24 hours.</span>
          </h2>
        </div>
        <Link
          href={`/contact?role=${encodeURIComponent(service.eyebrow)}`}
          className="button primary"
        >
          Submit your requirement <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
