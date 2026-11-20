"use client";

import {useEffect, useState} from "react";
import {signOut} from "next-auth/react";
import SeoDashboard from "./seo-dashboard";

type RecordItem = Record<string, unknown> & {_id: string; _type: string};
type Content = {services: RecordItem[]; industries: RecordItem[]; insights: RecordItem[]; resources: RecordItem[]; faqs: RecordItem[]; caseStudies: RecordItem[]; developers: RecordItem[]; jobs: RecordItem[]; pages: RecordItem[]; leads: RecordItem[]; applications: RecordItem[]; testimonials: RecordItem[]; settings: RecordItem[]; assets: RecordItem[]};
type AccountUser = {_id: string; email: string; role: "admin" | "editor"; isActive?: boolean; createdAt?: string};

const sections = [
  ["pages", "Homepage & SEO"],
  ["services", "AI & digital services"],
  ["caseStudies", "Portfolio / case studies"],
  ["industries", "Industries we serve"],
  ["insights", "Insights & news"],
  ["resources", "Resources / tools & guides"],
  ["faqs", "Frequently asked questions"],
  ["developers", "Developer profiles"],
  ["jobs", "Careers / job openings"],
  ["assets", "Media library"],
  ["leads", "Contact enquiries"],
  ["applications", "Job applications"],
  ["testimonials", "Client testimonials"],
  ["settings", "Contact details"],
] as const;

const createContentTypes: Record<string, {type: string; label: string; fields: Array<{name: string; multiline?: boolean}>}> = {
  services: {type: "service", label: "service", fields: [{name: "title"}]},
  caseStudies: {type: "caseStudy", label: "case study", fields: [{name: "title"}, {name: "client"}]},
  industries: {type: "industry", label: "industry", fields: [{name: "title"}]},
  insights: {type: "insight", label: "article", fields: [{name: "title"}]},
  resources: {type: "resource", label: "resource", fields: [{name: "title"}, {name: "excerpt", multiline: true}, {name: "url"}]},
  faqs: {type: "faq", label: "FAQ", fields: [{name: "question"}, {name: "answer", multiline: true}]},
  developers: {type: "developer", label: "developer profile", fields: [{name: "profileId"}, {name: "role"}, {name: "name"}]},
};

const editableFields: Record<string, string[]> = {
  service: ["title", "eyebrow", "lead", "overview", "skills", "useCases", "benefits", "isPublished", "imageFile"],
  caseStudy: ["client", "title", "slug", "stack", "outcome", "description", "challenge", "solution", "technologies", "isFeatured", "isPublished", "imageFile"],
  industry: ["title", "description", "isFeatured", "imageFile"],
  insight: ["title", "slug", "category", "excerpt", "body", "author", "publishedAt", "url", "isPublished", "isFeatured", "imageFile"],
  resource: ["title", "category", "excerpt", "url", "isPublished", "order", "imageFile"],
  faq: ["question", "answer", "order", "isPublished"],
  developer: ["profileId", "name", "role", "experience", "skills", "availability", "engagement", "isPublished"],
  job: ["title", "location", "employmentType", "summary", "skills", "isOpen"],
  sitePage: ["title", "family", "isPublished", "contentHtml", "heroTitle", "heroAccent", "heroDescription", "heroImageFile", "announcement", "primaryCta", "primaryCtaUrl", "secondaryCta", "secondaryCtaUrl", "careerIntroTitle", "careerIntroDescription", "careerDisciplineOneTitle", "careerDisciplineOneDescription", "careerDisciplineTwoTitle", "careerDisciplineTwoDescription", "careerDisciplineThreeTitle", "careerDisciplineThreeDescription", "careerDisciplineFourTitle", "careerDisciplineFourDescription", "detailSolutionsHeading", "detailSolutionsIntro", "detailSolutionsItems", "detailCapabilitiesHeading", "detailCapabilitiesIntro", "detailCapabilityItems", "detailIndustriesIntro", "detailIndustryItems", "detailWhyIntro", "detailWhyItems", "detailCreativeHeading", "detailCreativeIntro", "detailCreativeItems", "detailTechnologyIntro", "detailTechnologyItems", "detailCaseStudiesIntro", "detailFaqItems", "shopifySeoIntroHeading", "shopifySeoIntroCopy", "shopifySeoTrustLabel", "shopifySeoCtaHeading", "shopifySeoCtaCopy", "shopifySeoCtaLabel", "shopifySeoCtaUrl", "shopifySeoRelatedHeading", "shopifySeoRelatedItems", "seoTitle", "seoDescription", "seoNoIndex", "seoImageFile"],
  lead: ["status"],
  jobApplication: ["status"],
  testimonial: ["name", "role", "company", "quote", "rating", "status", "featured"],
  siteSettings: ["siteName", "tagline", "contactEmail", "phone", "address", "linkedin", "x", "instagram"],
  siteAsset: ["slot", "title", "alt", "sourcePath", "imageFile"],
};

