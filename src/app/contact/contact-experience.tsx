"use client";

import { useState, type FormEvent } from "react";
import styles from "./contact-page.module.css";

type ContactPageData = { heroTitle?: string; heroDescription?: string } | null;
type ContactImage = { src: string; alt: string };

const contactWays = [
  { title: "Start a project", detail: "Share your goals and we will shape a clear next step.", action: "Send a project enquiry", href: "mailto:hr@kodrise.com" },
  { title: "Talk to our team", detail: "Speak directly with our team about your technology needs.", action: "+91 9302752700", href: "tel:+9193027572700" },
  { title: "Email us", detail: "For partnerships, hiring, or general questions.", action: "hr@kodrise.com", href: "mailto:hr@kodrise.com" },
  { title: "Work across time zones", detail: "Our distributed team collaborates with businesses worldwide.", action: "Explore our services", href: "/shopify-services" },
];

const regions = ["North America", "Asia", "Australia", "European Union", "Global Operations", "Middle East & Africa"];
const regionCopy: Record<string, string> = {
  "North America": "Our team works with North American businesses through remote project delivery and scheduled calls.",
  Asia: "Kodrise is based in Indore, Madhya Pradesh, India, and supports projects across Asia.",
  Australia: "We collaborate with Australian teams remotely, with meeting times planned around your working day.",
  "European Union": "Our distributed delivery model supports European businesses from discovery through ongoing development.",
  "Global Operations": "Kodrise works with clients across regions through online workshops, shared project tools, and regular progress reviews.",
  "Middle East & Africa": "We support teams across the Middle East and Africa with remote product engineering and commerce services.",
};

