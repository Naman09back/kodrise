import {readFile} from "node:fs/promises";
import {resolve} from "node:path";
import {createClient} from "next-sanity";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is required.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const contentFiles = [
  ["/services/ai-agents-and-automation-solutions", "ai-agent-page.json", "service"],
  ["/services/ai-app-development-company", "ai-app-page.json", "service"],
  ["/services/ai-chatbot-development-company", "ai-chatbot-page.json", "service"],
  ["/services/generative-ai-development-company", "generative-ai-page.json", "service"],
  ["/services/machine-learning", "machine-learning-page.json", "service"],
  ["/services/nlp-development", "nlp-development-page.json", "service"],
  ["/services/rag-as-a-service", "rag-as-a-service-page.json", "service"],
  ["/services/outsourcing-ai-development", "ai-outsourcing-page.json", "service"],
  ["/ai-consulting-services", "ai-consulting-page.json", "service"],
  ["/shopify-services/seo", "shopify-seo-page.json", "seo"],
];

const pairRows = (items = []) => items.map(({title, description}) => `${title} :: ${description}`).join("\n");
const faqRows = (items = []) => items.map(({question, answer}) => `${question} :: ${answer}`).join("\n");
const groupRows = (groups = []) => groups.map(({title, items = []}) => `${title} :: ${items.join(", ")}`).join("\n");

function toFields(data, type) {
  if (type === "seo") return {
    title: "Shopify SEO",
    announcement: data.hero.eyebrow,
    heroTitle: data.hero.title,
    heroAccent: data.hero.accent,
    heroDescription: data.hero.description,
    primaryCta: data.hero.cta,
    primaryCtaUrl: data.hero.ctaUrl,
    detailSolutionsHeading: data.services.heading,
    detailSolutionsIntro: data.services.intro,
    detailSolutionsItems: pairRows(data.services.items),
    detailCapabilitiesHeading: data.expertise.heading,
    detailCapabilitiesIntro: data.expertise.intro,
    detailCapabilityItems: pairRows(data.expertise.items),
    detailFaqItems: faqRows(data.faqs),
    shopifySeoIntroHeading: data.intro.heading,
    shopifySeoIntroCopy: data.intro.copy,
    shopifySeoTrustLabel: data.intro.trustLabel,
    shopifySeoCtaHeading: data.cta.heading,
    shopifySeoCtaCopy: data.cta.copy,
    shopifySeoCtaLabel: data.cta.label,
    shopifySeoCtaUrl: data.cta.url,
    shopifySeoRelatedHeading: data.related.heading,
    shopifySeoRelatedItems: data.related.items.join("\n"),
  };

  return {
    announcement: data.hero.eyebrow,
    heroTitle: data.hero.title,
    heroAccent: data.hero.accent,
    heroDescription: data.hero.description,
    primaryCta: data.hero.cta,
    primaryCtaUrl: data.hero.ctaUrl,
    detailSolutionsHeading: data.solutions.heading,
    detailSolutionsIntro: data.solutions.intro,
    detailSolutionsItems: pairRows(data.solutions.items),
    detailCapabilitiesHeading: data.capabilities.heading,
    detailCapabilitiesIntro: data.capabilities.intro,
    detailCapabilityItems: pairRows(data.capabilities.items),
    detailIndustriesIntro: data.industries.intro,
    detailIndustryItems: pairRows(data.industries.items),
    detailWhyIntro: data.why.intro,
    detailWhyItems: pairRows(data.why.items),
    detailCaseStudiesIntro: data.caseStudiesIntro,
    detailCreativeHeading: data.creative.heading,
    detailCreativeIntro: data.creative.intro,
    detailCreativeItems: pairRows(data.creative.items),
    detailTechnologyIntro: data.technology.intro,
    detailTechnologyItems: groupRows(data.technology.groups),
    detailFaqItems: faqRows(data.faqs),
  };
}

const records = [];
for (const [pageKey, file, type] of contentFiles) {
  const source = JSON.parse(await readFile(resolve("content", file), "utf8"));
  const fields = toFields(source, type);
  const id = await client.fetch(`*[_type == "sitePage" && pageKey == $pageKey][0]._id`, {pageKey});
  if (!id) throw new Error(`No Sanity sitePage found for ${pageKey}`);
  records.push({id, pageKey, fields});
}

console.log(JSON.stringify({mode: process.argv.includes("--apply") ? "apply" : "dry-run", pageCount: records.length, fieldsPerPage: Object.fromEntries(records.map(({pageKey, fields}) => [pageKey, Object.keys(fields).length]))}, null, 2));
if (!process.argv.includes("--apply")) {
  console.log("Dry run only. Run with --apply to copy existing native page copy into Sanity fields.");
  process.exit(0);
}

for (const {id, fields} of records) await client.patch(id).set(fields).commit();
console.log(JSON.stringify({complete: true, migratedPageCount: records.length}, null, 2));
