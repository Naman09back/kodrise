"use client";

import { useEffect, useState, type FormEvent } from "react";
import { apContact } from "./ap-data";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

function ContactIcon({ type }: { type: "mail" | "phone" }) {
  return (
    <svg className="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {type === "mail" ? <path d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7" /> : <path d="M7.2 3.5 4.8 5.9c-.8.8-.9 2-.4 3 2.8 5.7 5 7.9 10.7 10.7 1 .5 2.2.4 3-.4l2.4-2.4-3.6-3.6-2.1 1.4c-1.7-.8-3.2-2.3-4-4l1.4-2.1-3.6-3.6Z" />}
    </svg>
  );
}

export default function ContactSection({
  technology,
  onTechnologyChange,
  initialTechnology = "",
  initialMessage = "",
}: {
  technology?: string;
  onTechnologyChange?: (value: string) => void;
  initialTechnology?: string;
  initialMessage?: string;
}) {
  const [localTechnology, setLocalTechnology] = useState(initialTechnology);
  const selectedSkill = technology ?? localTechnology;
  const setSelectedSkill = onTechnologyChange ?? setLocalTechnology;
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [submissionState, setSubmissionState] = useState("");
  const [contactDetails, setContactDetails] = useState(apContact);
  useEffect(() => {
    fetch("/api/content/settings")
      .then((response) => response.json())
      .then((settings) => {
        if (settings.contactEmail || settings.phone || settings.address) {
          setContactDetails({
            ...apContact,
            email: settings.contactEmail || apContact.email,
            phone: settings.phone || apContact.phone,
            phoneHref: `tel:${String(settings.phone || apContact.phone).replace(/[^\d+]/g, "")}`,
            address: settings.address || apContact.address,
            linkedin: settings.linkedin || apContact.linkedin,
            x: settings.x || apContact.x,
            instagram: settings.instagram || apContact.instagram,
          });
        }
      })
      .catch(() => undefined);
  }, []);
  useEffect(() => {
    setBrief("");
    setCopied(false);
  }, [selectedSkill]);
  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmissionState("Saving enquiry…");
    setBrief(
      `KODRISE — TALENT ENQUIRY\n\nName: ${String(data.get("name")).trim()}\nWork email: ${data.get("email")}\nPhone: ${data.get("phone") || "Not provided"}\nCompany: ${String(data.get("company")).trim()}\nEngagement: ${data.get("engagement")}\nTechnology: ${data.get("technology") || "To discuss"}\n\nProject details:\n${String(data.get("message")).trim()}\n\nPrepared locally for Kodrise.`,
    );
    try {
      window.gtag?.("event", "generate_lead", {event_category: "contact", technology: data.get("technology") || "unknown"});
      const response = await fetch("/api/contact", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(Object.fromEntries(data.entries()))});
      const result = await response.json();
      setSubmissionState(result.stored ? "Your enquiry was saved for the Kodrise team." : "Your brief is ready to email.");
    } catch {
      setSubmissionState("Your brief is ready to email.");
    }
    setCopied(false);
  }
  function downloadBrief() {
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "kodrise-project-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function emailBrief() {
    const subject = encodeURIComponent("Kodrise talent enquiry");
    const body = encodeURIComponent(brief);
    window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="eyebrow">
            <span className="status-dot" /> YOUR NEXT CHAPTER
          </div>
          <h2>
            Good things
            <br />
            start with
            <br />
            <span>a conversation.</span>
          </h2>
          <p>
            A specialist, a team, or an idea you’re still shaping.
            <br />
            Tell us where you want to go, and we’ll help move it forward.
          </p>
          <p className="contact-support-copy">
            Tell us what you’re building, and we’ll help you find the right people to move it forward.
          </p>
          <div className="contact-details">
            <a href={`mailto:${contactDetails.email}`}><ContactIcon type="mail" />{contactDetails.email}</a>
            <a href={contactDetails.phoneHref}><ContactIcon type="phone" />{contactDetails.phone}</a>
            <a href={contactDetails.maps} target="_blank" rel="noreferrer">
              {contactDetails.address}
            </a>
          </div>
          <div className="contact-decoration" aria-hidden="true">
            ↗
          </div>
        </div>
        <div className="contact-form-wrap">
          <h3>What are you building?</h3>
          <p>Give us a little context. Start with what you know.</p>
          <form
            onSubmit={submitBrief}
            onChange={() => {
              if (brief) setBrief("");
            }}
          >
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  placeholder="Alex Morgan"
                  required
                  maxLength={100}
                  autoComplete="name"
                  pattern=".*\S.*"
                />
              </label>
              <label>
                Work email
                <input
                  name="email"
                  type="email"
                  placeholder="alex@company.com"
                  autoComplete="email"
                  required
                  maxLength={200}
                />
              </label>
            </div>
                <label>
                  Company
              <input
                name="company"
                placeholder="Your company"
                autoComplete="organization"
                required
                maxLength={200}
                pattern=".*\S.*"
                  />
                </label>
                <label>
                  Phone (optional)
                  <input name="phone" type="tel" placeholder="+91 63510 58011" autoComplete="tel" maxLength={40} />
                </label>
            <div className="form-row">
              <label>
                I’m looking for
                <select name="engagement" defaultValue="Staff augmentation">
                  <option>Staff augmentation</option>
                  <option>A dedicated team</option>
                  <option>A specialist hire</option>
                  <option>Let’s figure it out</option>
                </select>
              </label>
              <label>
                Technology
                <input
                  name="technology"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  placeholder="e.g. React, Salesforce"
                  maxLength={200}
                />
              </label>
            </div>
            <label>
              A little about your needs
              <textarea
                name="message"
                placeholder="The skills you need, what you’re building, and your ideal timeline…"
                rows={3}
                required
                maxLength={3000}
                defaultValue={initialMessage}
              />
            </label>
            <button type="submit" className="button dark-button">
              Prepare my enquiry <Arrow diagonal />
            </button>
            <p className="form-note">
              {submissionState || "Your details are securely prepared for the Kodrise team."}
            </p>
          </form>
          {brief && (
            <div className="brief-result" role="status">
              <strong>Your project brief is ready.</strong>
              <p>
                Download it for your records, or email it directly to our team.
              </p>
              <div>
                <button type="button" onClick={downloadBrief}>
                  Download brief <Arrow />
                </button>
                <button type="button" onClick={emailBrief}>
                  Email enquiry
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(brief);
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  {copied ? "Copied ✓" : "Copy brief"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
