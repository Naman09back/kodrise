"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { developers } from "../ap-data";

const filters = [
  "All Skills",
  "eCommerce",
  "DevOps",
  "Agentic AI",
  "QA",
  "Mobile",
  "AI/ML",
  "React",
  "Node.js",
  "Angular",
  "AWS",
  "TypeScript",
];
type DeveloperRecord = [string, string, string, string[], string, string];
export default function DevResourcesPage() {
  const [skill, setSkill] = useState("All Skills");
  const [cmsDevelopers, setCmsDevelopers] = useState<DeveloperRecord[]>(developers.map((developer) => [...developer.slice(0, 3), [...developer[3]], developer[4], developer[5]] as DeveloperRecord));
  useEffect(() => {
    fetch("/api/content/developers")
      .then((response) => response.json())
      .then((items) => {
        if (Array.isArray(items) && items.length) {
          setCmsDevelopers(items.map((item) => [item.profileId, item.role, item.experience, item.skills, item.availability, item.engagement] as DeveloperRecord));
        }
      })
      .catch(() => undefined);
  }, []);
  const visible = useMemo(
    () =>
      cmsDevelopers.filter(
        (dev) =>
          skill === "All Skills" ||
          dev[3].some((item) =>
            item.toLowerCase().includes(skill.toLowerCase()),
          ) ||
          (skill === "eCommerce" &&
            dev[1].toLowerCase().includes("full stack")) ||
          (skill === "AI/ML" && dev[1].toLowerCase().includes("data")),
      ),
    [cmsDevelopers, skill],
  );
  return (
    <main id="main">
      <section className="resource-hero">
        <div className="container">
          <span className="interior-eyebrow">
            DEV RESOURCE / PRE-VETTED TALENT
          </span>
          <h1>
            Meet the developer
            <br />
            <span>behind your next milestone.</span>
          </h1>
          <p>
            Every profile has cleared a technical screening and interview
            process. Filter by skill and availability to find a starting point —
            or send us your requirement and we’ll shortlist for you.
          </p>
        </div>
      </section>
      <section className="container resource-filters">
        <div>
          <label>
            Skill / stack
            <select
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
            >
              {filters.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Experience level
            <select defaultValue="All levels">
              <option>All levels</option>
              <option>Junior</option>
              <option>Mid-level</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
          </label>
          <label>
            Availability
            <select defaultValue="All availability">
              <option>All availability</option>
              <option>Immediate</option>
              <option>Within 2 weeks</option>
            </select>
          </label>
        </div>
        <button type="button" onClick={() => setSkill("All Skills")}>
          Reset filters ↺
        </button>
      </section>
      <section className="container resource-grid" aria-live="polite">
        {visible.map(
          ([id, title, experience, skills, availability, engagement]) => (
            <article className="developer-card" key={id}>
              <div className="developer-card-top">
                <span>
                  <i /> Vetted
                </span>
                <small>{id}</small>
              </div>
              <h2>{title}</h2>
              <p className="developer-experience">{experience}</p>
              <strong>Core skills</strong>
              <div className="developer-tags">
                {skills.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <dl>
                <div>
                  <dt>Availability</dt>
                  <dd>{availability}</dd>
                </div>
                <div>
                  <dt>Engagement</dt>
                  <dd>{engagement}</dd>
                </div>
              </dl>
              <Link
                href={`/contact?developer=${id}&role=${encodeURIComponent(title)}`}
                className="developer-request"
              >
                Request this developer <span aria-hidden="true">↗</span>
              </Link>
              <footer>
                Technically vetted <span>Avg. onboarding: 3–5 days</span>
              </footer>
            </article>
          ),
        )}
      </section>
      <section className="container resource-cta">
        <span className="interior-eyebrow">
          LOOKING FOR A SPECIFIC SKILL SET?
        </span>
        <h2>
          Our full bench is larger
          <br />
          <span className="muted">than what’s shown here.</span>
        </h2>
        <p>
          Many developers are matched directly to requirements rather than
          listed publicly. Tell us what you need and get a shortlist within 24
          hours.
        </p>
        <Link href="/contact" className="button primary">
          Submit your requirement <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