function labelFor(field: string) {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
}

function editorField(record: RecordItem, field: string) {
  const value = valueFor(record[field]);
  if (field === "imageFile" || field === "heroImageFile" || field === "seoImageFile") {
    const imageField = field === "heroImageFile" ? "heroImage" : field === "seoImageFile" ? "seoImage" : "image";
    const image = record[imageField] as Record<string, unknown> | undefined;
    const asset = image?.asset as Record<string, unknown> | undefined;
    return <label key={field}>{field === "heroImageFile" ? "Hero image" : field === "seoImageFile" ? "Social sharing image" : "Replace image"}<input name={field} type="file" accept="image/png,image/jpeg,image/webp" /><small>PNG, JPG or WebP up to 5 MB.</small>{asset?.url ? <img className="admin-image-preview" src={String(asset.url)} alt={String(record.alt || "Current image")} /> : null}</label>;
  }
  if (["isOpen", "isFeatured", "seoNoIndex", "featured", "isPublished"].includes(field)) {
    const missing = record[field] === undefined;
    const enabledByDefault = missing && ["isOpen", "isFeatured", "isPublished"].includes(field);
    return <label className="admin-check" key={field}><input defaultChecked={missing ? enabledByDefault : Boolean(value)} name={field} type="checkbox" /> {field === "isOpen" ? "Open for applications" : field === "featured" || field === "isFeatured" ? "Feature on the website" : field === "isPublished" ? "Show on the website" : "No index"}</label>;
  }
  if (field === "status") return <label key={field}>{labelFor(field)}<select defaultValue={String(value || "pending")} name={field}><option value="pending">Pending review</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></label>;
  if (field === "rating") return <label key={field}>{labelFor(field)}<select defaultValue={String(value || 5)} name={field}><option value="5">★★★★★</option><option value="4">★★★★☆</option><option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option></select></label>;
  const cleanLabel = field === "seoTitle" ? "Title" : field === "seoDescription" ? "Description" : labelFor(field);
  const multiLineFields = ["skills", "useCases", "benefits", "heroDescription", "seoDescription", "description", "challenge", "solution", "excerpt", "contentHtml", "detailSolutionsIntro", "detailSolutionsItems", "detailCapabilitiesIntro", "detailCapabilityItems", "detailIndustriesIntro", "detailIndustryItems", "detailWhyIntro", "detailWhyItems", "detailCreativeIntro", "detailCreativeItems", "detailTechnologyIntro", "detailTechnologyItems", "detailCaseStudiesIntro", "detailFaqItems", "shopifySeoIntroCopy", "shopifySeoCtaCopy", "shopifySeoRelatedItems"];
  return <label key={field}>{cleanLabel}{multiLineFields.includes(field) ? <textarea defaultValue={String(value)} name={field} rows={field === "contentHtml" ? 24 : field.endsWith("Items") ? 9 : 4} spellCheck={field !== "contentHtml"} /> : <input defaultValue={String(value)} name={field} />}</label>;
}

function valueFor(value: unknown) {
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "boolean") return value;
  return value || "";
}

type SeoCheck = {label: string; detail: string; status: "good" | "okay" | "poor"; weight: number};