export default function ContactExperience({ page, images }: { page: ContactPageData; images: Record<string, ContactImage> }) {
  const [activeRegion, setActiveRegion] = useState("North America");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"), email: form.get("email"), phone: form.get("phone"),
          company: form.get("company") || "Not provided", engagement: form.get("budget"),
          technology: form.get("service"), message: form.get("message"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please check the form and try again.");
      if (result.stored || result.sentToCrm) {
        setStatus("Thanks for reaching out. Your message has been received.");
        event.currentTarget.reset();
      } else {
        setStatus("The contact form is temporarily unavailable. Please email hr@kodrise.com.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not send your message. Please email hr@kodrise.com.");
    } finally {
      setSending(false);
    }
  }

  return <main className={styles.page}>
    <section className={styles.intro}>
      <div className={styles.introInner}>
        <h1>{page?.heroTitle || "Tell us what you are building."}</h1>
        <p>{page?.heroDescription || "Share the challenge, the stack, and the timeline. We will come back with a focused next step."}</p>
      </div>
    </section>

    <section className={styles.contactCard} aria-labelledby="contact-form-title">
      <div className={styles.formPanel}>
        <h2 id="contact-form-title">Let’s build something great together</h2>
        <p className={styles.formIntro}>Tell us a little about your project. Our team will get back to you to discuss how we can help.</p>
        <form className={styles.form} onSubmit={submitContact}>
          <div className={styles.row}>
            <label>Full name *<input name="name" autoComplete="name" placeholder="Enter your full name" required /></label>
            <label>Email address *<input name="email" type="email" autoComplete="email" placeholder="Enter your email address" required /></label>
          </div>
          <div className={styles.row}>
            <label>Mobile number<input name="phone" type="tel" autoComplete="tel" placeholder="Enter your phone number" /></label>
            <label>Approximate budget<select name="budget" defaultValue=""><option value="" disabled>Select your budget</option><option>$5k</option><option>$10k</option><option>$20k</option><option>$35k</option><option>$50k-$100k</option><option>Not Sure</option></select></label>
          </div>
          <label>How can we help? *<textarea name="message" placeholder="Tell us about your project, goals, or challenge" required /></label>
          <label className={styles.serviceField}>What are you looking for?<select name="service" defaultValue=""><option value="">Choose a service (optional)</option><option>Shopify and ecommerce</option><option>AI and machine learning</option><option>Web and product development</option><option>Dedicated developers</option><option>Other</option></select></label>
          <div className={styles.privacy}>We’ll only use your details to respond to this enquiry. Your information stays private and secure.</div>
          <div className={styles.formActions}><button type="submit" disabled={sending}>{sending ? "Sending…" : "Submit"}<span aria-hidden="true">↗</span></button><span className={styles.status} role="status" aria-live="polite">{status}</span></div>
        </form>
      </div>
      <aside className={styles.infoPanel}>
        <h2>Contact Information</h2>
        <p>We’re ready to listen, learn about your goals, and help you find a way forward.</p>
        <a className={styles.infoItem} href="mailto:hr@kodrise.com"><span className={styles.icon} aria-hidden="true">✉</span><span><small>Email us</small><strong>hr@kodrise.com</strong></span></a>
        <a className={styles.infoItem} href="tel:+9193027572700"><span className={styles.icon} aria-hidden="true">⌕</span><span><small>Call us</small><strong>+91 9302752700</strong></span></a>
        <div className={styles.address}><span className={styles.icon} aria-hidden="true">⌖</span><span><small>Our base</small><strong>Indore, Madhya Pradesh, India</strong></span></div>
        <a className={styles.whatsapp} href="https://wa.me/916351058011" target="_blank" rel="noreferrer">Message us on WhatsApp <span aria-hidden="true">↗</span></a>
      </aside>
    </section>

    <section className={styles.ways}>
      <div className={styles.waysInner}>
        <h2>Different ways to connect with us</h2>
        <p>Whether you have a project in mind or want to learn more about our work, we’d be glad to hear from you.</p>
        <div className={styles.waysGrid}>{contactWays.map((way, index) => <article key={way.title}><span className={styles.wayNumber}>0{index + 1}</span><h3>{way.title}</h3><p>{way.detail}</p><a href={way.href}>{way.action}<span aria-hidden="true"> ↗</span></a></article>)}</div>
      </div>
    </section>

    <section className={styles.trusted}>
      <div className={styles.sectionHeading}><h2>Trusted by teams building what’s next</h2><p>We partner with ambitious businesses to design, build, and grow digital products.</p></div>
      <div className={styles.logoRow}>{Object.entries(images).map(([slot, image]) => <div className={styles.logo} key={slot}><img src={image.src} alt={image.alt} loading="lazy" /></div>)}</div>
    </section>

    <section className={styles.facts}>
      <div className={styles.sectionHeading}><h2>Know more about us for better growth</h2><p>Product thinking, engineering expertise, and a delivery team built around your goals.</p></div>
      <div className={styles.factGrid}>
        {[
          ["1,500+", "Projects delivered"], ["19+ years", "Digital experience"], ["AI first", "Modern engineering"], ["Global", "Distributed delivery"],
          ["Shopify", "Commerce solutions"], ["AI & ML", "Intelligent products"], ["Web & mobile", "End to end development"], ["Dedicated teams", "Flexible collaboration"],
          ["Strategy", "Clear product direction"], ["Design", "Human centered experiences"], ["Engineering", "Reliable, scalable systems"], ["Partnership", "Long term support"],
        ].map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
      </div>
    </section>

    <section className={styles.regions}>
      <h2>Connect with our global team</h2>
      <div className={styles.regionTabs} role="tablist" aria-label="Regions supported">
        {regions.map((region) => <button key={region} type="button" role="tab" aria-selected={activeRegion === region} className={activeRegion === region ? styles.selected : ""} onClick={() => setActiveRegion(region)}>{region}</button>)}
      </div>
      <div className={styles.regionPanel} role="tabpanel">
        <div><span className={styles.regionEyebrow}>WORKING ACROSS {activeRegion.toUpperCase()}</span><h3>Let’s talk about your next project</h3><p>{regionCopy[activeRegion]}</p><a href="mailto:hr@kodrise.com">Get in touch <span aria-hidden="true">↗</span></a></div>
        <div className={styles.regionContact}><span className={styles.pin}>⌖</span><strong>Kodrise Technologies</strong><span>Indore, Madhya Pradesh, India</span><a href="mailto:hr@kodrise.com">hr@kodrise.com</a><a href="tel:+9193027572700">+91 9302752700</a></div>
      </div>
    </section>
  </main>;
}
