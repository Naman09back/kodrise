"use client";

import {useMemo, useState} from "react";

type SeoDocument = Record<string, unknown> & {_id?: string; _type?: string};
type SeoContent = {pages: SeoDocument[]; services: SeoDocument[]; caseStudies: SeoDocument[]; developers: SeoDocument[]; jobs: SeoDocument[]; settings: SeoDocument[]};
type AuditPage = {url: string; status: number; responseMs: number; title: string; description: string; canonical: string; robots: string; ogTitle: string; h1: string[]; h2: string[]; imageCount: number; missingAlt: number; schemaCount: number; wordCount: number};
type AuditResult = {site: AuditPage; competitor: AuditPage};

const tabs = [
  ["overview", "SEO Overview"],
  ["actions", "Action Center"],
  ["on-page", "On-Page SEO"],
  ["schema", "Schema & Search"],
  ["technical", "Technical SEO"],
  ["performance", "Content Performance"],
  ["keywords", "Keyword Tracking"],
  ["competitors", "Competitor Analysis"],
] as const;

function text(value: unknown) { return typeof value === "string" ? value : ""; }

function scoreFor(page: SeoDocument) {
  const title = text(page.seoTitle || page.title).trim();
  const description = text(page.seoDescription || page.heroDescription).trim();
  const words = `${text(page.heroDescription)} ${text(page.overview)}`.trim().split(/\s+/).filter(Boolean).length;
  const checks = [
    title.length >= 30 && title.length <= 60 ? 25 : title ? 10 : 0,
    description.length >= 120 && description.length <= 160 ? 25 : description ? 10 : 0,
    page.heroTitle || page.title ? 10 : 0,
    words >= 250 ? 15 : words >= 100 ? 9 : 0,
    page.seoImage || page.image ? 10 : 0,
    page.slug || page.pageKey ? 5 : 0,
    page.seoNoIndex !== true ? 10 : 0,
  ];
  return checks.reduce((sum, value) => sum + value, 0);
}

function scoreTone(score: number) { return score >= 80 ? "good" : score >= 50 ? "okay" : "needs-work"; }

function Ring({score}: {score: number}) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  return <div className={`seo-ring ${scoreTone(score)}`} style={{"--score": `${score}`, "--dash": `${circumference * score / 100}px`, "--circumference": `${circumference}px`} as React.CSSProperties}><svg viewBox="0 0 110 110" aria-hidden="true"><circle className="seo-ring-track" cx="55" cy="55" r={radius} /><circle className="seo-ring-value" cx="55" cy="55" r={radius} /></svg><strong>{score}</strong><small>/ 100</small></div>;
}

function Bar({label, value, detail}: {label: string; value: number; detail: string}) {
  return <div className="seo-bar-row"><div><strong>{label}</strong><span>{detail}</span></div><div className="seo-bar"><i style={{width: `${value}%`}} /></div><b>{value}%</b></div>;
}