function seoChecks(record: RecordItem): SeoCheck[] {
  const seo = (record.seo || {}) as Record<string, unknown>;
  const title = String(seo.title || record.seoTitle || record.title || "").trim();
  const description = String(seo.description || record.seoDescription || record.heroDescription || "").trim();
  const heading = String(record.heroTitle || record.title || "").trim();
  const bodyWords = `${String(record.heroDescription || "")} ${String(record.overview || "")}`.trim().split(/\s+/).filter(Boolean).length;
  return [
    {label: "SEO title", detail: title ? `${title.length} characters; aim for 30–60.` : "Add a unique title for this page.", status: title.length >= 30 && title.length <= 60 ? "good" : title ? "okay" : "poor", weight: 25},
    {label: "Meta description", detail: description ? `${description.length} characters; aim for 120–160.` : "Add a description that explains the page value.", status: description.length >= 120 && description.length <= 160 ? "good" : description ? "okay" : "poor", weight: 25},
    {label: "Key page heading", detail: heading ? "A clear main heading is present." : "Add one clear H1 heading that matches the page intent.", status: heading ? "good" : "poor", weight: 10},
    {label: "Content depth", detail: bodyWords >= 250 ? `${bodyWords} words of page copy detected.` : `${bodyWords} words detected; add useful detail where appropriate.`, status: bodyWords >= 250 ? "good" : bodyWords >= 100 ? "okay" : "poor", weight: 15},
    {label: "Social sharing image", detail: seo.image || record.seoImage ? "A social image is configured." : "Add an image for better social previews.", status: seo.image || record.seoImage ? "good" : "poor", weight: 10},
    {label: "Readable URL", detail: record.pageKey || record.slug ? "A page key or slug is present." : "Add a stable, descriptive page URL.", status: record.pageKey || record.slug ? "good" : "poor", weight: 5},
    {label: "Search visibility", detail: seo.noIndex === true || record.seoNoIndex === true ? "This page is set to no-index." : "This page is allowed to appear in search.", status: seo.noIndex === true || record.seoNoIndex === true ? "poor" : "good", weight: 10},
  ];
}

function seoScore(record: RecordItem) {
  return Math.round(seoChecks(record).reduce((total, check) => total + check.weight * (check.status === "good" ? 1 : check.status === "okay" ? 0.6 : 0), 0));
}

