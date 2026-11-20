import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import Calculator from "./resource-calculator";
import MirrorRoutePage from "../../mirror-route-page";
import {getCodiantMirrorByPath} from "@/lib/codiant-mirrors";

const pages: Record<string, {kicker: string; title: string; description: string}> = {
  "web-cost-calculator": {kicker: "Website cost calculator", title: "Website Development Cost Estimator", description: "Tell us about your website to start planning its features, design and delivery."},
  "app-cost-calculator": {kicker: "App cost calculator", title: "App Development Cost Estimator", description: "Explore the platforms and features you need for your app."},
  "mobile-app-rfp": {kicker: "Mobile app development", title: "RFP for Mobile App Development", description: "Lay the groundwork for a successful project with a clear request for proposal."},
  "blogs": {kicker: "Startups, design, technology", title: "Kodrise Blogs", description: "Insights on digital technologies, product development and business transformation."},
  "press-releases": {kicker: "Company news", title: "Press Releases", description: "Explore the latest Kodrise news and announcements."},
  "ebooks": {kicker: "The knowledge hub", title: "Whitepapers & eBooks", description: "Explore guides and research on technology, innovation and digital transformation."},
  "free-digital-consultation": {kicker: "Real value. Zero cost.", title: "Get Your Free Digital Consultation", description: "Explore expert guidance and audits to help your business grow and scale."},
};

const consultations = ["AI Consulting", "Digital Transformation", "eCommerce Audit", "IT Consultation", "Mobile App Audit", "SEO Audit", "UI/UX Audit", "Website Assessment Audit"];

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const mirror = await getCodiantMirrorByPath(`/resources/${slug}`);
  if (mirror?.title) return {title: {absolute: mirror.title}};
  const page = pages[slug];
  return {title: page?.title || "Resources" , description: page?.description};
}

export default async function ResourcePage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  if (await getCodiantMirrorByPath(`/resources/${slug}`)) return <MirrorRoutePage pathname={`/resources/${slug}`} />;
  const page = pages[slug];
  if (!page) notFound();
  const calculator = slug === "web-cost-calculator" || slug === "app-cost-calculator";
  return <main id="main" className="resource-detail">
    <section className="resource-detail-hero"><div className="resource-detail-wrap">
      <Link href="/resources" className="resource-back">← All resources</Link>
      <p className="resource-detail-kicker">{page.kicker}</p><h1>{page.title}</h1><p>{page.description}</p>
    </div></section>
    <section className="resource-detail-body"><div className="resource-detail-wrap">
      {calculator ? <Calculator type={slug === "web-cost-calculator" ? "web" : "app"} /> : slug === "mobile-app-rfp" ? <>
        <h2>Request for Proposal – Mobile App Development</h2><p>Define your objectives, requirements and selection criteria before approaching development partners.</p>
        <h3>What to include</h3><ul><li>Project background and business goals</li><li>Target audience and platforms</li><li>Features, integrations and security requirements</li><li>Budget, timeline and proposal requirements</li></ul>
        <Link className="resource-action" href="/contact">Discuss your project →</Link>
      </> : slug === "free-digital-consultation" ? <div className="resource-options">{consultations.map((item) => <article key={item}><h2>Free {item}</h2><p>Discuss your goals and next steps with our team.</p><Link href="/contact">Request consultation →</Link></article>)}</div> : <>
        <h2>{slug === "blogs" ? "All Insights" : page.title}</h2><p>New {slug === "blogs" ? "articles" : slug === "ebooks" ? "guides" : "announcements"} will appear here as they are published.</p><Link className="resource-action" href="/resources">Explore resources →</Link>
      </>}
    </div></section>
  </main>;
}
