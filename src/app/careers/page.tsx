import type {Metadata} from "next";
import Link from "next/link";
import InteriorHero from "../interior-hero";
import {getSitePage} from "../../sanity/lib/pages";
import {sanityClient} from "../../sanity/lib/client";
import CareerApplication from "./career-application";

export const metadata: Metadata = {title: "Careers — Kodrise", description: "Explore the technology disciplines at Kodrise and check for published career opportunities."};

type Job = {_id: string; title?: string; location?: string; employmentType?: string; summary?: string; skills?: string[]};

export default async function CareersPage() {
  const page = await getSitePage("careers");
  const jobs = await sanityClient.fetch<Job[]>(`*[_type == "job" && isOpen == true] | order(_createdAt desc){_id, title, location, employmentType, summary, skills}`).catch(() => []);
  return <main id="main">
    <InteriorHero label="Careers" title={page?.heroTitle || "Your expertise."} accent={page?.heroAccent || "New possibilities."} description={page?.heroDescription || "Great work starts with curious people. Explore the disciplines that connect our technology community."} />
    <section className="container career-intro"><div><span className="interior-eyebrow">THE WORK WE CONNECT AROUND</span><h2>{page?.careerIntroTitle || "Where your skills"}<br /><span className="muted">can make a difference.</span></h2></div><p>{page?.careerIntroDescription || "From thoughtful interfaces to enterprise platforms and intelligent workflows, our focus spans the technologies modern teams work with."}</p></section>
    <section className="container career-disciplines">{[["01", page?.careerDisciplineOneTitle || "Software engineering", page?.careerDisciplineOneDescription || "React, Angular, Java, Python, Node.js, and .NET"], ["02", page?.careerDisciplineTwoTitle || "Commerce & customer platforms", page?.careerDisciplineTwoDescription || "Shopify, Salesforce, and business integrations"], ["03", page?.careerDisciplineThreeTitle || "AI, data & databases", page?.careerDisciplineThreeDescription || "Agentic AI, SQL, data engineering, and intelligent systems"], ["04", page?.careerDisciplineFourTitle || "Cloud & delivery", page?.careerDisciplineFourDescription || "Oracle Cloud, AWS, Azure, DevOps, and quality assurance"]].map(([number, title, description]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><span aria-hidden="true">→</span></article>)}</section>
    <section className="container careers-status"><span className="interior-eyebrow">OPPORTUNITIES</span><h2>{jobs.length ? "Find your next chapter." : "A space for your next chapter."}</h2>{jobs.length ? <div className="career-job-list">{jobs.map((job) => <article className="job-card" key={job._id}><div><span className="interior-eyebrow">{job.employmentType || "Opportunity"} · {job.location || "Flexible location"}</span><h3>{job.title}</h3><p>{job.summary}</p>{job.skills?.length ? <small>{job.skills.join(" · ")}</small> : null}</div><a href="#apply" className="button secondary">Apply <span aria-hidden="true">→</span></a></article>)}</div> : <><p>There are no published openings on this site yet. Role details and application instructions will appear here when available.</p><Link href="/about" className="button secondary">Get to know Kodrise <span aria-hidden="true">→</span></Link></>}</section>
    <div id="apply"><CareerApplication /></div>
  </main>;
}