export default function AdminDashboard({initialContent, isAdmin, sessionEmail}: {initialContent: Content; isAdmin: boolean; sessionEmail: string}) {
  const [content, setContent] = useState(initialContent);
  const [activeSection, setActiveSection] = useState("services");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [userMessage, setUserMessage] = useState("");
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [accountUsers, setAccountUsers] = useState<AccountUser[]>([]);
  const [accountLoading, setAccountLoading] = useState(false);
  const [accountMessage, setAccountMessage] = useState("");
  const [testimonialFormOpen, setTestimonialFormOpen] = useState(false);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [assetFormOpen, setAssetFormOpen] = useState(false);
  const [contentFormOpen, setContentFormOpen] = useState(false);
  const [pageHtmlCache, setPageHtmlCache] = useState<Record<string, string>>({});
  const [pageSearch, setPageSearch] = useState("");

  useEffect(() => {
    if (activeSection !== "account" || !isAdmin) return;
    setAccountLoading(true);
    fetch("/api/admin/users")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Unable to load users.")))
      .then((result) => setAccountUsers(result.users || []))
      .catch((error: Error) => setAccountMessage(error.message))
      .finally(() => setAccountLoading(false));
  }, [activeSection, isAdmin]);

  async function addUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/users", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email: form.get("email"), password: form.get("password"), role: form.get("role")})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setUserMessage(result.error || "Unable to add user."); return; }
    event.currentTarget.reset();
    setUserFormOpen(false);
    setUserMessage("User added. They can now sign in at /admin.");
    if (activeSection === "account") {
      const refreshed = await fetch("/api/admin/users");
      if (refreshed.ok) setAccountUsers((await refreshed.json()).users || []);
    }
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAccountMessage("Updating password…");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/account", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({currentPassword: form.get("currentPassword"), newPassword: form.get("newPassword")})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setAccountMessage(result.error || "Unable to update password."); return; }
    event.currentTarget.reset();
    setAccountMessage("Password updated. Use the new password next time you sign in.");
  }

  const records = content[activeSection as keyof Content] || [];
  const pageQuery = pageSearch.trim().toLowerCase();
  const visibleRecords = activeSection !== "pages" ? records : pageQuery
    ? records.filter((record) => `${record.title || ""} ${record.path || ""} ${record.family || ""}`.toLowerCase().includes(pageQuery)).slice(0, 100)
    : records.slice(0, 50);
  const active = records.find((record) => record._id === activeId);

  function toggleRecord(record: RecordItem, open: boolean) {
    setActiveId(open ? null : record._id);
    setMessage("");
    setSaveState("idle");
    if (open || record._type !== "sitePage" || Object.hasOwn(pageHtmlCache, record._id)) return;
    setSaveState("saving");
    setMessage("Loading page content…");
    fetch(`/api/admin/content?id=${encodeURIComponent(record._id)}`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Unable to load page HTML.")))
      .then((result) => {
        setPageHtmlCache((current) => ({...current, [record._id]: String(result.item?.contentHtml || "")}));
        setSaveState("idle");
        setMessage("Editing the selected page");
      })
      .catch((error: Error) => {setSaveState("error"); setMessage(error.message);});
  }

  async function save(record: RecordItem, formData: FormData) {
    const patch: Record<string, unknown> = {};
    for (const field of editableFields[record._type] || []) {
      if (field === "seoImageFile" || field === "imageFile") continue;
      const raw = formData.get(field);
      patch[field] = ["isOpen", "isFeatured", "seoNoIndex", "featured", "isPublished"].includes(field) ? raw === "on" : field === "rating" ? Number(raw || 5) : ["skills", "useCases", "benefits", "technologies"].includes(field) ? String(raw || "").split("\n").map((item) => item.trim()).filter(Boolean) : raw;
    }
    const imageFile = formData.get("seoImageFile");
    if (record._type === "sitePage" && imageFile instanceof File && imageFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      const uploadResponse = await fetch("/api/admin/upload", {method: "POST", body: uploadData});
      const uploadResult = await uploadResponse.json().catch(() => ({}));
      if (!uploadResponse.ok) { setMessage(uploadResult.error || "Image upload failed."); return; }
      patch.seoImage = {_type: "image", asset: {_type: "reference", _ref: uploadResult.assetId}};
    }
    const heroImageFile = formData.get("heroImageFile");
    if (record._type === "sitePage" && heroImageFile instanceof File && heroImageFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", heroImageFile);
      const uploadResponse = await fetch("/api/admin/upload", {method: "POST", body: uploadData});
      const uploadResult = await uploadResponse.json().catch(() => ({}));
      if (!uploadResponse.ok) { setMessage(uploadResult.error || "Image upload failed."); return; }
      patch.heroImage = {_type: "image", asset: {_type: "reference", _ref: uploadResult.assetId}};
    }
    const siteImageFile = formData.get("imageFile");
    if (["service", "caseStudy", "industry", "insight", "resource", "siteAsset"].includes(record._type) && siteImageFile instanceof File && siteImageFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", siteImageFile);
      const uploadResponse = await fetch("/api/admin/upload", {method: "POST", body: uploadData});
      const uploadResult = await uploadResponse.json().catch(() => ({}));
      if (!uploadResponse.ok) { setMessage(uploadResult.error || "Image upload failed."); return; }
      patch.image = {_type: "image", asset: {_type: "reference", _ref: uploadResult.assetId}};
    }
    setSaveState("saving");
    setMessage("Saving changes…");
    const response = await fetch("/api/admin/update", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({_id: record._id, _type: record._type, patch})});
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      setSaveState("error");
      setMessage(result.error || "Save failed. Add SANITY_API_WRITE_TOKEN to .env.local.");
      return;
    }
    if (record._type === "sitePage" && typeof patch.contentHtml === "string") setPageHtmlCache((current) => ({...current, [record._id]: patch.contentHtml as string}));
    setContent((current) => ({...current, [activeSection]: current[activeSection as keyof Content].map((item) => {
      if (item._id !== record._id) return item;
      const updated = {...item, ...patch};
      if (record._type === "sitePage") updated.seo = {...((item.seo || {}) as Record<string, unknown>), title: patch.seoTitle, description: patch.seoDescription, noIndex: patch.seoNoIndex, ...(patch.seoImage ? {image: patch.seoImage} : {})};
      return updated;
    })}));
    setSaveState("saved");
    setMessage("Changes saved");
  }

  async function deleteTestimonial(record: RecordItem) {
    if (!window.confirm("Delete this review permanently? This cannot be undone.")) return;
    setMessage("Deleting review…");
    const response = await fetch("/api/admin/testimonials", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: record._id})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(result.error || "Unable to delete review."); return; }
    setContent((current) => ({...current, testimonials: current.testimonials.filter((item) => item._id !== record._id)}));
    setActiveId(null);
    setMessage("Review deleted");
  }

  async function deleteApplication(record: RecordItem) {
    if (!window.confirm(`Delete the application from ${String(record.name || "this applicant")} permanently? This cannot be undone.`)) return;
    setMessage("Deleting application…");
    const response = await fetch("/api/admin/applications", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: record._id})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(result.error || "Unable to delete application."); return; }
    setContent((current) => ({...current, applications: current.applications.filter((item) => item._id !== record._id)}));
    setActiveId(null);
    setMessage("Application deleted");
  }

  async function deleteJob(record: RecordItem) {
    if (!window.confirm(`Delete the job opening “${String(record.title || "this job")}” permanently? This cannot be undone.`)) return;
    setMessage("Deleting job opening…");
    const response = await fetch("/api/admin/jobs", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: record._id})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(result.error || "Unable to delete job opening."); return; }
    setContent((current) => ({...current, jobs: current.jobs.filter((item) => item._id !== record._id)}));
    setActiveId(null);
    setMessage("Job opening deleted");
  }

  async function addTestimonial(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setMessage("Adding review…");
    const response = await fetch("/api/admin/testimonials", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...data, featured: data.featured === "on"})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(result.error || "Unable to add review."); return; }
    setContent((current) => ({...current, testimonials: [result.testimonial, ...current.testimonials]}));
    form.reset();
    setTestimonialFormOpen(false);
    setMessage("Review added");
  }

  async function addJob(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setMessage("Publishing job opening…");
    const response = await fetch("/api/admin/jobs", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...data, isOpen: data.isOpen === "on"})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(result.error || "Unable to publish job opening."); return; }
    setContent((current) => ({...current, jobs: [result.job, ...current.jobs]}));
    form.reset();
    setJobFormOpen(false);
    setMessage("Job opening published");
  }

  async function addAsset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("Uploading imageâ€¦");
    const response = await fetch("/api/admin/assets", {method: "POST", body: new FormData(form)});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(result.error || "Unable to upload image."); return; }
    setContent((current) => ({...current, assets: [result.asset, ...current.assets]}));
    form.reset();
    setAssetFormOpen(false);
    setMessage("Image added to the media library");
  }

  async function addContent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const definition = createContentTypes[activeSection];
    if (!definition) return;
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    setMessage(`Creating ${definition.label}…`);
    const response = await fetch("/api/admin/content", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({type: definition.type, fields})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(result.error || `Unable to create ${definition.label}.`); return; }
    setContent((current) => ({...current, [activeSection]: [result.item as RecordItem, ...(current[activeSection as keyof Content] as RecordItem[])]}));
    setActiveId(String(result.item._id));
    setContentFormOpen(false);
    setMessage(`${labelFor(definition.label)} created as a draft`);
  }

  async function deleteContent(record: RecordItem) {
    const title = String(record.title || record.question || record.role || "this content");
    if (!window.confirm(`Delete “${title}” permanently? This cannot be undone.`)) return;
    const response = await fetch("/api/admin/content", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({id: record._id})});
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(result.error || "Unable to delete this content."); return; }
    setContent((current) => ({...current, [activeSection]: (current[activeSection as keyof Content] as RecordItem[]).filter((item) => item._id !== record._id)}));
    setActiveId(null);
    setMessage(`${labelFor(record._type)} deleted`);
  }

  function openContentRecord(id?: string) {
    setActiveSection("pages");
    setActiveId(id || null);
    setMessage(id ? "Editing the selected page" : "Select a page to edit");
    setSaveState("idle");
  }

  return (
    <main className="admin-shell">
      <div className="admin-utility-bar">
        <button className="admin-account-trigger" type="button" aria-label="Open account and access" onClick={() => {setActiveSection("account"); setActiveId(null); setMessage(""); setAccountMessage("");}}>
          <span className="admin-account-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" /></svg></span>
          <span className="admin-account-trigger-label">Account</span>
        </button>
        <button className="admin-signout-button" onClick={() => signOut({callbackUrl: "/admin/login"})} type="button">Sign out</button>
      </div>
      <aside className="admin-sidebar">
        <span className="admin-kicker">KODRISE CONTENT</span>
        <h1>Content manager</h1>
        <p>Update website content without opening Sanity’s multi-pane editor.</p>
        <nav aria-label="Content sections">
          {sections.map(([key, label]) => (
            <button className={activeSection === key ? "active" : ""} key={key} onClick={() => {setActiveSection(key); setActiveId(null); setMessage(""); setContentFormOpen(false);}} type="button">
              <span>{label}</span><small>{content[key as keyof Content].length}</small>
            </button>
          ))}
          <button className={activeSection === "seo" ? "active" : ""} onClick={() => {setActiveSection("seo"); setActiveId(null); setMessage("");}} type="button">
            <span>SEO Overview</span><small>SEO</small>
          </button>
        </nav>
        <a className="admin-back" href="/">← Back to website</a>
      </aside>
      <section className="admin-content">
        <header className="admin-content-header">
          <div><span className="admin-kicker">{activeSection === "account" ? "SECURITY & ACCESS" : activeSection === "seo" ? "SEARCH & DISCOVERY" : "EDITING"}</span><h2>{activeSection === "account" ? "Account & access" : activeSection === "seo" ? "SEO Overview" : sections.find(([key]) => key === activeSection)?.[1]}</h2></div>
          <span className="admin-status">{message || "Select an item to edit"}</span>
        </header>
        {activeSection === "seo" ? <SeoDashboard content={content} onOpenContent={openContentRecord} /> : activeSection === "account" ? <section className="admin-account">
          <div className="admin-account-grid">
            <article className="admin-account-card admin-profile-card">
              <span className="admin-kicker">SIGNED IN AS</span>
              <div className="admin-profile-mark">{sessionEmail.slice(0, 1).toUpperCase()}</div>
              <h3>{sessionEmail}</h3>
              <p>{isAdmin ? "Administrator · full dashboard access" : "Editor · content editing access"}</p>
            </article>
            <article className="admin-account-card admin-password-form">
              <span className="admin-kicker">GOOGLE ACCOUNT</span><h3>Authentication managed by Google</h3>
              <small>Sign-in, password changes, and account security are handled by your authorized Google account.</small>
              <button className="button primary" type="submit">Update password <span aria-hidden="true">→</span></button>
            </article>
          </div>
          {isAdmin && <section className="admin-user-management admin-users-card">
            <div className="admin-users-heading"><div><span className="admin-kicker">ADMIN ONLY</span><h3>Dashboard users</h3><p>Manage who can sign in and what level of access they have.</p></div><strong className="admin-user-count">{accountUsers.length}<small>total users</small></strong></div>
            {userFormOpen ? <form className="admin-user-form" onSubmit={addUser}><label>Email<input name="email" type="email" required /></label><label>Temporary password<input name="password" type="password" minLength={8} required /></label><label>Role<select name="role" defaultValue="editor"><option value="editor">Editor</option><option value="admin">Admin</option></select></label><div><button className="button primary" type="submit">Add user</button><button className="admin-cancel" type="button" onClick={() => setUserFormOpen(false)}>Cancel</button></div></form> : <button className="button secondary" type="button" onClick={() => setUserFormOpen(true)}>+ Add dashboard user</button>}
            {userMessage && <p className="admin-user-message">{userMessage}</p>}
            <div className="admin-user-list" aria-live="polite">{accountLoading ? <p className="admin-empty">Loading users…</p> : accountUsers.length ? accountUsers.map((user) => <div className="admin-user-row" key={user._id}><span className="admin-user-avatar">{user.email.slice(0, 1).toUpperCase()}</span><span><strong>{user.email}</strong><small>Added {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</small></span><span className={`admin-role admin-role-${user.role}`}>{user.role}</span><span className={user.isActive === false ? "admin-user-status inactive" : "admin-user-status"}>{user.isActive === false ? "Inactive" : "Active"}</span></div>) : <p className="admin-empty">No additional dashboard users yet.</p>}</div>
          </section>}
          {accountMessage && <p className="admin-account-message" role="status">{accountMessage}</p>}
        </section> : <div className="admin-records">
          {activeSection === "pages" && <div className="admin-page-search"><label htmlFor="admin-page-search">Find a page by title, route, or family</label><input id="admin-page-search" type="search" value={pageSearch} onChange={(event) => setPageSearch(event.target.value)} placeholder="/resources/blogs or AI Services" /><small>Showing {visibleRecords.length} of {records.length} pages{!pageQuery && records.length > visibleRecords.length ? " · search to find another page" : ""}</small></div>}
          {createContentTypes[activeSection] && <section className="admin-add-testimonial"><div><span className="admin-kicker">SANITY CONTENT</span><h3>Add {createContentTypes[activeSection].label}</h3><p>New items stay unpublished until you switch on their website visibility.</p></div>{contentFormOpen ? <form className="admin-testimonial-form" onSubmit={addContent}>{createContentTypes[activeSection].fields.map((field) => <label key={field.name}>{labelFor(field.name)}{field.multiline ? <textarea name={field.name} required rows={4} /> : <input name={field.name} type={field.name === "url" ? "url" : "text"} required />}</label>)}<div className="admin-save-row"><button className="button primary" type="submit">Create draft</button><button className="admin-cancel" type="button" onClick={() => setContentFormOpen(false)}>Cancel</button></div></form> : <button className="button secondary" type="button" onClick={() => setContentFormOpen(true)}>+ Add {createContentTypes[activeSection].label}</button>}</section>}
          {activeSection === "testimonials" && <section className="admin-add-testimonial"><div><span className="admin-kicker">DASHBOARD ONLY</span><h3>Add a testimonial</h3><p>Create a review here; it will stay pending until you approve it.</p></div>{testimonialFormOpen ? <form className="admin-testimonial-form" onSubmit={addTestimonial}><label>Name<input name="name" required minLength={2} /></label><label>Role<input name="role" /></label><label>Company<input name="company" /></label><label>Rating<select name="rating" defaultValue="5"><option value="5">★★★★★</option><option value="4">★★★★☆</option><option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option></select></label><label className="admin-testimonial-quote">Review<textarea name="quote" required rows={4} /></label><label>Status<select name="status" defaultValue="pending"><option value="pending">Pending review</option><option value="approved">Approved</option></select></label><label className="admin-check"><input name="featured" type="checkbox" /> Feature on the website</label><div className="admin-save-row"><button className="button primary" type="submit">Add review</button><button className="admin-cancel" type="button" onClick={() => setTestimonialFormOpen(false)}>Cancel</button></div></form> : <button className="button secondary" type="button" onClick={() => setTestimonialFormOpen(true)}>+ Add testimonial</button>}</section>}
          {activeSection === "jobs" && <section className="admin-add-testimonial"><div><span className="admin-kicker">CAREERS</span><h3>Post a job opening</h3><p>Published openings appear on the Careers page immediately.</p></div>{jobFormOpen ? <form className="admin-testimonial-form" onSubmit={addJob}><label>Job title<input name="title" required placeholder="e.g. Senior React Engineer" /></label><label>Location<input name="location" placeholder="Remote / New Delhi" /></label><label>Employment type<select name="employmentType" defaultValue="Full-time"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></label><label className="admin-check"><input name="isOpen" type="checkbox" defaultChecked /> Publish opening</label><label className="admin-testimonial-quote">Summary<textarea name="summary" required rows={4} placeholder="What will this person work on?" /></label><label className="admin-testimonial-quote">Skills, one per line<textarea name="skills" rows={3} placeholder="React&#10;TypeScript&#10;Next.js" /></label><div className="admin-save-row"><button className="button primary" type="submit">Publish job</button><button className="admin-cancel" type="button" onClick={() => setJobFormOpen(false)}>Cancel</button></div></form> : <button className="button secondary" type="button" onClick={() => setJobFormOpen(true)}>+ Post a job opening</button>}</section>}
          {activeSection === "assets" && <section className="admin-add-testimonial"><div><span className="admin-kicker">MEDIA LIBRARY</span><h3>Manage website images</h3><p>Upload or replace images used across the website. Use a stable key for each image.</p></div>{assetFormOpen ? <form className="admin-testimonial-form" onSubmit={addAsset} encType="multipart/form-data"><label>Image key<input name="slot" required pattern="[a-z0-9][a-z0-9-]{0,119}" placeholder="homepage-hero" /></label><label>Internal title<input name="title" required placeholder="Homepage hero" /></label><label>Alternative text<input name="alt" required placeholder="Describe the image" /></label><label>Source URL or path<input name="sourcePath" placeholder="Optional image URL to replace on mirrored pages" /></label><label>Image file<input name="file" type="file" accept="image/png,image/jpeg,image/webp" required /></label><div className="admin-save-row"><button className="button primary" type="submit">Upload image</button><button className="admin-cancel" type="button" onClick={() => setAssetFormOpen(false)}>Cancel</button></div></form> : <button className="button secondary" type="button" onClick={() => setAssetFormOpen(true)}>+ Add homepage image</button>}</section>}
          {visibleRecords.map((record) => {
            const open = record._id === activeId;
            return <article className={`admin-record ${open ? "open" : ""}`} key={record._id}>
              <button className="admin-record-trigger" type="button" onClick={() => toggleRecord(record, open)}>
                <span><strong>{String(record.title || record.name || record.client || record.role || record.profileId || record.siteName || record.contactEmail || "Contact details")}</strong><small>{String(record.path || record.eyebrow || record.stack || record.experience || record.location || record.contactEmail || record._type)}{record.family ? ` · ${String(record.family)}` : ""}</small></span>
                <span className="admin-record-actions">
                  {activeSection === "pages" && <small className={`seo-score seo-score-${seoScore(record) >= 75 ? "good" : seoScore(record) >= 50 ? "mid" : "low"}`}>SEO {seoScore(record)}/100</small>}
                  <b>{open ? "−" : "+"}</b>
                </span>
              </button>
              {open && <form className="admin-editor" action={(formData) => save(record, formData)}>
                {record._type === "jobApplication" ? <>
                  <div className="admin-editor-group">
                    <span className="admin-editor-group-title">Application details</span>
                    <div className="admin-application-details">
                      <div><strong>Name</strong><span>{String(record.name || "—")}</span></div>
                      <div><strong>Email</strong><a href={`mailto:${String(record.email || "")}`}>{String(record.email || "—")}</a></div>
                      <div><strong>Role</strong><span>{String(record.role || "General application")}</span></div>
                      <div><strong>Submitted</strong><span>{record.createdAt ? new Date(String(record.createdAt)).toLocaleString() : "—"}</span></div>
                      {Boolean(record.linkedin) && <div><strong>LinkedIn</strong><a href={String(record.linkedin)} target="_blank" rel="noreferrer">{String(record.linkedin)}</a></div>}
                      {Boolean(record.portfolio) && <div><strong>Portfolio</strong><a href={String(record.portfolio)} target="_blank" rel="noreferrer">{String(record.portfolio)}</a></div>}
                      {Boolean(record.resumeUrl) && <div><strong>Resume</strong><a href={String(record.resumeUrl)} target="_blank" rel="noreferrer">Open resume</a></div>}
                      <div className="admin-application-message"><strong>Message</strong><p>{String(record.message || "No message provided.")}</p></div>
                    </div>
                  </div>
                  {editableFields[record._type].map((field) => editorField(record, field))}
                </> : record._type === "sitePage" ? <>
                  <div className="admin-editor-group"><span className="admin-editor-group-title">Page content</span>{editableFields[record._type].filter((field) => !field.startsWith("seo") && field !== "seoImageFile" && (!field.startsWith("career") || record.pageKey === "careers") && !(record.path === "/services/generative-ai-development-company" && field === "contentHtml")).map((field) => editorField(field === "contentHtml" && pageHtmlCache[record._id] !== undefined ? {...record, contentHtml: pageHtmlCache[record._id]} : record, field))}</div>
                  {record.path === "/services/generative-ai-development-company" && <div className="admin-editor-group"><span className="admin-editor-group-title">Generative AI page sections</span>{editableFields.sitePage.filter((field) => field.startsWith("detail")).map((field) => editorField(record, field))}</div>}
                  <div className="admin-editor-group admin-seo-group"><span className="admin-editor-group-title">SEO</span>{["seoTitle", "seoDescription", "seoNoIndex", "seoImageFile"].map((field) => editorField(record, field))}<div className="admin-seo-assessments"><div className="admin-seo-assessments-heading"><strong>SEO analysis</strong><b className={`seo-score seo-score-${seoScore(record) >= 75 ? "good" : seoScore(record) >= 50 ? "mid" : "low"}`}>{seoScore(record)}/100</b></div>{seoChecks(record).map((check) => <div className="admin-seo-check" key={check.label}><span className={`admin-seo-light ${check.status}`} aria-label={check.status} /><span><strong>{check.label}</strong><small>{check.detail}</small></span></div>)}</div></div>
                </> : editableFields[record._type].map((field) => editorField(record, field))}
                <div className="admin-save-row"><button className="button primary admin-save" type="submit" disabled={saveState === "saving"}>{saveState === "saving" ? "Saving…" : saveState === "saved" ? "Changes saved" : "Save changes →"}</button>{record._type === "testimonial" && <button className="admin-delete" type="button" onClick={(event) => {event.preventDefault(); event.stopPropagation(); void deleteTestimonial(record);}}>Delete review</button>}{record._type === "jobApplication" && <button className="admin-delete" type="button" onClick={(event) => {event.preventDefault(); event.stopPropagation(); void deleteApplication(record);}}>Delete application</button>}{record._type === "job" && <button className="admin-delete" type="button" onClick={(event) => {event.preventDefault(); event.stopPropagation(); void deleteJob(record);}}>Delete job opening</button>}{["service", "caseStudy", "industry", "insight", "resource", "faq", "developer", "siteAsset"].includes(record._type) && <button className="admin-delete" type="button" onClick={(event) => {event.preventDefault(); event.stopPropagation(); void deleteContent(record);}}>Delete content</button>}{saveState === "error" && <span className="admin-save-status error" role="status">Save failed</span>}{saveState === "saved" && <span className="admin-save-status success" role="status">Published to the website</span>}</div>
              </form>}
            </article>;
          })}
          {!records.length && <p className="admin-empty">No content has been created in this section yet.</p>}
        </div>}
      </section>
    </main>
  );
}
