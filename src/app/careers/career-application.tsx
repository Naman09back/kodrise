"use client";

import {useState} from "react";

export default function CareerApplication() {
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending application…");
    const form = event.currentTarget;
    const response = await fetch("/api/careers/apply", {
      method: "POST",
      body: new FormData(form),
    });
    const result = await response.json();
    if (response.ok) window.gtag?.("event", "career_application", {event_category: "careers"});
    setStatus(response.ok ? "Application received. We’ll be in touch." : result.error || "Unable to submit application.");
    if (response.ok) form.reset();
  }

  return (
    <section className="career-application" id="career-application">
      <div className="career-application-intro">
        <span className="interior-eyebrow">JOIN THE BENCH</span>
        <h2>Tell us where<br /><span className="muted">you do your best work.</span></h2>
        <p>Share a little about yourself and the kind of work you want to do. We’ll keep your details in mind for the right opportunity.</p>
      </div>
      <form className="career-application-form" onSubmit={submit}>
        <div className="career-form-row">
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
        </div>
        <div className="career-form-row">
          <label>Role or discipline<input name="role" placeholder="e.g. React, Java, DevOps" /></label>
          <label>LinkedIn / portfolio<input name="linkedin" type="url" placeholder="https://" /></label>
        </div>
        <label>Resume<input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required /><small>PDF, DOC or DOCX up to 10 MB.</small></label>
        <label>Message<textarea name="message" rows={5} placeholder="Tell us about your experience and the work you enjoy." /></label>
        <div className="career-form-footer">
          <button className="button primary" type="submit">Send application <span aria-hidden="true">→</span></button>
          {status && <p role="status">{status}</p>}
        </div>
      </form>
    </section>
  );
}
