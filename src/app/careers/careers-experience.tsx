"use client";

import {useState, type FormEvent} from "react";
import type {SitePageContent} from "@/sanity/lib/pages";
import styles from "./careers-page.module.css";

export type CareerOpening = {
  _id: string;
  title: string;
  summary?: string;
  location?: string;
  employmentType?: string;
};

const reasons = [
  {title: "Real, relevant opportunities", text: "We focus on work that fits your skills, experience, and availability."},
  {title: "Support throughout", text: "Work with a team that stays connected and helps you do your best work."},
  {title: "Clear expectations", text: "Understand the role, project goals, and working arrangements before you begin."},
  {title: "Room to explore", text: "Contribute across web, mobile, commerce, AI, and other areas of digital product development."},
];

const steps = [
  {title: "Share your profile", text: "Tell us about your skills, experience, and the kind of work you are looking for."},
  {title: "Meet our team", text: "We will learn about your strengths, interests, and how you like to work."},
  {title: "Find the right fit", text: "When a suitable role or project comes up, we will discuss it with you."},
  {title: "Grow with support", text: "Stay connected with our team as you take on new challenges and build your experience."},
];

const engagements = [
  {title: "Short-term projects", text: "Focused opportunities to make an impact on a specific project or milestone."},
  {title: "Long-term roles", text: "Ongoing work with teams building and improving digital products."},
  {title: "Specialist work", text: "Bring deep expertise to challenging technical and product problems."},
];

export default function CareersExperience({page, openings}: {page: SitePageContent | null; openings: CareerOpening[]}) {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setStatus("");
    try {
      const response = await fetch("/api/careers/apply", {method: "POST", body: new FormData(form)});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not submit your application.");
      setStatus("Thanks for sharing your profile. Our team will be in touch when a suitable opportunity comes up.");
      form.reset();
      setRole("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}><a href="/">Home</a><span>/</span><span>Careers</span></div>
        <p className={styles.kicker}>Careers at Kodrise</p>
        <h1>{page?.heroTitle || "Build your career on meaningful projects"} <span>{page?.heroAccent || "with Kodrise."}</span></h1>
        <div className={styles.heroRow}>
          <p>{page?.heroDescription || "Join a team creating useful digital products and engineering systems. Share your profile and connect with us about opportunities that match your strengths."}</p>
          <a className={styles.primaryButton} href="#join-talent-pool">Join our talent pool <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.heroProof}><span>People-first collaboration</span><span>Meaningful product work</span><span>Support as you grow</span></div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.whySection}`}>
      <div className={styles.container}>
        <header className={styles.sectionHeading}><span className={styles.kicker}>Why join us</span><h2>{page?.careerIntroTitle || "Why developers choose Kodrise"}</h2><p>{page?.careerIntroDescription || "Bring your ideas, curiosity, and craft to a team that values thoughtful work and good collaboration."}</p></header>
        <div className={styles.reasonsGrid}>
          <article className={styles.featureCard}><span className={styles.cardIndex}>01 / YOUR WORK</span><h3>Real, vetted opportunities</h3><p>We look for meaningful work where your experience and interests can make a difference.</p><a href="#open-roles">Explore opportunities <span aria-hidden="true">↗</span></a></article>
          {reasons.map((reason, index) => <article className={styles.reasonCard} key={reason.title}><span className={styles.cardIndex}>0{index + 2} / KODRISE</span><h3>{reason.title}</h3><p>{reason.text}</p></article>)}
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.processSection}`}>
      <div className={styles.container}>
        <header className={`${styles.sectionHeading} ${styles.centered}`}><span className={styles.kicker}>Our process</span><h2>How it works for candidates</h2><p>A clear, personal process from your first conversation to finding an opportunity that fits.</p></header>
        <div className={styles.stepsGrid}>{steps.map((step, index) => <article className={styles.stepCard} key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.container}>
        <header className={`${styles.sectionHeading} ${styles.centered}`}><span className={styles.kicker}>Ways to work together</span><h2>Explore different kinds of work</h2><p>Find a way to contribute that suits your skills, goals, and availability.</p></header>
        <div className={styles.engagementGrid}>{engagements.map((item, index) => <article className={styles.engagementCard} key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><a href="#join-talent-pool">Register your interest <b aria-hidden="true">↗</b></a></article>)}</div>
      </div>
    </section>

    <section className={styles.openingsSection} id="open-roles">
      <div className={styles.container}>
        <header className={styles.sectionHeading}><span className={styles.kicker}>Open opportunities</span><h2>Current roles at Kodrise</h2><p>See a role that fits? Share your profile and tell us what you would bring to the team.</p></header>
        {openings.length ? <div className={styles.openingsList}>{openings.map((opening) => <article className={styles.openingCard} key={opening._id}><div><span className={styles.openingMeta}>{[opening.employmentType, opening.location].filter(Boolean).join(" · ") || "Open position"}</span><h3>{opening.title}</h3><p>{opening.summary}</p></div><button type="button" className={styles.outlineButton} onClick={() => {setRole(opening.title); document.getElementById("join-talent-pool")?.scrollIntoView({behavior: "smooth"});}}>Apply for role <span aria-hidden="true">↗</span></button></article>)}</div> : <p className={styles.noOpenings}>There are no listed openings right now. Join our talent pool and we’ll reach out if a suitable opportunity comes up.</p>}
      </div>
    </section>

    <section className={styles.applicationSection} id="join-talent-pool">
      <div className={styles.container}>
        <div className={styles.applicationIntro}><span className={styles.kicker}>Join our talent pool</span><h2>Ready for your next opportunity?</h2><p>Send us your profile. We will keep it in mind as roles and projects open up that match your experience.</p><a href="mailto:hr@kodrise.com">Questions? Email our team <span aria-hidden="true">↗</span></a></div>
        <form className={styles.applicationForm} onSubmit={submitApplication}>
          <div className={styles.formRow}><label>Full name *<input name="name" autoComplete="name" required placeholder="Your name" /></label><label>Email address *<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label></div>
          <label>Role or area of interest<input name="role" value={role} onChange={(event) => setRole(event.target.value)} placeholder="e.g. Frontend development" /></label>
          <label>LinkedIn profile<input name="linkedin" type="url" placeholder="https://linkedin.com/in/your-profile" /></label>
          <label>Tell us about yourself<textarea name="message" rows={4} placeholder="Your experience, skills, and the kind of opportunity you are looking for" /></label>
          <label className={styles.fileField}>Resume (PDF, DOC, or DOCX; max 10 MB) *<input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required /></label>
          <div className={styles.formFooter}><button className={styles.primaryButton} type="submit" disabled={submitting}>{submitting ? "Sending…" : "Submit your profile"}<span aria-hidden="true">↗</span></button><span className={styles.status} role="status" aria-live="polite">{status}</span></div>
        </form>
      </div>
    </section>
  </main>;
}