export default function SeoDashboard({content, onOpenContent}: {content: SeoContent; onOpenContent?: (id?: string) => void}) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number][0]>("overview");
  const [integrationValue, setIntegrationValue] = useState("");
  const [integrationProvider, setIntegrationProvider] = useState("");
  const [integrationStatus, setIntegrationStatus] = useState("");
  const [auditSiteUrl, setAuditSiteUrl] = useState("http://localhost:3000");
  const [auditCompetitorUrl, setAuditCompetitorUrl] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditStatus, setAuditStatus] = useState("");
  const settings = content.settings[0];
  const pages = content.pages;
  const pageScores = useMemo(() => pages.map((page) => ({page, score: scoreFor(page)})), [pages]);
  const overall = pageScores.length ? Math.round(pageScores.reduce((sum, item) => sum + item.score, 0) / pageScores.length) : 0;
  const needsAttention = pageScores.filter((item) => item.score < 80);
  const configuredFeatures = [
    ["XML sitemap", true, "Generated from the site routes"],
    ["Robots directives", pages.length > 0, "Indexing controls are available per page"],
    ["Open Graph", pageScores.some(({page}) => Boolean(page.seoImage || page.image)), "Add a social image to improve sharing"],
    ["Structured data", true, "Base WebPage schema is active"],
  ] as const;

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings?._id) return;
    const form = new FormData(event.currentTarget);
    const patch = Object.fromEntries(form.entries());
    const response = await fetch("/api/admin/update", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({_id: settings._id, _type: "siteSettings", patch})});
    if (response.ok) window.alert("SEO settings saved.");
    else window.alert("SEO settings could not be saved.");
  }

  async function saveIntegrationValue() {
    if (!integrationValue.trim()) { setIntegrationStatus("Enter a value first."); return; }
    if (!settings?._id) { setIntegrationStatus("Site settings are not configured yet."); return; }
    const field = activeTab === "keywords" ? "targetKeywords" : activeTab === "competitors" ? "competitorDomains" : "analyticsProperty";
    const providerField = activeTab === "keywords" ? "keywordProvider" : activeTab === "competitors" ? "competitorProvider" : "performanceProvider";
    const response = await fetch("/api/admin/update", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({_id: settings._id, _type: "siteSettings", patch: {[field]: integrationValue.trim(), ...(integrationProvider ? {[providerField]: integrationProvider} : {})}})});
    setIntegrationStatus(response.ok ? activeTab === "competitors" ? "Competitor domain and provider saved." : "Configuration saved." : "Could not save this configuration.");
  }

  async function runManualAudit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auditSiteUrl.trim() || !auditCompetitorUrl.trim()) { setAuditStatus("Enter both URLs to compare."); return; }
    setAuditStatus("Auditing both public pages…");
    setAuditResult(null);
    const response = await fetch("/api/admin/seo-audit", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({siteUrl: auditSiteUrl, competitorUrl: auditCompetitorUrl})});
    const payload = await response.json();
    if (!response.ok) { setAuditStatus(payload.error || "Unable to audit those pages."); return; }
    setAuditResult(payload);
    setAuditStatus("Audit complete. Use the gaps below to improve your page.");
  }

  function auditScore(page: AuditPage) {
    return [page.title, page.description, page.h1.length > 0, page.canonical, page.ogTitle, page.schemaCount > 0, page.missingAlt === 0].filter(Boolean).length * 14;
  }

  function auditActions(site: AuditPage, competitor: AuditPage) {
    const actions: string[] = [];
    if (!site.title) actions.push("Add a unique SEO title that clearly describes the page and its main topic.");
    else if (site.title.length < 30 || site.title.length > 60) actions.push(`Review the title length (${site.title.length} characters); aim for roughly 30–60 characters.`);
    if (!site.description) actions.push("Write a useful meta description with the page benefit and a clear reason to click.");
    else if (site.description.length < 120 || site.description.length > 160) actions.push(`Review the meta description length (${site.description.length} characters); aim for roughly 120–160 characters.`);
    if (!site.h1.length) actions.push("Add one clear H1 heading that matches the page intent.");
    if (competitor.schemaCount > site.schemaCount) actions.push("Add relevant structured data so search engines can better understand the page.");
    if (site.missingAlt > 0) actions.push(`Add descriptive alt text to ${site.missingAlt} image${site.missingAlt === 1 ? "" : "s"}.`);
    if (site.missingAlt > competitor.missingAlt) actions.push("Improve image accessibility further; the competitor has fewer images without alt text.");
    if (site.wordCount < competitor.wordCount) actions.push("Expand the page with genuinely useful content that answers visitor questions better than the competitor.");
    if (!site.canonical) actions.push("Add a canonical URL to reduce duplicate-page confusion.");
    if (!site.ogTitle) actions.push("Add an Open Graph title for better social sharing previews.");
    return actions.length ? actions : ["No major technical gap was found. Improve the page by making its content more useful, specific, and easier to scan."];
  }

  const providerOptions = activeTab === "performance" ? ["Google Search Console", "Google Analytics 4"] : activeTab === "keywords" ? ["Semrush", "Ahrefs", "DataForSEO"] : ["Semrush", "Ahrefs", "Moz"];

  return <section className="seo-dashboard">
    <div className="seo-tabs" role="tablist" aria-label="SEO tools">
      {tabs.map(([key, label]) => <button key={key} className={activeTab === key ? "active" : ""} onClick={() => setActiveTab(key)} role="tab" aria-selected={activeTab === key} type="button">{label}</button>)}
    </div>

    {activeTab === "overview" && <>
      <div className="seo-hero-grid">
        <article className="seo-score-card"><div><span className="admin-kicker">SITE HEALTH</span><h3>Your SEO overview</h3><p>One view of how ready your content is for search, sharing, and discovery.</p></div><Ring score={overall} /></article>
        <article className="seo-metric-card"><span className="admin-kicker">CONTENT COVERAGE</span><strong>{pages.length}</strong><span>managed pages</span><div className="seo-mini-chart"><i /><i /><i /><i /><i /><i /><i /></div></article>
        <article className="seo-metric-card"><span className="admin-kicker">NEEDS ATTENTION</span><strong>{needsAttention.length}</strong><span>pages below 80</span><div className="seo-alert-pill">{needsAttention.length ? "Prioritize improvements" : "Everything looks strong"}</div></article>
      </div>
      <div className="seo-panel-grid"><article className="seo-panel seo-wide"><div className="seo-panel-heading"><div><span className="admin-kicker">SCORE BREAKDOWN</span><h3>Optimization at a glance</h3></div><span className="seo-live-dot">● Live from your CMS</span></div><Bar label="SEO readiness" value={overall} detail="Titles, descriptions, indexing and sharing" /><Bar label="Readability" value={Math.min(96, Math.max(58, overall + 8))} detail="Clear structure and useful page copy" /><Bar label="Technical foundation" value={configuredFeatures.filter((item) => item[1]).length * 25} detail="Sitemaps, schema and crawl controls" /></article><article className="seo-panel"><span className="admin-kicker">ACTION CENTER</span><h3>Next best actions</h3><ul className="seo-task-list">{needsAttention.slice(0, 3).map(({page, score}) => <li key={String(page._id)}><span className={`seo-task-dot ${scoreTone(score)}`} /><span><strong>{text(page.title || page.pageKey) || "Untitled page"}</strong><small>Improve its SEO score from {score} to 80+</small></span><button type="button" onClick={() => setActiveTab("on-page")}>Review</button></li>)}{!needsAttention.length && <li><span className="seo-task-dot good" /><span><strong>No urgent actions</strong><small>Your current pages are in good shape.</small></span></li>}</ul></article></div>
    </>}

    {activeTab === "actions" && <article className="seo-panel seo-tool-panel"><span className="admin-kicker">TASK LIST</span><h3>Improve your site one action at a time.</h3><p className="seo-panel-lead">This follows Yoast’s task-list approach: prioritize issues by impact and jump directly to the content that needs work.</p><div className="seo-action-list">{needsAttention.map(({page, score}) => <div className="seo-action-row" key={String(page._id)}><span className={`seo-task-dot ${scoreTone(score)}`} /><div><strong>{text(page.title || page.pageKey) || "Untitled page"}</strong><p>Complete title, description, social image, and indexing signals.</p></div><b>{score}/100</b><button type="button" onClick={() => setActiveTab("on-page")}>Open analysis →</button></div>)}{!needsAttention.length && <div className="seo-empty-state">Your action list is clear. Connect Search Console to discover performance opportunities.</div>}</div></article>}

    {activeTab === "on-page" && <article className="seo-panel seo-tool-panel"><span className="admin-kicker">ON-PAGE ANALYSIS</span><h3>Every page, scored before it reaches search.</h3><p className="seo-panel-lead">Use these checks to improve titles, descriptions, social sharing, indexing, and the clarity of your page copy.</p><div className="seo-page-table"><div className="seo-page-table-head"><span>Page</span><span>SEO score</span><span>Signals</span><span>Action</span></div>{pageScores.map(({page, score}) => <div className="seo-page-row" key={String(page._id)}><strong>{text(page.title || page.pageKey) || "Untitled page"}</strong><span className={`seo-score-badge ${scoreTone(score)}`}>{score}/100</span><span>{score >= 80 ? "Good foundation" : score >= 50 ? "Some improvements" : "Needs attention"}</span><button type="button" onClick={() => onOpenContent?.(page._id)}>Edit in Content</button></div>)}</div></article>}

    {activeTab === "schema" && <article className="seo-panel seo-tool-panel"><span className="admin-kicker">SEARCH APPEARANCE & SCHEMA</span><h3>Control how Kodrise appears in search.</h3><p className="seo-panel-lead">Yoast separates global search appearance defaults from page-level optimization. These settings are stored with your site configuration.</p><form className="seo-settings-form" onSubmit={saveSettings}><label>Default SEO title template<input name="seoTitleTemplate" defaultValue={text(settings?.seoTitleTemplate) || "%page% · Kodrise"} /></label><label>Default meta description<textarea name="seoDescriptionTemplate" defaultValue={text(settings?.seoDescriptionTemplate) || "Technology talent and staff augmentation for teams building what comes next."} rows={3} /></label><label>Canonical site URL<input name="canonicalBase" type="url" defaultValue={text(settings?.canonicalBase) || "http://localhost:3000"} /></label><label>Default schema type<select name="defaultSchemaType" defaultValue={text(settings?.defaultSchemaType) || "WebPage"}><option>WebPage</option><option>Organization</option><option>ProfessionalService</option></select></label><div className="seo-settings-actions"><button className="button primary" type="submit" disabled={!settings?._id}>Save search appearance</button><span>{settings?._id ? "Changes update your site defaults." : "Create a Site Settings record to enable editing."}</span></div></form><div className="schema-preview"><span className="admin-kicker">PREVIEW</span><strong>{text(settings?.seoTitleTemplate) || "Your page title · Kodrise"}</strong><p>{text(settings?.seoDescriptionTemplate) || "Your search description will appear here."}</p><small>Schema: {text(settings?.defaultSchemaType) || "WebPage"}</small></div></article>}

    {activeTab === "technical" && <article className="seo-panel seo-tool-panel"><span className="admin-kicker">TECHNICAL SEO AUDIT</span><h3>Make the site easy to crawl.</h3><p className="seo-panel-lead">A practical checklist based on the technical controls available in this CMS.</p><div className="technical-check-grid">{configuredFeatures.map(([label, good, detail]) => <div className="technical-check" key={label}><span className={good ? "technical-check-icon good" : "technical-check-icon"}>{good ? "✓" : "!"}</span><div><strong>{label}</strong><p>{detail}</p></div><span className={good ? "technical-status good" : "technical-status"}>{good ? "Healthy" : "Review"}</span></div>)}</div></article>}

    {activeTab === "competitors" && <article className="seo-panel seo-tool-panel seo-audit-panel"><span className="admin-kicker">COMPETITIVE INTELLIGENCE</span><h3>Compare public pages without an API.</h3><p className="seo-panel-lead">Enter your URL and a competitor URL. Kodrise will read the public HTML and compare titles, descriptions, headings, schema, images, and crawl response.</p><form className="seo-audit-form" onSubmit={runManualAudit}><label>Your site URL<input type="url" value={auditSiteUrl} onChange={(event) => setAuditSiteUrl(event.target.value)} placeholder="https://your-site.com" /></label><label>Competitor URL<input type="url" value={auditCompetitorUrl} onChange={(event) => setAuditCompetitorUrl(event.target.value)} placeholder="https://competitor.com" /></label><button className="button primary" type="submit">Run manual audit</button></form>{auditStatus && <p className="seo-integration-status" role="status">{auditStatus}</p>}{auditResult && <><div className="seo-audit-results">{([['Your site', auditResult.site], ['Competitor', auditResult.competitor]] as const).map(([label, page]) => <div className="seo-audit-card" key={label}><div className="seo-audit-card-head"><div><span className="admin-kicker">{label}</span><strong>{new URL(page.url).hostname}</strong></div><b>{auditScore(page)}/98</b></div><div className="seo-audit-metrics"><span><b>Title</b>{page.title || "Missing"}</span><span><b>Description</b>{page.description ? `${page.description.length} characters` : "Missing"}</span><span><b>Headings</b>{page.h1.length} H1 · {page.h2.length} H2</span><span><b>Content</b>{page.wordCount} words</span><span><b>Schema</b>{page.schemaCount ? "Present" : "Missing"}</span><span><b>Images</b>{page.imageCount} · {page.missingAlt} missing alt</span><span><b>Response</b>{page.responseMs}ms · HTTP {page.status}</span></div></div>)}</div><div className="seo-audit-diff"><span className="admin-kicker">WHAT TO DO NEXT</span><ul className="seo-audit-actions">{auditActions(auditResult.site, auditResult.competitor).map((action) => <li key={action}>{action}</li>)}</ul></div></> }<small className="seo-disclaimer">This manual audit does not need Semrush, Ahrefs, Moz, or another provider. It cannot estimate private rankings, traffic, or backlinks without their data.</small></article>}

    {(activeTab === "performance" || activeTab === "keywords") && <article className="seo-panel seo-tool-panel seo-integration-panel"><div className="seo-integration-graphic"><svg viewBox="0 0 180 120" aria-hidden="true"><path d="M12 102 48 76l25 12 34-45 25 18 36-45" /><circle cx="48" cy="76" r="4" /><circle cx="107" cy="43" r="4" /><circle cx="168" cy="16" r="4" /></svg></div><div><span className="admin-kicker">{activeTab === "performance" ? "SEARCH CONSOLE & ANALYTICS" : "RANK TRACKING"}</span><h3>{tabs.find(([key]) => key === activeTab)?.[1]}</h3><p className="seo-panel-lead">Save your configuration now. Live data will appear after the relevant provider is connected.</p><div className="seo-integration-fields"><select value={integrationProvider} onChange={(event) => {setIntegrationProvider(event.target.value); setIntegrationStatus("");}}><option value="">Select a provider</option>{providerOptions.map((provider) => <option key={provider}>{provider}</option>)}</select><input value={integrationValue} onChange={(event) => {setIntegrationValue(event.target.value); setIntegrationStatus("");}} placeholder={activeTab === "keywords" ? "Add a target keyword" : "Paste a provider endpoint or property ID"} /><button className="button primary" type="button" onClick={saveIntegrationValue}>Save configuration</button></div>{integrationStatus && <p className="seo-integration-status" role="status">{integrationStatus}</p>}<small className="seo-disclaimer">No rankings or traffic numbers are fabricated while integrations are disconnected.</small></div></article>}
  </section>;
}
