import fs from "node:fs";
import path from "node:path";
import {createClient} from "next-sanity";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)=(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is missing in .env.local");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const assets = [
  ["nlp-banner", "NLP development page hero", "Natural language processing and language intelligence", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/nlp-development-banner-df05dec7f743ab807bfd4a47135aa61f.webp"],
  ["nlp-text-mining", "Text mining and classification", "Text mining and NLP data visualization", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/text-mining-2cad2d35b1e18964537a63b986142aa0.webp"],
  ["nlp-enterprise-search", "Intelligent enterprise search", "Enterprise search powered by natural language processing", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/intelligent-enterprise-9fbcf4078f37f5876c72248c4437c987.webp"],
  ["nlp-contextual-content", "Contextual content understanding", "Context and language understanding for business content", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/contextual-content-53d17925f9fe9757a7aa18c5e41beba9.webp"],
  ["nlp-industries", "NLP built for business", "Natural language processing across business use cases", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/built-for-business-1abbda85c63d70c39982d3a5ec9bee26.webp"],
  ["nlp-process", "NLP delivery process", "Language data transformed into practical business insight", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/built-for-business-1abbda85c63d70c39982d3a5ec9bee26.webp"],
];

for (const [slot, title, alt, url] of assets) {
  const existing = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id, "assetId": image.asset._ref}', {slot});
  if (existing?._id && existing.assetId) {
    await client.patch(existing._id).set({title, alt}).commit({visibility: "sync"});
    console.log(`Reused ${slot} from Sanity.`);
    continue;
  }
  const response = await fetch(url, {headers: {"user-agent": "Kodrise website asset importer/1.0"}});
  if (!response.ok) throw new Error(`Could not download ${slot}: HTTP ${response.status}`);
  const filename = url.split("/").pop();
  const contentType = response.headers.get("content-type") || "image/webp";
  const uploaded = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {filename, contentType});
  const doc = {_type: "siteAsset", slot, title, alt, image: {_type: "image", asset: {_type: "reference", _ref: uploaded._id}}};
  if (existing?._id) await client.patch(existing._id).set(doc).commit({visibility: "sync"});
  else await client.create(doc, {visibility: "sync"});
  console.log(`Uploaded ${slot} to Sanity.`);
}

const pageKey = "/services/nlp-development";
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/nlp-development-page.json"), "utf8"));
const lines = (items) => items.map((item) => `${item.title} :: ${item.description}`).join("\n");
const pagePatch = {
  title: "NLP Development",
  family: "AI Services",
  announcement: content.hero.eyebrow,
  heroTitle: content.hero.title,
  heroAccent: content.hero.accent,
  heroDescription: content.hero.description,
  primaryCta: content.hero.cta,
  primaryCtaUrl: content.hero.ctaUrl,
  detailSolutionsHeading: content.solutions.heading,
  detailSolutionsIntro: content.solutions.intro,
  detailSolutionsItems: lines(content.solutions.items),
  detailCapabilitiesHeading: content.capabilities.heading,
  detailCapabilitiesIntro: content.capabilities.intro,
  detailCapabilityItems: lines(content.capabilities.items),
  detailIndustriesIntro: content.industries.intro,
  detailIndustryItems: lines(content.industries.items),
  detailWhyIntro: content.why.intro,
  detailWhyItems: lines(content.why.items),
  detailCreativeHeading: content.creative.heading,
  detailCreativeIntro: content.creative.intro,
  detailCreativeItems: lines(content.creative.items),
  detailTechnologyIntro: content.technology.intro,
  detailTechnologyItems: content.technology.groups.map((group) => `${group.title} :: ${group.items.join(", ")}`).join("\n"),
  detailCaseStudiesIntro: content.caseStudiesIntro,
  detailFaqItems: content.faqs.map((item) => `${item.question} :: ${item.answer}`).join("\n"),
  seo: {
    title: "Natural Language Processing Services | Kodrise",
    description: "Build NLP systems that understand language, automate workflows, and turn unstructured text into useful insight.",
  },
};
const page = await client.fetch('*[_type == "sitePage" && pageKey == $key][0]{_id}', {key: pageKey});
if (!page?._id) throw new Error(`The imported NLP Development page record was not found in Sanity (${pageKey}).`);
const heroAsset = await client.fetch('*[_type == "siteAsset" && slot == "nlp-banner"][0]{"assetId":image.asset._ref}');
if (heroAsset?.assetId) pagePatch.heroImage = {_type: "image", asset: {_type: "reference", _ref: heroAsset.assetId}};
await client.patch(page._id).set(pagePatch).commit({visibility: "sync"});
console.log("Updated NLP Development content and hero image in Sanity.");
